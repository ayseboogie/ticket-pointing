import type { Meta, StoryObj } from "@storybook/nextjs";
import PricingStory from "./index";

export default {
  title: "Components/PricingStory",
  component: PricingStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/PricingStory",
  component: PricingStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PricingStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slice: {
      slice_type: "pricing",
      slice_label: null,
      variation: "default",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Simple, transparent pricing",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Choose the perfect plan for your needs. All plans include our core features with the flexibility to scale as you grow.",
            spans: [],
          },
        ],
        plans: [
          {
            name: "Starter",
            price: "$29/month",
            description: [
              {
                type: "paragraph",
                text: "Perfect for individuals and small teams just getting started.",
                spans: [],
              },
            ],
            register_link: {
              link_type: "Web",
              url: "https://example.com/register/starter",
            },
            features: [
              {
                type: "list-item",
                text: "Up to 10 projects",
                spans: [],
              },
              {
                type: "list-item",
                text: "5GB storage",
                spans: [],
              },
              {
                type: "list-item",
                text: "Basic analytics",
                spans: [],
              },
              {
                type: "list-item",
                text: "Email support",
                spans: [],
              },
            ],
            featured: false,
          },
          {
            name: "Professional",
            price: "$99/month",
            description: [
              {
                type: "paragraph",
                text: "Ideal for growing businesses that need advanced features.",
                spans: [],
              },
            ],
            register_link: {
              link_type: "Web",
              url: "https://example.com/register/professional",
            },
            features: [
              {
                type: "list-item",
                text: "Unlimited projects",
                spans: [],
              },
              {
                type: "list-item",
                text: "100GB storage",
                spans: [],
              },
              {
                type: "list-item",
                text: "Advanced analytics",
                spans: [],
              },
              {
                type: "list-item",
                text: "Priority support",
                spans: [],
              },
              {
                type: "list-item",
                text: "API access",
                spans: [],
              },
            ],
            featured: true,
          },
          {
            name: "Enterprise",
            price: "$299/month",
            description: [
              {
                type: "paragraph",
                text: "For large organizations with custom requirements.",
                spans: [],
              },
            ],
            register_link: {
              link_type: "Web",
              url: "https://example.com/register/enterprise",
            },
            features: [
              {
                type: "list-item",
                text: "Unlimited everything",
                spans: [],
              },
              {
                type: "list-item",
                text: "1TB storage",
                spans: [],
              },
              {
                type: "list-item",
                text: "Custom integrations",
                spans: [],
              },
              {
                type: "list-item",
                text: "Dedicated account manager",
                spans: [],
              },
              {
                type: "list-item",
                text: "SLA guarantee",
                spans: [],
              },
            ],
            featured: false,
          },
        ],
      },
    },
  },
};

export const WithPromo: Story = {
  args: {
    slice: {
      slice_type: "pricing",
      slice_label: null,
      variation: "withPromo",
      version: "initial",
      items: [],
      primary: {
        theme: "Blue",
        title: [
          {
            type: "heading2",
            text: "Flexible pricing plans",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Start with our free plan and upgrade as your business grows. Special introductory offer available for new customers.",
            spans: [],
          },
        ],
        plans: [
          {
            name: "Basic",
            price_monthly: "$49/month",
            description: [
              {
                type: "paragraph",
                text: "Everything you need to get started with your projects.",
                spans: [],
              },
            ],
            register_link: {
              link_type: "Web",
              url: "https://example.com/register/basic",
            },
            features: [
              {
                type: "list-item",
                text: "25 projects",
                spans: [],
              },
              {
                type: "list-item",
                text: "20GB storage",
                spans: [],
              },
              {
                type: "list-item",
                text: "Standard analytics",
                spans: [],
              },
              {
                type: "list-item",
                text: "Community support",
                spans: [],
              },
            ],
          },
          {
            name: "Business",
            price_monthly: "$149/month",
            description: [
              {
                type: "paragraph",
                text: "Advanced features for teams and growing businesses.",
                spans: [],
              },
            ],
            register_link: {
              link_type: "Web",
              url: "https://example.com/register/business",
            },
            features: [
              {
                type: "list-item",
                text: "Unlimited projects",
                spans: [],
              },
              {
                type: "list-item",
                text: "200GB storage",
                spans: [],
              },
              {
                type: "list-item",
                text: "Advanced analytics & reports",
                spans: [],
              },
              {
                type: "list-item",
                text: "24/7 priority support",
                spans: [],
              },
              {
                type: "list-item",
                text: "Team collaboration tools",
                spans: [],
              },
            ],
          },
        ],
        promo_title: [
          {
            type: "heading3",
            text: "Limited Time: 30% Off Your First 3 Months",
            spans: [],
          },
        ],
        promo_description: [
          {
            type: "paragraph",
            text: "New customers save 30% on any annual plan. Use code NEW2024 at checkout. Offer expires soon!",
            spans: [],
          },
        ],
        promo_link_label: "Learn More",
        promo_link: {
          link_type: "Web",
          url: "https://example.com/promo",
        },
      },
    },
  },
};

export const WithFilter: Story = {
  args: {
    slice: {
      slice_type: "pricing",
      slice_label: null,
      variation: "withFilter",
      version: "initial",
      items: [],
      primary: {
        theme: "Dark",
        title: [
          {
            type: "heading2",
            text: "Choose your billing cycle",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Save 20% when you choose annual billing. Switch between monthly and yearly plans anytime.",
            spans: [],
          },
        ],
        monthly_label: "Monthly",
        yearly_label: "Yearly (Save 20%)",
        plans: [
          {
            name: "Starter",
            price_monthly: "$29/month",
            price_yearly: "$278/year",
            description: [
              {
                type: "paragraph",
                text: "Perfect for individuals and freelancers.",
                spans: [],
              },
            ],
            register_link: {
              link_type: "Web",
              url: "https://example.com/register/starter",
            },
            features: [
              {
                type: "list-item",
                text: "10 projects",
                spans: [],
              },
              {
                type: "list-item",
                text: "5GB storage",
                spans: [],
              },
              {
                type: "list-item",
                text: "Basic features",
                spans: [],
              },
              {
                type: "list-item",
                text: "Email support",
                spans: [],
              },
            ],
          },
          {
            name: "Professional",
            price_monthly: "$99/month",
            price_yearly: "$950/year",
            description: [
              {
                type: "paragraph",
                text: "Ideal for small teams and growing businesses.",
                spans: [],
              },
            ],
            register_link: {
              link_type: "Web",
              url: "https://example.com/register/professional",
            },
            features: [
              {
                type: "list-item",
                text: "Unlimited projects",
                spans: [],
              },
              {
                type: "list-item",
                text: "100GB storage",
                spans: [],
              },
              {
                type: "list-item",
                text: "Advanced features",
                spans: [],
              },
              {
                type: "list-item",
                text: "Priority support",
                spans: [],
              },
              {
                type: "list-item",
                text: "API access",
                spans: [],
              },
            ],
          },
          {
            name: "Enterprise",
            price_monthly: "$299/month",
            price_yearly: "$2,870/year",
            description: [
              {
                type: "paragraph",
                text: "For large organizations with advanced needs.",
                spans: [],
              },
            ],
            register_link: {
              link_type: "Web",
              url: "https://example.com/register/enterprise",
            },
            features: [
              {
                type: "list-item",
                text: "Unlimited everything",
                spans: [],
              },
              {
                type: "list-item",
                text: "1TB storage",
                spans: [],
              },
              {
                type: "list-item",
                text: "Custom integrations",
                spans: [],
              },
              {
                type: "list-item",
                text: "Dedicated support",
                spans: [],
              },
              {
                type: "list-item",
                text: "SLA guarantee",
                spans: [],
              },
            ],
          },
        ],
        promo_title: [
          {
            type: "heading3",
            text: "Annual plans save you 20%",
            spans: [],
          },
        ],
        promo_description: [
          {
            type: "paragraph",
            text: "Lock in your rate and save with annual billing. Cancel anytime with our 30-day money-back guarantee.",
            spans: [],
          },
        ],
        promo_link_label: "View Comparison",
        promo_link: {
          link_type: "Web",
          url: "https://example.com/pricing-comparison",
        },
      },
    },
  },
};
