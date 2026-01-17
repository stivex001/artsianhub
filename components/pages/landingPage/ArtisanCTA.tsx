"use client";
import React from "react";
import {
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Search,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: <Search className="w-6 h-6 text-blue-400" />,
    text: "Get found by real local clients",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-blue-400" />,
    text: "Present your work beautifully and professionally",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
    text: "Receive genuine job enquiries",
  },
  {
    icon: <Star className="w-6 h-6 text-blue-400" />,
    text: "Build trust with reviews and ratings",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
    text: "Grow your business, not just your followers",
  },
];

const pricingDetails = [
  "£1 for your first 30 days",
  "Then £9/month for full visibility and growth",
  "No free listings – only committed professionals",
  "Cancel anytime",
];

const ArtisanCTA = () => {
  const router = useRouter();

  const handleJoinClick = () => {
    router.push("/auth/signup?role=artisan");
  };

  return (
    <section className="bg-textdeep py-20 px-4 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-700 text-slate-300 text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            Join Our Artisans Community
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-4xl mx-auto text-white mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Are You an Artisan?
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
            Do you have a skill, craft, or service that people already love and
            recommend?
            <br className="hidden md:block" />
            It’s time more people discovered you.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-slate-700/50 rounded-xl p-6 hover:bg-slate-700/70 transition-colors duration-200 border border-slate-600/30 flex items-start space-x-4"
            >
              <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
              <p className="text-slate-200 font-medium">{benefit.text}</p>
            </div>
          ))}
          {/* Connection Statement Card */}
          <div className="bg-blue-600/20 rounded-xl p-6 border border-blue-500/30 flex items-center justify-center text-center">
            <p className="text-blue-200 font-medium">
              We connect your skills with customers who are actively looking for
              what you do.
            </p>
          </div>
        </div>

        {/* Pricing & Offer Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join ArtisansHub – Start with a £1 Trial
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Create your professional profile and step into a marketplace built
              for serious artisans.
            </p>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-10">
              <ul className="text-left space-y-3">
                {pricingDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-3" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-600 text-center min-w-[200px]">
                <p className="text-sm text-slate-400 uppercase tracking-wide font-semibold mb-1">
                  Start Today
                </p>
                <div className="text-4xl font-bold text-white mb-1">£1</div>
                <p className="text-xs text-slate-500">for 30 days</p>
              </div>
            </div>

            <Button
              onClick={handleJoinClick}
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 px-10 text-lg rounded-full shadow-lg shadow-blue-900/50 hover:shadow-blue-900/80 transition-all transform hover:-translate-y-1"
            >
              Join as an Artisan
            </Button>

            <p className="mt-6 text-slate-400 text-sm">
              List your skills. Get seen. Get hired. Grow your business.
            </p>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanCTA;
