/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B0F19",       // আপনার ফিগমার মূল ডার্ক ব্যাকগ্রাউন্ড
        darkCard: "#111827",     // কার্ড ও টেবিলের ব্যাকগ্রাউন্ড
        brandNeon: "#6366F1",    // উজ্জ্বল পার্পল বাটন ও হাইলাইট কালার
        brandAccent: "#A855F7",  // সেকেন্ডারি পার্পল গ্লেয়ার
        textMain: "#F3F4F6",     // মূল টেক্সট হোয়াইট
        textSub: "#9CA3AF",      // সাব-টেক্সট গ্রে
      },
    },
  },
  plugins: [],
};
