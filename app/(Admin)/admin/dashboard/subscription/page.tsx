import { CustomButton } from "@/components/clickable/CustomButton";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import { Star } from "lucide-react";
import React from "react";

type Props = {};

type SubscriptionPlan = {
  title: string;
  price: string;
  duration: string;
  features: string[];
  buttonText: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
  color: string;
};

const subscriptionPlans: SubscriptionPlan[] = [
  {
    title: "Regular",
    price: "Free",
    duration: "1 week free trial for 7 days",
    features: [
      "Free 24hr ads",
      "Upload 4 pictures for 1 week displayed on the site",
      "Get 2 jobs around you",
      "No commission charges on first 2 services",
    ],
    buttonText: "Subscribe Now",
    bgColor: "bg-gradient-to-b from-[#D9D9D9] to-[#5691D1]",
    textColor: "#013975",
    buttonColor: "bg-[#013975]",
    color: "text-[#000000]",
  },
  {
    title: "Standard",
    price: "$50",
    duration: "2 Weeks Plan",
    features: [
      "2 ads in a week",
      "Upload 8 pictures for 2 weeks displayed on the site",
      "Get 6 jobs around you",
      "No commission charges on first 4 services",
    ],
    buttonText: "Subscribe Now",
    bgColor: "bg-gradient-to-b from-[#D9D9D9] to-[#1F873B]",
    textColor: "#1F873B",
    buttonColor: "bg-[#024013]",
    color: "text-[#FFFFFF]",
  },
  {
    title: "Premium",
    price: "$100",
    duration: "4 Weeks Plan",
    features: [
      "4 ads in a week",
      "Upload 12 pictures for 4 weeks displayed on the site",
      "Get unlimited jobs around you",
      "No commission charges on first 6 services",
    ],
    buttonText: "Subscribe Now",
    bgColor: "bg-gradient-to-b from-[#D9D9D9] to-[#CF7C29]",
    textColor: "#5C4D0F",
    buttonColor: "bg-[#58330A]",
    color: "text-[#FFFFFF]",
  },
];

const Subscription = (props: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <Descriptions
        title="Subscription Plans"
        desc="Select the best plan you need "
      />
      <Wrapper className="py-14 px-12 grid lg:grid-cols-3 gap-9">
        {subscriptionPlans.map((plan, index) => (
          <div key={index}>
            <h2
              className={`text-4xl font-semibold mb-3 text-center ${plan.textColor}`}
            >
              {plan.title}
            </h2>
            <div
              className={`rounded-[10px] h-[390px] shadow-dropShadow px-6 py-10 ${plan.bgColor}`}
            >
              <p className="text-3xl font-semibold">{plan.price}</p>
              <p className="mt-4 text-sm">{plan.duration}</p>
              <ul className="mt-6 space-y-2 ml-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Star size={16} className="fill-[#013975]" />{" "}
                    <span className="ml-2 text-[10px]">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-10 text-base font-[300] ${plan.color}`}>
                Subscribe now and enjoy our services
              </p>
              <CustomButton
                label={`${plan.buttonText}`}
                className={`mt-1 w-[179px] h-10 mx-auto px-6 py-3 rounded-lg text-white ${plan.buttonColor}`}
              />
            </div>
          </div>
        ))}
      </Wrapper>
    </section>
  );
};

export default Subscription;
