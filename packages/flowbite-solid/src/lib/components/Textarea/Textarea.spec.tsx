import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Textarea } from "./Textarea";

describe.concurrent("Components / Textarea", () => {
  describe.concurrent("A11y", () => {
    it('should have role="textbox" by default', () => {
      const textArea = render(() => <Textarea />).getByRole("textbox");
      expect(textArea).toBeInTheDocument();
    });
  });
});
