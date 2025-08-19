"use client"
import Link from "next/link";
import React from "react";

type Props = {};

export const TermsContent = (props: Props) => {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-0 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Terms of Service -{" "}
        <Link href="/" className="text-primary">
          ArtisansHub.org
        </Link>
      </h1>
      <p className="text-gray-600">
        Powered by MensayHub Ltd (UK) and Mensay Enterprises Ltd (Nigeria)
      </p>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">1. Agreement</h2>
        <p className="text-gray-700 mt-2">
          By accessing or using ArtisansHub.org, you agree to comply with these
          Terms of Service. If you do not agree, please do not use the platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          2. Services Provided
        </h2>
        <p className="text-gray-700 mt-2">
          ArtisansHub.org is an online platform that connects artisans with
          clients for services, training, and product sales. We act solely as an
          intermediary and are not responsible for the quality, pricing, safety,
          or outcome of services provided by artisans.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          3. User Responsibilities
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>
            You agree to provide accurate and up-to-date information when
            creating an account or using the platform.
          </li>
          <li>
            You agree to use the platform only for lawful purposes and in
            compliance with applicable laws.
          </li>
          <li>
            You must respect other users and not engage in harassment, fraud,
            spamming, or other prohibited conduct.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">4. Payments</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>
            Payments made through the platform (where applicable) are processed
            securely by third-party payment providers.
          </li>
          <li>
            ArtisansHub.org does not hold or manage customer funds unless
            explicitly stated.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">5. Liability</h2>
        <p className="text-gray-700 mt-2">
          We make no guarantees regarding the quality or reliability of services
          provided by artisans. ArtisansHub.org is not liable for damages,
          disputes, losses, or claims that may arise from interactions between
          artisans and clients.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          6. Termination of Use
        </h2>
        <p className="text-gray-700 mt-2">
          We may suspend or terminate your account without notice if you violate
          these Terms, engage in fraud, or misuse the platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          7. Intellectual Property
        </h2>
        <p className="text-gray-700 mt-2">
          All content on ArtisansHub.org, including logos, text, graphics, and
          software, is owned by MensayHub Ltd or its affiliates and may not be
          copied, modified, or distributed without prior written consent.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          8. Governing Law
        </h2>
        <p className="text-gray-700 mt-2">
          For UK users, these Terms are governed by the laws of England and
          Wales. For Nigerian users, these Terms are governed by the laws of the
          Federal Republic of Nigeria.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          9. Contact Information
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>UK: support@artisanshub.org – MensayHub Ltd, UK</li>
          <li>
            Nigeria: Admin@artisanshub.org – Mensay Enterprises Ltd, Nigeria
          </li>
        </ul>
      </section>
    </div>
  );
};
