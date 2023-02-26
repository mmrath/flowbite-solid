import classNames from "clsx";
import type { StateColors } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite";
import {
  Component,
  ComponentProps,
  createMemo,
  mergeProps,
  ParentProps,
  splitProps,
} from "solid-js";

export interface LabelTheme {
  base: string;
  colors: LabelColors;
  disabled: string;
}

export interface LabelColors extends StateColors {
  [key: string]: string;
  default: string;
}

export interface LabelProps extends ParentProps<Omit<ComponentProps<"label">, "color">> {
  color?: keyof LabelColors;
  value?: string;
  disabled?: boolean;
}

export const Label: Component<LabelProps> = p => {
  const defaultProps = { color: "default", disabled: false };
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "class",
    "value",
    "disabled",
    "color",
    "children",
  ]);
  const theme = createMemo(() => useTheme().theme.label);

  return (
    <label
      class={classNames(
        theme().base,
        theme().colors[local.color],
        local.disabled ?? theme().disabled,
        local.class
      )}
      {...props}
    >
      {local.value ?? local.children ?? ""}
    </label>
  );
};
