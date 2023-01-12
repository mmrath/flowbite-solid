import {useTheme} from '../Flowbite/ThemeContext';
import {Component, ComponentProps, JSX, ParentProps, splitProps} from "solid-js";
import {Dynamic} from "solid-js/web";
import clsx from "clsx";

export interface FlowbiteCardTheme {
    base: string;
    children: string;
    horizontal: {
        off: string;
        on: string;
    };
    href: string;
    img: {
        base: string;
        horizontal: {
            off: string;
            on: string;
        };
    };
    title:string;
    body:string;
}

export interface CardProps extends ParentProps<ComponentProps<'div'>> {
    horizontal?: boolean;
    href?: string;
    imgAlt?: string;
    imgSrc?: string;
}

export const CardComponent = (p: CardProps): JSX.Element => {
    const theme = useTheme().theme.card;
    const [local, theirProps] = splitProps(p, ["children", "class", "horizontal", "href", "imgAlt", "imgSrc"]);

    return (
        <Dynamic component={typeof local.href === 'undefined' ? 'div' : 'a'}
                 class={clsx(theme.base, theme.horizontal[local.horizontal ? 'on' : 'off'], local.href && theme.href, local.class)}
                 data-testid="flowbite-card"
                 href={local.href}
                 {...theirProps}
        >
            {local.imgSrc && (
                <img
                    alt={local.imgAlt ?? ''}
                    class={clsx(theme.img.base, theme.img.horizontal[local.horizontal ? 'on' : 'off'])}
                    src={local.imgSrc}
                />
            )}
            <div class={theme.children}>{local.children}</div>
        </Dynamic>
    );
};

type TitleProps = ParentProps<JSX.HTMLAttributes<HTMLHeadingElement>>;
const Title: Component<TitleProps> = (props: TitleProps) => {
    const theme = useTheme().theme.card;
    const [local, rest] = splitProps(props, ["children", "class"]);

    return (
        <h5 class={clsx(theme.title, local.class)} {...rest}>{local.children}</h5>
    );
};


type DivProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>;
const Body: Component<DivProps> = (props: DivProps) => {
    const [local, rest] = splitProps(props, ["children", "class"]);
    const theme = useTheme().theme.card;
    return (
        <div class={clsx(theme.body, local.class)} {...rest}>{local.children}</div>
    );
};
export const Card = Object.assign(CardComponent, {
    Title: Title,
    Body: Body,
});
