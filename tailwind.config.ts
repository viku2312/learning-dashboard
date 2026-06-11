import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0A0A0F",
          surface: "#0F0F17",
          elevated: "#161622",
          border: "#1E1E2E",
        },
        accent: {
          violet: "#7C3AED",
          indigo: "#4F46E5",
          cyan: "#06B6D4",
          emerald: "#10B981",
        },
        text: {
          primary: "#F1F0FB",
          secondary: "#A09FC0",
          muted: "#5E5C7A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      backgroundImage: {
        "glow-violet": "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)",
        "glow-cyan": "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.12) 0%, transparent 70%)",
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "streak-shine": "streak-shine 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "streak-shine": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      gridTemplateColumns: {
        bento: "repeat(12, 1fr)",
      },
      boxShadow: {
        "glow-violet": "0 0 30px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)",
        "glow-cyan": "0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.1)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
