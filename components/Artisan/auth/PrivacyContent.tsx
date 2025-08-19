import React from "react";

type Props = {};

export const PrivacyContent = (props: Props) => {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Privacy Policy
      </h1>
      <p className="text-gray-700 mb-8 text-center">
        Powered by: MensayHub Ltd (UK) and Mensay Enterprises Ltd (Nigeria)
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          At ArtisansHub.org, your privacy is very important to us. This Privacy
          Policy outlines how we collect, use, store, and protect your personal
          information when you use our services. By accessing or using
          ArtisansHub.org, you agree to the practices described in this policy.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Personal details such as your name, phone number, email address,
              and profile information
            </li>
            <li>
              Transaction details when you book or pay for services through our
              platform
            </li>
            <li>
              Technical information such as your IP address, browser type,
              operating system, and device data
            </li>
            <li>
              Usage data including pages visited, time spent on our platform,
              and features accessed
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Connect artisans with customers in need of their services</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Facilitate secure payments and transactions</li>
            <li>Improve and personalize our platform and services</li>
            <li>
              Send important updates, notifications, and promotional messages
              (with your consent)
            </li>
            <li>
              Comply with legal, regulatory, or security obligations including
              fraud prevention
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Data Sharing
          </h2>
          <p>
            We respect your privacy and do not sell personal information to
            third parties. We may share information only in the following cases:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              With payment service providers for the purpose of processing
              transactions securely
            </li>
            <li>
              With trusted training or service partners to enhance your
              experience
            </li>
            <li>
              With regulators, law enforcement, or authorities where legally
              required
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Data Retention
          </h2>
          <p>
            We retain personal data only for as long as necessary to fulfill the
            purposes described in this policy. Retention may also be required to
            meet legal, tax, or regulatory obligations. Once data is no longer
            needed, it will be securely deleted or anonymized.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Your Rights
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Request access to the personal data we hold about you</li>
            <li>
              Ask for corrections if your information is inaccurate or
              incomplete
            </li>
            <li>
              Request deletion of your personal data, subject to legal or
              regulatory obligations
            </li>
            <li>
              Withdraw consent for data processing where consent has been
              previously provided
            </li>
            <li>
              Lodge a complaint with a data protection authority if you believe
              your rights have been violated
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Data Security
          </h2>
          <p>
            We implement reasonable physical, technical, and administrative
            safeguards to protect your data from unauthorized access, loss,
            misuse, or disclosure. However, no system is completely secure, and
            we cannot guarantee absolute security of your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. International Data Transfers
          </h2>
          <p>
            As we operate in both the United Kingdom and Nigeria, your personal
            data may be transferred and processed across borders. We ensure such
            transfers comply with applicable data protection laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            8. Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with a revised effective date. We
            encourage you to review this policy periodically to stay informed
            about how we protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            9. Contact Us
          </h2>
          <p>
            For questions or concerns about this Privacy Policy or how we handle
            your data, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>UK: support@artisanshub.org – MensayHub Ltd, UK</li>
            <li>
              Nigeria: Admin@artisanshub.org – Mensay Enterprises Ltd, Nigeria
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
