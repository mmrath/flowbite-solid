import classNames from 'clsx';
import {useTheme} from '../Flowbite';
import {Component, ComponentProps, mergeProps, ParentProps, splitProps} from "solid-js";

export interface FooterLinkGroupProps extends ParentProps<ComponentProps<'ul'>> {
    col?: boolean;
}

export const FooterLinkGroup: Component<FooterLinkGroupProps> = (p) => {
    const defaultProps = {col: false}
    const [local, props] = splitProps(mergeProps(defaultProps, p),
        ["class", "children", "col"]);

    return (
        <ul data-testid="footer-groupLink"
            class={classNames(useTheme().theme.footer.groupLink, local.col && useTheme().theme.footer.groupLink.col, local.class)} {...props}>
            {local.children}
        </ul>
    );
};
