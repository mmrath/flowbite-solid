import classNames from "clsx";
import { useTheme } from "../Flowbite";
import {
  Component,
  ComponentProps,
  createMemo,
  JSX,
  mergeProps,
  ParentProps,
  splitProps,
} from "solid-js";
import { IconComponent } from "../types";
import { Dynamic } from "solid-js/web";

export type ListGroupItemProps = (
  | ParentProps<ComponentProps<"a">>
  | ParentProps<ComponentProps<"button">>
) & {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  icon?: IconComponent;
  onClick?: () => void;
};

export const ListGroupItem: Component<ListGroupItemProps> = (p): JSX.Element => {
  const defaultProps = {};
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "active",
    "children",
    "href",
    "icon",
    "onClick",
    "class",
  ]);
  const theme = createMemo(() => useTheme().theme.listGroup.item);

  const isLink = createMemo(() => typeof local.href !== "undefined");
  const theirProps = props as object;

  return (
    <li>
      <Dynamic
        component={isLink() ? "a" : "button"}
        class={classNames(
          theme().active[local.active ? "on" : "off"],
          theme().base,
          theme().href[isLink() ? "on" : "off"]
        )}
        href={local.href}
        onClick={local.onClick}
        type={isLink() ? undefined : "button"}
        {...theirProps}
      >
        {local.icon && (
          <Dynamic
            component={local.icon}
            aria-hidden
            class={theme().icon}
            data-testid="flowbite-list-group-item-icon"
          />
        )}
        {local.children}
      </Dynamic>
    </li>
  );
};
