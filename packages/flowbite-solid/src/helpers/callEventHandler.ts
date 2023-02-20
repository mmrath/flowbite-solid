import { JSX } from "solid-js";

/**
 * Solid event handlers can be a plain callback OR a tuple [handler, item].
 * This function calls the handler appropriately (if defined).
 */
export function callEventHandler(h: JSX.EventHandlerUnion<any, any> | undefined, e: Event) {
  // capture if propagationStopped
  let isPropagationStopped = false;
  const defaultFn = e.stopPropagation;
  e.stopPropagation = () => {
    isPropagationStopped = true;
    defaultFn();
  };

  // call Solid handler appropriately
  if (typeof h === "function") {
    h(e);
  } else if (Array.isArray(h)) {
    h[0](h[1], e);
  }

  e.stopPropagation = defaultFn;
  return {
    isPropagationStopped,
  };
}
