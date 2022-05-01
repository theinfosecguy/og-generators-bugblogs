import { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import tw from "twin.macro";
import { Field, Label } from "../components/Field";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { Select } from "../components/Select";
import { OG_HEIGHT, OG_WIDTH } from "../constants";
import { useConfig } from "../hooks/useConfig";
import { useCopy } from "../hooks/useCopy";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useIsMounted } from "../hooks/useIsMounted";
import { useLayoutConfig } from "../hooks/useLayoutConfig";
import { layouts } from "../layouts";
import { FileType } from "../types";

const Home: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <main tw="px-6 pb-20 max-w-6xl w-full mx-auto">
      <header tw="text-center mt-20 mb-12 space-y-6">
        <h1 tw="text-5xl font-bold">BugBlogs OG Image Generator</h1>
        <h3 tw="text-xl text-gray-300">
          Generate Dynamic Open Graph Images for your Blogs
        </h3>
      </header>
      {isMounted && (
        <section tw="grid gap-y-8 md:gap-8 grid-cols-1 md:grid-cols-3">
          <Config />
          <Viewer />
        </section>
      )}{" "}
      <footer tw="text-center mt-12">
        <p tw="text-sm text-gray-300">
          Build on top of{" "}
          <Link href="https://github.com/railwayapp/og-generator">
            Railway OG Generator
          </Link>{" "}
          by{" "}
          <strong>
            <Link href="https://github.com/theinfosecguy">@theinfosecguy</Link>
          </strong>
        </p>
      </footer>
    </main>
  );
};

export default Home;

export const Config: React.FC = () => {
  const [{ fileType, layoutName }, setConfig] = useConfig();

  const layout = useMemo(
    () => layouts.find(l => l.name === layoutName),
    [layoutName],
  );

  return (
    <div tw="space-y-4 md:mt-8">
      <Field>
        <Label>File Type</Label>
        <Select
          value={fileType}
          options={[{ value: "png" }]}
          onChange={fileType =>
            setConfig(c => ({ ...c, fileType: fileType as FileType }))
          }
        />
      </Field>

      <Field>
        <Label>Layout</Label>
        <Select
          value={layoutName}
          options={layouts.map(l => ({ value: l.name }))}
          onChange={layoutName => setConfig(c => ({ ...c, layoutName }))}
        />
      </Field>

      {layout == null ? (
        <p>Layout {layoutName} does not exist</p>
      ) : (
        <Layout layout={layout} key={layout.name} />
      )}
    </div>
  );
};

export const Viewer: React.FC = () => {
  const [config] = useConfig();
  const [layoutConfig] = useLayoutConfig();
  const [isCopied, copy] = useCopy();
  const [isLoaded, setIsLoaded] = useState(true);

  const query = useMemo(() => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...config, ...layoutConfig })) {
      if (value != null) {
        searchParams.set(key, value);
      }
    }

    return searchParams.toString();
  }, [config, layoutConfig]);

  const imageURL = useMemo(() => `/api/image?${query}`, [query]);

  const debouncedImageURL = useDebouncedValue(imageURL, 200);
  useEffect(() => setIsLoaded(false), [debouncedImageURL]);

  return (
    <div tw="space-y-4 w-full col-span-2">
      <div
        className="image-wrapper"
        css={[
          tw`w-full relative`,
          { paddingTop: `${(OG_HEIGHT / OG_WIDTH) * 100}%` },
        ]}
      >
        <img
          css={[
            tw`absolute inset-0 shadow-lg w-full`,
            !isLoaded && {
              filter: "blur(5px)",
            },
          ]}
          src={debouncedImageURL}
          alt={`OG Image for the ${config.layoutName} layout`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      <div className="buttons" tw="flex space-x-2 justify-between">
        <button
          style={{
            background:
              "linear-gradient(135deg, rgb(102, 153, 255) 0%, rgb(255, 51, 102) 100%)",
            color: "rgb(255, 255, 255)",
            boxShadow: "0 10px 20px -10px var(--shadow-color-nebula)",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
          }}
          onClick={() => copy(`${window.location.origin}${imageURL}`)}
        >
          {isCopied ? "Copied!" : "Copy Image URL"}
        </button>
      </div>
    </div>
  );
};
