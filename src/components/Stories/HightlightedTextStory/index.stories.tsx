import type { Meta, StoryObj } from "@storybook/nextjs";
import HightlightedTextStory from "./index";

export default {
  title: "Components/HightlightedTextStory",
  component: HightlightedTextStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/HightlightedTextStory",
  component: HightlightedTextStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HightlightedTextStory>;

type Story = StoryObj<typeof meta>;

export const Information: Story = {
  args: {
    slice: {
      slice_type: "hightlighted_text",
      slice_label: null,
      variation: "information",
      version: "initial",
      items: [],
      primary: {
        title: [
          {
            type: "heading3",
            text: "Information",
            spans: [],
          },
        ],
        content: [
          {
            type: "paragraph",
            text: "This is an information message.",
            spans: [],
          },
        ],
      },
    },
  },
};

export const Update: Story = {
  args: {
    slice: {
      slice_type: "hightlighted_text",
      slice_label: null,
      variation: "update",
      version: "initial",
      items: [],
      primary: {
        title: [
          {
            type: "heading3",
            text: "Update",
            spans: [],
          },
        ],
        content: [
          {
            type: "paragraph",
            text: "This is an update message.",
            spans: [],
          },
        ],
      },
    },
  },
};

export const Warning: Story = {
  args: {
    slice: {
      slice_type: "hightlighted_text",
      slice_label: null,
      variation: "warning",
      version: "initial",
      items: [],
      primary: {
        title: [
          {
            type: "heading3",
            text: "Warning",
            spans: [],
          },
        ],
        content: [
          {
            type: "paragraph",
            text: "This is a warning message.",
            spans: [],
          },
        ],
      },
    },
  },
};
