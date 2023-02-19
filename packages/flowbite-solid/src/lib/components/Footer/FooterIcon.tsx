import classNames from "clsx";
import { useTheme } from "../Flowbite/ThemeContext";
import { Component, ComponentProps, ParentProps, Show, splitProps } from "solid-js";
import { IconComponent } from "../types";
import { Dynamic } from "solid-js/web";

export interface FooterIconProps extends ParentProps<ComponentProps<"a">> {
  ariaLabel?: string;
  href?: string;
  icon: IconComponent;
}

export const FooterIcon: Component<FooterIconProps> = p => {
  const theme = useTheme().theme.footer.icon;
  const [local, _] = splitProps(p, ["class", "icon", "href", "ariaLabel"]);

  return (
    <div>
      <Show
        when={local.href}
        fallback={
          <Dynamic component={local.icon} data-testid="flowbite-footer-icon" class={theme.size} />
        }
      >
        <a
          aria-label={local.ariaLabel}
          data-testid="flowbite-footer-icon"
          href={local.href}
          class={classNames(theme.base, local.class)}
        >
          <Dynamic component={local.icon} class={theme.size} />
        </a>
      </Show>
    </div>
  );
};
