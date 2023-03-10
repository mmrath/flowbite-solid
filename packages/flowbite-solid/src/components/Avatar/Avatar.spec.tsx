import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Theme } from "../Flowbite";
import type { CustomFlowbiteTheme } from "../Flowbite/FlowbiteTheme";
import { Avatar } from "./Avatar";

describe("Components / Avatar", () => {
  describe("Theme", () => {
    it("should use custom sizes", () => {
      const theme: CustomFlowbiteTheme = {
        avatar: {
          root: {
            size: {
              xxl: "h-64 w-64",
            },
          },
        },
      };
      render(() => (
        <Theme theme={{ theme }}>
          <Avatar size="xxl" />
        </Theme>
      ));

      expect(img()).toHaveClass("h-64 w-64");
    });

    it("should use custom colors", () => {
      const theme: CustomFlowbiteTheme = {
        avatar: {
          root: {
            color: {
              rose: "ring-rose-500 dark:ring-rose-400",
            },
          },
        },
      };
      render(() => (
        <Theme theme={{ theme }}>
          <Avatar
            bordered
            color="rose"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Your avatar"
          />
        </Theme>
      ));

      expect(img()).toHaveClass("ring-rose-500 dark:ring-rose-400");
    });
  });
  describe("Placeholder", () => {
    it("should display placeholder initials", () => {
      render(() => (
        <Theme>
          <Avatar placeholderInitials="RR" />
        </Theme>
      ));

      expect(initialsPlaceholderText()).toHaveTextContent("RR");
    });

    it("should support border color with placeholder initials", () => {
      render(() => (
        <Theme>
          <Avatar placeholderInitials="RR" bordered color="success" />
        </Theme>
      ));

      expect(initialsPlaceholder()).toHaveClass("ring-green-500 dark:ring-green-500");
    });
  });
  describe("Image", () => {
    it("should support custom image elements", () => {
      render(() => (
        <Theme>
          <Avatar img={props => <img referrerPolicy="no-referrer" {...props} />} />
        </Theme>
      ));

      expect(img()).toHaveAttribute("referrerpolicy", "no-referrer");
    });
  });
  describe("Status", () => {
    it("should have online status indicator", () => {
      render(() => (
        <Theme>
          <Avatar status="online" />
        </Theme>
      ));

      expect(status()).toHaveClass("bg-green-400");
    });
  });
});

const status = () => screen.getByTestId("flowbite-avatar-status");
const img = () => screen.getByTestId("flowbite-avatar-img");
const initialsPlaceholder = () => screen.getByTestId("flowbite-avatar-initials-placeholder");
const initialsPlaceholderText = () =>
  screen.getByTestId("flowbite-avatar-initials-placeholder-text");
