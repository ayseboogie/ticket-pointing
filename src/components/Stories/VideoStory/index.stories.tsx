import type { Meta, StoryObj } from "@storybook/nextjs";
import VideoStory from "./index";

export default {
  title: "Components/VideoStory",
  component: VideoStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/VideoStory",
  component: VideoStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VideoStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sliceType: "video",
    sliceVariation: "default",
    video: {
      embed_url: "https://youtu.be/C-hZXjP7sC0?si=I_wF37cfPNeiOB4-",
      type: "video",
      version: "1.0",
      title: "Creating a NextJS Typescript project using a Prismic CMS",
      author_name: "Ayse Stinnett",
      author_url: "https://www.youtube.com/@travelsizeio",
      provider_name: "YouTube",
      provider_url: "https://www.youtube.com/",
      thumbnail_url: "https://i.ytimg.com/vi/C-hZXjP7sC0/hqdefault.jpg",
      thumbnail_width: 480,
      thumbnail_height: 360,
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/C-hZXjP7sC0?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="Creating a NextJS Typescript project using a Prismic CMS"></iframe>',
      height: 113,
      width: 200,
    },
    caption: [
      {
        type: "paragraph",
        text: "Caption",
        spans: [],
      },
    ],
  },
};
