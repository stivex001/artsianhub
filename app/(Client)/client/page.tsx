"use client";
import { Search, User } from "lucide-react";
import { ClientNav } from "@/components/Client/ClientNav";
import { ClientHero } from "@/components/Client/ClientHero";
import Footer from "@/components/navigations/Footer";

type Props = {};

const ClientPage = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNav />
      <ClientHero />
      <Footer />
    </div>
  );
};

export default ClientPage;
