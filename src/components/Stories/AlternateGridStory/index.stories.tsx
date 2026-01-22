import type { Meta, StoryObj } from "@storybook/nextjs";
import AlternateGridStory from "./index";

export default {
  title: "Components/AlternateGridStory",
  component: AlternateGridStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/AlternateGridStory",
  component: AlternateGridStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AlternateGridStory>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sliceType: "alternate_grid",
    sliceVariation: "default",
    eyebrowHeadline: "default",
    title: [
      {
        type: "heading1",
        text: "Aenean leo ligula",
        spans: [],
        // "direction": "ltr"
      },
    ],
    description: [
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet sagittis nisl, eu fermentum neque. Curabitur nec nisl vel justo tristique auctor. Nam tincidunt nisi at magna consectetur, id iaculis nisi dignissim. Sed hendrerit auctor augue, id maximus felis mollis eu. Fusce auctor neque ut arcu tristique, ac iaculis eros hendrerit.",
        spans: [],
        // "direction": "ltr"
      },
    ],
    image: {
      dimensions: {
        width: 5460,
        height: 3640,
      },
      alt: "yellow lemon fruit on white surface",
      copyright: null,
      url: "https://images.unsplash.com/photo-1582287104445-6754664dbdb2?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxMnx8Y2l0cnVzJTIwZnJ1aXR8ZW58MHx8fHwxNzEzNzAxNTk3fDA&ixlib=rb-4.0.3&q=85?auto=compress,format",
      id: "7WAGthfGJ9w",
      edit: {
        x: 0,
        y: 0,
        zoom: 1,
        background: "transparent",
      },
    },
    sliceItems: [
      {
        title: [
          {
            type: "heading2",
            text: "Vestibulum euismod",
            spans: [],
            direction: "ltr",
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Nulla facilisi. Vivamus et diam ut turpis consectetur tristique eget a dui. Fusce vehicula lorem nec orci vehicula, vitae suscipit magna pharetra.",
            spans: [],
            direction: "ltr",
          },
        ],
      },
      {
        title: [
          {
            type: "heading2",
            text: "Curabitur sollicitudin",
            spans: [],
            direction: "ltr",
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Sed ac est ac libero fermentum convallis. Aliquam erat volutpat. Duis scelerisque lorem non nisi faucibus, a sagittis lectus tincidunt.",
            spans: [],
            direction: "ltr",
          },
        ],
      },
    ],
  },
};

export const ImageRight: Story = {
  args: {
    sliceType: "alternate_grid",
    sliceVariation: "imageRight",
    eyebrowHeadline: "default",
    title: [
      {
        type: "heading1",
        text: "Praesent ultrices bibendum",
        spans: [],
      },
    ],
    description: [
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet ante eget felis facilisis, nec fermentum orci luctus. Vivamus pretium augue nec magna gravida, a venenatis odio tristique. Proin luctus tortor quis sapien pretium, in tincidunt eros fermentum. Nulla vehicula ipsum eu risus vulputate, id gravida nisl aliquam.",
        spans: [],
      },
    ],
    image: {
      dimensions: {
        width: 5460,
        height: 3640,
      },
      alt: "yellow lemon fruit on white surface",
      copyright: null,
      url: "https://images.unsplash.com/photo-1582287104445-6754664dbdb2?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxMnx8Y2l0cnVzJTIwZnJ1aXR8ZW58MHx8fHwxNzEzNzAxNTk3fDA&ixlib=rb-4.0.3&q=85?auto=compress,format",
      id: "7WAGthfGJ9w",
      edit: {
        x: 0,
        y: 0,
        zoom: 1,
        background: "transparent",
      },
    },
    sliceItems: [
      {
        title: [
          {
            type: "heading2",
            text: "Nunc aliquet urna",
            spans: [],
            direction: "ltr",
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Cras sit amet nisi ut felis feugiat aliquet. Integer et justo in magna ullamcorper maximus a eget sapien. Vestibulum facilisis eros vel ipsum malesuada, eu dapibus felis eleifend.",
            spans: [],
            direction: "ltr",
          },
        ],
      },
      {
        title: [
          {
            type: "heading2",
            text: "Morbi consequat dui",
            spans: [],
            direction: "ltr",
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Etiam id turpis eu neque placerat fermentum. Vivamus sit amet velit feugiat, convallis sapien a, egestas lorem. Donec faucibus odio sit amet eros tincidunt, ac auctor odio fermentum.",
            spans: [],
            direction: "ltr",
          },
        ],
      },
    ],
  },
};
