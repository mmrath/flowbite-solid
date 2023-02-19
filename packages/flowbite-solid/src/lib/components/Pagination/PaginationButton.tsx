import classNames from "clsx";
import { useTheme } from "../Flowbite/ThemeContext";
import { ComponentProps, createMemo, ParentProps, splitProps } from "solid-js";

export interface PaginationButtonProps extends ParentProps<ComponentProps<"button">> {
  active?: boolean;
}

const PaginationButton = (p: PaginationButtonProps) => {
  const [local, props] = splitProps(p, ["class", "children", "onClick", "active"]);
  const theme = createMemo(() => useTheme().theme.pagination);

  return (
    <button
      class={classNames(
        {
          [theme().pages.selector.active]: local.active,
        },
        local.class
      )}
      onClick={local.onClick}
      {...props}
    >
      {local.children}
    </button>
  );
};

export default PaginationButton;
