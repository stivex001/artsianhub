import Footer from "@/components/navigations/Footer";
import { Header } from "@/components/navigations/Header";
import { MyEventsList } from "@/components/events/MyEventsList";

const ClientMyEventsPage = () => (
  <>
    <Header logoHref="/client" />
    <main className="mx-auto min-h-[60vh] max-w-4xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">My Events</h1>
      <MyEventsList />
    </main>
    <Footer />
  </>
);

export default ClientMyEventsPage;
