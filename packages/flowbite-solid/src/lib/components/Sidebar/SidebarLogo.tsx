import classNames from 'clsx';
import type {Component, ComponentProps, ParentProps} from 'solid-js';
import {createUniqueId, mergeProps, splitProps} from 'solid-js';
import {useTheme} from '../Flowbite';
import {useSidebarContext} from './SidebarContext';

export interface SidebarLogoProps extends ParentProps<ComponentProps<'a'>> {
  className?: string;
  href: string;
  img: string;
  imgAlt?: string;
}

const SidebarLogo: Component<SidebarLogoProps> = (p) => {
  const defaultProps = {imgAlt: ''};
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "href", "img", "imgAlt"]);

  const id = createUniqueId();
  const { isCollapsed } = useSidebarContext();
  const theme = useTheme().theme.sidebar.logo;

  return (
    <a
      aria-labelledby={`flowbite-sidebar-logo-${id}`}
      class={classNames(theme.base, local.class)}
      href={local.href}
      {...props}
    >
      <img alt={local.imgAlt} class={theme.img} src={local.img} />
      <span class={theme.collapsed[isCollapsed ? 'on' : 'off']} id={`flowbite-sidebar-logo-${id}`}>
        {local.children}
      </span>
    </a>
  );
};

export default SidebarLogo;
