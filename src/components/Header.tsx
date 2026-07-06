import React, { useState } from "react";
import { ShoppingBag, Moon, Sun, Menu, X, User, ShieldAlert, LogIn, UtensilsCrossed } from "lucide-react";

const brandLogo = "/src/assets/images/dakshin_logo_1783354057225.jpg";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  toggleCart: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  toggleCart,
  isDarkMode,
  setIsDarkMode,
  isLoggedIn,
  setIsLoggedIn
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
    { id: "admin", label: "Admin Panel", icon: ShieldAlert },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-amber-500">
              <img
                src={brandLogo}
                alt="Dakshin Foods Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-700 to-amber-600 dark:from-emerald-400 dark:to-amber-500 bg-clip-text text-transparent">
                Dakshin Foods
              </span>
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase -mt-1">
                British Columbia
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === item.id
                    ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
              title="Toggle Theme"
              id="theme-toggle-btn"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Profile/Auth Button */}
            <button
              onClick={() => handleNavClick("profile")}
              className={`p-2 rounded-xl border flex items-center space-x-1 transition-all duration-300 ${
                isLoggedIn
                  ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 dark:border-emerald-900/50"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
              title={isLoggedIn ? "View Profile" : "Log In"}
              id="profile-nav-btn"
            >
              {isLoggedIn ? (
                <>
                  <User size={18} />
                  <span className="hidden lg:inline text-xs font-semibold">Account</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span className="hidden lg:inline text-xs font-semibold">Login</span>
                </>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-600 text-white shadow-md shadow-emerald-700/20 hover:shadow-lg hover:shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center"
              id="cart-toggle-btn"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-extrabold text-white ring-2 ring-white dark:ring-zinc-950 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 transition-all duration-300 animate-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeTab === item.id
                    ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("profile")}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center space-x-2 ${
                isLoggedIn
                  ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/10"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              <User size={18} />
              <span>{isLoggedIn ? "My Profile" : "Customer Login / Signup"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
