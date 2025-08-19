"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const artisanFaqs = [
  {
    q: "What is ArtisansHub?",
    a: "ArtisansHub is a trusted digital marketplace that connects skilled artisans with customers. You can showcase your expertise, sell products, access training, and grow your business all in one place.",
  },
  {
    q: "How do I join?",
    a: "Sign up on ArtisansHub.org, create your profile, add your skills or services, and you’ll be visible to customers searching for artisans in your field.",
  },
  {
    q: "Do I need to pay to join?",
    a: "No, joining is free. However, you can upgrade to premium plans for added benefits like increased visibility, priority listing, and promotional features.",
  },
  {
    q: "How do I get customers?",
    a: "Customers search based on location and skills. If your profile matches their needs, they can contact you directly. Good reviews and ratings will further boost your chances of getting hired.",
  },
  {
    q: "Can I sell products as an artisan?",
    a: "Yes. You can list and sell ready-made items (e.g., furniture, crafts, fashion products) through the ArtisansHub eStore.",
  },
  {
    q: "How will I get paid?",
    a: "Currently, customers pay you directly. Secure online payment solutions are being integrated for safer and faster transactions.",
  },
  {
    q: "Does ArtisansHub provide training?",
    a: "Yes. You will have access to training, grants, and resources designed to help you improve your craft and expand your business.",
  },
  {
    q: "Is my profile verified?",
    a: "Yes. Artisans go through a verification process, and customer reviews further help build trust and credibility.",
  },
];

const customerFaqs = [
  {
    q: "What is ArtisansHub?",
    a: "ArtisansHub is your go-to platform for finding trusted artisans across various fields, including repairs, tailoring, construction, and installations.",
  },
  {
    q: "How do I find an artisan?",
    a: "Simply use the search tool to browse artisans near you. You can review their profiles, ratings, and work history before contacting them.",
  },
  {
    q: "Do I pay to use the platform?",
    a: "No. Searching for artisans and contacting them is completely free.",
  },
  {
    q: "How do I pay the artisan?",
    a: "Currently, you pay the artisan directly. Soon, we will offer secure online payment options for convenience and safety.",
  },
  {
    q: "How do I know if an artisan is reliable?",
    a: "All artisans undergo verification. You can also check reviews, ratings, and completed projects to make informed hiring decisions.",
  },
  {
    q: "Can I buy products directly?",
    a: "Yes. You can purchase ready-made items like fashion products, crafts, and furniture from our eStore.",
  },
  {
    q: "Can I leave feedback?",
    a: "Yes. After using an artisan’s services, you can leave reviews to share your experience, support great artisans, and help others make informed choices.",
  },
  {
    q: "Where is ArtisansHub available?",
    a: "We currently operate in the UK and Nigeria, with plans to expand into more regions soon.",
  },
];

const Faq = () => {
  return (
    <main className="bg-[#F9FAFB] py-16">
      <div className="max-w-5xl mx-auto px-4 lg:px-0">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-10 text-center">
          Frequently Asked Questions
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            FAQs for Artisans
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {artisanFaqs.map((item, idx) => (
              <AccordionItem key={idx} value={`artisan-${idx}`}>
                <AccordionTrigger className="text-left text-xl font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-medium text-base">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            FAQs for Customers
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {customerFaqs.map((item, idx) => (
              <AccordionItem key={idx} value={`customer-${idx}`}>
                <AccordionTrigger className="text-left text-xl font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-medium text-base">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </main>
  );
};

export default Faq;
