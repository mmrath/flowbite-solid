import classNames from 'clsx';
import {DeepPartial} from '..';
import {mergeDeep} from '../../helpers/mergeDeep';
import {FlowbiteBoolean} from '../Flowbite/FlowbiteTheme';
import {useTheme} from '../Flowbite';
import {FlowbiteNavbarBrandTheme, NavbarBrand} from './NavbarBrand';
import {FlowbiteNavbarCollapseTheme, NavbarCollapse} from './NavbarCollapse';
import {NavbarContext} from './NavbarContext';
import {FlowbiteNavbarLinkTheme, NavbarLink} from './NavbarLink';
import {FlowbiteNavbarToggleTheme, NavbarToggle} from './NavbarToggle';
import {Component, ComponentProps, createMemo, createSignal, mergeProps, ParentProps, splitProps} from "solid-js";

export interface FlowbiteNavbarTheme {
    root: FlowbiteNavbarRootTheme;
    brand: FlowbiteNavbarBrandTheme;
    collapse: FlowbiteNavbarCollapseTheme;
    link: FlowbiteNavbarLinkTheme;
    toggle: FlowbiteNavbarToggleTheme;
}

export interface FlowbiteNavbarRootTheme {
    base: string;
    rounded: FlowbiteBoolean;
    bordered: FlowbiteBoolean;
    inner: {
        base: string;
        fluid: FlowbiteBoolean;
    };
}

export interface NavbarComponentProps extends ParentProps<ComponentProps<'nav'>> {
    menuOpen?: boolean;
    fluid?: boolean;
    rounded?: boolean;
    border?: boolean;
    theme?: DeepPartial<FlowbiteNavbarRootTheme>;
}

const NavbarComponent: Component<NavbarComponentProps> = (p) => {
    const defaultProps = {theme: {}, fluid:false};
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "theme", "fluid", "rounded", "border", "menuOpen"]);
    const theme = createMemo(() => mergeDeep(useTheme().theme.navbar.root, local.theme));
    const [isOpen, setIsOpen] = createSignal(local.menuOpen);

    return (
        <NavbarContext.Provider value={{
            get isOpen() {
                return isOpen();
            }, setIsOpen
        }}>
            <nav
                class={classNames(
                    theme().base,
                    theme().bordered[local.border ? 'on' : 'off'],
                    theme().rounded[local.rounded ? 'on' : 'off'],
                    local.class,
                )}
                {...props}
            >
                <div class={classNames(theme().inner.base, theme().inner.fluid[local.fluid ? 'on' : 'off'])}>{local.children}</div>
            </nav>
        </NavbarContext.Provider>
    );
};

export const Navbar = Object.assign(NavbarComponent, {
    Brand: NavbarBrand,
    Collapse: NavbarCollapse,
    Link: NavbarLink,
    Toggle: NavbarToggle,
});
