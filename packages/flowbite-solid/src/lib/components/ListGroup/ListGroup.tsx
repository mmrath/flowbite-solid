import classNames from "clsx";
import { FlowbiteBoolean } from "../Flowbite/FlowbiteTheme";
import { useTheme } from "../Flowbite";
import { ListGroupItem } from "./ListGroupItem";
import { Component, ComponentProps, createMemo, JSX, ParentProps, splitProps } from "solid-js";

export interface FlowbiteListGroupTheme {
  base: string;
  item: {
    active: FlowbiteBoolean;
    base: string;
    href: FlowbiteBoolean;
    icon: string;
  };
}

export type ListGroupProps = ParentProps<ComponentProps<"ul">>;

const ListGroupComponent: Component<ListGroupProps> = (p): JSX.Element => {
  const [local, props] = splitProps(p, ["class", "children"]);
  const theme = createMemo(() => useTheme().theme.listGroup.base);
  return (
    <ul class={classNames(theme(), local.class)} {...props}>
      {local.children}
    </ul>
  );
};
export const ListGroup = Object.assign(ListGroupComponent, {
  Item: ListGroupItem,
});
