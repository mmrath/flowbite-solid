import classNames from 'clsx';
import {DeepPartial} from '..';
import {mergeDeep} from '../../helpers/mergeDeep';
import {useTheme} from '../Flowbite';
import {Component, ComponentProps, createMemo, mergeProps, ParentProps, splitProps} from "solid-js";
import {Dynamic} from "solid-js/web";

export interface FlowbiteNavbarBrandTheme {
  base: string;
}

export interface NavbarBrandProps extends ParentProps<ComponentProps<'a'>> {
  theme?: DeepPartial<FlowbiteNavbarBrandTheme>;
  as?: string;
  href?: string;
}

export const NavbarBrand: Component<NavbarBrandProps> = (p) => {
  const defaultProps = {theme: {}, as:'a'};
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "theme", "as"]);
  const theme = createMemo(() => mergeDeep(useTheme().theme.navbar.brand, local.theme));

  return (
    <Dynamic component={local.as} class={classNames(theme().base, local.class)} {...props}>
      {local.children}
    </Dynamic>
  );
};
