import classNames from 'clsx';
import type {Component, ComponentProps, ParentProps} from 'solid-js';
import {JSX, splitProps} from "solid-js";
import {useTheme} from '../Flowbite';

const SidebarItems: Component<ParentProps<ComponentProps<'div'>>> = (p): JSX.Element => {
  const [local, props] = splitProps(p, ["class", "children"]);
  const theme = useTheme().theme.sidebar.items;

  return (
    <div class={classNames(theme, local.class)} data-testid="flowbite-sidebar-items" {...props}>
      {local.children}
    </div>
  );
};

export default SidebarItems;
