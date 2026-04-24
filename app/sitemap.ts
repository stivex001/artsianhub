import { MetadataRoute } from "next";

const BASE = "https://artisanshub.org";
const API = "https://api.artisanshub.org";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/`, priority: 1.0, changeFrequency: "daily" },
  { url: `${BASE}/artisans`, priority: 0.9, changeFrequency: "daily" },
  { url: `${BASE}/creative-artisans`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE}/skilled-artisans`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE}/digital-artisans`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE}/fashion-marketplace`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE}/learn-skills`, priority: 0.7, changeFrequency: "weekly" },
  { url: `${BASE}/about`, priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE}/faq`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${BASE}/contact-us`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${BASE}/support`, priority: 0.4, changeFrequency: "monthly" },
  { url: `${BASE}/privacy`, priority: 0.3, changeFrequency: "yearly" },
  { url: `${BASE}/terms`, priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let artisanRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${API}/artisans?limit=500&page=1`, {
      next: { revalidate: 3600 }, // rebuild artisan URLs at most once per hour
    });

    if (res.ok) {
      const json = await res.json();
      const artisans: { _id: string; updatedAt?: string }[] =
        json?.data ?? json?.artisans ?? [];

      artisanRoutes = artisans.map((a) => ({
        url: `${BASE}/artisan-details/${a._id}`,
        lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(),
        priority: 0.8,
        changeFrequency: "weekly" as const,
      }));
    }
  } catch {
    // API unavailable at build time — sitemap still valid for static routes
  }

  return [...staticRoutes, ...artisanRoutes];
}
