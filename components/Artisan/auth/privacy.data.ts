import type { TermsSection } from "./terms.types";

export const PRIVACY_SECTIONS: TermsSection[] = [
  {
    num: 1, id: "introduction", title: "Introduction",
    intro: "MensayHub Ltd (trading as ArtisansHub.org) is committed to protecting the privacy and personal data of all individuals who use our Platform. This Privacy Policy explains who we are, what personal data we collect, why we collect it, how we use it, and what rights you have in relation to your data.",
    bullets: [
      "This Policy applies to all Users of ArtisansHub.org — including Artisans, Customers, and visitors who browse without registering.",
      "This Policy should be read alongside our Terms of Service and Cookie Policy.",
      "By accessing or using the Platform in any capacity, you acknowledge that you have read and understood this Privacy Policy.",
      "If you do not agree with this Policy, you should not use the Platform.",
    ],
    footer: "We may update this Policy from time to time. When we make material changes, we will notify registered Users by email and update the effective date at the top of this document.",
  },
  {
    num: 2, id: "controller", title: "Who We Are",
    intro: "The Data Controller responsible for your personal data is:",
    subsections: [
      { id: "2-1", title: "MensayHub Ltd", content: "MensayHub Ltd is a company incorporated in England and Wales, trading as ArtisansHub.org. As the Data Controller, we determine the purposes and means of processing your personal data in connection with the Platform." },
      { id: "2-2", title: "ICO Registration", content: "MensayHub Ltd is registered with the Information Commissioner's Office (ICO) as a Data Controller under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. We take our legal obligations under these frameworks seriously and have implemented appropriate policies, procedures, and safeguards to uphold your data rights.", footer: "To contact us about any data protection matter, please email: privacy@artisanshub.org" },
    ],
  },
  {
    num: 3, id: "data-collected", title: "What Data We Collect",
    intro: "We collect and process different categories of personal data depending on how you interact with the Platform:",
    subsections: [
      { id: "3-1", title: "Identity and Contact Data", bullets: [
        "Full name and display name or business name;",
        "Email address and telephone number;",
        "Physical or business address (for Artisans, used to power location-based search);",
        "Profile photograph or logo (where voluntarily uploaded).",
      ]},
      { id: "3-2", title: "Profile and Service Data", bullets: [
        "Trade category, service descriptions, skills, and specialisms;",
        "Portfolio content including images, videos, and project descriptions;",
        "Professional qualifications, certifications, and licences (where provided);",
        "Availability, service area, and pricing information.",
      ]},
      { id: "3-3", title: "Transaction and Billing Data", bullets: [
        "Subscription plan history and billing cycle records;",
        "Payment confirmation details (we do not store full card numbers — these are processed exclusively by our PCI-DSS compliant payment processor);",
        "Invoice and billing correspondence.",
      ]},
      { id: "3-4", title: "Technical and Usage Data", bullets: [
        "IP address, browser type, and version;",
        "Device type, operating system, and screen resolution;",
        "Pages visited, time spent on the Platform, features accessed, and search queries;",
        "Referring URLs and exit pages;",
        "Cookie identifiers and session tokens (see our Cookie Policy for full details).",
      ]},
      { id: "3-5", title: "Communications Data", bullets: [
        "Enquiry messages sent via the Platform's messaging system;",
        "Support correspondence submitted to our team;",
        "Notifications sent to you (and whether they were opened or acted upon);",
        "Review and ratings content submitted by Customers.",
      ]},
      { id: "3-6", title: "Data We Do Not Collect", content: "We do not intentionally collect special category data (such as health, racial or ethnic origin, religious beliefs, or sexual orientation). We also do not knowingly collect data from children under the age of 18. If you believe we have inadvertently collected such data, please contact us immediately at privacy@artisanshub.org." },
    ],
  },
  {
    num: 4, id: "legal-bases", title: "Legal Bases for Processing",
    intro: "Under UK GDPR, we are required to have a lawful basis for each purpose for which we process your personal data. The bases we rely on are:",
    subsections: [
      { id: "4-1", title: "Performance of Contract (Article 6(1)(b))", content: "We process your data to provide you with access to the Platform, manage your Account, facilitate enquiries between Artisans and Customers, and process subscription payments. This processing is necessary to fulfil the contract we have with you as a registered User." },
      { id: "4-2", title: "Legitimate Interests (Article 6(1)(f))", content: "We process certain data based on our legitimate interests, which include:", bullets: [
        "Improving, developing, and maintaining the Platform;",
        "Detecting and preventing fraud, abuse, and security incidents;",
        "Conducting analytics to understand how the Platform is used;",
        "Communicating relevant updates, product news, and operational notices.",
      ], footer: "Where we rely on legitimate interests, we have assessed that our interests are not overridden by your rights and freedoms. You have the right to object to this processing — see Section 8." },
      { id: "4-3", title: "Legal Obligation (Article 6(1)(c))", content: "We may process your data where necessary to comply with a legal obligation, such as responding to lawful requests from regulatory authorities, law enforcement, or courts, or to meet our obligations under tax, financial reporting, or consumer protection law." },
      { id: "4-4", title: "Consent (Article 6(1)(a))", content: "Where we rely on your consent — for example, to send you marketing emails or to use non-essential cookies — we will always obtain your explicit consent before doing so. You may withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal." },
    ],
  },
  {
    num: 5, id: "how-we-use", title: "How We Use Your Data",
    intro: "We use personal data collected for the following purposes:",
    bullets: [
      "To create and manage your Account and provide access to Platform features;",
      "To enable location-based discovery of Artisan profiles by Customers;",
      "To process subscription payments and manage billing cycles;",
      "To facilitate the enquiry and messaging system between Artisans and Customers;",
      "To display and promote Artisan profiles in search results and on the Platform;",
      "To send transactional communications such as booking confirmations, payment receipts, and account alerts;",
      "To send marketing and promotional communications where you have opted in;",
      "To monitor and enforce compliance with our Terms of Service;",
      "To investigate reports of misconduct, fraud, or abuse;",
      "To conduct internal analytics, research, and Platform improvement;",
      "To comply with legal, regulatory, and tax obligations;",
      "To respond to and resolve support queries and complaints.",
    ],
  },
  {
    num: 6, id: "data-sharing", title: "Data Sharing and Third Parties",
    intro: "We do not sell your personal data to third parties. We may share your data only in the following circumstances:",
    subsections: [
      { id: "6-1", title: "Payment Processors", content: "Subscription payments are processed by our third-party payment provider (currently Stripe or equivalent). When you subscribe, your payment details are transmitted directly to and stored by our payment processor. We receive only a transaction confirmation and billing token. Our payment processor operates under its own privacy policy and is required to comply with PCI-DSS standards." },
      { id: "6-2", title: "Infrastructure and Technology Providers", content: "We use cloud hosting, database, and email delivery services to operate the Platform. These providers process data on our behalf under Data Processing Agreements that bind them to strict confidentiality and security obligations consistent with UK GDPR." },
      { id: "6-3", title: "Analytics Providers", content: "We use analytics services to understand how Users interact with the Platform. Where possible, data shared with analytics providers is anonymised or pseudonymised. We have contractual arrangements in place to ensure these providers do not use your data for their own purposes." },
      { id: "6-4", title: "Legal and Regulatory Disclosure", content: "We may disclose personal data to law enforcement agencies, regulatory authorities, courts, or other public bodies where we are legally required or authorised to do so, or where we believe disclosure is necessary to protect the rights, property, or safety of MensayHub Ltd, our Users, or the public." },
      { id: "6-5", title: "Business Transfers", content: "In the event of a merger, acquisition, sale of assets, or restructuring of MensayHub Ltd, personal data may be transferred to the acquiring entity as part of that transaction. We will notify affected Users before their data is transferred and becomes subject to a different privacy policy." },
      { id: "6-6", title: "Public Profile Information", content: "Artisan profile data — including name, service category, service area, portfolio, and ratings — is made publicly accessible on the Platform as part of its core functionality. By registering as an Artisan, you consent to this public display. You can manage what information appears on your profile through your Account settings." },
    ],
  },
  {
    num: 7, id: "data-retention", title: "Data Retention",
    subsections: [
      { id: "7-1", title: "Retention Periods", content: "We retain personal data only for as long as is necessary for the purposes for which it was collected, or as required by applicable law. Our standard retention periods are:", bullets: [
        "Account data: retained for the lifetime of the Account and for six (6) years following closure, in compliance with UK tax and commercial record-keeping requirements;",
        "Billing and transaction records: retained for seven (7) years in accordance with HMRC requirements;",
        "Support correspondence: retained for three (3) years from the date of the last interaction;",
        "Usage and analytics data: retained in aggregated or anonymised form indefinitely; raw log data retained for up to twelve (12) months;",
        "Marketing consent records: retained for three (3) years from the date consent was last confirmed or withdrawn.",
      ]},
      { id: "7-2", title: "Deletion on Request", content: "You may request the deletion of your personal data at any time (see Section 8 — Your Rights). We will act on deletion requests promptly, subject to any legal retention obligations that require us to keep certain data for a fixed period." },
      { id: "7-3", title: "Secure Disposal", content: "When personal data is no longer required and there is no legal basis for retaining it, we ensure it is securely deleted or anonymised using industry-standard methods, so that it cannot be recovered or used to identify you." },
    ],
  },
  {
    num: 8, id: "your-rights", title: "Your Rights Under UK GDPR",
    intro: "As a data subject under UK GDPR, you have the following rights in relation to your personal data:",
    subsections: [
      { id: "8-1", title: "Right of Access", content: "You have the right to request a copy of the personal data we hold about you (a 'Subject Access Request'). We will respond within one calendar month of receiving your request. There is no charge for this unless your request is manifestly unfounded or excessive." },
      { id: "8-2", title: "Right to Rectification", content: "If your personal data is inaccurate or incomplete, you have the right to ask us to correct it. You can also update much of your information directly through your Account settings." },
      { id: "8-3", title: "Right to Erasure ('Right to be Forgotten')", content: "You have the right to request that we delete your personal data in certain circumstances — for example, where the data is no longer necessary for the purpose it was collected, or where you withdraw consent and no other legal basis applies. This right is subject to legal retention obligations." },
      { id: "8-4", title: "Right to Restrict Processing", content: "You have the right to ask us to restrict how we use your data in certain circumstances — for example, while you contest its accuracy, or where you have objected to processing and we are assessing whether our legitimate interests override your rights." },
      { id: "8-5", title: "Right to Data Portability", content: "You have the right to receive your personal data in a structured, commonly used, machine-readable format, and to have it transmitted to another Data Controller where technically feasible. This right applies where processing is based on consent or contract and is carried out by automated means." },
      { id: "8-6", title: "Right to Object", content: "You have the right to object at any time to the processing of your personal data based on legitimate interests (Article 6(1)(f)), including profiling based on those interests. You also have an absolute right to object to processing your data for direct marketing purposes at any time, with no exceptions." },
      { id: "8-7", title: "Rights in Automated Decision-Making", content: "You have the right not to be subject to a decision based solely on automated processing (including profiling) that produces legal or similarly significant effects on you. We do not currently use fully automated decision-making of this kind, but if we do so in the future, we will notify you and provide the opportunity to request human review." },
      { id: "8-8", title: "How to Exercise Your Rights", content: "To exercise any of these rights, please contact us at privacy@artisanshub.org with your name, account email address, and a clear description of your request. We will respond within 30 days. We may need to verify your identity before processing your request.", footer: "If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at www.ico.org.uk or by calling 0303 123 1113." },
    ],
  },
  {
    num: 9, id: "cookies", title: "Cookies and Tracking Technologies",
    subsections: [
      { id: "9-1", title: "What Are Cookies", content: "Cookies are small text files stored on your device when you visit a website. They allow the website to recognise your device on return visits and store preferences or session information. We use both first-party cookies (set by ArtisansHub.org) and third-party cookies (set by our service providers)." },
      { id: "9-2", title: "How We Use Cookies", content: "We use cookies and similar technologies for the following purposes:", bullets: [
        "Strictly necessary cookies: essential for the Platform to function (e.g., keeping you logged in, maintaining session state). These cannot be disabled.",
        "Functional cookies: remember your preferences such as region settings and display options.",
        "Analytics cookies: help us understand how Users interact with the Platform so we can improve it (e.g., pages visited, time on site). Data is aggregated and anonymised where possible.",
        "Marketing cookies: used to show you relevant content or advertisements, only where you have provided consent.",
      ]},
      { id: "9-3", title: "Managing Cookies", content: "You can manage your cookie preferences at any time through the cookie settings panel on the Platform, or by adjusting your browser settings. Please note that disabling strictly necessary cookies will affect the Platform's functionality. For full details of the cookies we use, please see our Cookie Policy at artisanshub.org/cookie-policy." },
    ],
  },
  {
    num: 10, id: "security", title: "Data Security",
    intro: "We take the security of your personal data seriously and implement appropriate technical and organisational measures to protect it.",
    subsections: [
      { id: "10-1", title: "Security Measures", bullets: [
        "All data transmitted between your browser and our servers is encrypted using TLS (Transport Layer Security);",
        "Passwords are stored using industry-standard one-way hashing algorithms and are never stored in plain text;",
        "Access to personal data is restricted on a role-based, need-to-know basis;",
        "Our systems undergo regular security assessments and vulnerability reviews;",
        "Payment data is processed exclusively through PCI-DSS compliant third-party payment processors — we do not store full card details.",
      ]},
      { id: "10-2", title: "Data Breach Response", content: "In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, MensayHub Ltd will notify the ICO within 72 hours of becoming aware of the breach, as required under UK GDPR Article 33. Where the breach poses a high risk to affected individuals, we will also notify those individuals without undue delay under Article 34." },
      { id: "10-3", title: "Your Responsibilities", content: "While we implement strong security measures, the security of your Account also depends on you. You are responsible for keeping your login credentials confidential and using a strong, unique password. Please notify us immediately at support@artisanshub.org if you suspect any unauthorised access to your Account." },
    ],
  },
  {
    num: 11, id: "international-transfers", title: "International Data Transfers",
    subsections: [
      { id: "11-1", title: "Where We Process Data", content: "We process data primarily within the United Kingdom. However, some of our third-party service providers (such as cloud hosting and analytics platforms) may be based in or transfer data to countries outside the UK." },
      { id: "11-2", title: "Safeguards for International Transfers", content: "Where personal data is transferred outside the UK, we ensure that appropriate safeguards are in place in accordance with UK GDPR Chapter V. These may include:", bullets: [
        "Transfers to countries with an adequacy decision from the UK Secretary of State;",
        "Use of UK-approved International Data Transfer Agreements (IDTAs) or the UK Addendum to EU Standard Contractual Clauses;",
        "Binding corporate rules or other approved transfer mechanisms.",
      ], footer: "You may request information about the specific safeguards we apply to international transfers by contacting privacy@artisanshub.org." },
    ],
  },
  {
    num: 12, id: "children", title: "Children's Privacy",
    content: "ArtisansHub.org is not directed at children under the age of 18, and we do not knowingly collect personal data from individuals under 18. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us immediately at privacy@artisanshub.org. We will investigate and, where confirmed, delete the data as quickly as practicable. By creating an Account or using the Platform, you confirm that you are at least 18 years of age.",
  },
  {
    num: 13, id: "policy-changes", title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time to reflect changes in our practices, legal obligations, or regulatory guidance. The effective date at the top of this document will be updated accordingly. We will notify registered Users of material changes by email at least 14 days before they take effect. We encourage you to review this Policy periodically. Your continued use of the Platform following the publication of changes constitutes your acknowledgement of the revised Policy.",
  },
  {
    num: 14, id: "contact", title: "Contact and Complaints",
    content: "For any questions, concerns, or requests relating to this Privacy Policy or how we handle your personal data, please contact us:",
  },
];
