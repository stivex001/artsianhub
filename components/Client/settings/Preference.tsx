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
    <div className="space-y-8">
      {/* Language Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
          <h3 className="text-sm font-semibold text-paragrah uppercase tracking-wide">
            Language & Region
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300">
          <div className="flex-1">
            <h4 className="text-base font-medium text-paragrah mb-1">
              Display Language
            </h4>
            <p className="text-sm text-[#667185]">
              Pick the language you&apos;re most comfortable using on
              ArtisansHub.
            </p>
          </div>
          <div className="w-full sm:w-32">
            <CustomDropdown
              value={language}
              onChange={setLanguage}
              options={languageOptions}
              id="language"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-secondary to-accent rounded-full" />
          <h3 className="text-sm font-semibold text-paragrah uppercase tracking-wide">
            Notification Settings
          </h3>
        </div>

        <div className="space-y-3">
          {/* Appointment Reminders */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300 group">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-medium text-paragrah mb-1">
                  Appointment Reminders
                </h4>
                <p className="text-sm text-[#667185]">
                  Get notified when your scheduled jobs are approaching.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-28 ml-0 sm:ml-auto">
              <CustomDropdown
                value={appointmentReminders}
                onChange={setAppointmentReminders}
                options={notificationOptions}
                id="appointment-reminders"
              />
            </div>
          </div>

          {/* Offers & Promotions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300 group">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-medium text-paragrah mb-1">
                  Offers &amp; Promotions
                </h4>
                <p className="text-sm text-[#667185]">
                  Stay updated with special offers and service discounts.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-28 ml-0 sm:ml-auto">
              <CustomDropdown
                value={offersPromotions}
                onChange={setOffersPromotions}
                options={notificationOptions}
                id="offers-promotions"
              />
            </div>
          </div>

          {/* System Alerts */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300 group">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-medium text-paragrah mb-1">
                  System Alerts
                </h4>
                <p className="text-sm text-[#667185]">
                  Receive critical updates like changes in service terms or
                  availability.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-28 ml-0 sm:ml-auto">
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
    </div>
  );
};
