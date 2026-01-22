import type { Meta, StoryObj } from "@storybook/nextjs";
import ImageStory from "./index";

export default {
  title: "Components/ImageStory",
  component: ImageStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/ImageStory",
  component: ImageStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sliceType: "image",
    sliceVariation: "default",
    image: {
      dimensions: {
        width: 5460,
        height: 3640,
      },
      alt: "yellow lemon fruit on white surface",
      copyright: null,
      url: "https://images.unsplash.com/photo-1582287104445-6754664dbdb2?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxMnx8Y2l0cnVzJTIwZnJ1aXR8ZW58MHx8fHwxNzE0MjIzNzEyfDA&ixlib=rb-4.0.3&q=85?auto=compress,format",
      id: "7WAGthfGJ9w",
      edit: {
        x: 0,
        y: 0,
        zoom: 1,
        background: "transparent",
      },
    },
    caption: [
      {
        type: "paragraph",
        text: "Dripping with zest, bursting with heat—pure citrus temptation. 🍋🔥",
        spans: [],
      },
    ],
  },
};
