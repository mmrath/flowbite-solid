import classNames from 'clsx';
import type {Component, ComponentProps, ParentProps} from 'solid-js';
import {JSX, mergeProps, splitProps} from "solid-js";
import type {FlowbiteColors} from '../Flowbite/FlowbiteTheme';
import {useTheme} from '../Flowbite';
import {useSidebarContext} from './SidebarContext';

export interface SidebarCTAProps extends ParentProps<Omit<ComponentProps<'div'>, 'color'>> {
    color?: keyof SidebarCTAColors;
}

export interface SidebarCTAColors
    extends Pick<
        FlowbiteColors,
        'blue' | 'dark' | 'failure' | 'gray' | 'green' | 'light' | 'purple' | 'red' | 'success' | 'warning' | 'yellow'
    > {
    [key: string]: string;
}

const SidebarCTA: Component<SidebarCTAProps> = (p): JSX.Element => {
    const defaultProps = {color: 'info'};
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "color"]);

    const {isCollapsed} = useSidebarContext();
    const theme = useTheme().theme.sidebar.cta;

    return (
        <div
            class={classNames(theme.base, theme.color[local.color], local.class)}
            data-testid="sidebar-cta"
            hidden={isCollapsed}
            {...props}
        >
            {local.children}
        </div>
    );
};

export default SidebarCTA;
