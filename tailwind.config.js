import plugin from 'tailwindcss/plugin'; 

const {nextui} = require("@nextui-org/react");
const plugin = require('tailwindcss/plugin')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '250px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'bg-blue': '#1A3A68',
        'bg-light-grey': '#F0F0F0',
        'card-grey': '#D9D9D9',
        'light-blue': '#66A3BD',
        'dark-blue': '#1C2956',
        'project-background': '#E3F2FD',
        'section-blue': '#1565C0',
      },
      fontFamily: {
        calistoga: ['Calistoga', ...fontFamily.serif],
      },
    },
  },
  plugins: [nextui(
    {
      addCommonColor: true,
      defaultTheme: "light",
    }
  )],
};


