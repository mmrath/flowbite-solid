import classNames from 'clsx';
import { HiSolidMenuAlt3 as GoThreeBars } from 'solid-icons/hi';
import {DeepPartial, IconComponent} from '..';
import { mergeDeep } from '../../helpers/mergeDeep';
import { useTheme } from '../Flowbite';
import { useNavbarContext } from './NavbarContext';
import {Component, ComponentProps, createMemo, mergeProps, splitProps} from "solid-js";
import {Dynamic} from "solid-js/web";

export interface FlowbiteNavbarToggleTheme {
  base: string;
  icon: string;
}

export interface NavbarToggleProps extends ComponentProps<'button'> {
  barIcon?: IconComponent;
  theme?: DeepPartial<FlowbiteNavbarToggleTheme>;
}

export const NavbarToggle: Component<NavbarToggleProps> = (p) => {

  const ctx = useNavbarContext();
  const defaultProps = {theme:{}, barIcon: GoThreeBars};
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "theme", "barIcon"]);
  const theme = createMemo(() => mergeDeep(useTheme().theme.navbar.toggle, local.theme));

  const handleClick = () => {
    ctx.setIsOpen(!ctx.isOpen);
  };

  return (
    <button
      class={classNames(theme().base, local.class)}
      data-testid="flowbite-navbar-toggle"
      onClick={handleClick}
      {...props}
    >
      <span class="sr-only">Open main menu</span>
      <Dynamic component={local.barIcon} class={theme().icon} />
    </button>
  );
};
