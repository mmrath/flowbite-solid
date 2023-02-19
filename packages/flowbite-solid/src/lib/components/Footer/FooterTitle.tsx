import classNames from "clsx";
import { useTheme } from "../Flowbite";
import { Component, ComponentProps, ParentProps, splitProps } from "solid-js";

export interface FooterTitleProps extends ParentProps<ComponentProps<"h2">> {
  title: string;
}

export const FooterTitle: Component<FooterTitleProps> = p => {
  const [local, props] = splitProps(p, ["class", "title"]);
  return (
    <h2
      data-testid="flowbite-footer-title"
      class={classNames(useTheme().theme.footer.title.base, local.class)}
      {...props}
    >
      {local.title}
    </h2>
  );
};
