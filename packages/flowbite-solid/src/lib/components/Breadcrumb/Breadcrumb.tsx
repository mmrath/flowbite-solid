import classNames from "clsx";
import { DeepPartial } from "..";
import { mergeDeep } from "../../helpers/mergeDeep";
import { useTheme } from "../Flowbite";
import BreadcrumbItem, { FlowbiteBreadcrumbItemTheme } from "./BreadcrumbItem";
import { Component, ComponentProps, createMemo, mergeProps, splitProps } from "solid-js";

export interface FlowbiteBreadcrumbTheme {
  root: FlowbiteBreadcrumbRootTheme;
  item: FlowbiteBreadcrumbItemTheme;
}

export interface FlowbiteBreadcrumbRootTheme {
  base: string;
  list: string;
}

export interface BreadcrumbComponentProps extends ComponentProps<"nav"> {
  theme?: DeepPartial<FlowbiteBreadcrumbRootTheme>;
}

const BreadcrumbComponent: Component<BreadcrumbComponentProps> = p => {
  const defaultProps = { theme: {} };
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["children", "class", "theme"]);
  const theme = createMemo(() => {
    return mergeDeep(useTheme().theme.breadcrumb.root, local.theme);
  });
  return (
    <nav aria-label="Breadcrumb" class={classNames(theme().base, local.class)} {...props}>
      <ol class={theme().list}>{local.children}</ol>
    </nav>
  );
};

export const Breadcrumb = Object.assign(BreadcrumbComponent, {
  Item: BreadcrumbItem,
});
