"use client";

import React, { useState } from "react";
import { CustomDropdown } from "@/components/controlledInputs/CustomDropdown";

type Props = {};

export const Preference = (props: Props) => {
  const [language, setLanguage] = useState("English");
  const [appointmentReminders, setAppointmentReminders] = useState("Email");
  const [offersPromotions, setOffersPromotions] = useState("Email");
  const [systemAlerts, setSystemAlerts] = useState("Push");

  const languageOptions = ["English", "Spanish", "French", "German", "Italian"];
  const notificationOptions = ["Email", "Push", "None"];

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-paragrah mb-2">Language</h3>
          <p className="text-sm text-[#667185]">
            Pick the language you're most comfortable using on ArtisanHub.
          </p>
        </div>
        <div className="w-28">
          <CustomDropdown
            value={language}
            onChange={setLanguage}
            options={languageOptions}
            id="language"
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-medium text-paragrah">
          Notification Settings
        </h3>

        <div className="flex items-center justify-between">
          <div className="">
            <h4 className="text-base font-medium text-gray-900 mb-1">
              Appointment Reminders
            </h4>
            <p className="text-sm text-[#667185]">
              Get notified when your scheduled jobs are approaching.
            </p>
          </div>
          <div className="w-28">
            <CustomDropdown
              value={appointmentReminders}
              onChange={setAppointmentReminders}
              options={notificationOptions}
              id="appointment-reminders"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h4 className="text-base font-medium text-gray-900 mb-1">
              Offers & Promotions
            </h4>
            <p className="text-sm text-[#667185]">
              Stay updated with special offers and service discounts.
            </p>
          </div>
          <div className="w-28">
            <CustomDropdown
              value={offersPromotions}
              onChange={setOffersPromotions}
              options={notificationOptions}
              id="offers-promotions"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="">
            <h4 className="text-base font-medium text-gray-900 mb-1">
              System Alerts
            </h4>
            <p className="text-sm text-[#667185]">
              Receive critical updates like changes in service terms or
              availability.
            </p>
          </div>
          <div className="w-28">
            <CustomDropdown
              value={systemAlerts}
              onChange={setSystemAlerts}
              options={notificationOptions}
              id="system-alerts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
