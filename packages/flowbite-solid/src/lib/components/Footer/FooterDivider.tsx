import classNames from "clsx";
import { useTheme } from "../Flowbite";
import { Component, ComponentProps } from "solid-js";

type FooterDividerProps = ComponentProps<"hr">;

export const FooterDivider: Component<FooterDividerProps> = p => {
  const theme = useTheme().theme.footer.divider;

  return <hr data-testid="footer-divider" class={classNames(theme.base, p.class)} />;
};
