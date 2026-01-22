import Button from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Button",
    url: "https://www.google.com",
    theme: "default",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
    url: "https://www.google.com",
    theme: "outline",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
    url: "https://www.google.com",
    theme: "default",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
    url: "https://www.google.com",
    theme: "default",
  },
};

export const Warning: Story = {
  args: {
    label: "Delete now",
    backgroundColor: "red",
    url: "https://www.google.com",
    theme: "default",
  },
};
