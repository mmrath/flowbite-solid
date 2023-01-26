import classNames from 'clsx';
import {Component, ComponentProps, createUniqueId, mergeProps, ParentProps, splitProps} from 'solid-js';
import {Badge} from '../Badge';
import type {FlowbiteColors} from '../Flowbite/FlowbiteTheme';
import {useTheme} from '../Flowbite';
import {Tooltip} from '../Tooltip';
import {useSidebarContext} from './SidebarContext';
import {useSidebarItemContext} from './SidebarItemContext';
import {Dynamic} from "solid-js/web";
import {IconComponent} from "../types";

export interface SidebarItemProps
    extends ParentProps<ComponentProps<'div'> & Record<string, unknown>> {
    active?: boolean;
    as?: string;
    href?: string;
    icon?: IconComponent;
    label?: string;
    labelColor?: keyof SidebarItemLabelColors;
}

export interface SidebarItemLabelColors extends Pick<FlowbiteColors, 'gray'> {
    [key: string]: string;
}

const ListItem: Component<ParentProps<{ id: string; isCollapsed: boolean; tooltipChildren: ReactNode | undefined }>> = ({
                                                                                                                            id,
                                                                                                                            isCollapsed,
                                                                                                                            tooltipChildren,
                                                                                                                            children: wrapperChildren,
                                                                                                                        }) => (
    <li>
        {isCollapsed ? (
            <Tooltip content={<TooltipContent id={id}>{tooltipChildren}</TooltipContent>} placement="right">
                {wrapperChildren}
            </Tooltip>
        ) : (
            wrapperChildren
        )}
    </li>
);

const TooltipContent: Component<ParentProps<{ id: string }>> = (props) => (
    <Children id={props.id}>{props.children}</Children>
);

const Children: Component<ParentProps<{ id: string }>> = (props) => {
    const theme = useTheme().theme.sidebar.item;

    return (
        <span
            class={classNames(theme.content.base)}
            data-testid="flowbite-sidebar-item-content"
            id={`flowbite-sidebar-item-${props.id}`}
        >
      {props.children}
    </span>
    );
};

const SidebarItem: Component<SidebarItemProps> = (p) => {
    const id = createUniqueId();

    const defaultProps = {as: 'a', labelColor: 'info'};
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "as", "icon", "active", "label", "labelColor", "ref"]);

    const {isCollapsed} = useSidebarContext();
    const {isInsideCollapse} = useSidebarItemContext();
    const theme = useTheme().theme.sidebar.item;

    return (
        <ListItem id={id} isCollapsed={isCollapsed} tooltipChildren={local.children}>
            <Dynamic component={local.as}
                     aria-labelledby={`flowbite-sidebar-item-${id}`}
                     class={classNames(
                         theme.base,
                         local.active && theme.active,
                         !isCollapsed && isInsideCollapse && theme.collapsed.insideCollapse,
                         local.class,
                     )}
                     ref={local.ref}
                     {...props}
            >
                {local.icon && (
                    <Dynamic component={local.icon}
                             aria-hidden
                             class={classNames(theme.icon.base, local.active && theme.icon.active)}
                             data-testid="flowbite-sidebar-item-icon"
                    />
                )}
                {isCollapsed && !local.icon && (
                    <span
                        class={theme.collapsed.noIcon}>{(local.children as string).charAt(0).toLocaleUpperCase() ?? '?'}</span>
                )}
                {!isCollapsed && <Children id={id}>{local.children}</Children>}
                {!isCollapsed && local.label && (
                    <Badge color={local.labelColor} data-testid="flowbite-sidebar-label" hidden={isCollapsed}
                           class={theme.label}>
                        {local.label}
                    </Badge>
                )}
            </Dynamic>
        </ListItem>
    );
}


export default SidebarItem;
