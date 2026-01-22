import type { Meta, StoryObj } from "@storybook/nextjs";
import ImageSliderStory from "./index";

export default {
  title: "Components/ImageSliderStory",
  component: ImageSliderStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/ImageSliderStory",
  component: ImageSliderStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageSliderStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slice: {
      slice_type: "image_slider",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [
        {
          image: {
            dimensions: {
              width: 3456,
              height: 4320,
            },
            alt: null,
            copyright: null,
            url: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a",
            id: "main",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
        },
        {
          image: {
            dimensions: {
              width: 3456,
              height: 4320,
            },
            alt: null,
            copyright: null,
            url: "https://images.unsplash.com/photo-1582287104445-6754664dbdb2",
            id: "main2",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
        },
        {
          image: {
            dimensions: {
              width: 3456,
              height: 4320,
            },
            alt: null,
            copyright: null,
            url: "https://images.unsplash.com/photo-1582789760972-c8916cebe649",
            id: "main3",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
        },
      ],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading1",
            text: "Fairly",
            spans: [],
          },
        ],
      },
    },
  },
};

export const WithText: Story = {
  args: {
    slice: {
      slice_type: "image_slider",
      slice_label: null,
      variation: "withText",
      version: "initial",
      items: [
        {
          image: {
            dimensions: {
              width: 3456,
              height: 4320,
            },
            alt: null,
            copyright: null,
            url: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a",
            id: "main",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          slide_text: [
            {
              type: "paragraph",
              text: "Capturing the beauty of nature through photography. Each image tells a unique story and evokes emotion.",
              spans: [],
            },
          ],
        },
        {
          image: {
            dimensions: {
              width: 3456,
              height: 4320,
            },
            alt: null,
            copyright: null,
            url: "https://images.unsplash.com/photo-1582287104445-6754664dbdb2",
            id: "main2",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          slide_text: [
            {
              type: "paragraph",
              text: "Exploring vibrant colors and textures that bring life to every frame. Art meets reality in perfect harmony.",
              spans: [],
            },
          ],
        },
        {
          image: {
            dimensions: {
              width: 3456,
              height: 4320,
            },
            alt: null,
            copyright: null,
            url: "https://images.unsplash.com/photo-1582789760972-c8916cebe649",
            id: "main3",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          slide_text: [
            {
              type: "paragraph",
              text: "Moments frozen in time, preserving memories that will last forever. Photography is the art of storytelling.",
              spans: [],
            },
          ],
        },
        {
          image: {
            dimensions: {
              width: 3456,
              height: 4320,
            },
            alt: null,
            copyright: null,
            url: "https://images.unsplash.com/photo-1587613865763-4b8b0d19e8ab",
            id: "main4",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          slide_text: [
            {
              type: "paragraph",
              text: "Discovering new perspectives and angles that transform ordinary scenes into extraordinary visual experiences.",
              spans: [],
            },
          ],
        },
      ],
      primary: {
        text: [
          {
            type: "paragraph",
            text: "A collection of stunning imagery that showcases the power of visual storytelling. Each slide presents a unique narrative that captivates and inspires.",
            spans: [],
          },
        ],
      },
    },
  },
};
