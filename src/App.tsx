import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, Star, ShieldCheck, CheckCircle2, ChevronRight, Mail, 
  MapPin, Phone, Clock, Leaf, Info, Sparkles, MessageSquare, Utensils, 
  ThumbsUp, Truck, Lock, UserCheck, Heart, Trash2, DollarSign,
  Volume2, VolumeX
} from "lucide-react";

// Types and Data
import { MenuItem, CartItem, OrderDetails, ContactMessage } from "./types";
import { MENU_ITEMS, TESTIMONIALS, DELIVERY_AREAS, FAQS } from "./data";

// Components
import Header from "./components/Header";
import ThreeDSection from "./components/ThreeDSection";

// Promo video link uploaded by the user to represent our authentic South Indian culinary craftsmanship
const DAKSHIN_PROMO_VIDEO = "https://i0zlw9extgfmyc2g.public.blob.vercel-storage.com/Dakshin%20Group.mp4";
import ChatbotWidget from "./components/ChatbotWidget";
import FooterSection from "./components/FooterSection";
import MenuSection from "./components/MenuSection";
import CartDrawer from "./components/CartDrawer";
import CheckoutSection from "./components/CheckoutSection";
import OrderTracking from "./components/OrderTracking";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHeroVideoMuted, setIsHeroVideoMuted] = useState(true);

  // Checkout pricing state transferred from Cart Drawer
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");

  // Live order pipeline state
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);
  const [adminOrders, setAdminOrders] = useState<OrderDetails[]>([
    {
      id: "DKS-294710",
      customerName: "Sarah Jenkins",
      customerPhone: "+1 (604) 555-0192",
      customerEmail: "sarah@gmail.com",
      deliveryAddress: "450 Granville St, Vancouver, BC",
      items: [
        { menuItemItem: MENU_ITEMS[3], quantity: 2, price: 18.99, menuItem: MENU_ITEMS[3] }
      ] as any,
      subtotal: 37.98,
      discount: 0,
      tax: 4.56,
      deliveryFee: 3.99,
      total: 46.53,
      status: "Preparing",
      eta: "20 mins",
      timestamp: "12:15 PM"
    }
  ]);

  // Contact logs
  const [contactSubmissions, setContactSubmissions] = useState<ContactMessage[]>([]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);

  // Dark Mode side effects
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Cart operations helpers
  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((it) => it.menuItem.id === item.id);
      if (existing) {
        return prevItems.map((it) =>
          it.menuItem.id === item.id ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [...prevItems, { menuItem: item, quantity }];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.menuItem.id !== itemId));
  };

  const handleCheckoutTrigger = (discountAmt: number, couponCode: string) => {
    setDiscountAmount(discountAmt);
    setAppliedCouponCode(couponCode);
    setIsCartOpen(false);
    setActiveTab("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrderSuccess = (orderDetails: OrderDetails) => {
    setPlacedOrder(orderDetails);
    // Add to admin order list so dispatcher dashboard updates instantly
    setAdminOrders((prev) => [orderDetails, ...prev]);
    // Clear cart
    setCartItems([]);
    setDiscountAmount(0);
    setAppliedCouponCode("");
    // Route to tracker
    setActiveTab("tracking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminUpdateStatus = (orderId: string, status: any) => {
    setAdminOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (placedOrder && placedOrder.id === orderId) {
      setPlacedOrder({ ...placedOrder, status });
    }
  };

  const handleReorderTrigger = (itemsToOrder: { menuItemId: string; quantity: number }[]) => {
    itemsToOrder.forEach((payload) => {
      const match = MENU_ITEMS.find((it) => it.id === payload.menuItemId);
      if (match) {
        handleAddToCart(match, payload.quantity);
      }
    });
    setIsCartOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;

    const newMsg: ContactMessage = {
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      message: contactMsg
    };

    setContactSubmissions([newMsg, ...contactSubmissions]);
    setContactSuccess(true);
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setContactMsg("");
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubbed(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSubbed(false), 5000);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Sticky Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Seasonal Promotion Announcement Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-600 dark:from-zinc-900 dark:via-zinc-800 dark:to-emerald-950 text-white text-xs py-2.5 px-4 text-center font-semibold tracking-wider relative flex items-center justify-center space-x-2 shadow-inner">
        <Sparkles size={14} className="text-amber-300 animate-spin" />
        <span>Canada Summer Specials: Save 10% on your entire order with code <strong className="text-amber-300">DAKSHIN10</strong>!</span>
      </div>

      {/* Main Body Router */}
      <main className="flex-1">
        
        {/* TAB 1: HOME VIEW */}
        {activeTab === "home" && (
          <div className="space-y-0">
            
            {/* HERO SECTION WITH BACKGROUND VIDEO */}
            <section className="relative overflow-hidden py-28 lg:py-36 bg-black">
              {/* Background Video */}
              <video
                src={DAKSHIN_PROMO_VIDEO}
                autoPlay
                muted={isHeroVideoMuted}
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-75"
              />
              {/* Premium dark gradient overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/85 z-10" />

              {/* Mute/Unmute Video Toggle Button */}
              <button
                id="hero-mute-toggle"
                onClick={() => setIsHeroVideoMuted(!isHeroVideoMuted)}
                className="absolute bottom-6 right-6 z-30 flex items-center space-x-1.5 bg-black/60 hover:bg-black/80 text-white backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-xs font-semibold tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                title={isHeroVideoMuted ? "Unmute Video Audio" : "Mute Video Audio"}
              >
                {isHeroVideoMuted ? (
                  <>
                    <VolumeX size={14} className="text-red-400 animate-pulse" />
                    <span className="text-[11px]">Unmute Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={14} className="text-emerald-400" />
                    <span className="text-[11px]">Mute Audio</span>
                  </>
                )}
              </button>

              <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                
                {/* Hero details centered */}
                <div className="space-y-6 flex flex-col items-center">
                  <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold font-mono">
                    <Sparkles size={12} className="animate-pulse text-amber-400" />
                    <span>AUTHENTIC INDIAN KITCHEN IN BC</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl drop-shadow-md">
                    Fresh, Delicious Meals Delivered Across <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">British Columbia</span>
                  </h1>

                  <p className="text-zinc-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
                    Experience authentic flavors delivered fresh to your doorstep. Crafted by master chefs using premium local ingredients and heritage recipes.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2 justify-center">
                    <button
                      onClick={() => setActiveTab("menu")}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:scale-[1.03] text-white font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-emerald-700/30 transition-all cursor-pointer"
                    >
                      Order Now
                    </button>
                    <button
                      onClick={() => setActiveTab("menu")}
                      className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm font-extrabold uppercase tracking-wider text-xs hover:bg-white/15 transition-all cursor-pointer"
                    >
                      View Menu
                    </button>
                  </div>

                  {/* Trust markers centered */}
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 w-full max-w-xl mt-4">
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-white block">100%</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-mono">Sanitised Pack</span>
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-white block">30 Min</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-mono">Average Delivery</span>
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-white block">4.9★</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-mono">5,000+ Reviews</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* DAILY SPECIALS SECTION */}
            <section className="py-16 bg-white dark:bg-zinc-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                  <div className="text-left">
                    <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                      Curated For Today
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1 tracking-tight">
                      Seasonal Promotions & Daily Specials
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("menu")}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>View Entire Menu</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Item 1 */}
                  <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-5 flex flex-col justify-between h-full group hover:shadow-md transition-all duration-300">
                    <div className="space-y-4">
                      <div className="h-44 rounded-2xl overflow-hidden relative">
                        <img src={MENU_ITEMS[0].image} alt={MENU_ITEMS[0].name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg">Popular</span>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">{MENU_ITEMS[0].name}</h3>
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{MENU_ITEMS[0].description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-850">
                      <span className="font-black text-emerald-700 dark:text-emerald-400 text-base">${MENU_ITEMS[0].price.toFixed(2)}</span>
                      <button
                        onClick={() => { handleAddToCart(MENU_ITEMS[0], 1); alert(`${MENU_ITEMS[0].name} added to bag!`); }}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center space-x-1 transition-all cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-5 flex flex-col justify-between h-full group hover:shadow-md transition-all duration-300">
                    <div className="space-y-4">
                      <div className="h-44 rounded-2xl overflow-hidden relative">
                        <img src={MENU_ITEMS[3].image} alt={MENU_ITEMS[3].name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg">Chef Special</span>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">{MENU_ITEMS[3].name}</h3>
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{MENU_ITEMS[3].description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-850">
                      <span className="font-black text-emerald-700 dark:text-emerald-400 text-base">${MENU_ITEMS[3].price.toFixed(2)}</span>
                      <button
                        onClick={() => { handleAddToCart(MENU_ITEMS[3], 1); alert(`${MENU_ITEMS[3].name} added to bag!`); }}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center space-x-1 transition-all cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-5 flex flex-col justify-between h-full group hover:shadow-md transition-all duration-300">
                    <div className="space-y-4">
                      <div className="h-44 rounded-2xl overflow-hidden relative">
                        <img src={MENU_ITEMS[5].image} alt={MENU_ITEMS[5].name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg">Best Seller</span>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">{MENU_ITEMS[5].name}</h3>
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{MENU_ITEMS[5].description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-850">
                      <span className="font-black text-emerald-700 dark:text-emerald-400 text-base">${MENU_ITEMS[5].price.toFixed(2)}</span>
                      <button
                        onClick={() => { handleAddToCart(MENU_ITEMS[5], 1); alert(`${MENU_ITEMS[5].name} added to bag!`); }}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center space-x-1 transition-all cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WHY CHOOSE US SECTION */}
            <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                    Our Dedication
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1 tracking-tight">
                    Why Customers Love Dakshin Foods INC
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm text-left space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <Leaf size={20} />
                    </div>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Fresh Ingredients</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Sourced fresh from organic local Canadian growers paired with authentic spices imported directly from Southern India.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm text-left space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <Clock size={20} />
                    </div>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Fast Delivery</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Our dynamic riders are fully localized across British Columbia to keep delivery transit times under 35 minutes!
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm text-left space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <DollarSign size={20} />
                    </div>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Affordable Pricing</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Uncompromised high-quality gourmet cuisine offered at budget-conscious rates suitable for daily family dining.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm text-left space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Hygienic Preparation</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Prepared in 100% certified clean commercial kitchens adhering strictly to Health Canada food handling mandates.
                    </p>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm text-left space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <Lock size={20} />
                    </div>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Secure Ordering</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Transact securely via 256-bit encrypted gateways accepting Credit Cards, Google Pay, and Apple Pay.
                    </p>
                  </div>

                  {/* Card 6 */}
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm text-left space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <UserCheck size={20} />
                    </div>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Excellent Support</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Need updates? Speak immediately with our helpful BC central helpdesk by dialing +1 (778) 288-8261.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* BRAND STORY & KITCHEN PRESENTATION VIDEO */}
            <section className="py-16 bg-white dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Story Details */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                      <Sparkles size={12} className="text-amber-500 animate-pulse" />
                      <span>Experience Dakshin Group</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                      Crafting Heritage Flavors with Canadian Quality
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Watch our master chefs grind the organic grains, ferment our proprietary stone-ground batters, and bake thin, crispy masala dosas to golden perfection in our British Columbia facilities.
                    </p>
                    <div className="space-y-3.5 pt-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5 animate-pulse">
                          <CheckCircle2 size={12} />
                        </div>
                        <div className="text-xs">
                          <strong className="text-zinc-800 dark:text-zinc-200">100% Stone-Ground Batters:</strong> Organic rice and black lentils soaked for hours and stone-crushed for original light and airy textures.
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5 animate-pulse">
                          <CheckCircle2 size={12} />
                        </div>
                        <div className="text-xs">
                          <strong className="text-zinc-800 dark:text-zinc-200">Zero Artificial Preservatives:</strong> Absolute pure ingredients prepared fresh on-demand for maximum nutritional health and taste.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Premium Video Player Card */}
                  <div className="lg:col-span-7">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/50 dark:border-zinc-800 bg-black group">
                      <video
                        src={DAKSHIN_PROMO_VIDEO}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] text-white font-mono font-medium flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Dakshin Group Culinary Story.mp4</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="py-16 bg-white dark:bg-zinc-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                    Simple Pipeline
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1 tracking-tight">
                    How To Order From Us
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative">
                  {/* Connector lines (hidden on small screen) */}
                  <div className="hidden lg:block absolute left-20 right-20 top-1/3 h-0.5 border-t border-dashed border-zinc-200 dark:border-zinc-800 z-0" />

                  {/* Step 1 */}
                  <div className="space-y-3 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-emerald-700 text-white font-black text-lg mx-auto flex items-center justify-center shadow-md">
                      1
                    </div>
                    <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white pt-2">Browse Menu</h4>
                    <p className="text-[11px] text-zinc-500 max-w-[180px] mx-auto leading-relaxed">
                      Select your favorite authentic dishes with customizable dietary tags.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-3 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-emerald-700 text-white font-black text-lg mx-auto flex items-center justify-center shadow-md">
                      2
                    </div>
                    <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white pt-2">Place Your Order</h4>
                    <p className="text-[11px] text-zinc-500 max-w-[180px] mx-auto leading-relaxed">
                      Enter address and proceed through our secure, rapid checkout.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-3 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-emerald-700 text-white font-black text-lg mx-auto flex items-center justify-center shadow-md">
                      3
                    </div>
                    <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white pt-2">We Prepare Fresh</h4>
                    <p className="text-[11px] text-zinc-500 max-w-[180px] mx-auto leading-relaxed">
                      Master chefs cook using traditional clay tandoors and fresh pans.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="space-y-3 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-amber-500 text-white font-black text-lg mx-auto flex items-center justify-center shadow-md animate-bounce">
                      4
                    </div>
                    <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white pt-2">Fast Door Delivery</h4>
                    <p className="text-[11px] text-zinc-500 max-w-[180px] mx-auto leading-relaxed">
                      Our dynamic local BC rider drops off insulated hot packages at your door.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CUSTOMER REVIEWS SECTION */}
            <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                    Testimonials
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1 tracking-tight">
                    What Canadian Diners Say
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm text-left flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Rating stars */}
                        <div className="flex text-amber-500 space-x-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? "fill-amber-500 text-amber-500" : "text-zinc-200"}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-zinc-650 dark:text-zinc-400 italic leading-relaxed">
                          "{review.text}"
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-850 pt-4">
                        <div>
                          <h4 className="font-extrabold text-xs text-zinc-900 dark:text-white">{review.name}</h4>
                          <span className="text-[10px] text-zinc-400 block mt-0.5">{review.location}</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-400">{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DELIVERY AREAS SECTION */}
            <section className="py-16 bg-white dark:bg-zinc-950">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-zinc-900 dark:bg-zinc-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Left Column */}
                  <div className="space-y-4 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-extrabold block">
                      British Columbia Distribution
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      Serving BC Communities
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      We operate a specialized network of dispatch units covering major urban hubs across the province. Check our local service details below.
                    </p>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <MapPin size={14} className="text-emerald-400" />
                        <span>Min order for Surrey / Vancouver: $15.00</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <MapPin size={14} className="text-emerald-400" />
                        <span>Average delivery fee: $3.99 - $5.99</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interactive listings */}
                  <div className="bg-zinc-950 rounded-2xl p-5 border border-zinc-800 space-y-3.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">ACTIVE SERVICE HUBS</span>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {DELIVERY_AREAS.map((area, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-zinc-900 last:border-0 last:pb-0">
                          <div>
                            <span className="font-extrabold text-zinc-100 block">{area.city}</span>
                            <span className="text-[10px] text-zinc-500 block truncate max-w-[200px]">{area.region}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-emerald-400 block font-bold">Fee: ${area.fee.toFixed(2)}</span>
                            <span className="text-[9px] text-zinc-500 block">Min: ${area.minOrder.toFixed(0)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                    Common Inquiries
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto text-left">
                  {FAQS.map((faq, idx) => (
                    <details
                      key={idx}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 group cursor-pointer shadow-sm [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                        <span>{faq.question}</span>
                        <span className="transition group-open:rotate-180 text-emerald-600">
                          ▼
                        </span>
                      </summary>
                      <p className="text-xs text-zinc-500 leading-relaxed mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-850">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* NEWSLETTER SIGNUP SECTION */}
            <section className="py-16 bg-gradient-to-tr from-emerald-950 via-emerald-900 to-amber-950 text-white text-center">
              <div className="max-w-3xl mx-auto px-4 space-y-6">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-extrabold">
                  JOIN THE FOOD CLUSTER
                </span>
                <h2 className="text-3xl font-black tracking-tight">
                  Get 15% Off Your Next Meal
                </h2>
                <p className="text-zinc-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                  Subscribe to our British Columbia dining newsletter and receive priority alerts about weekend pop-ups, chef tasting menus, and secret coupon codes.
                </p>

                {newsletterSubbed ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold inline-flex items-center space-x-1.5">
                    <CheckCircle2 size={16} />
                    <span>Welcome! Check your inbox for a 15% off coupon code shortly.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 text-sm bg-black/40 border border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-white placeholder-zinc-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: MENU VIEW */}
        {activeTab === "menu" && (
          <MenuSection onAddToCart={handleAddToCart} />
        )}

        {/* TAB 3: ABOUT US VIEW */}
        {activeTab === "about" && (
          <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
              
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                  Heritage & Passion
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-1 tracking-tight">
                  About Dakshin Foods INC
                </h2>
              </div>

              {/* Bio block */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6">
                <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                  Dakshin Foods INC represents a dream to connect the pure, vibrant culinary cultures of Southern and Northern India with the dining tables of British Columbia, Canada.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                  Our journey started with a humble passion for crisp, authentic Masala Dosas, aromatic clay-tandoor Butter Chickens, and handi slow-cooked Biryanis. We believed that food delivery should not compromise on visual or organic quality. Today, we serve communities across Metro Vancouver, Fraser Valley, Capital Region, and the Okanagan.
                </p>

                {/* Sub banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Our Ingredients Standard</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      All meat is sourced from trusted local organic Canadian farms. Spices are carefully roasted and ground in-house to preserve their aromatic oils.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Eco Friendly Packaging</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      We packages all deliveries in biodegradable, heat-insulated, and completely secure containers preventing spills while keeping food piping hot.
                    </p>
                  </div>
                </div>
              </div>

              {/* Business specs box */}
              <div className="bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                <div className="text-left space-y-1">
                  <h3 className="font-extrabold text-lg">Direct Inquiries?</h3>
                  <p className="text-zinc-100 text-xs">Get in touch with our corporate central office in BC.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:+17782888261" className="px-4 py-2.5 bg-zinc-950 text-white text-xs font-bold uppercase rounded-xl hover:bg-zinc-900 transition-colors">
                    Call: +1 (778) 288-8261
                  </a>
                  <a href="mailto:Dakshinfoodscanada@gmail.com" className="px-4 py-2.5 bg-white text-zinc-950 text-xs font-bold uppercase rounded-xl hover:bg-zinc-50 transition-colors">
                    Email Support
                  </a>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* TAB 4: CONTACT VIEW */}
        {activeTab === "contact" && (
          <section className="py-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                  Support Center
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1 tracking-tight">
                  Contact Dakshin Foods INC
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Contact information column */}
                <div className="lg:col-span-5 bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
                  <div className="space-y-6 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-extrabold">
                      CORPORATE DETAILS
                    </span>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Dakshin Foods INC</h3>
                      <p className="text-zinc-400 text-xs">Registered Food Delivery Provider in British Columbia.</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                      <div className="flex items-center space-x-3 text-xs text-zinc-300">
                        <MapPin size={16} className="text-emerald-400 shrink-0" />
                        <span>British Columbia, Canada</span>
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-zinc-300">
                        <Phone size={16} className="text-emerald-400 shrink-0" />
                        <a href="tel:+17782888261" className="hover:text-emerald-400 transition-colors">
                          +1 (778) 288-8261
                        </a>
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-zinc-300 overflow-hidden">
                        <Mail size={16} className="text-emerald-400 shrink-0" />
                        <a href="mailto:Dakshinfoodscanada@gmail.com" className="hover:text-emerald-400 transition-colors truncate">
                          Dakshinfoodscanada@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-zinc-800 text-zinc-500 text-[10px] leading-relaxed">
                    © 2026 Dakshin Foods INC. Operating licensed logistics routes safely in British Columbia.
                  </div>
                </div>

                {/* Form column */}
                <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h3 className="font-extrabold text-zinc-900 dark:text-white text-base mb-6">
                    Inquire Online
                  </h3>

                  {contactSuccess ? (
                    <div className="p-5 bg-emerald-50 dark:bg-zinc-950 border border-emerald-100 dark:border-zinc-800 text-emerald-700 dark:text-emerald-400 rounded-2xl flex items-center space-x-3 text-xs font-bold animate-in zoom-in-95">
                      <CheckCircle2 size={18} />
                      <div>
                        <h4 className="text-sm font-black">Message Received!</h4>
                        <p className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium mt-1">Our helpdesk dispatchers will call or email you back within 2 hours.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Aman Preet"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="aman@gmail.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          placeholder="+1 (778) 288-8261"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Message</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="How can our BC food team help you?"
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white font-extrabold uppercase tracking-wider rounded-xl text-xs transition-all cursor-pointer shadow"
                      >
                        Send Inquiry Message
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* TAB 5: ADMIN PANEL */}
        {activeTab === "admin" && (
          <AdminPanel orders={adminOrders} onUpdateOrderStatus={handleAdminUpdateStatus} />
        )}

        {/* TAB 6: CUSTOMER DASHBOARD PROFILE */}
        {activeTab === "profile" && (
          <CustomerDashboard
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            onReorder={handleReorderTrigger}
            onSelectMenu={() => setActiveTab("menu")}
          />
        )}

        {/* TAB 7: CHECKOUT SECTION */}
        {activeTab === "checkout" && (
          <CheckoutSection
            cartItems={cartItems}
            discountAmount={discountAmount}
            couponCode={appliedCouponCode}
            onPlaceOrder={handlePlaceOrderSuccess}
            onBackToCart={() => setActiveTab("menu")}
            savedProfile={isLoggedIn ? { name: "Aman Preet Singh", email: "amanpreetsingh@gmail.com", phone: "+1 (778) 288-8261", address: "1024 Robson St, Vancouver, BC" } : undefined}
          />
        )}

        {/* TAB 8: ORDER TRACKING */}
        {activeTab === "tracking" && placedOrder && (
          <OrderTracking order={placedOrder} />
        )}

      </main>

      {/* Floating Shopping Bag Trigger (fixed position bottom left) */}
      {cartItems.length > 0 && activeTab !== "checkout" && activeTab !== "tracking" && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-108 active:scale-95 group animate-slide-in-up"
          title="Open Order Bag"
          id="floating-cart-btn"
        >
          <div className="relative">
            <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-black text-white ring-2 ring-white dark:ring-zinc-950">
              {totalCartCount}
            </span>
          </div>
        </button>
      )}

      {/* Sliding Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckoutTrigger}
      />

      {/* Interactive Floating AI Chatbot Assistant widget */}
      <ChatbotWidget />

      {/* Footer component containing credits and developer links */}
      <FooterSection setActiveTab={setActiveTab} />

    </div>
  );
}
