import type { TermsSection } from "./terms.types";

export const SECTIONS: TermsSection[] = [
  {
    num: 1, id: "definitions", title: "Definitions",
    intro: "In these Terms of Service, the following terms shall have the meanings set out below unless the context requires otherwise:",
    bullets: [
      '"ArtisansHub", "Platform", "we", "us", "our" — refers to ArtisansHub.org, operated by MensayHub Ltd.',
      '"MensayHub Ltd" — the registered company operating the Platform, incorporated in England and Wales.',
      '"Artisan" or "Service Provider" — any individual or business that registers on the Platform to advertise, showcase, or offer services.',
      '"Customer" or "Client" — any individual or business that accesses the Platform to discover, enquire about, or engage an Artisan.',
      '"User" — refers collectively to Artisans and Customers, and any other person accessing the Platform.',
      '"Account" — the registered profile created by a User on the Platform.',
      '"Subscription" — the paid membership plan taken out by an Artisan to access visibility and enquiry features on the Platform.',
      '"Services" — the artisan or trade services advertised by an Artisan on the Platform. The Platform itself does not provide these services.',
      '"Content" — any text, images, videos, reviews, ratings, portfolio items, or other material uploaded or submitted by Users.',
      '"Enquiry" — a message or request submitted by a Customer to an Artisan via the Platform\'s built-in enquiry system.',
      '"UK GDPR" — the UK General Data Protection Regulation as retained in UK law by the European Union (Withdrawal) Act 2018, read alongside the Data Protection Act 2018.',
      '"ICO" — the Information Commissioner\'s Office, the UK\'s independent authority for data protection.',
    ],
  },
  {
    num: 2, id: "acceptance", title: "Acceptance of Terms",
    subsections: [
      { id: "2-1", content: "By accessing, browsing, or using the Platform in any way — including registering an Account, subscribing as an Artisan, or submitting an Enquiry as a Customer — you confirm that you have read and agree to be bound by these Terms of Service, our Privacy Policy, and any other policies published on the Platform from time to time." },
      { id: "2-2", content: "If you are agreeing to these Terms on behalf of a business or organisation, you represent and warrant that you have the authority to bind that entity to these Terms." },
      { id: "2-3", content: "If you do not agree with any part of these Terms, you must immediately cease using the Platform and, if applicable, close your Account." },
      { id: "2-4", content: "We reserve the right to update or amend these Terms at any time. Changes will be effective upon publication on the Platform. Continued use of the Platform following publication constitutes acceptance of the revised Terms. We will notify registered Users of material changes by email where practicable." },
    ],
  },
  {
    num: 3, id: "about", title: "About the Platform",
    subsections: [
      { id: "3-1", title: "Nature of Service", content: "ArtisansHub.org is a location-based digital marketplace that connects customers seeking skilled trades and craft services with independent artisans and service providers across the United Kingdom. The Platform provides Artisans with professional profile pages, portfolio showcasing, a subscription-based visibility system, and a client enquiry mechanism." },
      { id: "3-2", title: "Intermediary Role", content: "ArtisansHub acts solely as an intermediary facilitating introductions between Artisans and Customers. MensayHub Ltd is not a party to any contract formed between an Artisan and a Customer. We do not employ Artisans, guarantee the quality of Services, or take responsibility for any service performed or not performed as a result of an introduction made through the Platform." },
      { id: "3-3", title: "Platform Availability", content: "We endeavour to maintain continuous availability of the Platform but do not guarantee uninterrupted access. Scheduled maintenance, technical issues, or circumstances beyond our control may affect availability. We will use reasonable endeavours to notify Users of planned downtime in advance." },
    ],
  },
  {
    num: 4, id: "eligibility", title: "Eligibility and Registration",
    subsections: [
      { id: "4-1", title: "Age Requirement", content: "You must be at least 18 years of age to create an Account or use the Platform. By registering, you confirm that you meet this age requirement." },
      { id: "4-2", title: "Artisan Eligibility", content: "To register as an Artisan, you must:", bullets: [
        "Be a legitimate individual trader, sole trader, partnership, or registered company offering genuine skilled services;",
        "Hold all licences, qualifications, certifications, and insurance required by law or industry standards to perform the services you advertise;",
        "Be based in or serving customers within the United Kingdom;",
        "Provide accurate and truthful information about yourself and your services.",
      ]},
      { id: "4-3", title: "Account Accuracy", content: "All information provided during registration must be accurate, current, and complete. You must promptly update your Account if any information changes. You are responsible for all activity that occurs under your Account and must maintain the confidentiality of your login credentials." },
      { id: "4-4", title: "One Account Per User", content: "Each individual or business entity may hold only one active Account on the Platform unless explicitly authorised in writing by ArtisansHub. Operating multiple Accounts to circumvent suspensions, restrictions, or fees is strictly prohibited." },
    ],
  },
  {
    num: 5, id: "subscriptions", title: "Artisan Subscriptions and Billing",
    subsections: [
      { id: "5-1", title: "Subscription Requirement", content: "Artisans are required to hold an active paid subscription to maintain a visible, discoverable profile on the Platform and receive client enquiries. The subscription model exists to ensure that only committed, professional Artisans participate on the Platform, maintaining quality and trust for Customers." },
      { id: "5-2", title: "Subscription Tiers", content: "The following subscription plans are currently available. Prices are inclusive of any applicable taxes where stated:", bullets: [
        "Introductory Plan: £1.00 per month for the first three (3) months. Available to new Artisan registrations only. Automatically transitions to the Standard Plan after three months unless cancelled.",
        "Founding Member Plan: £5.00 per month. Available to early adopters during the Platform's growth phase. Subject to availability.",
        "Standard Plan: £9.00 per month. The default ongoing subscription for all Artisans.",
        "Annual Plan: Pricing as published on the Platform at the time of sign-up. Billed annually in advance.",
      ], footer: "ArtisansHub reserves the right to introduce, modify, or discontinue subscription tiers with reasonable notice to affected Users." },
      { id: "5-3", title: "Billing and Payment", content: "Subscriptions are billed on a recurring basis (monthly or annually, depending on the plan selected). Payment is processed automatically at the start of each billing cycle via our third-party payment processor. By subscribing, you authorise us to charge your nominated payment method on each renewal date. You must ensure your payment details are valid and up to date. Failed payments may result in suspension of your Artisan profile until payment is resolved." },
      { id: "5-4", title: "Cancellation", content: "You may cancel your subscription at any time through your Account settings or by contacting support@artisanshub.org. Cancellation takes effect at the end of the current billing period. No refunds are provided for the remainder of an unexpired billing period unless required by law." },
      { id: "5-5", title: "Refunds", content: "Subscription fees are generally non-refundable. However, where you have been charged in error, or where you are entitled to a refund under the Consumer Rights Act 2015 or other applicable UK consumer law, please contact us within 14 days of the charge. Refund requests will be assessed on a case-by-case basis." },
      { id: "5-6", title: "Price Changes", content: "We may change subscription pricing from time to time. We will give existing subscribers at least 30 days' written notice of any price increase. Continued use of the Platform following the notice period constitutes acceptance of the new pricing." },
      { id: "5-7", title: "Visibility and Expired Subscriptions", content: "Artisan profiles with an expired or lapsed subscription will be removed from public search results and will not receive new enquiries until the subscription is renewed. Historical profile data will be retained in accordance with our data retention policy." },
    ],
  },
  {
    num: 6, id: "conduct", title: "User Conduct and Responsibilities",
    subsections: [
      { id: "6-1", title: "General Conduct", content: "All Users must use the Platform lawfully, honestly, and in good faith. You agree not to:", bullets: [
        "Provide false, misleading, or fraudulent information in your Account, profile, or communications;",
        "Impersonate another person, business, or organisation;",
        "Engage in harassment, abuse, discrimination, or threatening behaviour towards other Users;",
        "Use the Platform to facilitate illegal activity of any kind;",
        "Attempt to bypass, disable, or circumvent any security feature or access control of the Platform;",
        "Scrape, harvest, or systematically extract data from the Platform without our prior written consent;",
        "Upload or transmit viruses, malware, or any other malicious code;",
        "Use automated bots, scripts, or tools to interact with the Platform;",
        "Post spam, unsolicited commercial messages, or engage in phishing activities;",
        "Circumvent the Platform's enquiry or messaging system to conduct business off-platform in a manner intended to avoid Platform fees or subscription requirements.",
      ]},
      { id: "6-2", title: "Artisan-Specific Responsibilities", content: "In addition to the general conduct requirements above, Artisans must:", bullets: [
        "Ensure all services advertised are within their genuine competence and covered by appropriate qualifications, certifications, and professional indemnity or public liability insurance where required;",
        "Respond to enquiries promptly and professionally;",
        "Honour agreed commitments with Customers;",
        "Comply with all applicable UK laws and regulations governing their trade or profession, including but not limited to the Health and Safety at Work Act 1974, the Consumer Rights Act 2015, and any sector-specific regulatory requirements;",
        "Not advertise services that are illegal, dangerous, or prohibited under UK law;",
        "Promptly notify ArtisansHub if they become aware that their profile contains inaccurate or outdated information;",
        "Not solicit reviews or ratings in exchange for payment, discounts, or other incentives.",
      ]},
      { id: "6-3", title: "Customer-Specific Responsibilities", content: "Customers must:", bullets: [
        "Use the Platform to make genuine, good-faith enquiries only;",
        "Treat Artisans with courtesy and professionalism;",
        "Not submit false, fraudulent, or malicious reviews;",
        "Engage Artisans through the Platform's enquiry system rather than soliciting contact details for off-platform engagement that circumvents the Platform's purpose;",
        "Pay Artisans fairly and in accordance with agreed terms for services rendered.",
      ]},
    ],
  },
  {
    num: 7, id: "content", title: "Content, Profiles and Reviews",
    subsections: [
      { id: "7-1", title: "User-Generated Content", content: "The Platform allows Artisans to upload portfolio images, service descriptions, certifications, and other materials. By submitting Content to the Platform, you grant MensayHub Ltd a non-exclusive, worldwide, royalty-free licence to display, reproduce, and distribute that Content on the Platform and in associated marketing materials (including social media and press) for the purposes of promoting the Platform and your profile." },
      { id: "7-2", title: "Content Standards", content: "All Content submitted must:", bullets: [
        "Be accurate, truthful, and not misleading;",
        "Be owned by you or used with the appropriate permission of the rights holder;",
        "Not infringe the intellectual property, privacy, or other rights of any third party;",
        "Not contain offensive, discriminatory, defamatory, obscene, or illegal material;",
        "Not contain personal data of third parties without their consent;",
        "Comply with all applicable advertising standards, including those of the Advertising Standards Authority (ASA).",
      ]},
      { id: "7-3", title: "Reviews and Ratings", content: "The Platform's review and ratings system enables Customers to provide feedback on Artisans. Reviews must be genuine, based on real experiences, and comply with Content standards above. ArtisansHub reserves the right to remove reviews that breach these standards, are fraudulent, or are the subject of a legitimate dispute. We do not endorse or verify the accuracy of reviews." },
      { id: "7-4", title: "Content Moderation", content: "ArtisansHub reserves the right (but is not obligated) to review, edit, or remove any Content that breaches these Terms, applicable law, or our platform policies. We are not responsible for Content submitted by Users." },
    ],
  },
  {
    num: 8, id: "data-protection", title: "Data Protection and Privacy",
    subsections: [
      { id: "8-1", title: "Our Commitment", content: "MensayHub Ltd is committed to protecting the privacy and personal data of all Users. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. MensayHub Ltd is registered with the Information Commissioner's Office (ICO) as a Data Controller." },
      { id: "8-2", title: "Data We Collect", content: "We collect and process the following categories of personal data:", bullets: [
        "Identity data: name, username, business name;",
        "Contact data: email address, phone number, physical address;",
        "Profile data: service categories, portfolio content, skills, qualifications;",
        "Transaction data: subscription history, billing records, payment method details (held securely by our payment processor);",
        "Technical data: IP address, browser type, device identifiers, cookies and usage data;",
        "Communications data: enquiries, messages exchanged through the Platform, support correspondence;",
        "Review data: ratings and feedback submitted by Customers.",
      ]},
      { id: "8-3", title: "How We Use Your Data", content: "We process personal data for the following lawful purposes:", bullets: [
        "Performance of contract: to provide Platform services, manage your Account, and process subscription payments;",
        "Legitimate interests: to improve the Platform, detect fraud, ensure security, and communicate relevant updates;",
        "Legal obligation: to comply with applicable law, regulatory requirements, and law enforcement requests;",
        "Consent: for marketing communications where you have opted in.",
      ]},
      { id: "8-4", title: "Data Sharing", content: "We do not sell your personal data. We may share data with:", bullets: [
        "Payment processors (e.g. Stripe or equivalent) for subscription billing — subject to their own privacy policies and PCI-DSS compliance;",
        "Analytics providers to help us understand Platform usage (data anonymised or pseudonymised where possible);",
        "Hosting and cloud infrastructure providers that process data on our behalf under Data Processing Agreements;",
        "Law enforcement or regulatory authorities where required by law.",
      ]},
      { id: "8-5", title: "Data Retention", content: "We retain personal data only for as long as necessary for the purposes for which it was collected, or as required by law. Account data is retained for the duration of the Account and for a period of six (6) years following closure, in line with UK tax and commercial law requirements. You may request deletion of your data subject to applicable legal retention obligations." },
      { id: "8-6", title: "Your Data Rights", content: "Under UK GDPR, you have the following rights in relation to your personal data:", bullets: [
        "Right of access — to obtain a copy of your personal data;",
        "Right to rectification — to correct inaccurate or incomplete data;",
        "Right to erasure — to request deletion of your data in certain circumstances;",
        "Right to restrict processing — to limit how we use your data in certain circumstances;",
        "Right to data portability — to receive your data in a structured, machine-readable format;",
        "Right to object — to object to processing based on legitimate interests or for direct marketing;",
        "Rights in relation to automated decision-making — to not be subject to solely automated decisions with significant effects.",
      ], footer: "To exercise any of these rights, please contact: privacy@artisanshub.org. We will respond within 30 days. You also have the right to lodge a complaint with the ICO at www.ico.org.uk or by calling 0303 123 1113." },
      { id: "8-7", title: "International Transfers", content: "We process data primarily within the United Kingdom. Where data is transferred internationally (for example, to cloud service providers), we ensure appropriate safeguards are in place in accordance with UK GDPR Chapter V, including Standard Contractual Clauses or equivalent measures." },
    ],
  },
  {
    num: 9, id: "security", title: "Platform Security",
    subsections: [
      { id: "9-1", title: "Our Security Measures", content: "MensayHub Ltd implements appropriate technical and organisational security measures to protect the Platform and User data against unauthorised access, disclosure, alteration, or destruction. These measures include:", bullets: [
        "Encryption of data in transit using TLS (Transport Layer Security) protocols;",
        "Secure storage of passwords using industry-standard hashing algorithms;",
        "Access controls and role-based permissions limiting internal access to personal data;",
        "Regular security assessments and platform vulnerability reviews;",
        "Payment data processed exclusively through PCI-DSS compliant third-party payment processors — we do not store full card details on our servers.",
      ]},
      { id: "9-2", title: "User Security Obligations", content: "You are responsible for maintaining the security of your Account. You must:", bullets: [
        "Use a strong, unique password for your ArtisansHub Account;",
        "Not share your login credentials with any third party;",
        "Log out of your Account after each session on shared or public devices;",
        "Notify us immediately at support@artisanshub.org if you suspect unauthorised access to your Account.",
      ]},
      { id: "9-3", title: "Data Breaches", content: "In the event of a personal data breach that is likely to result in a risk to the rights and freedoms of individuals, MensayHub Ltd will notify the ICO within 72 hours of becoming aware of the breach, as required under UK GDPR Article 33. Where the breach is likely to result in a high risk to affected individuals, we will also notify those individuals without undue delay, as required under UK GDPR Article 34." },
    ],
  },
  {
    num: 10, id: "payments", title: "Payments Between Artisans and Customers",
    subsections: [
      { id: "10-1", title: "Direct Payment Arrangements", content: "Payments for services arranged between Artisans and Customers are made directly between those parties. ArtisansHub is not a party to payment arrangements for services and does not process, hold, or guarantee such payments. Artisans and Customers should agree payment terms, methods, and amounts between themselves before work commences." },
      { id: "10-2", title: "Platform Subscription Payments", content: "Artisan subscription fees are processed by our third-party payment provider. By subscribing, you authorise us to charge your nominated payment method in accordance with your chosen plan. All subscription transactions are subject to the payment provider's terms and conditions." },
      { id: "10-3", title: "Disputed Payments", content: "ArtisansHub is not responsible for resolving payment disputes between Artisans and Customers for services rendered. Customers should raise disputes directly with the Artisan in the first instance. Where an Artisan disputes a subscription charge made by ArtisansHub, they should contact support@artisanshub.org within 14 days of the charge." },
      { id: "10-4", title: "Taxes", content: "Each Artisan is solely responsible for declaring and paying any income tax, VAT, National Insurance contributions, or other taxes arising from services provided through the Platform. ArtisansHub does not provide tax advice. Where an Artisan is VAT-registered, it is their responsibility to apply VAT correctly to their services and comply with HMRC requirements." },
      { id: "10-5", title: "Future Transaction Model", content: "ArtisansHub may in future introduce a transaction or commission model whereby a percentage fee is charged on service transactions facilitated through the Platform. Where this model is introduced, affected Users will be given at least 30 days' advance written notice and updated Terms will be published." },
    ],
  },
  {
    num: 11, id: "intellectual-property", title: "Intellectual Property",
    subsections: [
      { id: "11-1", title: "Platform Ownership", content: "All intellectual property rights in and to the Platform — including its design, layout, code, databases, branding, logos, text, and features — are owned by or licensed to MensayHub Ltd and are protected by copyright, trade mark, database rights, and other applicable intellectual property laws." },
      { id: "11-2", title: "Limited Licence to Users", content: "We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform in accordance with these Terms for your own personal or business purposes. This licence does not permit you to copy, reproduce, modify, distribute, reverse-engineer, or create derivative works from Platform content without our prior written consent." },
      { id: "11-3", title: "User Content Licence", content: "You retain ownership of Content you submit to the Platform. By submitting Content, you grant MensayHub Ltd the licence described in Section 7.1. You represent and warrant that you have the right to grant this licence and that your Content does not infringe any third-party rights." },
      { id: "11-4", title: "Trade Marks", content: '"ArtisansHub" and associated logos are trade marks of MensayHub Ltd. You may not use these trade marks without our prior written consent. Use of third-party trade marks on the Platform does not imply any endorsement or affiliation.' },
    ],
  },
  {
    num: 12, id: "third-party", title: "Third-Party Services and Links",
    subsections: [
      { id: "12-1", content: "The Platform may integrate with or link to third-party services, including payment processors, mapping services, social media platforms, and analytics providers. These third-party services are governed by their own terms and privacy policies. ArtisansHub is not responsible for the content, availability, or practices of third-party services." },
      { id: "12-2", content: "Any personal data shared with third-party providers is subject to those providers' privacy policies. We ensure that all third-party providers we work with are contractually bound to appropriate data protection standards." },
      { id: "12-3", content: "ArtisansHub may display links to external websites. We do not endorse or take responsibility for the content of external sites." },
    ],
  },
  {
    num: 13, id: "liability", title: "Limitation of Liability",
    subsections: [
      { id: "13-1", title: "Disclaimer", content: 'The Platform is provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement, to the fullest extent permitted by law.' },
      { id: "13-2", title: "No Liability for Artisan Services", content: "ArtisansHub does not vet, verify, or endorse individual Artisans beyond the profile information they provide. We make no representations regarding the quality, safety, legality, or suitability of any services advertised on the Platform. Customers engage Artisans entirely at their own risk and are responsible for conducting their own due diligence, including verifying qualifications, insurance, and references." },
      { id: "13-3", title: "Limitation of Financial Liability", content: "To the maximum extent permitted by applicable law, MensayHub Ltd's total aggregate liability to any User arising out of or in connection with these Terms or use of the Platform shall not exceed the greater of: (a) the total subscription fees paid by you to ArtisansHub in the twelve (12) months preceding the claim; or (b) £100." },
      { id: "13-4", title: "Excluded Losses", content: "MensayHub Ltd shall not be liable for any indirect, consequential, incidental, special, or punitive damages, or for loss of profits, loss of business, loss of data, or loss of goodwill, whether arising from breach of contract, tort, negligence, or otherwise, even if advised of the possibility of such damages." },
      { id: "13-5", title: "Statutory Rights", content: "Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable UK law, including rights under the Consumer Rights Act 2015." },
    ],
  },
  {
    num: 14, id: "indemnification", title: "Indemnification",
    content: "You agree to indemnify, defend, and hold harmless MensayHub Ltd, its directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your use of the Platform in breach of these Terms; (b) Content you submit to the Platform; (c) services you provide or fail to provide as an Artisan; or (d) any dispute between you and another User.",
  },
  {
    num: 15, id: "termination", title: "Account Suspension and Termination",
    subsections: [
      { id: "15-1", title: "Termination by You", content: "You may close your Account at any time by contacting support@artisanshub.org. Artisans wishing to terminate must also cancel their subscription. Termination does not entitle you to a refund of any prepaid subscription fees except as required by law." },
      { id: "15-2", title: "Suspension or Termination by ArtisansHub", content: "We reserve the right to suspend, restrict, or permanently terminate any Account, with or without notice, where we reasonably believe that:", bullets: [
        "You have breached any provision of these Terms;",
        "You have engaged in fraudulent, abusive, or harmful conduct;",
        "Your Account poses a risk to the security, integrity, or reputation of the Platform or its Users;",
        "We are required to do so by law or regulatory authority.",
      ]},
      { id: "15-3", title: "Effect of Termination", content: "Upon termination of your Account, your access to the Platform will cease immediately. Artisan profiles will be removed from public view. We may retain your data for the period required by law. Any outstanding subscription obligations remain payable. Sections of these Terms that by their nature should survive termination (including intellectual property, limitation of liability, and governing law) shall continue in full force and effect." },
    ],
  },
  {
    num: 16, id: "disputes", title: "Dispute Resolution",
    subsections: [
      { id: "16-1", title: "Disputes Between Users", content: "ArtisansHub provides the Platform as an intermediary only. We are not responsible for resolving disputes between Artisans and Customers arising from service engagements. We encourage Users to resolve disputes amicably and directly. Where a dispute relates to a review posted on the Platform, the relevant party may contact us at support@artisanshub.org to flag a concern for review under our Content moderation process." },
      { id: "16-2", title: "Complaints About ArtisansHub", content: 'If you have a complaint about ArtisansHub or MensayHub Ltd, please contact us in the first instance at support@artisanshub.org with the subject line "Formal Complaint". We will acknowledge your complaint within 5 business days and aim to provide a substantive response within 20 business days.' },
      { id: "16-3", title: "Alternative Dispute Resolution", content: "If a complaint is not resolved to your satisfaction, you may be entitled to refer the matter to an independent alternative dispute resolution (ADR) scheme. Details of available ADR schemes will be provided in our response to your complaint where applicable." },
    ],
  },
  {
    num: 17, id: "cookies", title: "Cookies",
    content: "The Platform uses cookies and similar tracking technologies to enhance your experience, analyse usage, and support Platform functionality. By continuing to use the Platform after accepting our cookie notice, you consent to our use of cookies in accordance with our Cookie Policy, which is available at artisanshub.org/cookie-policy. You may manage your cookie preferences through your browser settings, though disabling certain cookies may affect Platform functionality.",
  },
  {
    num: 18, id: "modifications", title: "Platform Modifications",
    content: "ArtisansHub reserves the right to modify, update, or discontinue any feature, functionality, or aspect of the Platform at any time, including subscription features, search algorithms, and profile visibility settings. We will endeavour to notify Users of material changes in advance. Continued use of the Platform following any modification constitutes acceptance of those changes.",
  },
  {
    num: 19, id: "force-majeure", title: "Force Majeure",
    content: "MensayHub Ltd shall not be liable for any failure or delay in performing its obligations under these Terms where such failure or delay results from circumstances beyond its reasonable control, including but not limited to: acts of God, natural disasters, pandemic, war, terrorism, civil unrest, government action, internet outages, or failures of third-party infrastructure providers.",
  },
  {
    num: 20, id: "governing-law", title: "Governing Law and Jurisdiction",
    content: "These Terms of Service and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms, subject to any mandatory rights you may have under consumer protection law in your jurisdiction.",
  },
  {
    num: 21, id: "regulatory", title: "Regulatory Compliance",
    intro: "ArtisansHub.org operates in compliance with applicable United Kingdom law and regulation. Relevant compliance frameworks and registrations include:",
    bullets: [
      "UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018 — MensayHub Ltd is registered with the Information Commissioner's Office (ICO) as a Data Controller;",
      "Electronic Commerce (EC Directive) Regulations 2002 — governing online service provision and information requirements;",
      "Consumer Rights Act 2015 — applicable to consumer-facing subscription services and dispute resolution;",
      "Payment Services Regulations 2017 — subscription payments are processed via regulated third-party payment service providers;",
      "Advertising Standards Authority (ASA) guidelines — all platform advertising and promotional content complies with the UK CAP Code;",
      "Modern Slavery Act 2015 — we are committed to ensuring that our supply chain and business operations are free from modern slavery and human trafficking.",
    ],
    footer: "Artisans are independently responsible for their own regulatory compliance relevant to their trade or profession, including sector-specific licensing, insurance, and HMRC obligations.",
  },
  {
    num: 22, id: "general", title: "General Provisions",
    subsections: [
      { id: "22-1", title: "Entire Agreement", content: "These Terms, together with the Privacy Policy and Cookie Policy, constitute the entire agreement between you and MensayHub Ltd in relation to your use of the Platform and supersede all prior agreements, understandings, and representations." },
      { id: "22-2", title: "Severability", content: "If any provision of these Terms is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it enforceable, or severed if modification is not possible, without affecting the enforceability of the remaining provisions." },
      { id: "22-3", title: "Waiver", content: "Failure by MensayHub Ltd to enforce any provision of these Terms shall not constitute a waiver of our right to enforce that provision in the future." },
      { id: "22-4", title: "Assignment", content: "You may not assign or transfer your rights or obligations under these Terms without our prior written consent. MensayHub Ltd may assign its rights and obligations under these Terms to a successor entity in the event of a merger, acquisition, or sale of assets." },
      { id: "22-5", title: "No Partnership or Agency", content: "Nothing in these Terms creates a partnership, joint venture, agency, franchise, or employment relationship between you and MensayHub Ltd." },
    ],
  },
  {
    num: 23, id: "contact", title: "Contact Information",
    content: "For any queries, complaints, or requests relating to these Terms of Service or your use of the Platform, please contact us:",
  },
];
