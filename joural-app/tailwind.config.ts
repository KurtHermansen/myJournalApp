import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		colors: {
			black: "#000",
			white: "#fff",
			primary: {
                // vintage
                100: "#eae0d5", //light tan
				200: "#c6ac8f", //medium tan
				300: "#5e503f", //dark tan
				400: "#22333b", //dark teal
                500: "#0a0908", //almost black
			},
			
		},
		fontFamily: {
			sans: ["Arial", "sans-serif"],
			serif: ["Cambria", "serif"],
			mono: ["Menlo", "monospace"],
		},
		extend: {
			spacing: {
				"1": "8px",
				"2": "12px",
				"3": "16px",
				"4": "24px",
				"5": "32px",
				"6": "48px",
			},
			borderRadius: {
				none: "0",
				sm: ".125rem",
				DEFAULT: ".25rem",
				lg: ".5rem",
				full: "9999px",
			},
		},
		plugins: [],
	},
};
export default config;
