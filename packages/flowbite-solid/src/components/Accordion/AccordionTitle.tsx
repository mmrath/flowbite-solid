import classNames from "clsx";
import { DeepPartial } from "../index";
import { mergeDeep } from "../../helpers/mergeDeep";
import type { FlowbiteBoolean, FlowbiteHeadingLevel } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite";
import { useAccordionPanelContext } from "./AccordionPanelContext";
import {
  Component,
  ComponentProps,
  createEffect,
  createMemo,
  JSX,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import AccordionContext, { AccordionEventKey, useAccordionContext } from "./AccordionContext";
import { callEventHandler } from "../../helpers/callEventHandler";

export interface FlowbiteAccordionTitleTheme {
  arrow: {
    base: string;
    open: {
      off: string;
      on: string;
    };
  };
  base: string;
  flush: FlowbiteBoolean;
  heading: string;
  open: FlowbiteBoolean;
}

export interface AccordionTitleProps extends ComponentProps<"button"> {
  arrowIcon?: Component<ComponentProps<"svg">>;
  as?: FlowbiteHeadingLevel;
  theme?: DeepPartial<FlowbiteAccordionTitleTheme>;
}

export const AccordionTitle: Component<AccordionTitleProps> = (
  p: AccordionTitleProps
): JSX.Element => {
  const [local, props] = splitProps(
    mergeProps(
      {
        as: "h2",
        theme: {},
      },
      p
    ),
    ["as", "children", "class", "theme", "onClick"]
  );

  const itemContext = useAccordionPanelContext();
  const accordionOnClick = useAccordionButton(itemContext.eventKey, local.onClick);
  const accordionContext = useAccordionContext();

  const theme = createMemo(() => mergeDeep(useTheme().theme.accordion.title, local.theme));
  createEffect(() => {
    console.log("in title", theme(), itemContext, accordionContext);
  });
  return (
    <button
      class={classNames(
        theme().base,
        theme().flush[accordionContext.flush ? "on" : "off"],
        theme().open[itemContext.isOpen ? "on" : "off"],
        local.class
      )}
      onClick={accordionOnClick}
      aria-expanded={itemContext.eventKey === accordionContext.activeEventKey}
      type="button"
      {...props}
    >
      <Dynamic
        component={local.as}
        class={theme().heading}
        data-testid="flowbite-accordion-heading"
      >
        {local.children}
      </Dynamic>
      {accordionContext.arrowIcon && (
        <Dynamic
          component={accordionContext.arrowIcon}
          aria-hidden
          class={classNames(
            theme().arrow.base,
            theme().arrow.open[itemContext.isOpen ? "on" : "off"]
          )}
          data-testid="flowbite-accordion-arrow"
        />
      )}
    </button>
  );
};

type EventHandler = JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;

export function useAccordionButton(eventKey: string, onClick?: EventHandler): EventHandler {
  const context = useContext(AccordionContext);

  return e => {
    /*
          Compare the event key in context with the given event key.
          If they are the same, then collapse the component.
        */
    let eventKeyPassed: AccordionEventKey = eventKey === context.activeEventKey ? null : eventKey;
    if (context.alwaysOpen) {
      if (Array.isArray(context.activeEventKey)) {
        if (context.activeEventKey.includes(eventKey)) {
          eventKeyPassed = context.activeEventKey.filter(k => k !== eventKey);
        } else {
          eventKeyPassed = [...context.activeEventKey, eventKey];
        }
      } else {
        // activeEventKey is undefined.
        eventKeyPassed = [eventKey];
      }
    }

    context.onSelect?.(eventKeyPassed, e);
    callEventHandler(onClick, e);
  };
}
