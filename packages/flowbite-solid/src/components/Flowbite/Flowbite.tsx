import type { DeepPartial } from "../index";
import { mergeDeep } from "../../helpers/mergeDeep";
import windowExists from "../../helpers/window-exists";
import defaultTheme from "../../theme/default";
import type { FlowbiteTheme } from "./FlowbiteTheme";
import { ThemeProvider, useThemeMode } from "./ThemeContext";
import { createEffect, createMemo, JSX, mergeProps, splitProps } from "solid-js";

export interface ThemeProps {
  dark?: boolean;
  theme?: DeepPartial<FlowbiteTheme>;
  usePreferences?: boolean;
}

interface FlowbiteProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
  theme?: ThemeProps;
}

export const Flowbite = (p: FlowbiteProps) => {
  const [local, props] = splitProps(
    mergeProps({ theme: { theme: {}, usePreferences: true, dark: undefined } }, p),
    ["theme"]
  );

  const [mode, setMode, toggleMode] = useThemeMode(!!local.theme.usePreferences);

  const mergedTheme = createMemo(() => mergeDeep(defaultTheme, local?.theme?.theme || {}));

  createEffect(() => {
    if (local.theme?.dark) {
      if (setMode != null) {
        setMode("dark");
      }
      if (windowExists()) {
        document.documentElement.classList.add("dark");
      }
    }
  });

  const themeContextValue = {
    get theme() {
      return mergedTheme();
    },
    get mode() {
      return mode();
    },
    get toggleMode() {
      return toggleMode;
    },
  };

  return <ThemeProvider value={themeContextValue}>{props.children}</ThemeProvider>;
};
