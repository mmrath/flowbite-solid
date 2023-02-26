import classNames from "clsx";
import { DeepPartial, IconComponent } from "..";
import { mergeDeep } from "../../helpers/mergeDeep";
import type { ThemeColors, Sizes } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite";
import {
  Component,
  ComponentProps,
  createMemo,
  JSX,
  mergeProps,
  ParentProps,
  Show,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";

export interface BadgeTheme {
  root: BadgeRootTheme;
  icon: BadgeIconTheme;
}

export interface BadgeRootTheme {
  base: string;
  color: BadgeColors;
  href: string;
  size: BadgeSizes;
}

export interface BadgeIconTheme {
  off: string;
  on: string;
  size: BadgeSizes;
}

export interface BadgeColors
  extends Pick<
    ThemeColors,
    "failure" | "gray" | "indigo" | "info" | "pink" | "purple" | "success"
  > {
  [key: string]: string;
}

export interface BadgeSizes extends Pick<Sizes, "xs" | "sm"> {
  [key: string]: string;
}

export interface BadgeProps extends ParentProps<Omit<ComponentProps<"span">, "color">> {
  color?: keyof BadgeColors;
  href?: string;
  icon?: IconComponent;
  size?: keyof BadgeSizes;
  theme?: DeepPartial<BadgeTheme>;
}

export const Badge: Component<BadgeProps> = (p): JSX.Element => {
  const defaultProps = { color: "info", size: "xs", theme: {} };
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["color"]);
  const theme = createMemo(() => {
    return mergeDeep(useTheme().theme.badge, props.theme);
  });

  const Content = (): JSX.Element => (
    <span
      class={classNames(
        theme().root.base,
        theme().root.color[local.color],
        theme().icon[props.icon ? "on" : "off"],
        theme().root.size[props.size],
        props.class
      )}
      data-testid="flowbite-badge"
      {...props}
    >
      {props.icon && (
        <Dynamic
          component={props.icon}
          aria-hidden
          class={theme().icon.size[props.size]}
          data-testid="flowbite-badge-icon"
        />
      )}
      {props.children && <span>{props.children}</span>}
    </span>
  );

  return (
    <Show when={props.href} fallback={<Content />}>
      <a class={theme().root.href} href={props.href}>
        <Content />
      </a>
    </Show>
  );
};
