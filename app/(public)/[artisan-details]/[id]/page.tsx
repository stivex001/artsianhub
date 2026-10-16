import type { Metadata } from "next";
import { ArtisanContent } from "@/components/Client/ArtisanContent";
import { JsonLd } from "@/components/seo/JsonLd";

const API = "https://api.artisanshub.org";
const BASE = "https://artisanshub.org";

interface Props {
  params: Promise<{ id: string }>;
}

async function fetchArtisan(id: string) {
  try {
    const res = await fetch(`${API}/artisans/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const a = await fetchArtisan(id);

  if (!a) {
    return {
      title: "Artisan Profile",
      description: "View this artisan's profile, portfolio, and services on ArtisansHub.",
    };
  }

  const name = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim();
  const title = a.professionalTitle ?? "Artisan";
  const city = a.city ?? a.primaryLocation ?? "";
  const description = a.skillDescription ?? a.description ?? "";

  return {
    title: name || title,
    description:
      description ||
      `Hire ${name} — ${title}${city ? ` based in ${city}` : ""}. View portfolio, services, and reviews on ArtisansHub.`,
    alternates: { canonical: `/artisan-details/${id}` },
    openGraph: {
      title: `${name} | ArtisansHub`,
      description:
        description ||
        `${title}${city ? ` based in ${city}` : ""} — available for hire on ArtisansHub.`,
      images: a.profilePicture ? [{ url: a.profilePicture }] : undefined,
    },
  };
}

export default async function ArtisanDetails({ params }: Props) {
  const { id } = await params;
  const a = await fetchArtisan(id);

  const name = a ? `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() : "";
  const city = a ? (a.city ?? a.primaryLocation ?? "") : "";

  const jsonLd = a
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: name || a.professionalTitle,
        jobTitle: a.professionalTitle ?? undefined,
        description: a.skillDescription ?? a.description ?? undefined,
        image: a.profilePicture ?? undefined,
        url: `${BASE}/artisan-details/${id}`,
        address: city
          ? { "@type": "PostalAddress", addressLocality: city, addressCountry: "GB" }
          : undefined,
        worksFor: {
          "@type": "Organization",
          name: "ArtisansHub",
          url: BASE,
        },
      }
    : null;

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <ArtisanContent />
    </>
  );
}
