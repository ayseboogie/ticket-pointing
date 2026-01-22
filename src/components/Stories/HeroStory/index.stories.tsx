import type { Meta, StoryObj } from "@storybook/nextjs";
import HeroImageStory from "./index";

export default {
  title: "Components/HeroImageStory",
  component: HeroImageStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/HeroImageStory",
  component: HeroImageStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroImageStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    slice: {
      variation: "imageDefault",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        backgroundimage: {
          dimensions: { width: 1200, height: 600 },
          alt: "A scenic mountain view",
          copyright: null,
          url: "https://images.unsplash.com/photo-1505855265981-d52719d1f64e",
          id: "Aq7id0ZjEW4",
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
        },
        title: [
          { type: "heading1", text: "Experience the Adventure", spans: [] },
        ],
        description: [
          {
            type: "paragraph",
            text: "Join us for an unforgettable journey.",
            spans: [],
          },
        ],
        buttons: [
          {
            cta_label: "Get Started",
            cta_link: {
              link_type: "Web",
              url: "google.com",
            },
            cta_type: "Primary",
          },
        ],
        anchor: "hero-anchor",
      },
    },
  },
};
