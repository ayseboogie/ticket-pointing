import type { Meta, StoryObj } from "@storybook/nextjs";
import ContactStory from "./index";

export default {
  title: "Components/ContactStory",
  component: ContactStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/ContactStory",
  component: ContactStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContactStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sliceType: "contact",
    sliceVariation: "default",
    title: [
      {
        type: "paragraph",
        text: "Title",
        spans: [],
      },
    ],
    postSendMessage: [
      {
        type: "paragraph",
        text: "Post Send Message",
        spans: [],
      },
    ],
  },
};
