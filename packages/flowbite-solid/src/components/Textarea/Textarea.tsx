import classNames from "clsx";
import type { FlowbiteBoolean, FlowbiteColors } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite";
import { HelperText } from "../HelperText";
import { Component, ComponentProps, createMemo, JSX, mergeProps, splitProps } from "solid-js";

export interface FlowbiteTextareaTheme {
  base: string;
  colors: TextareaColors;
  withShadow: FlowbiteBoolean;
}

export interface TextareaColors
  extends Pick<FlowbiteColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface TextareaProps extends Omit<ComponentProps<"textarea">, "color"> {
  shadow?: boolean;
  helperText?: JSX.Element;
  color?: keyof TextareaColors;
}

export const Textarea: Component<TextareaProps> = p => {
  const defaultProps = { color: "gray", disabled: false };
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "class",
    "shadow",
    "helperText",
    "color",
    "ref",
  ]);
  const theme = createMemo(() => useTheme().theme.textarea);

  return (
    <>
      <textarea
        ref={local.ref}
        class={classNames(
          theme().base,
          theme().colors[local.color],
          theme().withShadow[local.shadow ? "on" : "off"],
          local.class
        )}
        {...props}
      />
      {local.helperText && <HelperText color={local.color}>{local.helperText}</HelperText>}
    </>
  );
};
