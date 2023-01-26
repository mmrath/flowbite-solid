import type {Placement} from '@floating-ui/dom';
import {useFloating,} from 'solid-floating-ui';
import classNames from 'clsx';
import type {ComponentProps, ParentProps} from 'solid-js';
import {createSignal, JSX} from "solid-js";
import {getArrowPlacement, getMiddleware, getPlacement} from '../../helpers/floating';

export interface FlowbiteFloatingTheme {
  target: string;
  base: string;
  animation: string;
  hidden: string;
  style: {
    dark: string;
    light: string;
    auto: string;
  };
  content: string;
  arrow: {
    base: string;
    style: {
      dark: string;
      light: string;
      auto: string;
    };
    placement: string;
  };
}

export interface FloatingProps extends ParentProps<Omit<ComponentProps<'div'>, 'style'>> {
  content: JSX.Element;
  theme: FlowbiteFloatingTheme;
  placement?: 'auto' | Placement;
  trigger?: 'hover' | 'click';
  style?: 'dark' | 'light' | 'auto';
  animation?: false | `duration-${number}`;
  arrow?: boolean;
  closeRequestKey?: string;
}

/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Floating: ComponentProps<FloatingProps> = ({
  children,
  content,
  theme,
  animation = 'duration-300',
  arrow = true,
  placement='top',
  style = 'dark',
  trigger = 'hover',
  closeRequestKey,
  className,
  ...props
}) => {
  const [arrowRef, setArrowRef] = createSignal<HTMLDivElement|undefined>();
  const [reference, setReference] = createSignal<HTMLDivElement|undefined>();
  const [floating, setFloating] = createSignal<HTMLElement|undefined>();

  const [open, setOpen] = createSignal(false);

  const floatingTooltip = useFloating<HTMLDivElement,HTMLElement>(reference, floating, {
    middleware: getMiddleware({ floating, placement }),
    onOpenChange: setOpen,
    open,
    placement: getPlacement({ placement }),
  });

  return (
    <>
      <div class={theme.target} data-testid="flowbite-tooltip-target">
        {children}
      </div>
      <div
        data-testid="flowbite-tooltip"
        {...getFloatingProps({
          className: classNames(
            theme.base,
            animation && `${theme.animation} ${animation}`,
            !open && theme.hidden,
            theme.style[style],
            className,
          ),
          ref: floating,
          style: {
            position: strategy,
            top: y ?? ' ',
            left: x ?? ' ',
          },
          ...props,
        })}
      >
        <div class={theme.content}>{content}</div>
        {arrow && (
          <div
            class={classNames(theme.arrow.base, {
              [theme.arrow.style.dark]: style === 'dark',
              [theme.arrow.style.light]: style === 'light',
              [theme.arrow.style.auto]: style === 'auto',
            })}
            data-testid="flowbite-tooltip-arrow"
            ref={arrowRef}
            style={{
              top: arrowY ?? ' ',
              left: arrowX ?? ' ',
              right: ' ',
              bottom: ' ',
              [getArrowPlacement({ placement: floatingTooltip.placement })]: theme.arrow.placement,
            }}
          >
            &nbsp;
          </div>
        )}
      </div>
    </>
  );
};
