/*!
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/81b25f4b40c54f72aeb106ca0e64e1e09655153e/packages/react/menu/src/Menu.tsx
 */

import { mergeDefaultProps, removeItemFromArray } from "../../helpers";
import { createEffect, createSignal, onCleanup, ParentProps, splitProps } from "solid-js";

import { createListState } from "../list";
import { PopperRoot, PopperRootOptions } from "../popper";
import { Placement } from "../popper/utils";
import {
  CollectionItem,
  createDisclosureState,
  createHideOutside,
  createRegisterId,
  focusSafely,
} from "../../primitives";
import {
  createDomCollection,
  useOptionalDomCollectionContext,
} from "../../primitives/create-dom-collection";
import { FocusStrategy } from "../selection";
import { MenuContext, MenuContextValue, useOptionalMenuContext } from "./menu-context";
import { useMenuRootContext } from "./menu-root-context";
import { GraceIntent, isPointerInGraceArea, Side } from "./utils";

export interface MenuOptions
  extends Omit<PopperRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange"> {
  /** The controlled open state of the menu. */
  isOpen?: boolean;

  /**
   * The default open state when initially rendered.
   * Useful when you do not need to control the open state.
   */
  defaultIsOpen?: boolean;

  /** Event handler called when the open state of the menu changes. */
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Container for menu items and nested menu, provide context for its children.
 */
export function Menu(props: ParentProps<MenuOptions>) {
  const rootContext = useMenuRootContext();
  const parentDomCollectionContext = useOptionalDomCollectionContext();
  const parentMenuContext = useOptionalMenuContext();

  props = mergeDefaultProps(
    {
      placement: "bottom-start",
    },
    props
  );

  const [local, others] = splitProps(props, ["isOpen", "defaultIsOpen", "onOpenChange"]);

  let pointerGraceTimeoutId = 0;
  let pointerGraceIntent: GraceIntent | null = null;
  let pointerDir: Side = "right";

  const [triggerId, setTriggerId] = createSignal<string>();
  const [contentId, setContentId] = createSignal<string>();

  const [triggerRef, setTriggerRef] = createSignal<HTMLElement>();
  const [contentRef, setContentRef] = createSignal<HTMLDivElement>();

  const [focusStrategy, setFocusStrategy] = createSignal<FocusStrategy | boolean>(true);
  const [currentPlacement, setCurrentPlacement] = createSignal<Placement>(others.placement!);
  const [nestedMenus, setNestedMenus] = createSignal<Element[]>([]);

  const [items, setItems] = createSignal<CollectionItem[]>([]);

  const { DomCollectionProvider } = createDomCollection({ items, onItemsChange: setItems });

  const disclosureState = createDisclosureState({
    isOpen: () => local.isOpen,
    defaultIsOpen: () => local.defaultIsOpen,
    onOpenChange: isOpen => local.onOpenChange?.(isOpen),
  });

  const listState = createListState({
    selectionMode: "none",
    dataSource: items,
  });

  const open = (focusStrategy: FocusStrategy | boolean) => {
    setFocusStrategy(focusStrategy);
    disclosureState.open();
  };

  const close = () => {
    disclosureState.close();
  };

  const toggle = (focusStrategy: FocusStrategy | boolean) => {
    setFocusStrategy(focusStrategy);
    disclosureState.toggle();
  };

  const focusContent = () => {
    const content = contentRef();

    if (content) {
      focusSafely(content);
      listState.selectionManager().setFocused(true);
      listState.selectionManager().setFocusedKey(undefined);
    }
  };

  const registerNestedMenu = (element: Element) => {
    setNestedMenus(prev => [...prev, element]);

    const parentUnregister = parentMenuContext?.registerNestedMenu(element);

    return () => {
      setNestedMenus(prev => removeItemFromArray(prev, element));
      parentUnregister?.();
    };
  };

  const isPointerMovingToSubmenu = (e: PointerEvent) => {
    const isMovingTowards = pointerDir === pointerGraceIntent?.side;
    return isMovingTowards && isPointerInGraceArea(e, pointerGraceIntent?.area);
  };

  const onItemEnter = (e: PointerEvent) => {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  };

  const onItemLeave = (e: PointerEvent) => {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }

    focusContent();
  };

  const onTriggerLeave = (e: PointerEvent) => {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  };

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  createHideOutside({
    isDisabled: () => {
      // Apply only on root menu when opened and modal.
      return !(parentMenuContext == null && disclosureState.isOpen() && rootContext.isModal());
    },
    targets: () => [contentRef(), ...nestedMenus()].filter(Boolean) as Element[],
  });

  createEffect(() => {
    const contentEl = contentRef();

    if (!contentEl || !parentMenuContext) {
      return;
    }

    const parentUnregister = parentMenuContext.registerNestedMenu(contentEl);

    onCleanup(() => {
      parentUnregister();
    });
  });

  const context: MenuContextValue = {
    isOpen: disclosureState.isOpen,
    shouldMount: () => rootContext.forceMount() || disclosureState.isOpen(),
    currentPlacement,
    pointerGraceTimeoutId: () => pointerGraceTimeoutId,
    autoFocus: focusStrategy,
    listState: () => listState,
    parentMenuContext: () => parentMenuContext,
    triggerRef,
    contentRef,
    triggerId,
    contentId,
    setTriggerRef,
    setContentRef,
    open,
    close,
    toggle,
    focusContent,
    onItemEnter,
    onItemLeave,
    onTriggerLeave,
    setPointerDir: (dir: Side) => (pointerDir = dir),
    setPointerGraceTimeoutId: (id: number) => (pointerGraceTimeoutId = id),
    setPointerGraceIntent: (intent: GraceIntent | null) => (pointerGraceIntent = intent),
    registerNestedMenu,
    registerItemToParentDomCollection: parentDomCollectionContext?.registerItem,
    registerTriggerId: createRegisterId(setTriggerId),
    registerContentId: createRegisterId(setContentId),
  };

  return (
    <DomCollectionProvider>
      <MenuContext.Provider value={context}>
        <PopperRoot
          anchorRef={triggerRef}
          contentRef={contentRef}
          onCurrentPlacementChange={setCurrentPlacement}
          {...others}
        />
      </MenuContext.Provider>
    </DomCollectionProvider>
  );
}
