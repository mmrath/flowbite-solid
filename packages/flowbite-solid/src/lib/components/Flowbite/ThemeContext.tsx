/* eslint-disable react-hooks/rules-of-hooks */
//import type { FC, ReactNode } from 'react';
//import { createContext, useContext, useEffect, useState } from 'react';
import defaultTheme from "../../theme/default";
import type { FlowbiteTheme } from "./FlowbiteTheme";
import { Accessor, createContext, createEffect, createSignal, Setter, useContext } from "solid-js";
import { JSX } from "solid-js/types/jsx";
import windowExists from "../../helpers/window-exists";

export type Mode = "light" | "dark";

export interface ThemeContextProps {
  theme: FlowbiteTheme;
  mode?: Mode;
  toggleMode?: () => void | null;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
});

type ThemeProviderProps = {
  children: JSX.Element;
  value: ThemeContextProps;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  return <ThemeContext.Provider value={props.value}>{props.children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextProps {
  return useContext(ThemeContext);
}

export const useThemeMode = (
  usePreferences: boolean
): [Accessor<Mode>, Setter<Mode>, () => void] => {
  const [mode, setMode] = createSignal<Mode>("light");

  const savePreference = (mode: Mode) => localStorage.setItem("theme", mode);
  const getPreference = (): Mode =>
    (localStorage.getItem("theme") as Mode) || getPrefersColorScheme();
  const userPreferenceIsDark = () => window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const getPrefersColorScheme = (): Mode => (userPreferenceIsDark() ? "dark" : "light");

  const toggleMode = () => {
    const newMode = mode() === "dark" ? "light" : "dark";
    setNewMode(newMode);
    setMode(newMode);
  };
  const setNewMode = (newMode: Mode) => {
    savePreference(newMode);
    if (!windowExists()) {
      return;
    }

    if (newMode === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }

    document.documentElement.classList.remove("dark");
  };

  if (usePreferences) {
    createEffect(() => setMode(getPreference()));
    createEffect(() => setNewMode(mode()));
  }

  return [mode, setMode, toggleMode];
};
