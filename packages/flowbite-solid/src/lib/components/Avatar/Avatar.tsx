import classNames from 'clsx';
import {DeepPartial} from '..';
import {mergeDeep} from '../../helpers/mergeDeep';
import type {FlowbiteColors, FlowbitePositions, FlowbiteSizes} from '../Flowbite/FlowbiteTheme';
import {useTheme} from '../Flowbite/ThemeContext';
import AvatarGroup from './AvatarGroup';
import AvatarGroupCounter from './AvatarGroupCounter';
import {Component, ComponentProps, createMemo, Match, mergeProps, ParentProps, splitProps, Switch} from "solid-js";
import {Dynamic} from "solid-js/web";

export interface FlowbiteAvatarTheme {
    root: FlowbiteAvatarRootTheme;
    img: FlowbiteAvatarImageTheme;
    status: FlowbiteAvatarStatusTheme;
    initials: FlowbiteAvatarInitialsTheme;
}

export interface FlowbiteAvatarRootTheme {
    base: string;
    bordered: string;
    color: AvatarColors;
    rounded: string;
    size: AvatarSizes;
    stacked: string;
    statusPosition: FlowbitePositions;
}

export interface FlowbiteAvatarImageTheme {
    off: string;
    on: string;
    placeholder: string;
}

export interface FlowbiteAvatarStatusTheme {
    away: string;
    base: string;
    busy: string;
    offline: string;
    online: string;
}

export interface FlowbiteAvatarInitialsTheme {
    base: string;
    text: string;
}

export interface AvatarColors
    extends Pick<FlowbiteColors, 'failure' | 'gray' | 'info' | 'pink' | 'purple' | 'success' | 'warning'> {
    [key: string]: string;
}

export interface AvatarSizes extends Pick<FlowbiteSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> {
    [key: string]: string;
}

export interface AvatarImageProps {
    alt?: string;
    className: string;
    'data-testid': string;
}

export interface AvatarProps extends ParentProps<Omit<ComponentProps<'div'>, 'color'>> {
    alt?: string;
    bordered?: boolean;
    img?: string | (Component<AvatarImageProps>);
    color?: keyof AvatarColors;
    rounded?: boolean;
    size?: keyof AvatarSizes;
    stacked?: boolean;
    status?: 'away' | 'busy' | 'offline' | 'online';
    statusPosition?: keyof FlowbitePositions;
    placeholderInitials?: string;
    theme?: DeepPartial<FlowbiteAvatarTheme>;
}

const AvatarComponent: Component<AvatarProps> = (p) => {
    const defaultProps = {
        alt: '',
        bordered: false,
        color: 'light',
        rounded: false,
        size: 'md',
        stacked: false,
        statusPosition: 'top-left',
        placeholderInitials: '',
        theme: {}
    }
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["alt",
        "bordered", "children", "img", "color", "rounded", "size", "stacked", "status", "statusPosition", "placeholderInitials", "class", "theme"])
    const themeCtx = useTheme();
    const theme = createMemo(() => {
        return mergeDeep(themeCtx.theme.avatar, local.theme);
    });

    const imgClassName = createMemo(() => classNames(
        local.bordered && theme().root.bordered,
        local.bordered && theme().root.color[local.color],
        local.rounded && theme().root.rounded,
        local.stacked && theme().root.stacked,
        theme().img.on,
        theme().root.size[local.size],
    ));

    const imgProps = createMemo(() => {
        return {alt: local.alt, 'class': classNames(imgClassName(), theme().img.on), 'data-testid': 'flowbite-avatar-img'}
    });
    return (
        <div class={classNames(theme().root.base, local.class)} data-testid="flowbite-avatar" {...props}>
            <div class="relative">
                <Switch fallback={
                    <div class={classNames(imgClassName(), theme().img.off)} data-testid="flowbite-avatar-img">
                        <svg
                            class={theme().img.placeholder}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </div>
                }>
                    <Match when={local.img && typeof local.img === 'string'}>
                        <img {...imgProps()} src={local.img as string}/>
                    </Match>
                    <Match when={local.img}>
                        <Dynamic component={local.img} {...imgProps()}></Dynamic>
                    </Match>
                    <Match when={local.placeholderInitials}>
                        <div
                            class={classNames(
                                theme().img.off,
                                theme().initials.base,
                                local.rounded && theme().root.rounded,
                                local.stacked && theme().root.stacked,
                                local.bordered && theme().root.bordered,
                                local.bordered && theme().root.color[local.color],
                            )}
                            data-testid="flowbite-avatar-initials-placeholder">
            <span class={classNames(theme().initials.text)} data-testid="flowbite-avatar-initials-placeholder-text">
              {local.placeholderInitials}
            </span>
                        </div>
                    </Match>
                </Switch>

                {local.status && (
                    <span
                        data-testid="flowbite-avatar-status"
                        class={classNames(theme().status.base, theme().status[local.status], theme().root.statusPosition[local.statusPosition as keyof  FlowbitePositions])}
                    />
                )}
            </div>
            {local.children && <div>{local.children}</div>}
        </div>
    );
};

export const Avatar = Object.assign(AvatarComponent, {
    Group: AvatarGroup,
    Counter: AvatarGroupCounter,
});
