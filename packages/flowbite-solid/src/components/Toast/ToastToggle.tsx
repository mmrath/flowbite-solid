import classNames from "clsx";
import { HiSolidX as HiX } from "solid-icons/hi";
import { useTheme } from "../Flowbite";
import { useToastContext } from "./ToastContext";
import { Component, ComponentProps, createMemo, mergeProps, splitProps } from "solid-js";
import { IconComponent } from "../types";
import { Dynamic } from "solid-js/web";

type ToastToggleProps = ComponentProps<"button"> & {
  xIcon?: IconComponent;
};

export const ToastToggle: Component<ToastToggleProps> = p => {
  const defaultProps = { xIcon: HiX };
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["class"]);
  const theme = createMemo(() => useTheme().theme.toast.toggle);

  const ctx = useToastContext();

  const handleClick = () => {
    ctx.setIsClosed(!ctx.isClosed);
    setTimeout(() => ctx.setIsRemoved(!ctx.isRemoved), ctx.duration);
  };

  return (
    <button
      aria-label="Close"
      onClick={handleClick}
      type="button"
      class={classNames(theme().base, local.class)}
    >
      <Dynamic component={props.xIcon} class={theme().icon} />
    </button>
  );
};
