import classNames from "clsx";
import { DeepPartial } from "../index";
import { mergeDeep } from "../../helpers/mergeDeep";
import { useTheme } from "../Flowbite/ThemeContext";
import { useAccordionPanelContext } from "./AccordionPanelContext";
import {
  Component,
  ComponentProps,
  createEffect,
  createMemo,
  JSX,
  mergeProps,
  ParentProps,
  splitProps,
} from "solid-js";

export interface AccordionComponentTheme {
  base: string;
}

export interface AccordionContentProps extends ParentProps<ComponentProps<"div">> {
  theme?: DeepPartial<AccordionComponentTheme>;
}

export const AccordionContent: Component<AccordionContentProps> = (
  p: AccordionContentProps
): JSX.Element => {
  const [local, props] = splitProps(mergeProps({ theme: {} }, p), ["children", "class", "theme"]);

  const itemContext = useAccordionPanelContext();
  const defaultTheme = useTheme();
  const theme = createMemo(() => mergeDeep(defaultTheme.theme.accordion.content, local.theme));
  createEffect(() => {
    console.log("content open:", itemContext);
  });
  return (
    <div
      class={classNames(theme().base, local.class)}
      data-testid="flowbite-accordion-content"
      hidden={!itemContext.isOpen}
      {...props}
    >
      {local.children}
    </div>
  );
};
