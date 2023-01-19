import type {AccordionProps} from './Accordion';
import {AccordionPanelContext} from './AccordionPanelContext';
import {Component, createMemo, JSX, ParentProps, splitProps} from "solid-js";
import {isAccordionItemSelected, useAccordionContext} from "./AccordionContext";

export interface AccordionPanelProps extends ParentProps<AccordionProps> {
    eventKey: string;
}

export const AccordionPanel: Component<AccordionPanelProps> = (p: AccordionPanelProps): JSX.Element => {
    const [local, props] = splitProps(p, [
        "eventKey",
    ]);

    const accordionContext = useAccordionContext();

    const provider = createMemo(() => {
        console.log("changed", accordionContext.activeEventKey?.toString(), local)
        const val = {
            get eventKey(){
               return local.eventKey;
            },
            get isOpen(){
                return isAccordionItemSelected(accordionContext.activeEventKey, local.eventKey);
            },
        }
        console.log("ctx", val);
        return val;
    });

    return <AccordionPanelContext.Provider value={provider()}>{props.children}</AccordionPanelContext.Provider>;
};
