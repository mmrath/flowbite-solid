import classNames from 'clsx';
import {useTheme} from '../Flowbite';
import {Component, ComponentProps, createMemo, mergeProps, ParentProps, splitProps} from "solid-js";

export interface FooterLinkGroupProps extends ParentProps<ComponentProps<'ul'>> {
    col?: boolean;
}

export const FooterLinkGroup: Component<FooterLinkGroupProps> = (p) => {
    const defaultProps = {col: false}
    const [local, props] = splitProps(mergeProps(defaultProps, p),
        ["class", "children", "col"]);
    const theme = createMemo(() => useTheme().theme.footer);

    return (
        <ul data-testid="footer-groupLink"
            class={classNames(theme().groupLink.base, local.col && theme().groupLink.col, local.class)} {...props}>
            {local.children}
        </ul>
    );
};
