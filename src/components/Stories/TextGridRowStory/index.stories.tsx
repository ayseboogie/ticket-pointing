import type { Meta, StoryObj } from "@storybook/nextjs";
import TextGridRowStory from "./index";

export default {
  title: "Components/TextGridRowStory",
  component: TextGridRowStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/TextGridRowStory",
  component: TextGridRowStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextGridRowStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    slice: {
      variation: "default",
      version: "initial",
      items: [
        {
          icon: {
            dimensions: { width: 512, height: 512 },
            alt: "Idea Icon",
            copyright: null,
            url: "https://images.prismic.io/ayseboogie/659ed4b67a5e8b1120d56b63_lightbulb.png?auto=format,compress",
            id: "ZZ7UtnpeixEg1Wtj",
            edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          },
          heading: "Ideation",
          text: [
            {
              type: "paragraph",
              text: "From concept to clarity, I refine ideas for a purpose-driven website that resonates with your audience.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Elevate your online presence with visually stunning interfaces and seamless user experiences",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Transforming ideas into high-performance websites using cutting-edge technology and expertise.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Customer satisfaction is my priority; I ensure your needs are met and expectations exceeded.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          icon: {
            dimensions: { width: 512, height: 512 },
            alt: "Design Icon",
            copyright: null,
            url: "https://images.prismic.io/ayseboogie/659ed4eb7a5e8b1120d56b67_web-design.png?auto=format,compress",
            id: "ZZ7U63peixEg1Wtn",
            edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          },
          heading: "Design",
          text: [
            {
              type: "paragraph",
              text: "From concept to clarity, I refine ideas for a purpose-driven website that resonates with your audience.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Elevate your online presence with visually stunning interfaces and seamless user experiences",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Transforming ideas into high-performance websites using cutting-edge technology and expertise.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Customer satisfaction is my priority; I ensure your needs are met and expectations exceeded.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          icon: {
            dimensions: { width: 512, height: 512 },
            alt: "Engineering Icon",
            copyright: null,
            url: "https://images.prismic.io/ayseboogie/659ed48d7a5e8b1120d56b5e_technology.png?auto=format,compress",
            id: "ZZ7UjXpeixEg1Wte",
            edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          },
          heading: "Engineering",
          text: [
            {
              type: "paragraph",
              text: "From concept to clarity, I refine ideas for a purpose-driven website that resonates with your audience.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Elevate your online presence with visually stunning interfaces and seamless user experiences",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Transforming ideas into high-performance websites using cutting-edge technology and expertise.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Customer satisfaction is my priority; I ensure your needs are met and expectations exceeded.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          icon: {
            dimensions: { width: 512, height: 512 },
            alt: "Service Icon",
            copyright: null,
            url: "https://images.prismic.io/ayseboogie/659ed5327a5e8b1120d56b6a_guarantee.png?auto=format,compress",
            id: "ZZ7VMnpeixEg1Wtq",
            edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          },
          heading: "Service",
          text: [
            {
              type: "paragraph",
              text: "From concept to clarity, I refine ideas for a purpose-driven website that resonates with your audience.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Elevate your online presence with visually stunning interfaces and seamless user experiences",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Transforming ideas into high-performance websites using cutting-edge technology and expertise.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Customer satisfaction is my priority; I ensure your needs are met and expectations exceeded.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
      ],
      primary: { theme: "Green", title: null },
      id: "text_grid_row$1fda8cc8-84e0-4c66-8fc2-a3e3a8977edb",
      slice_type: "text_grid_row",
      slice_label: null,
    },
  },
};

export const Center: Story = {
  args: {
    slice: {
      variation: "centered",
      version: "initial",
      items: [
        {
          icon: {
            dimensions: { width: 512, height: 512 },
            alt: "Idea Icon",
            copyright: null,
            url: "https://images.prismic.io/ayseboogie/659ed4b67a5e8b1120d56b63_lightbulb.png?auto=format,compress",
            id: "ZZ7UtnpeixEg1Wtj",
            edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          },
          heading: "Ideation",
          text: [
            {
              type: "paragraph",
              text: "From concept to clarity, I refine ideas for a purpose-driven website that resonates with your audience.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Elevate your online presence with visually stunning interfaces and seamless user experiences",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Transforming ideas into high-performance websites using cutting-edge technology and expertise.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Customer satisfaction is my priority; I ensure your needs are met and expectations exceeded.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          icon: {
            dimensions: { width: 512, height: 512 },
            alt: "Design Icon",
            copyright: null,
            url: "https://images.prismic.io/ayseboogie/659ed4eb7a5e8b1120d56b67_web-design.png?auto=format,compress",
            id: "ZZ7U63peixEg1Wtn",
            edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          },
          heading: "Design",
          text: [
            {
              type: "paragraph",
              text: "From concept to clarity, I refine ideas for a purpose-driven website that resonates with your audience.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Elevate your online presence with visually stunning interfaces and seamless user experiences",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Transforming ideas into high-performance websites using cutting-edge technology and expertise.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Customer satisfaction is my priority; I ensure your needs are met and expectations exceeded.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          icon: {
            dimensions: { width: 512, height: 512 },
            alt: "Engineering Icon",
            copyright: null,
            url: "https://images.prismic.io/ayseboogie/659ed48d7a5e8b1120d56b5e_technology.png?auto=format,compress",
            id: "ZZ7UjXpeixEg1Wte",
            edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          },
          heading: "Engineering",
          text: [
            {
              type: "paragraph",
              text: "From concept to clarity, I refine ideas for a purpose-driven website that resonates with your audience.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Elevate your online presence with visually stunning interfaces and seamless user experiences",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Transforming ideas into high-performance websites using cutting-edge technology and expertise.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Customer satisfaction is my priority; I ensure your needs are met and expectations exceeded.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          icon: {
            dimensions: { width: 512, height: 512 },
            alt: "Service Icon",
            copyright: null,
            url: "https://images.prismic.io/ayseboogie/659ed5327a5e8b1120d56b6a_guarantee.png?auto=format,compress",
            id: "ZZ7VMnpeixEg1Wtq",
            edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          },
          heading: "Service",
          text: [
            {
              type: "paragraph",
              text: "From concept to clarity, I refine ideas for a purpose-driven website that resonates with your audience.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Elevate your online presence with visually stunning interfaces and seamless user experiences",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Transforming ideas into high-performance websites using cutting-edge technology and expertise.",
              spans: [],
              direction: "ltr",
            },

            {
              type: "paragraph",
              text: "Customer satisfaction is my priority; I ensure your needs are met and expectations exceeded.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
      ],
      primary: { theme: "Green", title: null },
      id: "text_grid_row$1fda8cc8-84e0-4c66-8fc2-a3e3a8977edb",
      slice_type: "text_grid_row",
      slice_label: null,
    },
  },
};
