import type { Meta, StoryObj } from "@storybook/nextjs";
import JobListStory from "./index";

export default {
  title: "Components/JobListStory",
  component: JobListStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/JobListStory",
  component: JobListStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof JobListStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    slice: {
      slice_type: "job_list",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Join Our Team",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "We're looking for talented individuals to join our team.",
            spans: [],
          },
        ],
        image: {
          dimensions: { width: 1200, height: 800 },
          alt: "Team photo",
          copyright: null,
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
          id: "main",
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
        },
        link: {
          link_type: "Web",
          url: "https://example.com/jobs",
        },
        link_text: "View all openings",
        anchor: "jobs",
      },
    },
  },
};
