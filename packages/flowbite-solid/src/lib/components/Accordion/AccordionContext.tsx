import {Component, ComponentProps, createContext, useContext} from "solid-js";

export type AccordionEventKey = string | string[] | null | undefined;

export declare type AccordionSelectCallback = (eventKey: AccordionEventKey, e: Event) => void;

export interface AccordionContextProps {
    activeEventKey?: AccordionEventKey;
    alwaysOpen?: boolean;
    arrowIcon?: Component<ComponentProps<'svg'>>;
    flush?: boolean;
    collapseAll?: boolean;
    onSelect?: AccordionSelectCallback;
}

export function isAccordionItemSelected(
    activeEventKey: AccordionEventKey,
    eventKey: string,
): boolean {
    return Array.isArray(activeEventKey)
        ? activeEventKey.includes(eventKey)
        : activeEventKey === eventKey;
}

const AccordionContext = createContext<AccordionContextProps>({});


export function useAccordionContext(): AccordionContextProps {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error('useAccordionPanelContext should be used within the AccordionPanelContext provider!');
    }

    return context;
}
export default AccordionContext;