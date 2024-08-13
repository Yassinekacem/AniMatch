import { withUt } from "uploadthing/tw";
import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = withUt({
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        sanss: ['Poppins'],
        sansss: ['Manjari'],
      },
      backgroundImage: {
        'custom-radial-linear': 'radial-gradient(circle at 10% 26%, rgba(90, 90, 90,0.06) 0%, rgba(90, 90, 90,0.06) 25%,rgba(137, 137, 137,0.06) 25%, rgba(137, 137, 137,0.06) 50%,rgba(185, 185, 185,0.06) 50%, rgba(185, 185, 185,0.06) 75%,rgba(232, 232, 232,0.06) 75%, rgba(232, 232, 232,0.06) 100%),radial-gradient(circle at 46% 66%, rgba(171, 171, 171,0.06) 0%, rgba(171, 171, 171,0.06) 25%,rgba(128, 128, 128,0.06) 25%, rgba(128, 128, 128,0.06) 50%,rgba(84, 84, 84,0.06) 50%, rgba(84, 84, 84,0.06) 75%,rgba(41, 41, 41,0.06) 75%, rgba(41, 41, 41,0.06) 100%),linear-gradient(90deg, rgb(107, 35, 237),rgb(61, 203, 252))',
      },
      colors: {
        customGray: '#EDEDED',
        customPink: '#D64AA0',
        customBlue: '#4AA0D6',
        customGreen: '#0A453A',
        customPurple: '#2E256F',
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
}) satisfies Config;

export default config;
