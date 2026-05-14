import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        panel: "#0b1324",
        panelSoft: "#101b33",
        cyan: "#37d6ff",
        cyanDeep: "#0fa8d7",
        violet: "#8b5cf6",
        green: "#13d18a",
        amber: "#f5b942",
        rose: "#ef5da8",
        line: "rgba(69, 140, 198, 0.12)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(55,214,255,0.12), 0 0 40px rgba(55,214,255,0.08)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(55,214,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(55,214,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
