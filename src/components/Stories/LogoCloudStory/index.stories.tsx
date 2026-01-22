import type { Meta, StoryObj } from "@storybook/nextjs";
import LogoCloudStory from "./index";

export default {
  title: "Components/LogoCloudStory",
  component: LogoCloudStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/LogoCloudStory",
  component: LogoCloudStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LogoCloudStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slice: {
      slice_type: "logo_cloud",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "paragraph",
            text: "Trusted by leading companies",
            spans: [],
          },
        ],
        logos: [
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Company Logo 1",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/95a608cd-8d3c-40c1-a554-0bec1b89eda5_logo-3.svg",
              id: "logo1",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Company Logo 2",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/b62a8629-f7f1-4d2e-885a-bd7c6bcff201_logo-2.svg",
              id: "logo2",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Company Logo 3",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/95a608cd-8d3c-40c1-a554-0bec1b89eda5_logo-3.svg",
              id: "logo3",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Company Logo 4",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/b62a8629-f7f1-4d2e-885a-bd7c6bcff201_logo-2.svg",
              id: "logo4",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Company Logo 5",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/95a608cd-8d3c-40c1-a554-0bec1b89eda5_logo-3.svg",
              id: "logo5",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Company Logo 6",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/b62a8629-f7f1-4d2e-885a-bd7c6bcff201_logo-2.svg",
              id: "logo6",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
        ],
        anchor: "trusted-by",
      },
    },
  },
};

export const Single: Story = {
  args: {
    slice: {
      slice_type: "logo_cloud",
      slice_label: null,
      variation: "single",
      version: "initial",
      items: [],
      primary: {
        theme: "Dark",
        title: [
          {
            type: "paragraph",
            text: "Featured Partner",
            spans: [],
          },
        ],
        logo: {
          dimensions: { width: 320, height: 160 },
          alt: "Partner Logo",
          copyright: null,
          url: "https://images.prismic.io/slicesexamples/b62a8629-f7f1-4d2e-885a-bd7c6bcff201_logo-2.svg",
          id: "partner-logo",
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
        },
        anchor: "partner",
      },
    },
  },
};

export const ThreeColumns: Story = {
  args: {
    slice: {
      slice_type: "logo_cloud",
      slice_label: null,
      variation: "threeColumns",
      version: "initial",
      items: [],
      primary: {
        theme: "Blue",
        title: [
          {
            type: "paragraph",
            text: "Our integration partners",
            spans: [],
          },
        ],
        logos: [
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Integration Partner 1",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/95a608cd-8d3c-40c1-a554-0bec1b89eda5_logo-3.svg",
              id: "partner1",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Integration Partner 2",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/b62a8629-f7f1-4d2e-885a-bd7c6bcff201_logo-2.svg",
              id: "partner2",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Integration Partner 3",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/95a608cd-8d3c-40c1-a554-0bec1b89eda5_logo-3.svg",
              id: "partner3",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Integration Partner 4",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/b62a8629-f7f1-4d2e-885a-bd7c6bcff201_logo-2.svg",
              id: "partner4",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Integration Partner 5",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/95a608cd-8d3c-40c1-a554-0bec1b89eda5_logo-3.svg",
              id: "partner5",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            logo: {
              dimensions: { width: 120, height: 48 },
              alt: "Integration Partner 6",
              copyright: null,
              url: "https://images.prismic.io/slicesexamples/b62a8629-f7f1-4d2e-885a-bd7c6bcff201_logo-2.svg",
              id: "partner6",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
        ],
        anchor: "integrations",
      },
    },
  },
};
