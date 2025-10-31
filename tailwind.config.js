import defaultTheme from "tailwindcss/defaultTheme"
import lightswind from "lightswind/plugin"
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        magillo: ["Magillo", "sans-serif"],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        mono: ["FiraCode", ...defaultTheme.fontFamily.mono],
        custom: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        charcoalGray: "#2D2D2D",
        backgroundColor: "#F5F5F5",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        header: {
          background: "#1E88E5",
          hover: "#1565C0",
          color: "#FFFFFF",
        },
        footer: {
          DEFAULT: "#263238",
          link: "#1E88E5",
          "link-hover": "#1565C0",
        },
        button: {
          primary: { DEFAULT: "#FFC107", hover: "#FFA000" },
          secondary: { DEFAULT: "#757575", hover: "#616161" },
          success: { DEFAULT: "#4CAF50", hover: "#388E3C" },
        },
        slot: {
          available: "#4CAF50",
          booked: "#FF5252",
          selected: "#FFC107",
        },
        customLightGreen: "#C4E8C2",
        customDarkGreen: "#46A094",

        // Lightswind colors (HSL variables)
        // background: "hsl(var(--background))",
        // foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [lightswind],
}
