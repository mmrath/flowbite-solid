import classNames from 'clsx';
import { DeepPartial } from '..';
import { mergeDeep } from '../../helpers/mergeDeep';
import { useTheme } from '../Flowbite/ThemeContext';
import { useAccordionPanelContext } from './AccordionPanelContext';
import {Component, ComponentProps, createMemo, JSX, mergeProps, ParentProps, splitProps} from "solid-js";

export interface FlowbiteAccordionComponentTheme {
  base: string;
}

export interface AccordionContentProps extends ParentProps<ComponentProps<'div'>> {
  theme?: DeepPartial<FlowbiteAccordionComponentTheme>;
}

export const AccordionContent: Component<AccordionContentProps> = (p:AccordionContentProps): JSX.Element => {
  const [local, props] = splitProps(mergeProps({theme:{}}, p), ["children", "class", "theme"])

  const { isOpen } = useAccordionPanelContext();
  const defaultTheme = useTheme();
  const theme = createMemo(
      ()=> mergeDeep(defaultTheme.theme.accordion.content, local.theme)
  );

  return (
    <div
      class={classNames(theme().base, local.class)}
      data-testid="flowbite-accordion-content"
      hidden={!isOpen}
      {...props}
    >
      {local.children}
    </div>
  );
};
