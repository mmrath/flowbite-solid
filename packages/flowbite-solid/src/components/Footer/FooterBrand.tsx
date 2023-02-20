import classNames from "clsx";
import { useTheme } from "../Flowbite";
import { Component, ComponentProps, ParentProps } from "solid-js";

export interface FooterBrandProps extends ParentProps<ComponentProps<"div">> {
  alt?: string;
  href?: string;
  name?: string;
  src: string;
}

export const FooterBrand: Component<FooterBrandProps> = props => {
  const theme = useTheme().theme.footer.brand;

  return (
    <div>
      {props.href ? (
        <a
          data-testid="flowbite-footer-brand"
          href={props.href}
          class={classNames(theme.base, props.class)}
        >
          <img alt={props.alt} src={props.src} class={theme.img} />
          <span data-testid="flowbite-footer-brand-span" class={theme.span}>
            {props.name}
          </span>
          {props.children}
        </a>
      ) : (
        <img
          alt={props.alt}
          data-testid="flowbite-footer-brand"
          src={props.src}
          class={theme.img}
        />
      )}
    </div>
  );
};
