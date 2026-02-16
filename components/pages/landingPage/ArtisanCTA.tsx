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
        <div className="relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 border border-slate-700/50 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                  Become a Founding Artisan Today
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  Lock in our exclusive early supporter rates – limited to our{" "}
                  <span className="text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-4">
                    first 300 artisans
                  </span>
                  .
                </p>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-12">
                {/* Phase 1 */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 transition-transform hover:scale-105 duration-300">
                  <p className="text-slate-400 font-semibold mb-4 uppercase tracking-wider text-sm">
                    For the first 3 months
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">£1</span>
                      <span className="text-slate-500 text-sm">/month</span>
                    </div>
                    <div className="h-px w-12 bg-slate-700 my-2" />
                    <div className="text-slate-300 font-medium">
                      Or <span className="text-white">£60</span>/year
                    </div>
                  </div>
                </div>

                {/* Phase 2: Highlighted */}
                <div className="relative group">
                  {/* Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-black px-4 py-1.5 rounded-full shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform">
                      REWARD FOR EARLY JOINERS
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-3xl p-10 shadow-2xl shadow-blue-500/20 transform scale-105 border-2 border-blue-400/30 relative overflow-hidden">
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>

                    <p className="text-blue-100 font-bold mb-4 uppercase tracking-wider text-sm relative z-10">
                      Founding Member Rate
                    </p>
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-white">
                          £5
                        </span>
                        <span className="text-blue-200 text-sm font-medium">
                          /month
                        </span>
                      </div>
                      <div className="h-px w-16 bg-blue-400/30 my-3" />
                      <div className="text-blue-100 font-bold text-lg">
                        Or <span className="text-white">£60</span>/year
                      </div>
                      <div className="mt-4 px-3 py-1 bg-blue-900/40 rounded-lg text-[10px] text-blue-200 border border-blue-400/20 font-bold uppercase tracking-widest">
                        Limited Offer
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 transition-transform hover:scale-105 duration-300">
                  <p className="text-slate-400 font-semibold mb-2 uppercase tracking-wider text-sm leading-tight">
                    New artisans <br />{" "}
                    <span className="text-slate-500 text-xs font-medium lowercase">
                      after 6 months
                    </span>
                  </p>
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">£9</span>
                      <span className="text-slate-500 text-sm">/month</span>
                    </div>
                    <div className="h-px w-12 bg-slate-700 my-2" />
                    <div className="text-slate-300 font-medium">
                      Or <span className="text-white">£108</span>/year
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="max-w-xl mx-auto">
                <Button
                  onClick={handleJoinClick}
                  size="lg"
                  className="w-full md:w-auto bg-white hover:bg-slate-100 text-blue-600 font-black py-8 px-12 text-xl rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1 active:scale-95 mb-6"
                >
                  Start Your £1 Trial Today
                </Button>

                <div className="flex flex-col gap-4">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <span className="text-slate-200 font-semibold">
                      Limited time:
                    </span>{" "}
                    Only first 300 artisans will qualify. This offer locks in
                    your rate and won&apos;t be available later!
                  </p>

                  <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Cancel anytime, no obligation
                  </div>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="mt-16 pt-8 border-t border-slate-800/50">
                <p className="text-slate-400 text-lg font-medium tracking-wide">
                  More <span className="text-white">visibility</span>. More{" "}
                  <span className="text-white">clients</span>. More{" "}
                  <span className="text-white">orders</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanCTA;
