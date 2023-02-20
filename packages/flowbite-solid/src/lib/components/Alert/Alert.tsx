import classNames from "clsx";
import {DeepPartial, IconComponent} from "..";
import {mergeDeep} from "../../helpers/mergeDeep";
import type {FlowbiteColors} from "../Flowbite/FlowbiteTheme";
import {useTheme} from "../Flowbite";
import {Component, ComponentProps, createMemo, JSX, mergeProps, ParentProps} from "solid-js";
import {Dynamic} from "solid-js/web";
import {HiSolidX} from "solid-icons/hi";

export interface FlowbiteAlertTheme {
  root: FlowbiteAlertRootTheme;
  closeButton: FlowbiteAlertCloseButtonTheme;
}

export interface FlowbiteAlertRootTheme {
  base: string;
  borderAccent: string;
  wrapper: string;
  color: AlertColors;
  icon: string;
  rounded: string;
}

export interface FlowbiteAlertCloseButtonTheme {
  base: string;
  icon: string;
  color: AlertColors;
}

export interface AlertColors
  extends Pick<FlowbiteColors, "failure" | "gray" | "info" | "success" | "warning"> {
  [key: string]: string;
}

export interface AlertProps extends ParentProps<Omit<ComponentProps<"div">, "color">> {
  additionalContent?: JSX.Element;
  color?: keyof AlertColors;
  icon?: IconComponent;
  onDismiss?: boolean | (() => void);
  rounded?: boolean;
  withBorderAccent?: boolean;
  theme?: DeepPartial<FlowbiteAlertTheme>;
}

export const Alert: Component<AlertProps> = p => {
  const defaultProps = { color: "info", rounded: true, theme: {} };
  const props = mergeProps(defaultProps, p);
  const themeCtx = useTheme();
  const theme = createMemo(() => {
    return mergeDeep(themeCtx.theme.alert, props.theme);
  });

  return (
    <div
      class={classNames(
        theme().root.base,
        theme().root.color[props.color],
        props.rounded && theme().root.rounded,
        props.withBorderAccent && theme().root.borderAccent,
        props.class
      )}
      role="alert"
    >
      <div class={theme().root.wrapper}>
        {props.icon && <Dynamic component={props.icon} class={theme().root.icon} />}
        <div>{props.children}</div>
        {typeof props.onDismiss === "function" && (
          <button
            aria-label="Dismiss"
            class={classNames(theme().closeButton.base, theme().closeButton.color[props.color])}
            onClick={props.onDismiss}
            type="button"
          >
            <HiSolidX aria-hidden class={theme().closeButton.icon} />
          </button>
        )}
      </div>
      {props.additionalContent && <div>{props.additionalContent}</div>}
    </div>
  );
};
