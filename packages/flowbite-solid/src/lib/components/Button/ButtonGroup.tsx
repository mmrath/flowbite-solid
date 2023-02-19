import classNames from "clsx";

import type { ButtonProps } from "./Button";
import { useTheme } from "../Flowbite";
import { ComponentProps, JSX, ParentProps, splitProps } from "solid-js";

export interface FlowbiteButtonGroupTheme {
  base: string;
  position: PositionInButtonGroup;
}

export type PositionInButtonGroupKeys = keyof PositionInButtonGroup;

export interface PositionInButtonGroup {
  none: string;
  start: string;
  middle: string;
  end: string;
}

export type ButtonGroupProps = ParentProps<
  ComponentProps<"div"> & Pick<ButtonProps, "outline" | "pill">
>;

const ButtonGroup = (p: ButtonGroupProps): JSX.Element => {
  const [local, props] = splitProps(p, ["class", "children"]);
  const theme = useTheme();

  return (
    <div class={classNames(theme.theme.buttonGroup.base, local.class)} role="group" {...props}>
      {local.children}
    </div>
  );
};

ButtonGroup.displayName = "Button.Group";
export default ButtonGroup;
