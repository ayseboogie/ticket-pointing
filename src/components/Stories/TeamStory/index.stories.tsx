import type { Meta, StoryObj } from "@storybook/nextjs";
import TeamStory from "./index";

export default {
  title: "Components/TeamStory",
  component: TeamStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/TeamStory",
  component: TeamStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TeamStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slice: {
      slice_type: "team",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        theme: "Blue",
        title: [
          {
            type: "heading2",
            text: "Meet Our Team",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "We're a diverse group of professionals dedicated to building great products and making a positive impact.",
            spans: [],
          },
        ],
        board_group_label: "Board of Directors",
        board_members: [
          {
            name: "Sarah Johnson",
            role: "Chairman & CEO",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?rect=792%2C0%2C3168%2C3168&w=560&h=560",
              id: "main",
              edit: { x: 792, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            name: "Michael Chen",
            role: "Chief Technology Officer",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?rect=0%2C0%2C4000%2C4000&w=560&h=560",
              id: "main",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            name: "Emily Rodriguez",
            role: "Chief Financial Officer",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?rect=0%2C0%2C4000%2C4000&w=560&h=560",
              id: "main",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
        ],
        team_group_label: "Leadership Team",
        team_members: [
          {
            name: "David Kim",
            role: "VP of Engineering",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?rect=0%2C0%2C4000%2C4000&w=560&h=560",
              id: "main",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            name: "Jessica Martinez",
            role: "VP of Product",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?rect=0%2C0%2C4000%2C4000&w=560&h=560",
              id: "main",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            name: "James Wilson",
            role: "VP of Sales",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?rect=0%2C0%2C4000%2C4000&w=560&h=560",
              id: "main",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            name: "Amanda Taylor",
            role: "VP of Marketing",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?rect=0%2C0%2C4000%2C4000&w=560&h=560",
              id: "main",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            name: "Robert Anderson",
            role: "VP of Operations",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?rect=0%2C0%2C4000%2C4000&w=560&h=560",
              id: "main",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
          {
            name: "Lisa Thompson",
            role: "VP of Human Resources",
            member_photo: {
              dimensions: { width: 560, height: 560 },
              alt: null,
              copyright: null,
              url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?rect=0%2C0%2C4000%2C4000&w=560&h=560",
              id: "main",
              edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
            },
          },
        ],
      },
    },
  },
};
