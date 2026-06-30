"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Share2, Globe, Link as LinkIcon, MessageSquare, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("দয়া করে একটি সঠিক ইমেইল দিন।");
    
  
    setSubscribed(true);
    setEmail(""); 
  };

  return (
    <footer className="relative bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-indigo-900 border-t border-indigo-100 mt-20 overflow-hidden w-full flex flex-col items-center pt-20 pb-12">
     
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-300 blur-3xl opacity-30 rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-300 blur-3xl opacity-20 rounded-full pointer-events-none"></div>

      <div className="w-11/12 md:w-10/12 max-w-7xl flex flex-col gap-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
         
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tight text-indigo-950 block">
              Fable<span className="text-indigo-600">.</span>
            </Link>
            <p className="text-indigo-800/80 text-sm leading-relaxed max-w-xs">
              A premium sanctuary for bibliophiles and visionary authors.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-3 bg-white text-indigo-700 rounded-xl shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 border border-indigo-50"><Share2 size={18} /></a>
              <a href="#" className="p-3 bg-white text-indigo-700 rounded-xl shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 border border-indigo-50"><Globe size={18} /></a>
              <a href="#" className="p-3 bg-white text-indigo-700 rounded-xl shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 border border-indigo-50"><LinkIcon size={18} /></a>
              <a href="#" className="p-3 bg-white text-indigo-700 rounded-xl shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 border border-indigo-50"><MessageSquare size={18} /></a>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-bold text-lg text-indigo-950">Quick Links</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {[{ name: "Home", href: "/" }, { name: "Browse Ebooks", href: "/browse" }, { name: "Dashboard", href: "/dashboard" }, { name: "About", href: "/about" }].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-indigo-800/80 hover:text-indigo-700 flex items-center gap-1 group transition duration-200">
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="font-bold text-lg text-indigo-950">The Atelier</h3>
            <ul className="space-y-3.5 text-sm font-medium text-indigo-800/80">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-indigo-600 shrink-0 mt-0.5" /><span>Bangladesh</span></li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-indigo-600 shrink-0" /><a href="mailto:sumaiyakookie307@gmail.com" className="hover:text-indigo-700 transition">sumaiyakookie307@gmail.com</a></li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-indigo-600 shrink-0" /><a href="tel:+8801826459605" className="hover:text-indigo-700 transition">+880 1826459605</a></li>
            </ul>
          </div>

      
          <div className="space-y-5">
            <h3 className="font-bold text-lg text-indigo-950">The Elite Circle</h3>
            <p className="text-indigo-800/80 text-sm leading-relaxed">
              Subscribe to unlock private literary collections.
            </p>
            
            {subscribed ? (
              <p className="text-green-600 text-sm font-semibold animate-pulse">
                🎉 Thank you for joining our circle!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 bg-white p-1.5 rounded-xl border border-indigo-200/80 shadow-md focus-within:border-indigo-500 transition duration-300" style={{ padding: "4px"  }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your premium email..."
                  required
                  className="w-full bg-transparent px-3 text-sm text-black outline-none placeholder:text-indigo-800/40"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition duration-300 whitespace-nowrap shadow-sm" style={{ padding: "4px"  }}>
                  Join Us
                </button>
              </form>
            )}
          </div>

        </div>

      
        <div className="pt-8 border-t border-indigo-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <p>© {new Date().getFullYear()} Fable Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-indigo-700 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-700 transition">Terms & Conditions</Link>
            <Link href="/contact" className="hover:text-indigo-700 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}