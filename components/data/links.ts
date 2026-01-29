import {
  FacebookIcon,
  Instagram,
  Linkdln,
  TikTok,
  Twitter,
  Youtube,
} from "../assets/icons/SocialIcons";

export const useNavigationLinks = () => {
  const customerLinks = [
    {
      label: "Find an Artisan",
      href: "#",
    },
    {
      label: "Browse Categories",
      href: "#",
    },
    {
      label: "How It Works",
      href: "#",
    },
    {
      label: "Client Reviews",
      href: "#",
    },
    {
      label: "Trust & Safety",
      href: "#",
    },
  ];

  const artisansLinks = [
    {
      label: "Join as an Artisan",
      href: "/auth/signup?role=artisan",
    },
    {
      label: "Artisan Success Stories",
      href: "#",
    },
    {
      label: "Resources",
      href: "#",
    },
    {
      label: "Community Guidelines",
      href: "#",
    },
    {
      label: "Artisan Support",
      href: "#",
    },
  ];
  const aboutLinks = [
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Careers",
      href: "#",
    },
    {
      label: "Press",
      href: "#",
    },
    {
      label: "Contact",
      href: "/contact-us",
    },
  ];

  const supportLinks = [
    {
      label: "Help Center",
      href: "#",
    },
    {
      label: "FAQ",
      href: "/faq",
    },
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Terms of Service",
      href: "/terms",
    },
    {
      label: "Join our whatsapp community",
      href: "https://chat.whatsapp.com/DfYAaRMvqwF3FeLbtyHtrM?mode=hqrt2",
    },
  ];

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: "https://www.facebook.com/profile.php?id=61578356903295&mibextid=ZbWKwL",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/artisanscommunity?igsh=YzljYTk1ODg3Zg==",
    },
    {
      icon: TikTok,
      href: "https://www.tiktok.com/@artisanscommunity?_t=ZN-8yvnwsfDvz4&_r=1",
    },
    {
      icon: Twitter,
      href: "https://www.x.com",
    },
    {
      icon: Linkdln,
      href: "https://www.linkedin.com",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com",
    },
  ];

  return {
    customerLinks,
    artisansLinks,
    aboutLinks,
    supportLinks,
    socialLinks,
  };
};
