import classNames from 'clsx';
import {DeepPartial} from '../index';
import {mergeDeep} from '../../helpers/mergeDeep';
import type {FlowbiteBoolean, FlowbiteColors, FlowbiteSizes} from '../Flowbite/FlowbiteTheme';
import {useTheme} from '../Flowbite';
import {HelperText} from '../HelperText';
import {Component, ComponentProps, createMemo, JSX, mergeProps, splitProps} from "solid-js";
import {Dynamic} from "solid-js/web";

export interface FlowbiteTextInputTheme {
    base: string;
    addon: string;
    field: {
        base: string;
        icon: {
            base: string;
            svg: string;
        };
        rightIcon: {
            base: string;
            svg: string;
        };
        input: {
            base: string;
            sizes: TextInputSizes;
            colors: TextInputColors;
            withIcon: FlowbiteBoolean;
            withRightIcon: FlowbiteBoolean;
            withAddon: FlowbiteBoolean;
            withShadow: FlowbiteBoolean;
        };
    };
}

export interface TextInputColors extends Pick<FlowbiteColors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
    [key: string]: string;
}

export interface TextInputSizes extends Pick<FlowbiteSizes, 'sm' | 'md' | 'lg'> {
    [key: string]: string;
}

export interface TextInputProps extends Omit<ComponentProps<'input'>, 'color'> {
    sizing?: keyof TextInputSizes;
    shadow?: boolean;
    helperText?: JSX.Element;
    addon?: JSX.Element;
    icon?: Component<ComponentProps<'svg'>>;
    rightIcon?: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
    color?: keyof TextInputColors;
    theme?: DeepPartial<FlowbiteTextInputTheme>;
}

const defaultProps = {
    sizing: 'md',
    color: 'gray',
    theme: {},
};
export const TextInput = (p: TextInputProps) => {

    const [local, props] = splitProps(mergeProps(defaultProps, p),
        ["sizing", "shadow", "helperText", "addon", "icon", "rightIcon", "color", "class", "theme", "ref"]);

    const theme = createMemo(() => mergeDeep(useTheme().theme.textInput, local.theme));

    return (
        <>
            <div class={classNames(theme().base, local.class)}>
                {local.addon && <span class={theme().addon}>{local.addon}</span>}
                <div class={theme().field.base}>
                    {local.icon && (
                        <div class={theme().field.icon.base}>
                            <Dynamic component={local.icon} class={theme().field.icon.svg}/>
                        </div>
                    )}
                    {local.rightIcon && (
                        <div data-testid="right-icon" class={theme().field.rightIcon.base}>
                            <Dynamic component={local.rightIcon} class={theme().field.rightIcon.svg}/>
                        </div>
                    )}
                    <input
                        class={classNames(
                            theme().field.input.base,
                            theme().field.input.colors[local.color],
                            theme().field.input.withIcon[local.icon ? 'on' : 'off'],
                            theme().field.input.withAddon[local.addon ? 'on' : 'off'],
                            theme().field.input.withShadow[local.shadow ? 'on' : 'off'],
                            theme().field.input.sizes[local.sizing],
                        )}
                        {...props}
                        ref={local.ref}
                    />
                </div>
            </div>
            {local.helperText && <HelperText color={local.color}>{local.helperText}</HelperText>}
        </>
    );
};

TextInput.displayName = 'TextInput';
