import "../src/styles/reset.css";
import "../src/styles/variables.css";
import "../src/styles/animations.css";
import "../src/styles/global.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "Momentum",
      values: [
        { name: "Momentum", value: "#FAF7F2" },
        { name: "Dark", value: "#1A1A2E" },
      ],
    },
    layout: "centered",
    a11y: { test: "todo" },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "App theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? "light";
      document.documentElement.setAttribute("data-theme", theme);
      return <Story />;
    },
  ],
};

export default preview;
