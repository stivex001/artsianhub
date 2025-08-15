import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

export const LeftContent = (props: Props) => {
  return (
    <section className="p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Industrial welding with sparks and machinery"
          className="w-full h-full object-cover "
          fill
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] via-blue-600 to-[#1E40AF] opacity-80"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="mb-8 text-blue-100">
          We welcome your questions and look forward to providing a swift
          response.
        </p>

        {/* Contact Details */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-blue-100">support@artisanshub.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-blue-100">020 3875 1134</p>
              <p className="text-blue-100 text-sm">
                (open 24 hours a day, 7 days a week)
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Office</h3>
              <p className="text-blue-100">London, United Kingdom</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Business Hours</h3>
              <p className="text-blue-100 text-sm">
                Monday - Friday: 9:00 AM - 6:00 PM
              </p>
              <p className="text-blue-100 text-sm">
                Saturday - Sunday: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
