import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/admin/",
          "/auth/",
          "/settings/",
          "/403/",
          "/(Artisan)/",
          "/(Client)/",
          "/(Admin)/",
        ],
      },
    ],
    sitemap: "https://artisanshub.org/sitemap.xml",
  };
}
