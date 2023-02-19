import classNames from "clsx";
import { DeepPartial } from "..";
import { useTheme } from "../Flowbite";
import { HelperText } from "../HelperText";
import type { TextInputColors, TextInputSizes } from "../TextInput";
import { Component, ComponentProps, createMemo, JSX, mergeProps, splitProps } from "solid-js";

export interface FlowbiteFileInputTheme {
  base: string;
  field: {
    base: string;
    input: {
      base: string;
      sizes: TextInputSizes;
      colors: TextInputColors;
    };
  };
}

export interface FileInputProps extends Omit<ComponentProps<"input">, "type" | "color"> {
  sizing?: keyof TextInputSizes;
  helperText?: JSX.Element;
  color?: keyof TextInputColors;
  theme?: DeepPartial<FlowbiteFileInputTheme>;
}

export const FileInput: Component<FileInputProps> = p => {
  const defaultProps = { theme: {}, sizing: "md", color: "gray" };
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "class",
    "color",
    "helperText",
    "sizing",
    "theme",
    "ref",
  ]);
  const theme = createMemo(() => useTheme().theme.fileInput);

  return (
    <>
      <div class={classNames(theme().base, local.class)}>
        <div class={theme().field.base}>
          <input
            class={classNames(
              theme().field.input.base,
              theme().field.input.colors[local.color],
              theme().field.input.sizes[local.sizing]
            )}
            {...props}
            type="file"
            ref={local.ref}
          />
        </div>
      </div>
      {local.helperText && <HelperText color={local.color}>{local.helperText}</HelperText>}
    </>
  );
};
