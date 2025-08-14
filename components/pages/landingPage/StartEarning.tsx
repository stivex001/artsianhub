"use client";
import React from "react";
import { Users, CheckCircle, DollarSign, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StartEarningProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  features?: Feature[];
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const defaultFeatures: Feature[] = [
  {
    id: "showcase",
    icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
    title: "Showcase Your Work",
    description: "Build a stunning portfolio to attract clients worldwide.",
  },
  {
    id: "rates",
    icon: <DollarSign className="w-6 h-6 text-blue-400" />,
    title: "Set Your Rates",
    description: "Choose your pricing and work on your terms.",
  },
  {
    id: "payment",
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: "Get Paid Securely",
    description: "Receive payments safely through our platform.",
  },
];

const StartEarning: React.FC<StartEarningProps> = ({
  badgeText = "Join Our Growing Community",
  title = "Start Earning as a Skilled Artisan",
  subtitle = "Turn your craft into a thriving business. Join thousands of artisans who are growing their client base and income through ArtisansHub.",
  primaryButtonText = "Become an Artisan",
  secondaryButtonText = "Learn More",
  features = defaultFeatures,
  onPrimaryClick = () => console.log("Primary button clicked"),
  onSecondaryClick = () => console.log("Secondary button clicked"),
}) => {
  const router = useRouter();
  
  const handleButtonClick = () => {
    router.push("/auth/signup?role=artisan");
  };

  return (
    <section className={`bg-textdeep py-20 px-4 text-center`}>
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-700 text-slate-300 text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            {badgeText}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-white mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleButtonClick}
              className="px-8 py-3 bg-darkBlue hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              {primaryButtonText}
            </button>
            <button
              onClick={onSecondaryClick}
              className="px-8 py-3 bg-transparent border-2 border-slate-600 hover:border-slate-500 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              {secondaryButtonText}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-700/70 transition-colors duration-200 border border-slate-600/30"
              >
                <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartEarning;
