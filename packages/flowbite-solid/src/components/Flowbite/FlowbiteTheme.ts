import { DeepPartial } from "../types";
import { ButtonGroupTheme, ButtonTheme } from "../Button";
import { CardTheme } from "../Card";
import { TextInputTheme } from "../TextInput";
import { HelperTextTheme } from "../HelperText";
import { AccordionTheme } from "../Accordion";
import { AlertTheme } from "../Alert";
import { BadgeTheme } from "../Badge";
import { BreadcrumbTheme } from "../Breadcrumb";
import { CheckboxTheme } from "../Checkbox";
import {
  AvatarGroupCounterTheme,
  AvatarGroupTheme,
  AvatarTheme,
} from "../Avatar";
import { LabelTheme } from "../Label";
import { FileInputTheme } from "../FileInput";
import { RadioTheme } from "../Radio";
import { SelectTheme } from "../Select";
import { TextareaTheme } from "../Textarea";
import { ToggleSwitchTheme } from "../ToggleSwitch";
import { ToastTheme } from "../Toast";
import { ListGroupTheme } from "../ListGroup";
import { FooterTheme } from "../Footer";
import { NavbarTheme } from "../Navbar";
import { PaginationTheme } from "../Pagination";

export type CustomFlowbiteTheme = DeepPartial<FlowbiteTheme>;

export interface FlowbiteTheme extends Record<string, unknown> {
  accordion: AccordionTheme;
  alert: AlertTheme;
  avatar: AvatarTheme;
  avatarGroupCounter: AvatarGroupCounterTheme;
  avatarGroup: AvatarGroupTheme;
  badge: BadgeTheme;
  breadcrumb: BreadcrumbTheme;
  button: ButtonTheme;
  buttonGroup: ButtonGroupTheme;
  card: CardTheme;
  // carousel: FlowbiteCarouselTheme;
  // darkThemeToggle: FlowbiteDarkThemeToggleTheme;
  footer: FooterTheme;
  listGroup: ListGroupTheme;
  // modal: FlowbiteModalTheme;
  navbar: NavbarTheme;
  // rating: FlowbiteRatingTheme;
  pagination: PaginationTheme;
  // sidebar: FlowbiteSidebarTheme;
  // progress: FlowbiteProgressTheme;
  // spinner: FlowbiteSpinnerTheme;
  // tab: FlowbiteTabTheme;
  toast: ToastTheme;
  // tooltip: FlowbiteTooltipTheme;
  // dropdown: FlowbiteDropdownTheme;
  checkbox: CheckboxTheme;
  fileInput: FileInputTheme;
  label: LabelTheme;
  radio: RadioTheme;
  select: SelectTheme;
  textInput: TextInputTheme;
  textarea: TextareaTheme;
  toggleSwitch: ToggleSwitchTheme;
  helperText: HelperTextTheme;
  // table: FlowbiteTableTheme;
  // timeline: FlowbiteTimelineTheme;
}

export interface OnOffStyles {
  off: string;
  on: string;
}

export interface StateColors {
  info: string;
  failure: string;
  success: string;
  warning: string;
}

export interface ThemeColors extends StateColors {
  [key: string]: string;
  blue: string;
  cyan: string;
  dark: string;
  gray: string;
  green: string;
  indigo: string;
  light: string;
  lime: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  yellow: string;
}

export interface GradientColors extends Omit<StateColors, "warning"> {
  [key: string]: string;
  cyan: string;
  lime: string;
  pink: string;
  purple: string;
  teal: string;
}

export interface GradientDuoToneColors {
  cyanToBlue: string;
  greenToBlue: string;
  pinkToOrange: string;
  purpleToBlue: string;
  purpleToPink: string;
  redToYellow: string;
  tealToLime: string;
}

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface Positions {
  "bottom-left": string;
  "bottom-right": string;
  "bottom-center": string;
  "top-left": string;
  "top-center": string;
  "top-right": string;
  "center-left": string;
  center: string;
  "center-right": string;
}

export interface Sizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
}
