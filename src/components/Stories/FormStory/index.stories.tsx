import type { Meta, StoryObj } from "@storybook/nextjs";
import FormStory from "./index";

export default {
  title: "Components/FormStory",
  component: FormStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/FormStory",
  component: FormStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormStory>;

type Story = StoryObj<typeof meta>;

export const WithDetails: Story = {
  args: {
    slice: {
      slice_type: "form",
      slice_label: null,
      variation: "withDetails",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Child",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Excepteur nisi ut consequat non et minim amet. Et aute excepteur fugiat qui velit aute duis do velit cupidatat magna minim eiusmod voluptate. Veniam non consequat excepteur ut.",
            spans: [],
          },
        ],
        placeholder: "previous",
        subscribe_label: "laid",
        disclaimer: [
          {
            type: "paragraph",
            text: "Minim adipisicing laboris fugiat Lorem ut consequat occaecat laboris. Quis officia incididunt deserunt aliqua.",
            spans: [],
          },
        ],
        anchor: "rich",
        content: [
          {
            icon: {
              dimensions: { width: 128, height: 128 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?rect=0%2C890%2C3560%2C3560&w=128&h=128",
              id: "main",
              edit: { x: 0, y: 890, zoom: 1, background: "transparent" },
            },
            title: [
              {
                type: "paragraph",
                text: "Ipsum tempor dolore labore tempor.",
                spans: [],
              },
            ],
            description: [
              {
                type: "paragraph",
                text: "Description text here.",
                spans: [],
              },
            ],
          },
        ],
      },
    },
  },
};

export const Simple: Story = {
  args: {
    slice: {
      slice_type: "form",
      slice_label: null,
      variation: "simple",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Simple Form",
            spans: [],
          },
        ],
        placeholder: "Enter your email",
        subscribe_label: "Subscribe",
        anchor: "form",
      },
    },
  },
};

export const Centered: Story = {
  args: {
    slice: {
      slice_type: "form",
      slice_label: null,
      variation: "centered",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Centered Form",
            spans: [],
          },
        ],
        placeholder: "Enter your email",
        subscribe_label: "Subscribe",
        anchor: "form",
      },
    },
  },
};
