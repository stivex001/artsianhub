import {
  FacebookIcon,
  Instagram,
  Linkdln,
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
      href: "#",
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
      href: "#",
    },
  ];

  const supportLinks = [
    {
      label: "Help Center",
      href: "#",
    },
    {
      label: "FAQ",
      href: "#",
    },
    {
      label: "Privacy Policy",
      href: "#",
    },
    {
      label: "Terms of Service",
      href: "#",
    },
    {
      label: "Accessibilty",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: "www.facebook.com",
    },
    {
      icon: Instagram,
      href: "www.instagram.com",
    },
    {
      icon: Twitter,
      href: "www.x.com",
    },
    {
      icon: Linkdln,
      href: "www.linkdln.com",
    },
    {
      icon: Youtube,
      href: "www.youtube.com",
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
