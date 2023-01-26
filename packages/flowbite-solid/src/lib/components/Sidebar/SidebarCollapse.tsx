import classNames from 'clsx';
import type {ComponentProps, Component, ParentProps} from 'solid-js';
import {createEffect, createUniqueId, createSignal, JSX, splitProps, mergeProps} from 'solid-js';
import {HiSolidChevronDown as HiChevronDown} from 'solid-icons/hi';
import {useTheme} from '../Flowbite';
import {Tooltip} from '../Tooltip';
import {useSidebarContext} from './SidebarContext';
import type {SidebarItemProps} from './SidebarItem';
import {SidebarItemContext} from './SidebarItemContext';
import {Dynamic} from "solid-js/web";

export interface SidebarCollapseProps extends ParentProps<ComponentProps<'button'> & SidebarItemProps> {
    open?: boolean;
}

const SidebarCollapse: Component<SidebarCollapseProps> = (p): JSX.Element => {
    const defaultProps = {open: false};
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "icon", "label", "open"]);

    const id = createUniqueId();
    const {isCollapsed} = useSidebarContext();
    const [isOpen, setOpen] = createSignal(local.open);
    const theme = useTheme().theme.sidebar.collapse;

    createEffect(() => setOpen(local.open));

    const Wrapper: Component<ParentProps<unknown>> = (props): JSX.Element => (
        <li>
            {isCollapsed && !isOpen() ? (
                <Tooltip content={local.label} placement="right">
                    {props.children}
                </Tooltip>
            ) : (
                props.children
            )}
        </li>
    );

    return (
        <Wrapper>
            <button
                class={classNames(theme.button, local.class)}
                id={`flowbite-sidebar-collapse-${id}`}
                onClick={() => setOpen(!isOpen)}
                title={local.label}
                type="button"
                {...props}
            >
                {local.icon && (
                    <Dynamic component={local.icon}
                        aria-hidden
                        class={classNames(theme.icon.base, theme.icon.open[isOpen() ? 'on' : 'off'])}
                        data-testid="flowbite-sidebar-collapse-icon"
                    />
                )}
                {isCollapsed ? (
                    <span class="sr-only">{local.label}</span>
                ) : (
                    <>
            <span class={theme.label.base} data-testid="flowbite-sidebar-collapse-label">
              {local.label}
            </span>
                        <HiChevronDown aria-hidden class={theme.label.icon}/>
                    </>
                )}
            </button>
            <ul aria-labelledby={`flowbite-sidebar-collapse-${id}`} class={theme.list} hidden={!isOpen()}>
                <SidebarItemContext.Provider value={{isInsideCollapse: true}}>{local.children}</SidebarItemContext.Provider>
            </ul>
        </Wrapper>
    );
};

export default SidebarCollapse;
