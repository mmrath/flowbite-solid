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

export interface AvatarGroupTheme {
  root: AvatarGroupRootTheme;
}

export interface AvatarGroupRootTheme {
  base: string;
}

export interface AvatarGroupProps extends ParentProps<ComponentProps<"div">> {
  theme?: DeepPartial<AvatarGroupRootTheme>;
}

const AvatarGroup: Component<AvatarGroupProps> = p => {
  const defaultProps = {
    theme: {},
  };
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["children", "class", "theme"]);
  const themeCtx = useTheme();
  const theme = createMemo(() => {
    return mergeDeep(themeCtx.theme.avatarGroup, local.theme);
  });

  return (
    <div
      data-testid="avatar-group-element"
      class={classNames(theme().root.base, local.class)}
      {...props}
    >
      {local.children}
    </div>
  );
};

export default AvatarGroup;
