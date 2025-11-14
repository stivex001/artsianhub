"use client";

import { ClientNav } from "@/components/Client/ClientNav";
import { ClientHero } from "@/components/Client/ClientHero";
import Footer from "@/components/navigations/Footer";
import { ArtisanAroundYou } from "@/components/Client/ArtisanAroundYou";
import AccountSettingsModal from "@/components/Client/AccountSettingsModal";
import { useModalStore } from "@/store/useModalStore";
import { useArtisans } from "@/api/crud/artisans";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import IncompleteProfileModal from "@/components/shared/IncompleteProfileModal";

const ClientPage = () => {
  const { isSettingsOpen, closeSettings } = useModalStore();
  const [openIncompleteProfile, setOpenIncompleteProfile] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("relevance");

  const { currentUser } = useAuthStore();

  const [filters, setFilters] = useState<{
    category?: string;
    location?: string;
  }>({
    category: "",
    location: "",
  });
  const { getArtisanByCategory, getAllArtisan } = useArtisans();

  useEffect(() => {
    if (currentUser?.city) {
      setFilters((prev) => ({
        ...prev,
        location: currentUser.city,
      }));
    }
  }, [currentUser]);

  const { data: allData, isPending: allPending } = getAllArtisan();
  const { data: filteredData, isPending: filteredPending } =
    getArtisanByCategory({
      category: filters.category,
      city: filters.location,
      page,
      limit,
      sort,
    });

  const allArtisans = allData?.data || [];
  const filteredArtisans = filteredData?.data || [];

  const showingFiltered = filters.category && filters.location;
  const artisansToShow = showingFiltered ? filteredArtisans : allArtisans;
  const loading = showingFiltered ? filteredPending : allPending;

  useEffect(() => {
    if (currentUser?.isVerified) {
      const isProfileIncomplete =
        !currentUser.firstName || !currentUser.lastName;
      if (isProfileIncomplete) {
        setOpenIncompleteProfile(true);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    setPage(1);
  }, [limit, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNav />
      <ClientHero
        defaultLocation={filters.location}
        onSearch={(category: string, location: string) =>
          setFilters({ category, location })
        }
        onClear={() => setFilters({ category: "", location: "" })}
        isLoading={loading}
      />
      <ArtisanAroundYou
        artisans={artisansToShow}
        isPending={loading}
        filters={filters}
        page={page}
        limit={limit}
        sort={sort}
        total={showingFiltered ? filteredData?.total : allData?.total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSortChange={setSort}
      />

      <AccountSettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      <Footer />
      <IncompleteProfileModal
        isOpen={openIncompleteProfile}
        onClose={() => setOpenIncompleteProfile(false)}
        role={currentUser?.role || "client"}
      />
    </div>
  );
};

export default ClientPage;
