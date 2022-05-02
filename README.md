# BugBlogs OG Image Generator ⚡

[![Sample Image](https://og.bugblogs.tech/api/image?fileType=png&layoutName=Blog&Theme=Dark&Title=Hey%21+I%27m+using+BugBlogs+%26+I%27m+loving+it%21&Author=Keshav+Malik)](https://bugblogs.tech)

Service that dynamically generates [Open Graph](https://ogp.me/) images for [BugBlogs](https://bugblogs.tech).

## How It Works? ⁉️

Images are generated through the `/api/image` route. When you hit this route the following happens

- Query params are parsed
- Layout is looked up in list of layouts (Supports Blog Layout Only) using the `layoutName` query param
- `layout.getCSS` called with all query params
- `layout.Component` is rendered with all query params as `config` prop
- HTML page built, rendered with Puppeteer, and screenshot
- Screenshot returned with a long cache max age

## How to setup? 🚀

The frontend is a [NextJS](https://nextjs.org) site and the image generation happens in an API route.

```
# Start local development server
npm run dev

# Build for production
npm run build

# Start in production
npm start
```

## 🙌 Acknowledgement

Credit where credit is due. This started as a forked repo from [Railway's OG image generator](https://github.com/vercel/og-image). It is modified to suit the needs of [BugBlogs](https://bugblogs.tech).
