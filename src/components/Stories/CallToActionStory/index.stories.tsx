import type { Meta, StoryObj } from "@storybook/nextjs";
import CallToActionStory from "./index";

export default {
  title: "Components/CallToActionStory",
  component: CallToActionStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/CallToActionStory",
  component: CallToActionStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CallToActionStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slice: {
      slice_type: "call_to_action",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        theme: "Light",
        title: [
          {
            type: "heading2",
            text: "Stranger",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Aliqua sit magna minim dolore incididunt. Irure ea culpa culpa amet cupidatat culpa fugiat. Culpa laborum duis nostrud ea aute elit dolore est labore do ex ipsum occaecat ullamco.",
            spans: [],
          },
        ],
        cta_label: "correct",
        cta_link: {
          link_type: "Web",
          url: "https://slicemachine.dev",
        },
        anchor: "seems",
      },
    },
  },
};

export const WithImageRight: Story = {
  args: {
    slice: {
      slice_type: "call_to_action",
      slice_label: null,
      variation: "withImageRight",
      version: "initial",
      items: [],
      primary: {
        theme: "Blue",
        title: [
          {
            type: "heading2",
            text: "Might",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Laborum laborum elit laboris ad excepteur Lorem sunt adipisicing. Amet est reprehenderit sit.",
            spans: [],
          },
        ],
        anchor: "hole",
        featured_image: {
          dimensions: {
            width: 912,
            height: 615,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1531771686035-25f47595c87a?rect=0%2C869%2C3024%2C2039&w=912&h=615",
          id: "main",
          edit: {
            x: 0,
            y: 869,
            zoom: 1,
            background: "transparent",
          },
        },
        buttons: [
          {
            cta_label: "harbor",
            cta_link: {
              link_type: "Web",
              url: "https://prismic.io",
            },
            cta_type: "Primary",
          },
        ],
      },
    },
  },
};

export const WithImageLeft: Story = {
  args: {
    slice: {
      slice_type: "call_to_action",
      slice_label: null,
      variation: "withImageLeft",
      version: "initial",
      items: [],
      primary: {
        theme: "Dark",
        title: [
          {
            type: "heading2",
            text: "Student",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Mollit nulla duis aute velit. Esse labore ullamco sint nostrud consectetur adipisicing non consectetur aliquip deserunt adipisicing.",
            spans: [],
          },
        ],
        anchor: "main",
        featured_image: {
          dimensions: {
            width: 912,
            height: 615,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1600804931749-2da4ce26c869?rect=0%2C521%2C3199%2C2157&w=912&h=615",
          id: "main",
          edit: {
            x: 0,
            y: 521,
            zoom: 1,
            background: "transparent",
          },
        },
        buttons: [
          {
            cta_label: "cover",
            cta_link: {
              link_type: "Web",
              url: "http://google.com",
            },
            cta_type: "Secondary",
          },
        ],
      },
    },
  },
};
