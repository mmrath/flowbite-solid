import classNames from "clsx";
import type {
  OnOffStyles,
  ThemeColors,
  GradientColors,
  GradientDuoToneColors,
  Sizes,
} from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite/ThemeContext";
import type { PositionInButtonGroup, PositionInButtonGroupKeys } from "./ButtonGroup";
import ButtonGroup from "./ButtonGroup";
import { ComponentProps, createMemo, JSX, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export interface ButtonTheme {
  base: string;
  fullSized: string;
  color: ButtonColors;
  disabled: string;
  gradient: ButtonGradientColors;
  gradientDuoTone: ButtonGradientDuoToneColors;
  inner: {
    base: string;
    position: PositionInButtonGroup;
    outline: string;
  };
  label: string;
  outline: OnOffStyles & {
    color: ButtonOutlineColors;
    pill: OnOffStyles;
  };
  pill: OnOffStyles;
  size: ButtonSizes;
}

export interface ButtonColors
  extends Pick<
    ThemeColors,
    "dark" | "failure" | "gray" | "info" | "light" | "purple" | "success" | "warning"
  > {
  [key: string]: string;
}

export interface ButtonGradientColors extends GradientColors {
  [key: string]: string;
}

export interface ButtonGradientDuoToneColors extends GradientDuoToneColors {
  [key: string]: string;
}

export interface ButtonOutlineColors extends Pick<ThemeColors, "gray"> {
  [key: string]: string;
}

export interface ButtonSizes extends Pick<Sizes, "xs" | "sm" | "lg" | "xl"> {
  [key: string]: string;
}

export interface ButtonProps extends Omit<ComponentProps<"button">, "color"> {
  color?: keyof ButtonColors;
  gradientDuoTone?: keyof ButtonGradientDuoToneColors;
  gradientMonochrome?: keyof ButtonGradientColors;
  href?: string;
  label?: JSX.Element;
  outline?: boolean;
  fullSized?: boolean;
  pill?: boolean;
  positionInGroup?: PositionInButtonGroupKeys;
  size?: keyof ButtonSizes;
}

const defaultProps = {
  color: "info",
  disabled: false,
  outline: false,
  pill: false,
  positionInGroup: "none",
  size: "md",
};
const ButtonComponent = (p: ButtonProps) => {
  const [props, theirProps] = splitProps(mergeProps(defaultProps, p), [
    "children",
    "color",
    "disabled",
    "gradientDuoTone",
    "gradientMonochrome",
    "href",
    "label",
    "outline",
    "pill",
    "fullSized",
    "positionInGroup",
    "size",
    "class",
    "ref",
  ]);

  const isLink = createMemo(() => typeof props.href !== "undefined");
  const themeProps = useTheme();

  const theme = createMemo(() => themeProps.theme.button);
  const groupTheme = createMemo(() => themeProps.theme.buttonGroup);

  return (
    <Dynamic
      component={isLink() ? "a" : "button"}
      class={classNames(
        props.disabled && theme().disabled,
        !props.gradientDuoTone && !props.gradientMonochrome && theme().color[props.color],
        props.gradientDuoTone &&
          !props.gradientMonochrome &&
          theme().gradientDuoTone[props.gradientDuoTone],
        !props.gradientDuoTone &&
          props.gradientMonochrome &&
          theme().gradient[props.gradientMonochrome],
        props.positionInGroup &&
          groupTheme().position[props.positionInGroup as keyof PositionInButtonGroup],
        props.outline && (theme().outline.color[props.color] ?? theme().outline.color.default),
        theme().base,
        theme().pill[props.pill ? "on" : "off"],
        props.fullSized && theme().fullSized,
        props.class
      )}
      disabled={props.disabled}
      href={props.href}
      type={isLink() ? undefined : "button"}
      ref={props.ref as never}
      {...theirProps}
    >
      <span
        class={classNames(
          theme().inner.base,
          theme().inner.position[props.positionInGroup as keyof PositionInButtonGroup],
          theme().outline[props.outline ? "on" : "off"],
          theme().outline.pill[props.outline && props.pill ? "on" : "off"],
          theme().size[props.size],
          props.outline && !theme().outline.color[props.color] && theme().inner.outline
        )}
      >
        {props.children}
        {typeof props.label !== "undefined" && (
          <span class={theme().label} data-testid="flowbite-button-label">
            {props.label}
          </span>
        )}
      </span>
    </Dynamic>
  );
};

ButtonComponent.displayName = "Button";
export const Button = Object.assign(ButtonComponent, {
  Group: ButtonGroup,
});
