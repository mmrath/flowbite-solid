import classNames from "clsx";
import { DeepPartial } from "..";
import { mergeDeep } from "../../helpers/mergeDeep";
import { FlowbiteBoolean, FlowbiteColors } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite";
import {
  Component,
  ComponentProps,
  createMemo,
  createSignal,
  createUniqueId,
  mergeProps,
  splitProps,
} from "solid-js";

export interface FlowbiteToggleSwitchTheme {
  base: string;
  active: FlowbiteBoolean;
  toggle: {
    base: string;
    checked: FlowbiteBoolean & {
      color: FlowbiteColors;
    };
  };
  label: string;
}

export type ToggleSwitchProps = Omit<ComponentProps<"button">, "onChange"> & {
  checked: boolean;
  label: string;
  color?: FlowbiteColors;
  onChange: (checked: boolean) => void;
  theme?: DeepPartial<FlowbiteToggleSwitchTheme>;
};

export const ToggleSwitch: Component<ToggleSwitchProps> = p => {
  const defaultProps = { color: "blue", theme: {} };
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "checked",
    "disabled",
    "color",
    "label",
    "name",
    "onChange",
    "class",
    "theme",
  ]);
  const theme = createMemo(() => mergeDeep(useTheme().theme.toggleSwitch, local.theme));
  const [checked, setChecked] = createSignal(local.checked);

  const id = createUniqueId();

  const toggle = (): void => {
    setChecked(!checked());
    local.onChange(checked());
  };

  const handleClick = (event: MouseEvent): void => {
    event.preventDefault();
    toggle();
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    event.preventDefault();
  };

  return (
    <>
      {local.name && local.checked && (
        <input
          checked={checked()}
          hidden
          name={local.name}
          readOnly
          type="checkbox"
          class="sr-only"
        />
      )}
      <button
        aria-checked={local.checked}
        aria-labelledby={`${id}-flowbite-toggleswitch-label`}
        disabled={local.disabled}
        id={`${id}-flowbite-toggleswitch`}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        role="switch"
        tabIndex={0}
        type="button"
        class={classNames(theme().base, theme().active[local.disabled ? "off" : "on"], local.class)}
        {...props}
      >
        <div
          class={classNames(
            theme().toggle.base,
            theme().toggle.checked[local.checked ? "on" : "off"],
            !local.disabled && theme().toggle.checked.color[local.color]
          )}
        />
        <span
          data-testid="flowbite-toggleswitch-label"
          id={`${id}-flowbite-toggleswitch-label`}
          class={theme().label}
        >
          {local.label}
        </span>
      </button>
    </>
  );
};
