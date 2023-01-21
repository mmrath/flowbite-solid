import classNames from 'clsx';
import {useTheme} from '../Flowbite';
import {FooterBrand} from './FooterBrand';
import {FooterCopyright} from './FooterCopyright';
import {FooterDivider} from './FooterDivider';
import {FooterIcon} from './FooterIcon';
import {FooterLink} from './FooterLink';
import {FooterLinkGroup} from './FooterLinkGroup';
import {FooterTitle} from './FooterTitle';
import {Component, ComponentProps, JSX, mergeProps} from "solid-js";

export interface FlowbiteFooterTheme {
    base: string;
    container: string;
    bgDark: string;
    groupLink: {
        base: string;
        link: {
            base: string;
            href: string;
        };
        col: string;
    };
    icon: {
        base: string;
        size: string;
    };
    title: {
        base: string;
    };
    divider: {
        base: string;
    };
    copyright: {
        base: string;
        href: string;
        span: string;
    };
    brand: {
        base: string;
        img: string;
        span: string;
    };
}

export interface FooterProps extends ComponentProps<'footer'> {
    bgDark?: boolean;
    container?: boolean;
}

export const FooterComponent: Component<FooterProps> = (p): JSX.Element => {
    const defaultProps = {bgDark: false, container: false}
    const local = mergeProps(defaultProps, p);
    const theme = useTheme().theme.footer;
    return (
        <footer
            data-testid="flowbite-footer"
            class={classNames(theme.base, local.bgDark && theme.bgDark, local.container && theme.container, local.class)}
        >
            {local.children}
        </footer>
    );
};

export const Footer = Object.assign(FooterComponent, {
    Copyright: FooterCopyright,
    Link: FooterLink,
    LinkGroup: FooterLinkGroup,
    Brand: FooterBrand,
    Icon: FooterIcon,
    Title: FooterTitle,
    Divider: FooterDivider,
});
