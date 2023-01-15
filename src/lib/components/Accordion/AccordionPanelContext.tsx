import {createContext, useContext} from "solid-js";

type AccordionPanelContext = {
  eventKey: string,
  isOpen: string
};

export const AccordionPanelContext = createContext<AccordionPanelContext | undefined>(undefined);

export function useAccordionPanelContext(): AccordionPanelContext {
  const context = useContext(AccordionPanelContext);

  if (!context) {
    throw new Error('useAccordionPanelContext should be used within the AccordionPanelContext provider!');
  }
  return context;
}
