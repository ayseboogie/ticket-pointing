import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      serif: ["Merriweather", "serif"],
      sans: [
        "Benton Sans",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        background: "#F3EDE2",
        textMain: "#4A3B31",
        textSecondary: "#6D5F52",
        textLight: "#E2E8F0",
        accent: "#B08D57",
        highlight: "#9F6B53",
        softCream: "#EAE0D5",
        darkGrey: "#2F2C2A",
        red: "#8C1E14",

        // 🌟 Buttons
        btnPrimary: "#6D5F52",
        btnHover: "#9F6B53",
        btnDisabled: "#A8A7A6",

        //   slicify app
        "vibrant-blue": "#2563EB",
        "light-black": "#334155",
        "light-blue": "#60A5FA",
        "light-blue-70": "rgba(147, 197, 253, 0.7)",
        "light-gray": "#E2E8F0",
      },
      width: {},
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  // The `safelist` ensures that specific Tailwind classes are always included in the final CSS build,
  // even if they are not found in the source code. This is useful for dynamically generated class names,
  // CMS content, or third-party components that Tailwind might otherwise purge.
  safelist: [
    "text-background",
    "text-textMain",
    "text-textSecondary",
    "text-accent",
    "text-highlight",
    "text-DarkGrey",
    "text-red",
    "bg-background",
    "bg-textMain",
    "bg-textSecondary",
    "bg-accent",
    "bg-highlight",
    "bg-DarkGrey",
    "bg-red",
    "fill-background",
    "fill-textMain",
    "fill-textSecondary",
    "fill-accent",
    "fill-highlight",
    "fill-DarkGrey",
    "fill-red",

    "text-dark-blue",
    "text-vibrant-blue",
    "text-dark-gray",
    "text-light-black",
    "text-light-blue",
    "text-light-blue-70",
    "text-light-gray",
    "bg-dark-blue",
    "bg-vibrant-blue",
    "bg-dark-gray",
    "bg-light-black",
    "bg-light-blue",
    "bg-light-blue-70",
    "bg-light-gray",

    // Button warning/danger colors
    "border-red-600",
    "bg-red-600",
    "hover:bg-red-700",
    "hover:border-red-700",
  ],
  plugins: [],
};

export default config;
