import { writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const generateSitemap = async () => {
  const baseUrl = "https://mrquizer.com";
  const staticRoutes = [
    "",
    "/about",
    "/change-log",
    "/privacy-policy",
    "/terms",
  ];
  let dynamicRoutes = [];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <priority>1.0</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  const filePath = join(
    join(fileURLToPath(import.meta.url), ".."),
    "../public/sitemap.xml"
  );
  writeFileSync(filePath, sitemap, "utf-8");
  console.log("Sitemap generated at:", filePath);
};

generateSitemap().catch((error) => {
  console.error("Error generating sitemap:", error);
});
