import classNames from 'clsx';
import {DeepPartial} from '..';
import {mergeDeep} from '../../helpers/mergeDeep';
import {useTheme} from '../Flowbite';
import {Component, ComponentProps, createMemo, mergeProps, splitProps} from "solid-js";

export interface FlowbiteRadioTheme {
    base: string;
}

export interface RadioProps extends Omit<ComponentProps<'input'>, 'type'> {
    theme?: DeepPartial<FlowbiteRadioTheme>;
}

export const Radio: Component<RadioProps> = (p) => {
    const defaultProps = {theme: {}};
    const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "class", "ref", "theme"]);
    const theme = createMemo(() => mergeDeep(useTheme().theme.radio, local.theme));

    return <input ref={local.ref} class={classNames(theme().base, local.class)} type="radio" {...props} />;
};

