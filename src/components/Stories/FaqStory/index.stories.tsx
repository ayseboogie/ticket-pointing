import type { Meta, StoryObj } from "@storybook/nextjs";
import FaqStory from "./index";

export default {
  title: "Components/FaqStory",
  component: FaqStory,
  tags: ["autodocs"],
};
const meta = {
  title: "Components/FaqStory",
  component: FaqStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FaqStory>;

type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: {
    slice: {
      slice_type: "faq",
      slice_label: null,
      variation: "threeColumns",
      version: "initial",
      items: [],
      primary: {
        theme: "Blue",
        title: [
          {
            type: "heading2",
            text: "Frequently Asked Questions",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Everything you need to know about our products and services. Can't find what you're looking for? Please contact our support team.",
            spans: [],
          },
        ],
        faq: [
          {
            question: [
              {
                type: "paragraph",
                text: "What is your refund policy?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "We offer a 30-day money-back guarantee on all purchases. If you're not satisfied with your purchase, you can return it within 30 days for a full refund, no questions asked.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "How do I cancel my subscription?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "You can cancel your subscription at any time from your account settings. Simply go to the Billing section and click 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Do you offer technical support?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Yes, we offer 24/7 technical support via email, live chat, and phone. Our support team is available around the clock to help you with any questions or issues you may have.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "What payment methods do you accept?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through our encrypted payment gateway.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Can I upgrade or downgrade my plan?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate the difference on your next billing cycle.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Is there a free trial available?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Yes, we offer a 14-day free trial with full access to all features. No credit card required. You can cancel anytime during the trial period without being charged.",
                spans: [],
              },
            ],
          },
        ],
        anchor: "faq",
      },
    },
  },
};

export const TwoColumns: Story = {
  args: {
    slice: {
      slice_type: "faq",
      slice_label: null,
      variation: "twoColumns",
      version: "initial",
      items: [],
      primary: {
        theme: "White",
        title: [
          {
            type: "heading2",
            text: "Common Questions",
            spans: [],
          },
        ],
        description: [
          {
            type: "paragraph",
            text: "Find answers to the most commonly asked questions about our platform. Need more help? Our team is here to assist you.",
            spans: [],
          },
        ],
        faq: [
          {
            question: [
              {
                type: "paragraph",
                text: "How secure is my data?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "We take data security seriously. All data is encrypted in transit and at rest using industry-standard encryption protocols. We're also SOC 2 Type II certified and GDPR compliant, ensuring the highest levels of data protection.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "What happens if I exceed my plan limits?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "If you exceed your plan limits, we'll notify you and give you the option to upgrade your plan. We never cut off your service abruptly - you'll have time to adjust your usage or upgrade to a higher tier.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Can I export my data?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Yes, you can export all your data at any time in multiple formats (JSON, CSV, PDF). Simply go to your account settings and click 'Export Data'. Your data export will be available for download within 24 hours.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Do you offer API access?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Yes, we provide a comprehensive REST API for all our plans. Enterprise customers also get access to webhooks and GraphQL endpoints. Full API documentation is available in our developer portal.",
                spans: [],
              },
            ],
          },
        ],
        anchor: "faq",
      },
    },
  },
};

export const Centered: Story = {
  args: {
    slice: {
      slice_type: "faq",
      slice_label: null,
      variation: "centered",
      version: "initial",
      items: [],
      primary: {
        theme: "Light",
        title: [
          {
            type: "heading2",
            text: "Got Questions? We've Got Answers",
            spans: [],
          },
        ],
        faq: [
          {
            question: [
              {
                type: "paragraph",
                text: "How long does setup take?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Setup is quick and easy - it typically takes less than 5 minutes to get started. Just sign up, verify your email, and you're ready to go. Our onboarding wizard will guide you through the process step by step.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "What integrations are available?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "We integrate with over 100 popular tools including Slack, Microsoft Teams, Google Workspace, Salesforce, and many more. You can also use our API to build custom integrations for your specific needs.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Do you offer discounts for annual plans?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Yes! When you choose an annual plan, you'll save 20% compared to monthly billing. Annual plans also include priority support and exclusive features not available on monthly plans.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Can I change my plan later?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Absolutely. You can upgrade, downgrade, or change your plan at any time with no penalties or fees. Changes take effect immediately, and we'll handle the billing adjustments automatically.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "What kind of training do you provide?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "We offer comprehensive training resources including video tutorials, documentation, webinars, and one-on-one onboarding sessions. Enterprise customers also get dedicated account management and customized training programs.",
                spans: [],
              },
            ],
          },
        ],
        anchor: "faq",
      },
    },
  },
};
