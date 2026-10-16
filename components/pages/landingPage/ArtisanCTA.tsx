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
import Link from "next/link";
import { FOUNDING_OFFER_MONTHS, MEMBERSHIP_FEE } from "@/lib/membership/constants";
import { formatFoundingEnd, isFoundingOfferActive } from "@/lib/membership/founding";
import type { PlatformSettings } from "@/types/membership";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";

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

const benefitVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const ArtisanCTA = ({ settings }: { settings: PlatformSettings }) => {
  const offerActive = isFoundingOfferActive(settings.foundingOfferEndsAt);
  const end = settings.foundingOfferEndsAt;
  const offerText = !offerActive
    ? `Get a business profile, search visibility and access to every Business Growth Series event for £${MEMBERSHIP_FEE} a year.`
    : end
      ? `Free until ${formatFoundingEnd(end)}, then £${MEMBERSHIP_FEE}/year. Get a profile, search visibility and access to every Business Growth Series event.`
      : `Free for our first ${FOUNDING_OFFER_MONTHS} months, then £${MEMBERSHIP_FEE}/year. Get a profile, search visibility and access to every Business Growth Series event.`;

  return (
    <section className="bg-textdeep py-20 px-4 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-700 text-slate-300 text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            Join Our Artisans Community
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto text-white mb-12"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Are You an Artisan?
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
            Do you have a skill, craft, or service that people already love and
            recommend?
            <br className="hidden md:block" />
            It's time more people discovered you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={benefitVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-slate-700/50 rounded-xl p-6 hover:bg-slate-700/70 transition-colors duration-200 border border-slate-600/30 flex items-start space-x-4"
            >
              <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
              <p className="text-slate-200 font-medium">{benefit.text}</p>
            </motion.div>
          ))}
          <motion.div
            custom={benefits.length}
            variants={benefitVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-blue-600/20 rounded-xl p-6 border border-blue-500/30 flex items-center justify-center text-center"
          >
            <p className="text-blue-200 font-medium">
              We connect your skills with customers who are actively looking for
              what you do.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 border border-slate-700/50 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {offerActive ? "Become a Founding Artisan Today" : "Join ArtisansHub"}
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              {offerText}
            </p>

            <div className="mx-auto mb-10 max-w-sm rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8">
              <p className="text-slate-400 font-semibold mb-3 uppercase tracking-wider text-sm">
                ArtisansHub Membership
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-black text-white">£{MEMBERSHIP_FEE}</span>
                <span className="text-slate-400 text-sm">/year</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                About £{MEMBERSHIP_FEE / 12} a month. Billed annually.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full md:w-auto bg-white hover:bg-slate-100 text-blue-600 font-black py-8 px-12 text-xl rounded-2xl shadow-2xl shadow-blue-500/30"
            >
              <Link href="/membership">Join ArtisansHub</Link>
            </Button>

            <div className="mt-12 pt-8 border-t border-slate-800/50">
              <p className="text-slate-400 text-lg font-medium tracking-wide">
                More <span className="text-white">visibility</span>. More{" "}
                <span className="text-white">clients</span>. More{" "}
                <span className="text-white">orders</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArtisanCTA;
