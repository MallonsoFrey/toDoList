/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f1f5f9",
        text: "#1f2937",
        form_bg: "#e5e7eb",
        border_color: "#6b7280",
        button_bg: "#9ca3af",
        error_color: "#b91c1c",
      },
    },
  },
  plugins: [],
};
