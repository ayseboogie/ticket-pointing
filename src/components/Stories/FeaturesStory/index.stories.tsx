import type { Meta, StoryObj } from "@storybook/nextjs";
import FeaturesStory from "./index";

export default {
  title: "Components/FeaturesStory",
  component: FeaturesStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/FeaturesStory",
  component: FeaturesStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeaturesStory>;

type Story = StoryObj<typeof meta>;

export const LeftSide: Story = {
  args: {
    slice: {
      slice_type: "features",
      slice_label: null,
      variation: "leftSide",
      version: "initial",
      items: [],
      primary: {
        theme: "Light",
        title: [
          {
            type: "heading2",
            text: "Everything you need to get started",
            spans: [],
          },
        ],
        subtitle: [
          {
            type: "paragraph",
            text: "Powerful features designed to help you work smarter, not harder. Built for teams who demand excellence.",
            spans: [],
          },
        ],
        features: [
          {
            feature_title: [
              {
                type: "paragraph",
                text: "Real-time collaboration",
                spans: [],
              },
            ],
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?rect=24%2C0%2C4704%2C3168&w=1688&h=856",
              id: "main",
              edit: {
                x: 24,
                y: 0,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Work together seamlessly with your team in real-time. See changes as they happen and collaborate effortlessly.",
                spans: [],
              },
            ],
          },
          {
            feature_title: [
              {
                type: "paragraph",
                text: "Advanced analytics",
                spans: [],
              },
            ],
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?rect=0%2C1363%2C2747%2C1393&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 1363,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Get deep insights into your data with powerful analytics tools. Make informed decisions with comprehensive reports and visualizations.",
                spans: [],
              },
            ],
          },
          {
            feature_title: [
              {
                type: "paragraph",
                text: "Secure by default",
                spans: [],
              },
            ],
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?rect=0%2C844%2C3424%2C1736&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 844,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Enterprise-grade security built in from day one. Your data is encrypted, backed up, and protected around the clock.",
                spans: [],
              },
            ],
          },
        ],
        anchor: "features",
      },
    },
  },
};

export const RightSide: Story = {
  args: {
    slice: {
      slice_type: "features",
      slice_label: null,
      variation: "rightSide",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Built for modern teams",
            spans: [],
          },
        ],
        subtitle: [
          {
            type: "paragraph",
            text: "Streamline your workflow with tools that adapt to how you work. Everything you need, right where you need it.",
            spans: [],
          },
        ],
        features: [
          {
            feature_title: [
              {
                type: "paragraph",
                text: "Customizable workflows",
                spans: [],
              },
            ],
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?rect=0%2C1363%2C2747%2C1393&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 1363,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Create workflows that match your team's unique processes. Automate repetitive tasks and focus on what matters most.",
                spans: [],
              },
            ],
          },
          {
            feature_title: [
              {
                type: "paragraph",
                text: "Seamless integrations",
                spans: [],
              },
            ],
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?rect=0%2C844%2C3424%2C1736&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 844,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Connect with the tools you already use. Over 100 integrations available, with more added every month.",
                spans: [],
              },
            ],
          },
        ],
        anchor: "features",
      },
    },
  },
};

export const Above: Story = {
  args: {
    slice: {
      slice_type: "features",
      slice_label: null,
      variation: "above",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Powerful features at your fingertips",
            spans: [],
          },
        ],
        subtitle: [
          {
            type: "paragraph",
            text: "Discover how our platform can transform the way you work. Explore the features that make us different.",
            spans: [],
          },
        ],
        features: [
          {
            eyebrow: [
              {
                type: "heading3",
                text: "Productivity",
                spans: [],
              },
            ],
            feature_title: [
              {
                type: "paragraph",
                text: "Automate your workflow",
                spans: [],
              },
            ],
            icon: {
              dimensions: {
                width: 128,
                height: 128,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1587653915936-5623ea0b949a?rect=0%2C0%2C4000%2C4000&w=128&h=128",
              id: "main",
              edit: {
                x: 0,
                y: 0,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?rect=0%2C844%2C3424%2C1736&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 844,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Save hours every week by automating repetitive tasks. Set up rules and let the system handle the rest.",
                spans: [],
              },
            ],
          },
          {
            eyebrow: [
              {
                type: "heading3",
                text: "Collaboration",
                spans: [],
              },
            ],
            feature_title: [
              {
                type: "paragraph",
                text: "Work together seamlessly",
                spans: [],
              },
            ],
            icon: {
              dimensions: {
                width: 128,
                height: 128,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1560762484-813fc97650a0?rect=418%2C0%2C2509%2C2509&w=128&h=128",
              id: "main",
              edit: {
                x: 418,
                y: 0,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1600861194802-a2b11076bc51?rect=0%2C627%2C2545%2C1291&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 627,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Real-time collaboration keeps your team in sync. Share updates, leave comments, and stay connected.",
                spans: [],
              },
            ],
          },
          {
            eyebrow: [
              {
                type: "heading3",
                text: "Insights",
                spans: [],
              },
            ],
            feature_title: [
              {
                type: "paragraph",
                text: "Make data-driven decisions",
                spans: [],
              },
            ],
            icon: {
              dimensions: {
                width: 128,
                height: 128,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?rect=24%2C0%2C4704%2C3168&w=128&h=128",
              id: "main",
              edit: {
                x: 24,
                y: 0,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?rect=0%2C1363%2C2747%2C1393&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 1363,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Get actionable insights from your data. Beautiful dashboards and reports help you understand what's happening.",
                spans: [],
              },
            ],
          },
        ],
        anchor: "features",
      },
    },
  },
};

export const Below: Story = {
  args: {
    slice: {
      slice_type: "features",
      slice_label: null,
      variation: "below",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Everything you need to succeed",
            spans: [],
          },
        ],
        subtitle: [
          {
            type: "paragraph",
            text: "A complete toolkit designed to help you achieve more. See how our features work together to power your success.",
            spans: [],
          },
        ],
        features: [
          {
            eyebrow: [
              {
                type: "heading3",
                text: "Speed",
                spans: [],
              },
            ],
            feature_title: [
              {
                type: "paragraph",
                text: "Lightning-fast performance",
                spans: [],
              },
            ],
            icon: {
              dimensions: {
                width: 128,
                height: 128,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1560762484-813fc97650a0?rect=418%2C0%2C2509%2C2509&w=128&h=128",
              id: "main",
              edit: {
                x: 418,
                y: 0,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1600861194802-a2b11076bc51?rect=0%2C627%2C2545%2C1291&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 627,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Experience blazing-fast load times and smooth interactions. Built for speed from the ground up.",
                spans: [],
              },
            ],
          },
          {
            eyebrow: [
              {
                type: "heading3",
                text: "Reliability",
                spans: [],
              },
            ],
            feature_title: [
              {
                type: "paragraph",
                text: "99.9% uptime guarantee",
                spans: [],
              },
            ],
            icon: {
              dimensions: {
                width: 128,
                height: 128,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1587653915936-5623ea0b949a?rect=0%2C0%2C4000%2C4000&w=128&h=128",
              id: "main",
              edit: {
                x: 0,
                y: 0,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_screenshot: {
              dimensions: {
                width: 1688,
                height: 856,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?rect=0%2C844%2C3424%2C1736&w=1688&h=856",
              id: "main",
              edit: {
                x: 0,
                y: 844,
                zoom: 1,
                background: "transparent",
              },
            },
            feature_description: [
              {
                type: "paragraph",
                text: "Count on us to be there when you need us. Our infrastructure ensures your work never stops.",
                spans: [],
              },
            ],
          },
        ],
        anchor: "features",
      },
    },
  },
};
