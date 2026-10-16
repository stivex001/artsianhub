import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/artisan/",
          "/client/",
          "/auth/",
          "/settings/",
          "/403/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://artisanshub.org/sitemap.xml",
  };
}
