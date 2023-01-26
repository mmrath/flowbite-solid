import classNames from 'clsx';
import type {ComponentProps, Component, ParentProps} from 'solid-js';
import {useTheme} from '../Flowbite';
import {SidebarItemContext} from './SidebarItemContext';
import {splitProps} from "solid-js";

const SidebarItemGroup: Component<ParentProps<ComponentProps<'ul'>>> = (p) => {
    const [local, props] = splitProps(p, ["class", "children"]);
    const theme = useTheme().theme.sidebar.itemGroup;

    return (
        <ul class={classNames(theme, local.class)} data-testid="flowbite-sidebar-item-group" {...props}>
            <SidebarItemContext.Provider value={{
                get isInsideCollapse() {
                    return false;
                }
            }}>{local.children}</SidebarItemContext.Provider>
        </ul>
    );
};

export default SidebarItemGroup;
