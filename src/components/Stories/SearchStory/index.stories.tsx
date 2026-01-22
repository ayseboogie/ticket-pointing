import type { Meta, StoryObj } from "@storybook/nextjs";
import SearchStory from "./index";

export default {
  title: "Components/SearchStory",
  component: SearchStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/SearchStory",
  component: SearchStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    slice: {
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        theme: "Dark",
        heading: [
          {
            type: "heading1",
            text: "PORTFOLIO",
            spans: [],
            direction: "ltr",
          },
        ],
      },
      id: "search$0083f6bd-8233-448e-8ca3-41bf674c4a5a",
      slice_type: "search",
      slice_label: null,
    },
  },
};
