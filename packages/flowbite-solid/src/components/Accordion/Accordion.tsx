import classNames from "clsx";
import { DeepPartial, IconComponent } from "../index";
import { mergeDeep } from "../../helpers/mergeDeep";
import { OnOffStyles } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite/ThemeContext";
import { AccordionContent, AccordionComponentTheme } from "./AccordionContent";
import { AccordionPanel } from "./AccordionPanel";
import { AccordionTitle, FlowbiteAccordionTitleTheme } from "./AccordionTitle";
import {
  Component,
  ComponentProps,
  createMemo,
  JSX,
  mergeProps,
  ParentProps,
  splitProps,
} from "solid-js";
import AccordionContext, { AccordionEventKey, AccordionSelectCallback } from "./AccordionContext";
import { createControlledProp } from "../../helpers/createControlledProp";

export interface AccordionTheme {
  root: AccordionRootTheme;
  content: AccordionComponentTheme;
  title: FlowbiteAccordionTitleTheme;
}

export interface AccordionRootTheme {
  base: string;
  flush: OnOffStyles;
}

export interface AccordionProps extends ParentProps<Omit<ComponentProps<"div">, "onSelect">> {
  activeKey?: AccordionEventKey;
  defaultActiveKey?: AccordionEventKey;
  alwaysOpen?: boolean;
  arrowIcon?: IconComponent;
  flush?: boolean;
  collapseAll?: boolean;
  onSelect?: AccordionSelectCallback;
  theme?: DeepPartial<AccordionRootTheme>;
}

const defaultProps: Partial<AccordionProps> = {
  alwaysOpen: false,
  flush: false,
  collapseAll: false,
  theme: {},
};

const AccordionComponent: Component<AccordionProps> = (p: AccordionProps): JSX.Element => {
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "activeKey",
    "alwaysOpen",
    "arrowIcon",
    "children",
    "theme",
    "class",
    "defaultActiveKey",
    "collapseAll",
    "onSelect",
    "flush",
  ]);

  const [activeKey, onSelect] = createControlledProp<AccordionEventKey>(
    () => local.activeKey,
    () => local.defaultActiveKey,
    local.onSelect
  );
  const contextValue = {
    get activeEventKey() {
      return activeKey();
    },
    get alwaysOpen() {
      return local.alwaysOpen;
    },
    get onSelect() {
      return onSelect;
    },
    get flush() {
      return local.flush;
    },
    get collapseAll() {
      return local.collapseAll;
    },
  };
  const defaultTheme = useTheme();
  const theme = createMemo(() => mergeDeep(defaultTheme.theme.accordion.root, local.theme || {}));
  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        class={classNames(theme().base, theme().flush[local.flush ? "on" : "off"], local.class)}
        data-testid="flowbite-accordion"
        {...props}
      >
        {local.children}
      </div>
    </AccordionContext.Provider>
  );
};

export const Accordion = Object.assign(AccordionComponent, {
  Panel: AccordionPanel,
  Title: AccordionTitle,
  Content: AccordionContent,
});
