import classNames from "clsx";
import { DeepPartial } from "..";
import { mergeDeep } from "../../helpers/mergeDeep";
import { OnOffStyles } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite/ThemeContext";
import { useNavbarContext } from "./NavbarContext";
import {
  Component,
  ComponentProps,
  createMemo,
  JSX,
  mergeProps,
  ParentProps,
  splitProps,
} from "solid-js";

export interface NavbarCollapseTheme {
  base: string;
  list: string;
  hidden: OnOffStyles;
}

export interface NavbarCollapseProps extends ParentProps<ComponentProps<"div">> {
  theme?: DeepPartial<NavbarCollapseTheme>;
}

export const NavbarCollapse: Component<NavbarCollapseProps> = (p): JSX.Element => {
  const defaultProps = { theme: {} };
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "theme"]);
  const theme = createMemo(() => mergeDeep(useTheme().theme.navbar.collapse, local.theme));

  const { isOpen } = useNavbarContext();

  return (
    <div
      class={classNames(theme().base, theme().hidden[!isOpen ? "on" : "off"], local.class)}
      data-testid="flowbite-navbar-collapse"
      {...props}
    >
      <ul class={theme().list}>{local.children}</ul>
    </div>
  );
};
