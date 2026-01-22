import type { Meta, StoryObj } from "@storybook/nextjs";
import FooterStory from "./index";

export default {
  title: "Components/FooterStory",
  component: FooterStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/FooterStory",
  component: FooterStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FooterStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    footer: {
      logo: {
        dimensions: {
          width: 468,
          height: 160,
        },
        alt: "Company Logo",
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
      links: [
        {
          link: {
            link_type: "Web",
            url: "/about",
          },
          label: [
            {
              type: "paragraph",
              text: "About",
              spans: [],
            },
          ],
        },
        {
          link: {
            link_type: "Web",
            url: "/contact",
          },
          label: [
            {
              type: "paragraph",
              text: "Contact",
              spans: [],
            },
          ],
        },
        {
          link: {
            link_type: "Web",
            url: "/privacy",
          },
          label: [
            {
              type: "paragraph",
              text: "Privacy",
              spans: [],
            },
          ],
        },
      ],
      social_links: [
        {
          icon: {
            dimensions: {
              width: 24,
              height: 24,
            },
            alt: "LinkedIn",
            copyright: null,
            url: "https://images.unsplash.com/photo-1592181572975-1d0d8880d175?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHw5fHxsaW5rZWRpbnxlbnwwfHx8fDE3MTQyNzk4NDd8MA&ixlib=rb-4.0.3&q=85?auto=compress,format",
            id: "DuA2f9jNoD8",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          link: {
            link_type: "Web",
            url: "https://linkedin.com",
            target: "_blank",
          },
        },
        {
          icon: {
            dimensions: {
              width: 24,
              height: 24,
            },
            alt: "Twitter",
            copyright: null,
            url: "https://images.unsplash.com/photo-1592181572975-1d0d8880d175?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHw5fHxsaW5rZWRpbnxlbnwwfHx8fDE3MTQyNzk4NDd8MA&ixlib=rb-4.0.3&q=85?auto=compress,format",
            id: "twitter-icon",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          link: {
            link_type: "Web",
            url: "https://twitter.com",
            target: "_blank",
          },
        },
      ],
      copyright: [
        {
          type: "paragraph",
          text: "© 2024 Company Name. All rights reserved.",
          spans: [],
        },
      ],
    },
  },
};
