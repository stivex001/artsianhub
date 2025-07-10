import React from "react";
import { Search, MessageCircle, FileCheck, Star } from "lucide-react";
import { Descriptions } from "@/components/shared/Headings";

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    id: 1,
    icon: <Search className="w-6 h-6 text-[#071D8A]" />,
    title: "Search & Browse",
    description:
      "Find the artisan you need by searching or browsing categories.",
  },
  {
    id: 2,
    icon: <MessageCircle className="w-6 h-6 text-[#071D8A]" />,
    title: "Contact & Discuss",
    description: "Chat with the artisan and finalize details of your project.",
  },
  {
    id: 3,
    icon: <FileCheck className="w-6 h-6 text-[#071D8A]" />,
    title: "Agree & Get Started",
    description: "Agree on terms and get started with the work.",
  },
  {
    id: 4,
    icon: <Star className="w-6 h-6 text-[#071D8A]" />,
    title: "Pay & Review",
    description: "Secure payment and leave feedback after project completion.",
  },
];

const HowItWorks: React.FC<HowItWorksProps> = ({
  title = "How It Works",
  subtitle = "It's simple to find an artisan or join as one. Here's how:",
  steps = defaultSteps,
}) => {
  return (
    <section id="howitworks" className={`bg-white py-20 px-4 text-center`}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Descriptions title={title} desc={subtitle} />
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center"
              >
                {/* Connector Line for Desktop */}
                {index > 0 && (
                  <div className="hidden md:block absolute top-12 -left-1/2 w-9/12 h-0.5 bg-gray-300"></div>
                )}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 right-0 w-1/2 h-0.5 bg-gray-300"></div>
                )}

                {/* Step Card */}
                <div className="p-3">
                  <div className="relative mb-6">
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#071D8A] text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                      {step.id}
                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
