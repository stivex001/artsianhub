interface SubCategoryMeta {
  emoji: string;
  description: string;
  accent: string;
  bg: string;
}

export const SUBCATEGORY_META: Record<string, SubCategoryMeta> = {
  // Creative Artisans
  "Hairdressers & Barbers": {
    emoji: "💇",
    description:
      "Expert haircutting, coloring, and grooming for all hair types and styles. Find talented hairdressers and barbers near you.",
    accent: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
  },
  "Tailors & Fashion Designers": {
    emoji: "🧵",
    description:
      "Custom-fitted garments that blend tradition, creativity, and personal expression. From everyday wear to special occasions.",
    accent: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
  },
  "Event Planners & Decorators": {
    emoji: "🎉",
    description:
      "Designing memorable moments and breathtaking spaces for every occasion — weddings, birthdays, corporate events and more.",
    accent: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
  },
  "Make-up Artists": {
    emoji: "💄",
    description:
      "Transformative makeup for weddings, events, photoshoots, and everyday glam. Discover skilled makeup artists in your area.",
    accent: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
  },
  "Chefs": {
    emoji: "👨‍🍳",
    description:
      "Private and personal chefs delivering extraordinary dining experiences — from dinner parties to weekly meal prep.",
    accent: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
  },
  "Photographers and Videographers": {
    emoji: "📸",
    description:
      "Capturing life's most meaningful moments through professional photography and videography. Events, portraits, and beyond.",
    accent: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
  },
  // Digital Artisans
  "Graphic Designers & Illustrators": {
    emoji: "🎨",
    description:
      "Logos, branding, digital art, and visual identities that make your business stand out in a crowded market.",
    accent: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
  },
  "Web Designers & Developers": {
    emoji: "💻",
    description:
      "Custom websites, landing pages, and eCommerce solutions built to perform and convert. From design to deployment.",
    accent: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
  },
  "UI/UX Designers": {
    emoji: "🖥️",
    description:
      "User-centered interfaces and seamless digital experiences for apps and websites. Turning complex flows into intuitive designs.",
    accent: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
  "Content Creators & Social Media Managers": {
    emoji: "📱",
    description:
      "Digital content strategy, social media management, and online brand building that drives real engagement and growth.",
    accent: "from-green-500 to-teal-600",
    bg: "bg-green-50",
  },
  // Pro Artisans
  "Plumbers & Electricians": {
    emoji: "🔧",
    description:
      "Reliable home maintenance, plumbing repairs, and electrical installations by certified and experienced professionals.",
    accent: "from-blue-600 to-cyan-600",
    bg: "bg-blue-50",
  },
  "Mechanics & Motorbikes Technicians": {
    emoji: "🔩",
    description:
      "Expert car and motorbike servicing, diagnostics, and repair. Get your vehicle running perfectly again.",
    accent: "from-slate-600 to-gray-700",
    bg: "bg-slate-100",
  },
  "Cleaning Services": {
    emoji: "🧹",
    description:
      "Professional cleaning services for homes, offices, and commercial spaces. Spotless results you can count on.",
    accent: "from-teal-500 to-green-500",
    bg: "bg-teal-50",
  },
  "Handymen & General Repair Specialists": {
    emoji: "🛠️",
    description:
      "Home improvement, general repairs, furniture assembly, and all the tasks on your to-do list — done right.",
    accent: "from-amber-600 to-orange-600",
    bg: "bg-amber-50",
  },
};

export const DEFAULT_META: SubCategoryMeta = {
  emoji: "✨",
  description:
    "Discover skilled and verified artisans specialising in this craft. Browse profiles, check reviews, and get in touch.",
  accent: "from-primary to-blue-600",
  bg: "bg-blue-50",
};

export function getSubCategoryMeta(name: string): SubCategoryMeta {
  return SUBCATEGORY_META[name] ?? DEFAULT_META;
}
