import type { Metadata } from "next";
import { ArtisanContent } from "@/components/Client/ArtisanContent";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`https://api.artisanshub.org/artisans/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("not found");

    const json = await res.json();
    const a = json?.data ?? json;

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
  } catch {
    return {
      title: "Artisan Profile",
      description: "View this artisan's profile, portfolio, and services on ArtisansHub.",
    };
  }
}

const ArtisanDetails = () => {
  return (
    <>
      <ArtisanContent />
    </>
  );
};

export default ArtisanDetails;
