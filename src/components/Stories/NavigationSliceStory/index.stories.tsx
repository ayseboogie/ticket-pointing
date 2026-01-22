import type { Meta, StoryObj } from "@storybook/nextjs";
import NavigationSliceStory from "./index";

export default {
  title: "Components/NavigationSliceStory",
  component: NavigationSliceStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/NavigationSliceStory",
  component: NavigationSliceStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationSliceStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    slice: {
      slice_type: "navigation_slice",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        name: [
          {
            type: "paragraph",
            text: "Products",
            spans: [],
          },
        ],
        link: {
          link_type: "Web",
          url: "/products",
        },
        submenu: [
          {
            name: [
              {
                type: "paragraph",
                text: "Features",
                spans: [],
              },
            ],
            link: {
              link_type: "Web",
              url: "/products/features",
            },
          },
          {
            name: [
              {
                type: "paragraph",
                text: "Pricing",
                spans: [],
              },
            ],
            link: {
              link_type: "Web",
              url: "/products/pricing",
            },
          },
          {
            name: [
              {
                type: "paragraph",
                text: "Integrations",
                spans: [],
              },
            ],
            link: {
              link_type: "Web",
              url: "/products/integrations",
            },
          },
        ],
      },
    },
  },
};
