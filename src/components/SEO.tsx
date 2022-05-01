import * as React from "react";
import { DefaultSeo, NextSeo, NextSeoProps } from "next-seo";
import Head from "next/head";
import { DefaultSeoProps } from "next-seo";

export interface Props extends NextSeoProps {
  title?: string;
  description?: string;
  image?: string;
}

const title = "BugBlogs OG Image Generator";
export const url = "";
const description = "Service that generates dynamic OG images for BugBlogs";

// Generate OG image for itself
const image = "";

const config: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    site_name: title,
    images: [{ url: image }],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export const SEO: React.FC<Props> = ({ image, ...props }) => {
  const title = props.title ?? config.title;
  const description = props.description || config.description;

  return (
    <>
      <DefaultSeo {...config} />

      <NextSeo
        {...props}
        {...(image == null
          ? {}
          : {
              openGraph: {
                images: [{ url: image }],
              },
            })}
      />

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  );
};
