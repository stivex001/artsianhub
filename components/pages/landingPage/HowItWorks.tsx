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
    icon: <Search className="w-6 h-6 text-blue-600" />,
    title: "Search & Browse",
    description:
      "Find the artisan you need by searching or browsing categories.",
  },
  {
    id: 2,
    icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
    title: "Contact & Discuss",
    description: "Chat with the artisan and finalize details of your project.",
  },
  {
    id: 3,
    icon: <FileCheck className="w-6 h-6 text-blue-600" />,
    title: "Agree & Get Started",
    description: "Agree on terms and get started with the work.",
  },
  {
    id: 4,
    icon: <Star className="w-6 h-6 text-blue-600" />,
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
    <section className={`bg-white py-20 px-4 text-center`}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Descriptions title={title} desc={subtitle} />
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-300 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step Card */}
                <div className="p-6">
                  {/* Step Number & Icon */}
                  <div className="relative mb-4">
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                      {step.id}
                    </div>

                    {/* Icon Container */}
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Mobile Connecting Line */}
                <div className="md:hidden flex justify-center mt-6 mb-2">
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                  )}
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
