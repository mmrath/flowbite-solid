import classNames from 'clsx';
import type { FlowbiteColors } from '../Flowbite/FlowbiteTheme';
import { useTheme } from '../Flowbite/ThemeContext';
import {ComponentProps, mergeProps, ParentProps, splitProps} from "solid-js";

export interface FlowbiteHelperTextTheme {
  base: string;
  colors: HelperColors;
}

export interface HelperColors extends Pick<FlowbiteColors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
  [key: string]: string;
}

export interface HelperTextProps extends ParentProps<Omit<ComponentProps<'p'>, 'color'>> {
  color?: keyof HelperColors;
  value?: string;
}

export const HelperText= (p:HelperTextProps) => {
  const [local, props] = splitProps(mergeProps({color:'default'}, p), ["value", "children", "color", "class"])
  const theme = useTheme().theme.helperText;
  return (
    <p class={classNames(theme.base, theme.colors[local.color], local.class)} {...props}>
      {local.value ?? local.children ?? ''}
    </p>
  );
};
