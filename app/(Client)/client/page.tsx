"use client";

import { ClientNav } from "@/components/Client/ClientNav";
import { ClientHero } from "@/components/Client/ClientHero";
import Footer from "@/components/navigations/Footer";
import { ArtisanAroundYou } from "@/components/Client/ArtisanAroundYou";

type Props = {};

const ClientPage = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNav />
      <ClientHero />
      <ArtisanAroundYou />
      <Footer />
    </div>
  );
};

export default ClientPage;
