"use client";

import { ClientNav } from "@/components/Client/ClientNav";
import { ClientHero } from "@/components/Client/ClientHero";
import Footer from "@/components/navigations/Footer";
import { ArtisanAroundYou } from "@/components/Client/ArtisanAroundYou";
import AccountSettingsModal from "@/components/Client/AccountSettingsModal";
import { useModalStore } from "@/store/useModalStore";
import { useArtisans } from "@/api/crud/artisans";
import { useState } from "react";

type Props = {};

const ClientPage = (props: Props) => {
  const { isSettingsOpen, closeSettings } = useModalStore();
  const [filters, setFilters] = useState<{
    category?: string;
    location?: string;
  }>({
    category: "",
    location: "",
  });

  const { getArtisanByCategory, getAllArtisan } = useArtisans();

  const { data: allData, isPending: allPending } = getAllArtisan();
  const { data: filteredData, isPending: filteredPending } =
    getArtisanByCategory(filters);

  const allArtisans = allData?.data || [];
  const filteredArtisans = filteredData?.data || [];

  const showingFiltered = filters.category && filters.location;
  const artisansToShow = showingFiltered ? filteredArtisans : allArtisans;
  const loading = showingFiltered ? filteredPending : allPending;

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNav />
      <ClientHero
        onSearch={(category:string, location:string) => setFilters({ category, location })}
        onClear={() => setFilters({ category: "", location: "" })}
        isLoading={loading}
      />
      <ArtisanAroundYou artisans={artisansToShow} isPending={loading} />
      <AccountSettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      <Footer />
    </div>
  );
};

export default ClientPage;
