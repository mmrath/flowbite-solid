import type {Placement} from '@floating-ui/dom';
import type {Component, ComponentProps, ParentProps} from 'solid-js';
import {JSX, mergeProps, splitProps} from "solid-js";
import {Floating, FlowbiteFloatingTheme} from '../Floating';
import {useTheme} from '../Flowbite';

export interface FlowbiteTooltipTheme extends FlowbiteFloatingTheme {
}

export interface TooltipProps extends ParentProps<Omit<ComponentProps<'div'>, 'style'>> {
    content: JSX.Element;
    placement?: 'auto' | Placement;
    trigger?: 'hover' | 'click';
    style?: 'dark' | 'light' | 'auto';
    animation?: false | `duration-${number}`;
    arrow?: boolean;
}

/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Tooltip: Component<TooltipProps> = (p) => {
    const defaultProps = {
        animation: 'duration-300',
        arrow: true,
        placement: 'top',
        style: 'dark',
        trigger: 'hover',
    };
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["animation", "arrow", "children", "content", "placement", "style", "trigger", "class"]);


    const theme = useTheme().theme.tooltip;

    return (
        <Floating
            content={local.content}
            style={local.style}
            animation={local.animation}
            placement={local.placement}
            arrow={local.arrow}
            trigger={local.trigger}
            theme={theme}
            class={local.class}
            {...props}
        >
            {local.children}
        </Floating>
    );
};
