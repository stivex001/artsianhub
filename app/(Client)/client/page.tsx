"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/navigations/Header";
import { ClientHero } from "@/components/Client/ClientHero";
import Footer from "@/components/navigations/Footer";
import { ArtisanAroundYou } from "@/components/Client/ArtisanAroundYou";
import AccountSettingsModal from "@/components/Client/AccountSettingsModal";
import IncompleteProfileModal from "@/components/shared/IncompleteProfileModal";
import { useModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/authStore";
import { useArtisans } from "@/apis/crud/artisans";

const ClientPage = () => {
  const { currentUser } = useAuthStore();
  const { isSettingsOpen, closeSettings } = useModalStore();
  const { getArtisanAroundMe } = useArtisans();

  const [openIncompleteProfile, setOpenIncompleteProfile] = useState(false);

  // Filters + pagination + sorting
  const [filters, setFilters] = useState({
    q: "",
    city: "",
    country: currentUser?.country || "",
    page: 1,
    limit: 10,
    sort: "relevance",
  });

  // Load default user location
  useEffect(() => {
    if (currentUser) {
      setFilters((prev) => ({
        ...prev,
        city: currentUser.city || "",
        country: currentUser.country || "",
      }));
    }
  }, [currentUser]);

  const { data, isPending } = getArtisanAroundMe(filters);

  // Reset page when q, city, limit, or sort changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.q, filters.city, filters.limit, filters.sort]);

  useEffect(() => {
    if (currentUser?.isVerified) {
      const incomplete = !currentUser.firstName || !currentUser.lastName;
      if (incomplete) setOpenIncompleteProfile(true);
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header className="fixed top-0 left-0 right-0 z-50 bg-transparent" logoHref="/" brandlogo={false} />

      <ClientHero
        defaultLocation={filters.city}
        isLoading={isPending}
        onSearch={(q: string, city: string) =>
          setFilters((prev) => ({ ...prev, q, city }))
        }
        onClear={() =>
          setFilters((prev) => ({
            ...prev,
            q: "",
            city: "",
            country: currentUser?.country || "",
          }))
        }
      />

      <ArtisanAroundYou
        artisans={data?.data || []}
        isPending={isPending}
        filters={filters}
        page={filters.page}
        limit={filters.limit}
        sort={filters.sort}
        total={data?.total}
        onPageChange={(page: number) =>
          setFilters((prev) => ({ ...prev, page }))
        }
        onLimitChange={(limit: number) =>
          setFilters((prev) => ({ ...prev, limit }))
        }
        onSortChange={(sort: string) =>
          setFilters((prev) => ({ ...prev, sort }))
        }
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
