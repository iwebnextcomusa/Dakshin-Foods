import React from "react";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowUp } from "lucide-react";

const brandLogo = "/src/assets/images/dakshin_logo_1783354057225.jpg";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function FooterSection({ setActiveTab }: FooterProps) {
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-900">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-800 flex items-center justify-center shrink-0 bg-amber-500">
                <img
                  src={brandLogo}
                  alt="Dakshin Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-amber-500 bg-clip-text text-transparent">
                Dakshin Foods
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Experience the authentic culinary journey of traditional South & North Indian flavors delivered fresh and hot right to your doorstep across British Columbia.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-850 transition-all shadow" title="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-850 transition-all shadow" title="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-850 transition-all shadow" title="Twitter">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick("home")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("menu")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Browse Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("about")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("contact")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("profile")} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Customer Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy / Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Legal & Info
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" onClick={(e) => {e.preventDefault(); alert("Dakshin Foods Privacy Policy: We keep your personal and transaction data fully secured.");}} className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => {e.preventDefault(); alert("Dakshin Foods Terms of Service: Deliveries depend on local conditions in British Columbia. Minimum orders apply.");}} className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <span className="text-zinc-500 block">Delivery hours:</span>
                <span className="text-zinc-300 font-medium">11:00 AM - 10:30 PM (Daily)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Get In Touch
            </h4>
            <div className="flex items-start space-x-3 text-sm text-zinc-400">
              <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <span>British Columbia, Canada</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-zinc-400">
              <Phone size={16} className="text-emerald-500 shrink-0" />
              <a href="tel:+17782888261" className="hover:text-emerald-400 transition-colors">
                +1 (778) 288-8261
              </a>
            </div>
            <div className="flex items-center space-x-3 text-sm text-zinc-400 overflow-hidden">
              <Mail size={16} className="text-emerald-500 shrink-0" />
              <a href="mailto:Dakshinfoodscanada@gmail.com" className="hover:text-emerald-400 transition-colors truncate">
                Dakshinfoodscanada@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p>© 2026 Dakshin Foods INC. All Rights Reserved.</p>
          </div>

          {/* Center aligned attribution specifically as requested in instruction 8 */}
          <div className="text-center">
            <p>
              Developed by{" "}
              <a 
                href="https://iwebnext.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 font-semibold hover:text-amber-400 transition-colors border-b border-dashed border-emerald-400/50 hover:border-amber-400/50 pb-0.5"
                id="iwebnext-attribution-link"
              >
                iWebNext
              </a>
            </p>
          </div>

          {/* Scroll to Top Trigger */}
          <div>
            <button
              onClick={handleScrollTop}
              className="flex items-center space-x-1 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-all duration-300"
              title="Scroll to Top"
              id="scroll-to-top-btn"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
