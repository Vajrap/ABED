import { serve } from "bun";
import { file } from "bun";

const LONG_CACHE_EXTENSIONS = new Set([
  ".mp3",
  ".mp4",
  ".js",
  ".css",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
]);

serve({
  port: 3000,
  async fetch(req) {
    let path = new URL(req.url).pathname;

    // for client-side routing (React Router):
    if (path === "/" || !file("dist" + path).exists()) {
      return new Response(file("dist/index.html"), {
        headers: {
          "Cache-Control": "public, max-age=0, must-revalidate",
        },
      });
    }

    const targetFile = file("dist" + path);
    const ext = path.includes(".") ? path.slice(path.lastIndexOf(".")).toLowerCase() : "";
    const headers =
      LONG_CACHE_EXTENSIONS.has(ext)
        ? { "Cache-Control": "public, max-age=31536000, immutable" }
        : { "Cache-Control": "public, max-age=0, must-revalidate" };

    return new Response(targetFile, { headers });
  },
});
