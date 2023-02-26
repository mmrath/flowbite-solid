import classNames from "clsx";
import { DeepPartial } from "..";
import { mergeDeep } from "../../helpers/mergeDeep";
import { OnOffStyles } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite";
import { NavbarBrandTheme, NavbarBrand } from "./NavbarBrand";
import { NavbarCollapseTheme, NavbarCollapse } from "./NavbarCollapse";
import { NavbarContext } from "./NavbarContext";
import { NavbarLinkTheme, NavbarLink } from "./NavbarLink";
import { NavbarToggleTheme, NavbarToggle } from "./NavbarToggle";
import {
  Component,
  ComponentProps,
  createMemo,
  createSignal,
  mergeProps,
  ParentProps,
  splitProps,
} from "solid-js";

export interface NavbarTheme {
  root: NavbarRootTheme;
  brand: NavbarBrandTheme;
  collapse: NavbarCollapseTheme;
  link: NavbarLinkTheme;
  toggle: NavbarToggleTheme;
}

export interface NavbarRootTheme {
  base: string;
  rounded: OnOffStyles;
  bordered: OnOffStyles;
  inner: {
    base: string;
    fluid: OnOffStyles;
  };
}

export interface NavbarComponentProps extends ParentProps<ComponentProps<"nav">> {
  menuOpen?: boolean;
  fluid?: boolean;
  rounded?: boolean;
  border?: boolean;
  theme?: DeepPartial<NavbarRootTheme>;
}

const NavbarComponent: Component<NavbarComponentProps> = p => {
  const defaultProps = { theme: {}, fluid: false };
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "class",
    "children",
    "theme",
    "fluid",
    "rounded",
    "border",
    "menuOpen",
  ]);
  const theme = createMemo(() => mergeDeep(useTheme().theme.navbar.root, local.theme));
  const [isOpen, setIsOpen] = createSignal(local.menuOpen);

  return (
    <NavbarContext.Provider
      value={{
        get isOpen() {
          return isOpen();
        },
        setIsOpen,
      }}
    >
      <nav
        class={classNames(
          theme().base,
          theme().bordered[local.border ? "on" : "off"],
          theme().rounded[local.rounded ? "on" : "off"],
          local.class
        )}
        {...props}
      >
        <div
          class={classNames(theme().inner.base, theme().inner.fluid[local.fluid ? "on" : "off"])}
        >
          {local.children}
        </div>
      </nav>
    </NavbarContext.Provider>
  );
};

export const Navbar = Object.assign(NavbarComponent, {
  Brand: NavbarBrand,
  Collapse: NavbarCollapse,
  Link: NavbarLink,
  Toggle: NavbarToggle,
});
