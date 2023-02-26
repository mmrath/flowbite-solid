import { render } from "@solidjs/testing-library";
import { HiSolidEye } from "solid-icons/hi";
import { describe, expect, it } from "vitest";
import { TextInput } from "./TextInput";
import { Theme } from "../Flowbite";

describe.concurrent("Components / Text input", () => {
  describe.concurrent("A11y", () => {
    it('should have `role="textbox"` by default', async () => {
      const { getByRole } = render(() => (
        <Theme>
          <TextInput />)
        </Theme>
      ));
      const textInput = getByRole("textbox");
      expect(textInput).toBeInTheDocument();
    });
    it("should have Icon if selected ", async () => {
      const { getByTestId } = render(() => (
        <Theme>
          <TextInput rightIcon={HiSolidEye} />
        </Theme>
      ));
      const page = getByTestId("right-icon");
      expect(page).toBeInTheDocument();
    });
  });
});
