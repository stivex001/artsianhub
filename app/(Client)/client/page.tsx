"use client";

import { ClientNav } from "@/components/Client/ClientNav";
import { ClientHero } from "@/components/Client/ClientHero";
import Footer from "@/components/navigations/Footer";
import { ArtisanAroundYou } from "@/components/Client/ArtisanAroundYou";
import AccountSettingsModal from "@/components/Client/AccountSettingsModal";
import { useModalStore } from "@/store/useModalStore";

type Props = {};

const ClientPage = (props: Props) => {
  const { isSettingsOpen, closeSettings } = useModalStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNav />
      <ClientHero />
      <ArtisanAroundYou />
      <AccountSettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      <Footer />
    </div>
  );
};

export default ClientPage;
