import type { Metadata } from "next";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Got questions about ArtisansHub? Find answers about joining as an artisan, hiring, payments, verification, and more.",
  alternates: { canonical: "/faq" },
};

const artisanFaqs = [
  {
    q: "What is ArtisansHub?",
    a: "ArtisansHub is a trusted digital marketplace that connects skilled artisans with customers. You can showcase your expertise, sell products, access training, and grow your business all in one place.",
  },
  {
    q: "How do I join?",
    a: "Sign up on ArtisansHub.org, create your profile, add your skills or services, and you'll be visible to customers searching for artisans in your field.",
  },
  {
    q: "Do I need to pay to join?",
    a: "Yes. ArtisansHub is a professional marketplace designed for serious artisans who want real clients — not just exposure.You can get started with our £1 trial for 30 days, giving you full access to create your profile, showcase your work, and start receiving enquiries.After the trial, your subscription continues at £9 per month to keep your profile visible and your business growing.We don’t offer free listings because clients trust platforms that feature committed professionals.Start your £1 trial today and get discovered.",
  },
  {
    q: "Why isn’t ArtisansHub free?",
    a: "Free platforms often attract incomplete profiles and low-quality listings, making it harder for serious artisans to stand out. Our small subscription ensures Higher-quality professionals More serious client enquiries Less competition from inactive profiles A trusted marketplace Think of it as a small investment in your business visibility.",
  },
  {
    q: "What do I get with my subscription?",
    a: "Your membership includes:✔ A professional public profile ✔ Visibility in local search ✔ Direct client enquiries ✔ Portfolio uploads ✔ Reviews to build trust ✔ Ongoing platform promotion Everything is designed to help you attract more clients.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term contracts. You can cancel whenever you choose — but most artisans stay because the visibility and enquiries make it worthwhile.",
  },
  {
    q: "How quickly can I start getting clients?",
    a: "As soon as your profile is live, clients searching in your area can find and contact you.The more complete and professional your profile is, the higher your chances of receiving enquiries.",
  },
  {
    q: "Is ArtisansHub only for established artisans?",
    a: "No — we welcome both experienced professionals and emerging talent. If you are confident in your skill and ready for real opportunities, ArtisansHub is built for you.",
  },
  {
    q: "Who can join ArtisansHub?",
    a: "We accept artisans across multiple categories, including Fashion & tailoring Beauty & wellness Catering & baking Crafts & handmade goods Creative services Home improvement Digital services If you have a skill people need — you belong here.",
  },
  {
    q: "How will I get paid?",
    a: "Currently, customers pay you directly. Secure online payment solutions are being integrated for safer and faster transactions.",
  },
  {
    q: "Why should I join now?",
    a: "Early artisans benefit from ⭐ Less competition ⭐ Higher visibility ⭐ Stronger local recognition ⭐ First access to clients Joining early positions you ahead of others.",
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
    a: "Yes. After using an artisan's services, you can leave reviews to share your experience, support great artisans, and help others make informed choices.",
  },
  {
    q: "Where is ArtisansHub available?",
    a: "We currently operate in the UK and Nigeria, with plans to expand into more regions soon.",
  },
];

const allFaqs = [...artisanFaqs, ...customerFaqs];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const Faq = () => {
  return (
    <main className="bg-[#F9FAFB] py-16">
      <JsonLd data={faqSchema} />
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
                <AccordionContent className="font-medium text-base">
                  {item.a}
                </AccordionContent>
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
                <AccordionContent className="font-medium text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </main>
  );
};

export default Faq;
