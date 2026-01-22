import type { Meta, StoryObj } from "@storybook/nextjs";
import ImageBesideTextStory from "./index";

export default {
  title: "Components/ImageBesideTextStory",
  component: ImageBesideTextStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/ImageBesideTextStory",
  component: ImageBesideTextStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageBesideTextStory>;

type Story = StoryObj<typeof meta>;

export const ImageLeft: Story = {
  args: {
    slice: {
      slice_type: "image_beside_text",
      slice_label: null,
      variation: "imageLeft",
      version: "initial",
      items: [],
      primary: {
        image: {
          dimensions: { width: 3456, height: 4320 },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a",
          id: "main",
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
        },
        title: [
          {
            type: "heading1",
            text: "Track",
            spans: [],
          },
        ],
        subtitle: "apple",
        description: [
          {
            type: "paragraph",
            text: "Reprehenderit sint eu consequat ea magna mollit exercitation est.",
            spans: [],
          },
        ],
        link: {
          link_type: "Web",
          url: "https://prismic.io",
          text: "Get Started",
        },
      },
    },
  },
};

export const ImageRight: Story = {
  args: {
    slice: {
      slice_type: "image_beside_text",
      slice_label: null,
      variation: "imageRight",
      version: "initial",
      items: [],
      primary: {
        image: {
          dimensions: { width: 3456, height: 4320 },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a",
          id: "main",
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
        },
        title: [
          {
            type: "heading1",
            text: "Track",
            spans: [],
          },
        ],
        subtitle: "apple",
        description: [
          {
            type: "paragraph",
            text: "Reprehenderit sint eu consequat ea magna mollit exercitation est.",
            spans: [],
          },
        ],
        link: {
          link_type: "Web",
          url: "https://prismic.io",
          text: "Get Started",
        },
      },
    },
  },
};
