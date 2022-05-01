import { GetCSSFn, ILayout, LayoutComponent } from "../types";
import { authors } from "./authors";
import { colourThemes, defaultTheme } from "./colours";
import { getTheme, Markdown, Logo } from "./utils";

const getCSS: GetCSSFn = config => {
  const theme = getTheme(config);
  const colours = colourThemes[theme];

  return `
    body {
      color: ${colours.fg};
      background: ${colours.bg};
    }

    h1 {
      font-size: 100px;
      margin: 75px 0;
    }

    h2 {
      font-size: 50px;
      margin-top: 25px;
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  const title = config.Title;
  const author = config.Author;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo config={config} style={{ height: 150, width: 150 }} />
      <h1>
        <Markdown>{title}</Markdown>
      </h1>

      <h2 style={{ display: "flex" }}>
        <Markdown style={{ fontWeight: 400 }}>Written by&nbsp;</Markdown>
        <Markdown>{author}</Markdown>
      </h2>
    </div>
  );
};

export const blogLayout: ILayout = {
  name: "Blog",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light"],
      default: defaultTheme,
    },
    {
      name: "Title",
      type: "text",
      default: "Hey! I'm using BugBlogs & I'm loving it!",
      placeholder: "What's your blog's title?",
    },
    {
      name: "Author",
      type: "text",
      default: "Keshav Malik",
      placeholder: "Who's the author?",
    },
  ],
  getCSS,
  Component,
};
