import type { Meta, StoryObj } from "@storybook/nextjs";
import TextStory from "./index";

export default {
  title: "Components/TextStory",
  component: TextStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/TextStory",
  component: TextStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slice: {
      slice_type: "text",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        text: [
          {
            type: "heading2",
            text: "Building the Future of Technology",
            spans: [],
          },
          {
            type: "paragraph",
            text: "We're on a mission to transform how businesses operate in the digital age. Our platform combines cutting-edge technology with intuitive design to deliver solutions that drive real results.",
            spans: [],
          },
          {
            type: "paragraph",
            text: "With over a decade of experience and thousands of satisfied customers, we've built a reputation for excellence and innovation. Our team of experts works tirelessly to ensure every product we deliver exceeds expectations.",
            spans: [],
          },
          {
            type: "heading3",
            text: "Why Choose Us",
            spans: [],
          },
          {
            type: "paragraph",
            text: "Our commitment to quality, customer success, and continuous improvement sets us apart. We don't just build software—we build partnerships that help our clients achieve their goals.",
            spans: [],
          },
        ],
        theme: "Green",
      },
    },
  },
};

export const Center: Story = {
  args: {
    slice: {
      slice_type: "text",
      slice_label: null,
      variation: "center",
      version: "initial",
      items: [],
      primary: {
        text: [
          {
            type: "heading2",
            text: "Innovation Starts Here",
            spans: [],
          },
          {
            type: "paragraph",
            text: "Join thousands of forward-thinking companies that trust us to power their digital transformation. Together, we're shaping the future of business.",
            spans: [],
          },
          {
            type: "paragraph",
            text: "Our platform is designed to scale with you, from startup to enterprise. With powerful features, seamless integrations, and world-class support, we're here to help you succeed.",
            spans: [],
          },
        ],
        theme: "White",
      },
    },
  },
};

export const TextSection: Story = {
  args: {
    slice: {
      slice_type: "text",
      slice_label: null,
      variation: "textSection",
      version: "initial",
      items: [],
      primary: {
        text: [
          {
            type: "heading2",
            text: "Comprehensive Documentation",
            spans: [],
          },
          {
            type: "paragraph",
            text: "Getting started is easy. Our comprehensive documentation covers everything you need to know, from basic setup to advanced configurations.",
            spans: [],
          },
          {
            type: "heading3",
            text: "Key Features",
            spans: [],
          },
          {
            type: "list-item",
            text: "Easy integration with your existing tools",
            spans: [],
          },
          {
            type: "list-item",
            text: "Powerful API for custom development",
            spans: [],
          },
          {
            type: "list-item",
            text: "Real-time collaboration features",
            spans: [],
          },
          {
            type: "list-item",
            text: "Enterprise-grade security and compliance",
            spans: [],
          },
          {
            type: "paragraph",
            text: "Whether you're a developer, designer, or business owner, our platform provides the tools and flexibility you need to succeed.",
            spans: [],
          },
        ],
        theme: "White",
      },
    },
  },
};
