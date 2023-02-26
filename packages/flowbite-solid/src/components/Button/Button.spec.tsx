import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Theme } from "../Flowbite";
import { Button } from "./Button";

describe("Components / Button", () => {
  describe("A11y", () => {
    it('should have `role="button"` by default', async () => {
      const { queryByRole, unmount } = render(() => <Button>Hi there</Button>);
      const button = (await queryByRole("button")) as HTMLButtonElement;
      expect(button).toBeInTheDocument();
      unmount();
    });

    it("should be able to use any other role permitted for `<button>`s", async () => {
      const { queryByRole, unmount } = render(() => <Button role="menuitem">Hi there</Button>);
      const button = (await queryByRole("menuitem")) as HTMLButtonElement;
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  describe("Keyboard interactions", () => {
    it("should trigger `onClick` when `Space` is pressed", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      const { queryByRole, unmount } = render(() => <Button onClick={onClick}>Hi there</Button>);
      const button = (await queryByRole("button")) as HTMLButtonElement;
      await user.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
      unmount();
    });

    it("should focus when `Tab` is pressed", async () => {
      const user = userEvent.setup();
      const { queryByRole, unmount } = render(() => <Button>Hi there</Button>);

      await user.tab();
      const button = (await queryByRole("button")) as HTMLButtonElement;
      expect(button).toHaveFocus();
    });

    it("should be possible to `Tab` out", async () => {
      const user = userEvent.setup();
      render(() => (
        <>
          <Button>Hi there</Button>
          <Button>Hello there</Button>
          <button type="submit">Submit</button>
        </>
      ));

      await user.tab();

      expect(buttons()[0]).toHaveFocus();

      await user.tab();

      expect(buttons()[1]).toHaveFocus();

      await user.tab();

      expect(buttons()[2]).toHaveFocus();
    });
  });

  describe("Props", () => {
    it("should allow HTML attributes for `<button>`s", () => {
      render(() => (
        <Button formAction="post.php" type="submit">
          Hi there
        </Button>
      ));

      expect(button()).toHaveAttribute("formAction", "post.php");
      expect(button()).toHaveAttribute("type", "submit");
    });

    it("should be disabled when `disabled={true}`", () => {
      render(() => <Button disabled>Hi there</Button>);

      expect(button()).toBeDisabled();
    });
  });

  describe("Rendering", () => {
    it("should render when `children={0}`", () => {
      render(() => <Button>0</Button>);

      expect(button()).toHaveTextContent("0");
    });

    it("should render when `children={undefined}`", () => {
      render(() => <Button label="Something or other" />);

      expect(button()).toHaveTextContent("Something or other");
    });

    it('should render an anchor `<a>` when `href=".."`', () => {
      render(() => <Button href="#" label="Something or other" />);

      expect(buttonLink()).toBeInTheDocument();
    });
  });

  describe("Theme", () => {
    it("should use `base` classes", () => {
      const theme = {
        button: {
          base: "font-extralight",
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button />
        </Theme>
      ));

      expect(button()).toHaveClass("font-extralight");
    });

    it("should use `color` classes", () => {
      const theme = {
        button: {
          color: {
            primary: "font-extralight",
          },
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button color="primary" />
        </Theme>
      ));

      expect(button()).toHaveClass("font-extralight");
    });

    it("should use `disabled` classes", () => {
      const theme = {
        button: {
          disabled: "font-extralight",
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button disabled />
        </Theme>
      ));

      expect(button()).toHaveClass("font-extralight");
    });

    it("should use `gradient` classes", () => {
      const theme = {
        button: {
          gradient: {
            yellowToPink: "font-extralight",
          },
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button gradientMonochrome="yellowToPink" />
        </Theme>
      ));

      expect(button()).toHaveClass("font-extralight");
    });

    it("should use `gradientDuoTone` classes", () => {
      const theme = {
        button: {
          gradientDuoTone: {
            yellowToPink: "font-extralight",
          },
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button gradientDuoTone="yellowToPink" />
        </Theme>
      ));

      expect(button()).toHaveClass("font-extralight");
    });

    it("should use `inner` classes", () => {
      const theme = {
        button: {
          inner: {
            base: "font-extralight",
          },
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button>Hi there</Button>
        </Theme>
      ));

      const buttonInnerContent = screen.getByText("Hi there");

      expect(buttonInnerContent).toHaveClass("font-extralight");
    });

    it("should use `label` classes", () => {
      const theme = {
        button: {
          label: "font-extralight",
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button label="Hi there" />
        </Theme>
      ));

      const buttonLabel = screen.getByText("Hi there");

      expect(buttonLabel).toHaveClass("font-extralight");
    });

    it("should use `outline` classes", () => {
      const theme = {
        button: {
          outline: {
            off: "font-extralight",
            on: "font-extrabold",
            pill: {
              off: "text-purple-300",
              on: "text-purple-600",
            },
          },
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button>Normal button</Button>
          <Button outline>Outline button</Button>
          <Button outline pill>
            Outline pill button
          </Button>
        </Theme>
      ));

      const normalButton = screen.getByText("Normal button");
      const outlineButton = screen.getByText("Outline button");
      const outlinePillButton = screen.getByText("Outline pill button");

      expect(normalButton).toHaveClass("font-extralight text-purple-300");
      expect(outlineButton).toHaveClass("font-extrabold text-purple-300");
      expect(outlinePillButton).toHaveClass("font-extrabold text-purple-600");
    });

    it("should use `pill` classes", () => {
      const theme = {
        button: {
          pill: {
            off: "font-extralight",
            on: "font-extrabold",
          },
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button label="Normal button" />
          <Button label="Pill" pill />
        </Theme>
      ));

      const normalButton = buttons()[0];
      const pill = buttons()[1];

      expect(normalButton).toHaveClass("font-extralight");
      expect(pill).toHaveClass("font-extrabold");
    });

    it("should use `size` classes", () => {
      const theme = {
        button: {
          size: {
            xxl: "font-extrabold",
          },
        },
      };

      render(() => (
        <Theme theme={{ theme }}>
          <Button size="xxl">Hello</Button>
        </Theme>
      ));

      const button = screen.getByText("Hello");
      expect(button).toHaveClass("font-extrabold");
    });
  });
});

const button = () => screen.getByRole("button");

const buttonLink = () => screen.getByRole("link");

const buttons = () => screen.getAllByRole("button");
