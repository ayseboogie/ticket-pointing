import type { Meta, StoryObj } from "@storybook/nextjs";
import MapStory from "./index";

export default {
  title: "Components/MapStory",
  component: MapStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/MapStory",
  component: MapStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MapStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sliceType: "video",
    sliceVariation: "default",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412184.7001911709!2d-87.11479465371633!3d36.1861885083904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864ec3213eb903d%3A0x7d3fb9d0a1e9daa0!2sNashville%2C%20TN!5e0!3m2!1sen!2sus!4v1738823773315!5m2!1sen!2sus",
    title: [
      {
        type: "paragraph",
        text: "Map Title",
        spans: [],
      },
    ],
  },
};
