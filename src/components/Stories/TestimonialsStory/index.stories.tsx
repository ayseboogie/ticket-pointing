import type { Meta, StoryObj } from "@storybook/nextjs";
import TestimonialsStory from "./index";

export default {
  title: "Components/TestimonialsStory",
  component: TestimonialsStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/TestimonialsStory",
  component: TestimonialsStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TestimonialsStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slice: {
      slice_type: "testimonials",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "What Our Customers Say",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Don't just take our word for it. Here's what our customers have to say about working with us.",
            spans: [],
          },
        ],
        quotes: [
          {
            quote: [
              {
                type: "paragraph",
                text: "This platform has completely transformed how we work. The team is responsive, the features are intuitive, and the support is outstanding.",
                spans: [],
              },
            ],
            author: [
              {
                type: "paragraph",
                text: "Sarah Johnson",
                spans: [],
              },
            ],
            author_role: [
              {
                type: "paragraph",
                text: "CEO, TechStart Inc.",
                spans: [],
              },
            ],
            author_image: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?rect=0%2C0%2C4000%2C4000&w=56&h=56",
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
            quote: [
              {
                type: "paragraph",
                text: "The best investment we've made this year. Our productivity has increased by 40% since implementing this solution.",
                spans: [],
              },
            ],
            author: [
              {
                type: "paragraph",
                text: "Michael Chen",
                spans: [],
              },
            ],
            author_role: [
              {
                type: "paragraph",
                text: "CTO, Innovation Labs",
                spans: [],
              },
            ],
            author_image: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?rect=0%2C0%2C4000%2C4000&w=56&h=56",
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
            quote: [
              {
                type: "paragraph",
                text: "Outstanding service and a product that actually delivers on its promises. We couldn't be happier with our decision.",
                spans: [],
              },
            ],
            author: [
              {
                type: "paragraph",
                text: "Emily Rodriguez",
                spans: [],
              },
            ],
            author_role: [
              {
                type: "paragraph",
                text: "VP of Operations, Global Solutions",
                spans: [],
              },
            ],
            author_image: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?rect=0%2C0%2C4000%2C4000&w=56&h=56",
              id: "main",
              edit: {
                x: 0,
                y: 0,
                zoom: 1,
                background: "transparent",
              },
            },
          },
        ],
        anchor: "testimonials",
      },
    },
  },
};

export const ScrollingCards: Story = {
  args: {
    slice: {
      slice_type: "testimonials",
      slice_label: null,
      variation: "scrollingCards",
      version: "initial",
      items: [],
      primary: {
        theme: "Light",
        title: [
          {
            type: "heading2",
            text: "Trusted by Industry Leaders",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "See why thousands of companies trust us to power their business.",
            spans: [],
          },
        ],
        quotes: [
          {
            quote: [
              {
                type: "paragraph",
                text: "Game-changing technology that's made our operations smoother and more efficient than ever before.",
                spans: [],
              },
            ],
            author: [
              {
                type: "paragraph",
                text: "David Kim",
                spans: [],
              },
            ],
            author_role: [
              {
                type: "paragraph",
                text: "Product Manager, ScaleUp Co.",
                spans: [],
              },
            ],
            author_image: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?rect=0%2C0%2C4000%2C4000&w=56&h=56",
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
            quote: [
              {
                type: "paragraph",
                text: "The support team is incredible. Every question answered quickly, every issue resolved promptly.",
                spans: [],
              },
            ],
            author: [
              {
                type: "paragraph",
                text: "Jessica Martinez",
                spans: [],
              },
            ],
            author_role: [
              {
                type: "paragraph",
                text: "Operations Director, GrowthTech",
                spans: [],
              },
            ],
            author_image: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?rect=0%2C0%2C4000%2C4000&w=56&h=56",
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
            quote: [
              {
                type: "paragraph",
                text: "Simple, powerful, and exactly what we needed. Our team adopted it immediately with no learning curve.",
                spans: [],
              },
            ],
            author: [
              {
                type: "paragraph",
                text: "James Wilson",
                spans: [],
              },
            ],
            author_role: [
              {
                type: "paragraph",
                text: "Founder, StartupHub",
                spans: [],
              },
            ],
            author_image: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?rect=0%2C0%2C4000%2C4000&w=56&h=56",
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
            quote: [
              {
                type: "paragraph",
                text: "ROI was visible within the first month. This platform pays for itself many times over.",
                spans: [],
              },
            ],
            author: [
              {
                type: "paragraph",
                text: "Amanda Taylor",
                spans: [],
              },
            ],
            author_role: [
              {
                type: "paragraph",
                text: "CMO, Enterprise Solutions",
                spans: [],
              },
            ],
            author_image: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?rect=0%2C0%2C4000%2C4000&w=56&h=56",
              id: "main",
              edit: {
                x: 0,
                y: 0,
                zoom: 1,
                background: "transparent",
              },
            },
          },
        ],
        anchor: "testimonials",
      },
    },
  },
};

export const TwoColumnsWithSeparator: Story = {
  args: {
    slice: {
      slice_type: "testimonials",
      slice_label: null,
      variation: "twoColumnsWithSeparator",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        anchor: "testimonials",
        company_logo_column_1: {
          dimensions: {
            width: 32,
            height: 48,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?rect=0%2C0%2C3560%2C5340&w=32&h=48",
          id: "main",
          edit: {
            x: 0,
            y: 0,
            zoom: 1,
            background: "transparent",
          },
        },
        quote_column_1: [
          {
            type: "paragraph",
            text: "We've seen incredible results since implementing this platform. Our team collaboration has improved dramatically, and we're shipping features faster than ever.",
            spans: [],
          },
        ],
        author_column_1: [
          {
            type: "paragraph",
            text: "Robert Anderson",
            spans: [],
          },
        ],
        author_role_column_1: [
          {
            type: "paragraph",
            text: "Engineering Lead, CloudTech",
            spans: [],
          },
        ],
        author_image_column_1: {
          dimensions: {
            width: 56,
            height: 56,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?rect=0%2C0%2C4000%2C4000&w=56&h=56",
          id: "main",
          edit: {
            x: 0,
            y: 0,
            zoom: 1,
            background: "transparent",
          },
        },
        company_logo_column_2: {
          dimensions: {
            width: 72,
            height: 48,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?rect=0%2C0%2C6597%2C4398&w=72&h=48",
          id: "main",
          edit: {
            x: 0,
            y: 0,
            zoom: 1,
            background: "transparent",
          },
        },
        quote_column_2: [
          {
            type: "paragraph",
            text: "The best decision we made this quarter. The platform is intuitive, reliable, and the ROI was immediate.",
            spans: [],
          },
        ],
        author_column_2: [
          {
            type: "paragraph",
            text: "Lisa Thompson",
            spans: [],
          },
        ],
        author_role_column_2: [
          {
            type: "paragraph",
            text: "VP of Product, NextGen Solutions",
            spans: [],
          },
        ],
        author_image_column_2: {
          dimensions: {
            width: 56,
            height: 56,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?rect=0%2C0%2C4000%2C4000&w=56&h=56",
          id: "main",
          edit: {
            x: 0,
            y: 0,
            zoom: 1,
            background: "transparent",
          },
        },
      },
    },
  },
};

export const SingleCentered: Story = {
  args: {
    slice: {
      slice_type: "testimonials",
      slice_label: null,
      variation: "singleCentered",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        anchor: "testimonials",
        company_logo: {
          dimensions: {
            width: 48,
            height: 48,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1571126770897-2d612d1f7b89?rect=0%2C0%2C3456%2C3456&w=48&h=48",
          id: "main",
          edit: {
            x: 0,
            y: 0,
            zoom: 1,
            background: "transparent",
          },
        },
        quote: [
          {
            type: "paragraph",
            text: "This platform has revolutionized the way our team works. The seamless integration and powerful features have helped us achieve goals we never thought possible.",
            spans: [],
          },
        ],
        author: [
          {
            type: "paragraph",
            text: "Sarah Johnson",
            spans: [],
          },
        ],
        author_role: [
          {
            type: "paragraph",
            text: "CEO, TechStart Inc.",
            spans: [],
          },
        ],
        author_image: {
          dimensions: {
            width: 56,
            height: 56,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?rect=0%2C0%2C4000%2C4000&w=56&h=56",
          id: "main",
          edit: {
            x: 0,
            y: 0,
            zoom: 1,
            background: "transparent",
          },
        },
      },
    },
  },
};

export const SingleWithLargeImage: Story = {
  args: {
    slice: {
      slice_type: "testimonials",
      slice_label: null,
      variation: "singleWithLargeImage",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        quote: [
          {
            type: "paragraph",
            text: "The impact has been transformative. We've streamlined our workflows, improved team collaboration, and delivered better results to our customers. This is the tool we've been waiting for.",
            spans: [],
          },
        ],
        author: [
          {
            type: "paragraph",
            text: "Michael Chen",
            spans: [],
          },
        ],
        author_role: [
          {
            type: "paragraph",
            text: "Chief Technology Officer, Innovation Labs",
            spans: [],
          },
        ],
        author_image: {
          dimensions: {
            width: 56,
            height: 56,
          },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?rect=0%2C0%2C4000%2C4000&w=56&h=56",
          id: "main",
          edit: {
            x: 0,
            y: 0,
            zoom: 1,
            background: "transparent",
          },
        },
        anchor: "testimonials",
      },
    },
  },
};
