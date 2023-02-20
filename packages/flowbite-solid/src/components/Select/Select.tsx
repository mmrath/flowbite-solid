import classNames from "clsx";
import type { FlowbiteBoolean, FlowbiteColors, FlowbiteSizes } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite";
import { HelperText } from "../HelperText";
import { Component, ComponentProps, createMemo, JSX, mergeProps, splitProps } from "solid-js";
import { IconComponent } from "../types";
import { Dynamic } from "solid-js/web";

export interface FlowbiteSelectTheme {
  base: string;
  addon: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    select: {
      base: string;
      withIcon: FlowbiteBoolean;
      withAddon: FlowbiteBoolean;
      withShadow: FlowbiteBoolean;
      sizes: SelectSizes;
      colors: SelectColors;
    };
  };
}

export interface SelectColors
  extends Pick<FlowbiteColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface SelectSizes extends Pick<FlowbiteSizes, "sm" | "md" | "lg"> {
  [key: string]: string;
}

export interface SelectProps extends Omit<ComponentProps<"select">, "color"> {
  sizing?: keyof SelectSizes;
  shadow?: boolean;
  helperText?: JSX.Element;
  addon?: JSX.Element;
  icon?: IconComponent;
  color?: keyof SelectColors;
}

export const Select: Component<SelectProps> = p => {
  const defaultProps = { sizing: "md", color: "gray" };
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "class",
    "children",
    "ref",
    "sizing",
    "shadow",
    "helperText",
    "addon",
    "icon",
    "color",
  ]);
  const theme = createMemo(() => useTheme().theme.select);

  return (
    <div class={classNames(theme().base, local.class)}>
      {local.addon && <span class={theme().addon}>{local.addon}</span>}
      <div class={theme().field.base}>
        {local.icon && (
          <div class={theme().field.icon.base}>
            <Dynamic component={local.icon} class={theme().field.icon.svg} />
          </div>
        )}
        <select
          class={classNames(
            theme().field.select.base,
            theme().field.select.colors[local.color],
            theme().field.select.withIcon[local.icon ? "on" : "off"],
            theme().field.select.withAddon[local.addon ? "on" : "off"],
            theme().field.select.withShadow[local.shadow ? "on" : "off"],
            theme().field.select.sizes[local.sizing]
          )}
          {...props}
          ref={local.ref}
        >
          {local.children}
        </select>
        {local.helperText && <HelperText color={local.color}>{local.helperText}</HelperText>}
      </div>
    </div>
  );
};
