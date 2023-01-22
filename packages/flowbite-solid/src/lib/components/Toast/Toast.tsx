import classNames from 'clsx';
import {useTheme} from '../Flowbite';
import type {Duration} from './ToastContext';
import {ToastContext} from './ToastContext';
import {ToastToggle} from './ToastToggle';
import {Component, ComponentProps, createMemo, createSignal, mergeProps, ParentProps, splitProps} from "solid-js";

export interface FlowbiteToastTheme {
  base: string;
  closed: string;
  removed: string;
  toggle: {
    base: string;
    icon: string;
  };
}

export interface ToastProps extends ParentProps<ComponentProps<'div'>> {
  duration?: Duration;
}

const durationClasses: Record<Duration, string> = {
  75: 'duration-75',
  100: 'duration-100',
  150: 'duration-150',
  200: 'duration-200',
  300: 'duration-300',
  500: 'duration-500',
  700: 'duration-700',
  1000: 'duration-1000',
};

const ToastComponent: Component<ToastProps> = (p) => {
  const defaultProps = {duration:300 as Duration};
  const [local, props] = splitProps(mergeProps(defaultProps, p), ["class", "children", "duration"]);
  const theme = createMemo(() => useTheme().theme.toast);
  const [isClosed, setIsClosed] = createSignal(false);
  const [isRemoved, setIsRemoved] = createSignal(false);

  const ctxValue = {
    get duration(){
      return local.duration;
    },
    get isClosed() {
      return isClosed();
    },
    get isRemoved() {
      return isRemoved();
    },
    setIsClosed: setIsClosed,
    setIsRemoved: setIsRemoved
  };
  return (
    <ToastContext.Provider value={ctxValue}>
      <div
        data-testid="flowbite-toast"
        class={classNames(
          theme().base,
          durationClasses[local.duration],
          { [theme().closed]: isClosed },
          { [theme().removed]: isRemoved },
          local.class,
        )}
        {...props}
      >
        {local.children}
      </div>
    </ToastContext.Provider>
  );
};

export const Toast = Object.assign(ToastComponent, {
  Toggle: ToastToggle,
});
