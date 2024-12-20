import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "md-plus": "935px",
      },

      aspectRatio: {
        "2/1": "2/1",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        coinsTable: {
          green: "#00B1A7",
          red: "#FE2264",
          headerLight: "#424286",
          headerDark: "#D1D1D1",
        },
        charts: {
          "volume-chart": "#D878FA99",
        },
        light: {
          "50": "#ebebfe",
          "100": "#6161D6",
          "highlight-bar": "#353570",
        },
        dark: {
          "75": "#7878FA",
          "100": "#42428b",
          "200": "#232336",
          "300": "#13121a",
          "350": "#191925", // Deep indigo added here
          "400": "#191932",
          "highlight-bar": "#1E1932",
        },

        greys: {
          "lavender-100": "#E4E4F0",
          "lavender-200": "#A7A7CC",
        },

        cryptoblue: {
          "100": "#FFFFFF",
          "200": "#EBEBFD",
          "250": "#B0B0EB",
          "300": "#FFFFFF",
          "350": "#F3F5F9",
          "400": "#E6E8EC",
          "450": "#E4E5F9",
          "460": "#343046",
          "500": "#9B9AB6",
          "600": "#A5A4DA",
          "650": "#01F1E3",
          "660": "#1fcac0",
          "670": "#0E393D",
          "700": "#D878FA",
          "750": "#FE2264",
          "760": "#340010",
          "790": "#6262CC",
          "800": "#7878FA",
          "810": "#424286",
          "820": "#49497E",
          "900": "#353570",
        },
        cryptodark: {
          "100": "#FFFFFF",
          "110": "#FAFBFC",
          "150": "#232336",
          "160": "#2C2C4A",
          "170": "#343046",
          "200": "#191925",
          "300": "#1E1932",
          "350": "#191932",
          "400": "#05050F",
          "500": "#9B9AB6",
          "510": "#9E9E9E",
          "520": "#b8b8b8",
          "550": "#D1D1D1",
          "600": "#A5A4DA",
          "610": "#C27721",
          "620": "#F3EB2F",
          "630": "#F5AC37",
          "640": "#6374C3",
          "650": "#ea8228",
          "660": "#efb421",
          "670": "#f3d51b",
          "680": "#99e225",
          "690": "#5BE12C",
          "700": "#D878FA",
          "750": "#383979",
          "800": "#7776F8",
          "810": "#282843",
          "850": "#6161D6",
          "900": "#14142B",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class"],
};
export default config;
