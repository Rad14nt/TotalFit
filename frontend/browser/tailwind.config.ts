import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        lightgreen: "#8ac241",
        mainpagebackgroundcolor: "#F7F7F7",
        maindivbackgroundcolor: "#FDFCFF",
        backgroundcolor: "#D6D9E2",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        atlantis: {
          '50': '#f7fbea',
          '100': '#ecf7d0',
          '200': '#d9efa7',
          '300': '#bfe274',
          '400': '#99cd32',
          '500': '#86b82a',
          '600': '#67921e',
          '700': '#4f701b',
          '800': '#41591b',
          '900': '#374c1b',
          '950': '#1b290a',
        },
        sidebarText: "#7e7e7e",
        sidebarTextHover: "#99cd32",
        sidebarTextDark: "#b3b3b3",
        sidebarTextHoverDark: "#ffffff",
        newPrimary: {
          DEFAULT: "#8AC241",
          foreground: "#FFFFFF"
        },
        newSecondary: {
          DEFAULT: "#6D9829",
          foreground: "#FFFFFF"
        },
        newAccent: {
          DEFAULT: "#FFCC00",
          foreground: "#333333"
        },
        newBackground: "#F7F7F7",
        newText: "#333333",
        newMuted: {
          DEFAULT: "#666666",
          foreground: "#FFFFFF"
        },
        newBorder: "#E0E0E0",
        newDanger: {
          DEFAULT: "#FF4D4D",
          foreground: "#FFFFFF"
        },
        white: "#FFFFFF",
        newLightGray: "#F9F9F9",
        darkBackground: "#111217",
        darkSecondaryBackground: "#2F2F2F",
        darkText: "#FFFFFF",
        darkMuted: {
          DEFAULT: "#999999",
          foreground: "#2F2F2F"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
} satisfies Config

export default config
