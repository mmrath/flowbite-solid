import classNames from 'clsx';
import {DeepPartial} from '..';
import {mergeDeep} from '../../helpers/mergeDeep';
import {useTheme} from '../Flowbite';
import {ComponentProps, createMemo, mergeProps, splitProps} from "solid-js";

export interface FlowbiteCheckboxTheme {
    base: string;
}

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
    theme?: DeepPartial<FlowbiteCheckboxTheme>;
}

export const Checkbox = (p: CheckboxProps) => {
        const defaultProps = {theme: {}}
        const [local, props] = splitProps(mergeProps(defaultProps, p),
            ["class", "theme", "ref"]);

        const theme = createMemo(() => mergeDeep(useTheme().theme.textInput, local.theme));

        return <input ref={local.ref} class={classNames(theme().base, local.class)} type="checkbox" {...props} />;
    };
