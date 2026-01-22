// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/nextjs";
const require = createRequire(import.meta.url);
const glob = require("glob");

const getStoriesPaths = () => {
  return [
    ".slicemachine/assets/**/*.stories.@(js|jsx|ts|tsx|svelte)",
    "customtypes/**/*.stories.@(js|jsx|ts|tsx|svelte)",
  ].reduce(
    (acc: string[], p: string) =>
      glob.sync(p).length
        ? [...acc, ...glob.sync(p).map((path: string) => `../${path}`)]
        : acc,
    [],
  );
};

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ...getStoriesPaths(),
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {},
  // staticDirs: ["../public"],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {}, // Available only when reactDocgen is set to 'react-docgen-typescript'
    skipCompiler: true,
  },
};
export default config;
