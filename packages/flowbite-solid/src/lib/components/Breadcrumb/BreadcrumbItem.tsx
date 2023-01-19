import classNames from 'clsx';
import {HiOutlineChevronRight} from 'solid-icons/hi';
import {DeepPartial, IconComponent} from '..';
import {mergeDeep} from '../../helpers/mergeDeep';
import {useTheme} from '../Flowbite';
import {ComponentProps, createMemo, JSX, mergeProps, ParentProps, splitProps} from "solid-js";
import {Dynamic} from "solid-js/web";

export interface FlowbiteBreadcrumbItemTheme {
    base: string;
    chevron: string;
    href: {
        off: string;
        on: string;
    };
    icon: string;
}

export interface BreadcrumbItemProps extends ParentProps<ComponentProps<'li'>> {
    href?: string;
    icon?: IconComponent;
    theme?: DeepPartial<FlowbiteBreadcrumbItemTheme>;
}

const BreadcrumbItem = (p:BreadcrumbItemProps): JSX.Element => {
    const defaultProps = {theme: {}}
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["children", "class",
        "href", "icon", "theme", "ref"]);
    const theme = createMemo(() => {
        return mergeDeep(useTheme().theme.breadcrumb.item, local.theme);
    });
    const isLink = createMemo(() => typeof local.href !== 'undefined');

    return (
        <li class={classNames(theme().base, local.class)} {...props}>
            <HiOutlineChevronRight aria-hidden class={theme().chevron} data-testid="flowbite-breadcrumb-separator"/>
            <Dynamic component={isLink()? 'a': 'span'}
                     class={theme().href[isLink() ? 'on' : 'off']}
                     data-testid="flowbite-breadcrumb-item"
                     href={local.href}
            >
                {local.icon && <Dynamic component={local.icon} aria-hidden class={theme().icon}/>}
                {local.children}
            </Dynamic>
        </li>
    );
}

export default BreadcrumbItem;
