import classNames from 'clsx';
import type { ComponentProps, Component, ParentProps } from 'solid-js';
import { FlowbiteBoolean } from '../Flowbite/FlowbiteTheme';
import { useTheme } from '../Flowbite';
import SidebarCollapse from './SidebarCollapse';
import { SidebarContext } from './SidebarContext';
import SidebarCTA, { SidebarCTAColors } from './SidebarCTA';
import SidebarItem from './SidebarItem';
import SidebarItemGroup from './SidebarItemGroup';
import SidebarItems from './SidebarItems';
import SidebarLogo from './SidebarLogo';
import {JSX, mergeProps, splitProps} from "solid-js";

export interface FlowbiteSidebarTheme {
  base: string;
  collapsed: FlowbiteBoolean;
  inner: string;
  collapse: {
    button: string;
    icon: {
      base: string;
      open: FlowbiteBoolean;
    };
    label: {
      base: string;
      icon: string;
    };
    list: string;
  };
  cta: {
    base: string;
    color: SidebarCTAColors;
  };
  item: {
    active: string;
    base: string;
    collapsed: {
      insideCollapse: string;
      noIcon: string;
    };
    content: {
      base: string;
    };
    label: string;
    icon: {
      base: string;
      active: string;
    };
  };
  items: string;
  itemGroup: string;
  logo: {
    base: string;
    collapsed: FlowbiteBoolean;
    img: string;
  };
}

export interface SidebarProps extends ParentProps<ComponentProps<'aside'>> {
  collapseBehavior?: 'collapse' | 'hide';
  collapsed?: boolean;
}

const SidebarComponent: Component<SidebarProps> = (p): JSX.Element => {
  const defaultProps = {collapseBehavior: 'collapse', collapsed:false};
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["children", "collapseBehavior", "collapsed"]);

  const theme = useTheme().theme.sidebar;

  return (
    <SidebarContext.Provider value={{ isCollapsed:local.collapsed }}>
      <aside
        aria-label="Sidebar"
        class={classNames(theme.base, theme.collapsed[local.collapsed ? 'on' : 'off'])}
        hidden={local.collapsed && local.collapseBehavior === 'hide'}
        {...props}
      >
        <div class={theme.inner}>{local.children}</div>
      </aside>
    </SidebarContext.Provider>
  );
};

export const Sidebar = Object.assign(SidebarComponent, {
  Collapse: SidebarCollapse,
  CTA: SidebarCTA,
  Item: SidebarItem,
  Items: SidebarItems,
  ItemGroup: SidebarItemGroup,
  Logo: SidebarLogo,
});
