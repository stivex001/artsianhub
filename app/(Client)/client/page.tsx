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
  const { currentUser } = useAuthStore();

  const [openIncompleteProfile, setOpenIncompleteProfile] = useState(false);

  // Pagination and sorting
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("relevance");

  // Filters
  const [filters, setFilters] = useState<{
    q?: string;
    city?: string;
    country?: string;
  }>({
    q: "",
    city: "",
    country: "",
  });

  // Set default filters based on current user's saved location
  useEffect(() => {
    if (currentUser) {
      setFilters({
        q: "",
        city: currentUser.city || "",
        country: currentUser.country || "",
      });
    }
  }, [currentUser]);

  const { getArtisanByCategory, getAllArtisan } = useArtisans();

  // Should fetch ALL artisans when no location is available
  const shouldFetchAll = !filters.city || !filters.country;

  // Fetch all artisans
  const { data: allData, isPending: allPending } = getAllArtisan();

  // Fetch filtered artisans
  const { data: filteredData, isPending: filteredPending } =
    getArtisanByCategory({
      q: filters.q,
      city: filters.city,
      country: filters.country,
      page,
      limit,
      sort,
    });

  // Decide which list to show
  const artisansToShow = shouldFetchAll
    ? allData?.data || []
    : filteredData?.data || [];

  const loading = shouldFetchAll ? allPending : filteredPending;

  // Show incomplete profile modal
  useEffect(() => {
    if (currentUser?.isVerified) {
      const isProfileIncomplete =
        !currentUser.firstName || !currentUser.lastName;

      if (isProfileIncomplete) {
        setOpenIncompleteProfile(true);
      }
    }
  }, [currentUser]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Reset pagination when limit or sort changes
  useEffect(() => {
    setPage(1);
  }, [limit, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNav />

      <ClientHero
        defaultLocation={filters.city}
        onSearch={(q: string, city: string) =>
          setFilters((prev) => ({ ...prev, q, city }))
        }
        onClear={() =>
          setFilters({
            q: "",
            city: "",
            country: currentUser?.country || "",
          })
        }
        isLoading={loading}
      />

      <ArtisanAroundYou
        artisans={artisansToShow}
        isPending={loading}
        filters={filters}
        page={page}
        limit={limit}
        sort={sort}
        total={shouldFetchAll ? allData?.total : filteredData?.total}
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
