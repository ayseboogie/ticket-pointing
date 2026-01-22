import type { Meta, StoryObj } from "@storybook/nextjs";
import CustomerLogosStory from "./index";

export default {
  title: "Components/CustomerLogosStory",
  component: CustomerLogosStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/CustomerLogosStory",
  component: CustomerLogosStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomerLogosStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sliceType: "customer_logos",
    sliceVariation: "default",
    eyebrowHeadline: [
      {
        type: "heading2",
        text: "Trusted by",
        spans: [],
      },
    ],
    logos: [
      {
        image: {
          dimensions: { width: 2545, height: 2545 },
          alt: "Customer Logo",
          copyright: null,
          url: "https://images.prismic.io/slicesexamples/95a608cd-8d3c-40c1-a554-0bec1b89eda5_logo-3.svg",
          id: "main",
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
        },
        link: {
          link_type: "Web",
          url: "http://twitter.com",
        },
      },
      {
        image: {
          dimensions: { width: 7173, height: 10041 },
          alt: "Customer Logo",
          copyright: null,
          url: "https://images.prismic.io/slicesexamples/b62a8629-f7f1-4d2e-885a-bd7c6bcff201_logo-2.svg",
          id: "xnRg3xDcNnE",
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
        },
        link: {
          link_type: "Web",
          url: "https://prismic.io",
        },
      },
    ],
    callToActionLink: {
      link_type: "Web",
      url: "https://prismic.io",
      target: "_blank",
    },
  },
};
