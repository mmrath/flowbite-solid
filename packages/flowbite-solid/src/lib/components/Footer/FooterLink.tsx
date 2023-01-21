import classNames from 'clsx';
import { useTheme } from '../Flowbite';
import {Component, ComponentProps, ParentProps, splitProps} from "solid-js";

export interface FooterLinkProps extends ParentProps<ComponentProps<'a'>> {
  href: string;
}

export const FooterLink: Component<FooterLinkProps> = (p) => {
  const theme = useTheme().theme.footer.groupLink.link;
  const [local, _] = splitProps(p, ["class", "children", "href"]);
  return (
    <li class={classNames(theme.base, local.class)}>
      <a href={local.href} class={theme.href}>
        {local.children}
      </a>
    </li>
  );
};
