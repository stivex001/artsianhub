import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      // padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    
    extend: {
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        lightgray: "#D9D9D9",
        primary: "#02198B",
        lightp: "#374151",
        btnprimary: "#0357EE",
        darkBlue: "#020E23",
        secondary: "#0064BE",
        accountBg: "#E7EEFA",
        accent: "#F0C422",
        black: "#1C1C1C",
        borderblack: "#1C1C1C1A",
        bordergray: "#B5B5B5",
        textcolor: "#64748B",
        textdark: "#02050A",
        textbrown: "#33354D",
        bordergrey: "#D1D5DB",
        tableText: "#464F60",
        operationBg: "#F1F6FF",
        placeholderText: "#84888D",
        regionGrayText: "#5F5F5F",
        lightButton: "#C2D8FF",
        grayish: "#9694A4",
      },
      boxShadow: {
        dropShadow: "0px 4px 4px 0px #00000040",
        cardShadow: "0px 4px 4px 0px #00000040",
      },

      backgroundImage: {
        upvector: "url('/arti.png')",
        downvector: "url('/downvector.png')",
        logobg: "url('/logoBackground.png')",
        hero: "url('/hero.png')",
        service: "url('/service.png')",
        "hero-gradient": "linear-gradient(180deg, #3C42D1 70%, #00000033 30%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
