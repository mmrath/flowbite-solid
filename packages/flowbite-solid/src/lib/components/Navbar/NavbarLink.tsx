import classNames from 'clsx';
import {DeepPartial} from '..';
import {mergeDeep} from '../../helpers/mergeDeep';
import {FlowbiteBoolean} from '../Flowbite/FlowbiteTheme';
import {useTheme} from '../Flowbite/ThemeContext';
import {Dynamic} from "solid-js/web";
import {Component, ComponentProps, createMemo, mergeProps, ParentProps, splitProps} from "solid-js";

export interface FlowbiteNavbarLinkTheme {
    base: string;
    active: FlowbiteBoolean;
    disabled: FlowbiteBoolean;
}

export interface NavbarLinkProps extends ParentProps<ComponentProps<'a'>> {
    active?: boolean;
    disabled?: boolean;
    href?: string;
    theme?: DeepPartial<FlowbiteNavbarLinkTheme>;
    as?: string;
}

export const NavbarLink: Component<NavbarLinkProps> = (p) => {
    const defaultProps = {theme: {}, as: 'a'};
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "theme", "disabled", "active", "as"]);
    const theme = createMemo(() => mergeDeep(useTheme().theme.navbar.link, local.theme));

    return (
        <li>
            <Dynamic component={local.as}
                     class={classNames(
                         theme().base,
                         {
                             [theme().active.on]: local.active,
                             [theme().active.off]: !local.active && !local.disabled,
                         },
                         theme().disabled[local.disabled ? 'on' : 'off'],
                         local.class,
                     )}
                     {...props}
            >
                {local.children}
            </Dynamic>
        </li>
    );
};
