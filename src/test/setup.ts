import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

// jsdom does not implement replaceState fully for URL rewriting used by the hook
const originalReplaceState = window.history.replaceState.bind(window.history);
window.history.replaceState = ((state, unused, url) => {
  if (typeof url === "string") {
    window.history.pushState(state, unused, url);
    return;
  }
  originalReplaceState(state, unused, url);
}) as History["replaceState"];
