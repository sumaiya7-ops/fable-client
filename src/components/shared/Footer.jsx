"use client";

import Link from "next/link";
// ব্র্যান্ড আইকন বাদ দিয়ে গ্যারান্টেড লুসিড আইকন ইমপোর্ট করা হয়েছে
import { ArrowUpRight, Mail, Phone, MapPin, Share2, Globe, Link as LinkIcon, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-indigo-100 border-t border-indigo-200/60 w-full flex justify-center pt-20 pb-12">
      
      {/* w-10/12 রেসপন্সিভ লেআউট */}
      <div className="w-11/12 md:w-10/12 max-w-7xl flex flex-col gap-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-extrabold text-black tracking-tight block">
              Fable<span className="text-indigo-600">.</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              A premium sanctuary for bibliophiles and visionary authors. Discover elite literary masterpieces curated just for you.
            </p>
            
            {/*১০০% সেফ লুসিড আইকন গ্রুপ */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white text-gray-700 hover:text-indigo-600 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-indigo-100">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white text-gray-700 hover:text-indigo-600 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-indigo-100">
                <Globe size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white text-gray-700 hover:text-indigo-600 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-indigo-100">
                <LinkIcon size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white text-gray-700 hover:text-indigo-600 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-indigo-100">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-5">
            <h4 className="text-xs uppercase tracking-widest font-bold text-indigo-900">
              Explore Celestial
            </h4>
            <ul className="space-y-3.5 text-sm font-medium">
              {[
                { name: "Home Portfolio", href: "/" },
                { name: "Premium Browse", href: "/browse" },
                { name: "Author Dashboard", href: "/dashboard" },
                { name: "Exclusive Pricing", href: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-600 hover:text-indigo-600 flex items-center gap-1 group transition duration-200">
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-5">
            <h4 className="text-xs uppercase tracking-widest font-bold text-indigo-900">
              The Atelier
            </h4>
            <ul className="space-y-3.5 text-sm font-medium text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                <span>102 Elite Avenue, Literary District, NY</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-600 shrink-0" />
                <a href="mailto:concierge@fable.com" className="hover:text-indigo-600 transition">concierge@fable.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-600 shrink-0" />
                <a href="tel:+1234567890" className="hover:text-indigo-600 transition">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-5">
            <h4 className="text-xs uppercase tracking-widest font-bold text-indigo-900">
              The Elite Circle
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Subscribe to unlock private literary collections and bespoke author insights.
            </p>
            <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-indigo-200/80 shadow-inner focus-within:border-indigo-500 transition duration-300">
              <input
                type="email"
                placeholder="Your premium email..."
                className="w-full bg-transparent px-3 text-sm text-black outline-none placeholder:text-gray-400"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition duration-300 whitespace-nowrap shadow-sm">
                Join Us
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-indigo-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <p>© {new Date().getFullYear()} Fable Inc. All rights reserved with prestige.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-indigo-600 transition">Privacy Registry</a>
            <a href="#" className="hover:text-indigo-600 transition">Terms of Protocol</a>
            <a href="#" className="hover:text-indigo-600 transition">Cookie Architecture</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
