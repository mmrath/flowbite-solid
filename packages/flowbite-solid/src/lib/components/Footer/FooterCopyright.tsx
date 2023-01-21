import classNames from 'clsx';
import {useTheme} from '../Flowbite/ThemeContext';
import {Component, ComponentProps, ParentProps, Show} from "solid-js";

export interface CopyrightProps extends ParentProps<ComponentProps<'span'>> {
    href?: string;
    by: string;
    year?: number;
}

export const FooterCopyright: Component<CopyrightProps> = (props) => {
    const theme = useTheme().theme.footer.copyright;

    return (
        <div>
      <span class={classNames(theme.base, props.class)} data-testid="flowbite-footer-copyright">
        © {props.year}
          <Show when={props.href} fallback={
              <span data-testid="flowbite-footer-copyright-span" class={theme.span}>
            {props.by}
          </span>
          }>
              <a href={props.href} class={theme.href}>{props.by}</a>
          </Show>
      </span>
        </div>
    );
};
