import classNames from "clsx";
import { DeepPartial } from "..";
import { mergeDeep } from "../../helpers/mergeDeep";
import { useTheme } from "../Flowbite";
import {
  Component,
  ComponentProps,
  createMemo,
  mergeProps,
  ParentProps,
  splitProps,
} from "solid-js";

export interface AvatarGroupCounterTheme {
  root: AvatarGroupCounterRootTheme;
}

export interface AvatarGroupCounterRootTheme {
  base: string;
}

export interface AvatarGroupCounterProps extends ParentProps<ComponentProps<"a">> {
  total?: number;
  theme?: DeepPartial<AvatarGroupCounterRootTheme>;
}

const AvatarGroupCounter: Component<AvatarGroupCounterProps> = p => {
  const defaultProps = {
    theme: {},
  };
  const [local, _] = splitProps(mergeProps(defaultProps, p), ["total", "href", "class", "theme"]);
  const themeCtx = useTheme();
  const theme = createMemo(() => {
    return mergeDeep(themeCtx.theme.avatarGroupCounter.root, local.theme);
  });
  return (
    <a class={classNames(theme().base, local.class)} href={local.href}>
      +{local.total}
    </a>
  );
};

export default AvatarGroupCounter;
