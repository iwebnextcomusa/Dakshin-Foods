import React, { useState } from "react";
import { User, MapPin, Heart, History, LogOut, Check, ShoppingBag, Plus, Sparkles } from "lucide-react";
import { CustomerProfile, PastOrder, MenuItem } from "../types";
import { MENU_ITEMS } from "../data";

interface CustomerDashboardProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  onReorder: (items: { menuItemId: string; quantity: number }[]) => void;
  onSelectMenu: () => void;
}

export default function CustomerDashboard({
  isLoggedIn,
  setIsLoggedIn,
  onReorder,
  onSelectMenu
}: CustomerDashboardProps) {
  // Demo Customer state
  const [profile, setProfile] = useState<CustomerProfile>({
    name: "Aman Preet Singh",
    email: "amanpreetsingh@gmail.com",
    phone: "+1 (778) 288-8261",
    savedAddresses: [
      { id: "addr-1", label: "Home", address: "1024 Robson St, Vancouver, BC, V6E 1A7" },
      { id: "addr-2", label: "Office", address: "450 Granville St, Vancouver, BC, V6C 1V5" }
    ],
    favoriteMeals: ["si-1", "ni-1", "by-1"]
  });

  // Past orders
  const [pastOrders, setPastOrders] = useState<PastOrder[]>([
    {
      id: "DKS-847291",
      date: "July 01, 2026",
      total: 39.96,
      status: "Delivered",
      items: [
        { menuItemId: "si-1", name: "Classic Masala Dosa", quantity: 2, price: 14.99 },
        { menuItemId: "bv-1", name: "Mango Lassi", quantity: 1, price: 5.49 }
      ]
    },
    {
      id: "DKS-712394",
      date: "June 25, 2026",
      total: 24.48,
      status: "Delivered",
      items: [
        { menuItemId: "ni-1", name: "Mughlai Butter Chicken", quantity: 1, price: 18.99 },
        { menuItemId: "bv-2", name: "Masala Chai", quantity: 1, price: 3.99 }
      ]
    }
  ]);

  // Auth local inputs
  const [authEmail, setAuthEmail] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Address add state
  const [newLabel, setNewLabel] = useState("");
  const [newAddrText, setNewAddrText] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) return;

    // Set demo name if not specified
    if (isRegistering) {
      setProfile({
        ...profile,
        name: authName || "New Canadian Customer",
        email: authEmail,
        phone: authPhone || "+1 (778) 288-8261",
      });
    }
    setIsLoggedIn(true);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newAddrText.trim()) return;

    setProfile({
      ...profile,
      savedAddresses: [
        ...profile.savedAddresses,
        { id: `addr-${Date.now()}`, label: newLabel, address: newAddrText }
      ]
    });

    setNewLabel("");
    setNewAddrText("");
    setShowAddressForm(false);
  };

  const handleRemoveAddress = (id: string) => {
    setProfile({
      ...profile,
      savedAddresses: profile.savedAddresses.filter(a => a.id !== id)
    });
  };

  const handleReorderClick = (pastOrder: PastOrder) => {
    const reorderPayload = pastOrder.items.map(item => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity
    }));
    onReorder(reorderPayload);
    alert("Past items successfully added back to your Order Bag!");
  };

  // Resolve favorite items from MENU_ITEMS
  const favoriteItems = MENU_ITEMS.filter(item => profile.favoriteMeals.includes(item.id));

  // If not logged in, show simple, highly styled authorization forms
  if (!isLoggedIn) {
    return (
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 min-h-[550px] flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="text-center mb-8">
              <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">
                Customer Central
              </span>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                {isRegistering ? "Create BC Dining Account" : "Access Your Profile"}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2">
                Save addresses, track live orders, and review past favorites.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isRegistering && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aman Preet"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (778) 288-8261"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Email Address</label>
                <input
                  type="email"
                  placeholder="amanpreetsingh@gmail.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white font-extrabold uppercase tracking-wider rounded-xl text-xs shadow-md shadow-emerald-800/10 hover:shadow-lg transition-all cursor-pointer mt-2"
              >
                {isRegistering ? "Register New Account" : "Secure Sign In"}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
              >
                {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Register Now"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Active user profile view
  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              CANADA PROFILE HUB
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
              Welcome Back, {profile.name}! 🍁
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
              {profile.email} | {profile.phone}
            </p>
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border border-rose-100 dark:border-zinc-800 cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Addresses & Favorites */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Saved Addresses Section */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <MapPin size={18} className="text-emerald-700 dark:text-emerald-400" />
                  <h3 className="font-extrabold text-zinc-900 dark:text-white text-base">Saved Delivery Locations</h3>
                </div>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="p-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-emerald-600 rounded-lg transition-colors cursor-pointer"
                    title="Add Address"
                  >
                    <Plus size={14} />
                  </button>
                )}
              </div>

              {/* Add Address Form */}
              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl mb-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400">LABEL</label>
                      <input
                        type="text"
                        placeholder="e.g. Cabin, Gym"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        required
                        className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="flex items-end justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="px-2.5 py-1.5 text-[10px] text-zinc-500 font-bold border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400">STREET ADDRESS (IN BC)</label>
                    <input
                      type="text"
                      placeholder="e.g. 1045 Howe St, Vancouver, BC"
                      value={newAddrText}
                      onChange={(e) => setNewAddrText(e.target.value)}
                      required
                      className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-700 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider"
                  >
                    Save Address
                  </button>
                </form>
              )}

              {/* Address List */}
              {profile.savedAddresses.length > 0 ? (
                <div className="space-y-3">
                  {profile.savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="flex items-start justify-between space-x-2 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl"
                    >
                      <div className="flex space-x-2.5">
                        <span className="text-lg shrink-0 mt-0.5">🏡</span>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{addr.label}</h4>
                          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5 leading-relaxed">
                            {addr.address}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveAddress(addr.id)}
                        className="text-zinc-400 hover:text-rose-600 text-xs font-semibold p-1 transition-colors rounded"
                        title="Delete"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400 dark:text-zinc-500 text-xs text-center py-6">No saved delivery addresses yet.</p>
              )}
            </div>

            {/* Favorite Meals */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <Heart size={18} className="text-rose-600 fill-rose-600" />
                <h3 className="font-extrabold text-zinc-900 dark:text-white text-base">Favorite Indian Delights</h3>
              </div>

              {favoriteItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl flex items-center space-x-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-150 truncate">{item.name}</h4>
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold block mt-0.5">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs">No favorites saved yet.</p>
                  <button onClick={onSelectMenu} className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline mt-2">
                    Add from Menu
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Column 2: Order History */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm h-full">
              <div className="flex items-center space-x-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <History size={18} className="text-emerald-700 dark:text-emerald-400" />
                <h3 className="font-extrabold text-zinc-900 dark:text-white text-base">Recent Delivery Orders</h3>
              </div>

              {pastOrders.length > 0 ? (
                <div className="space-y-6">
                  {pastOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/20 transition-all duration-300"
                    >
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-850 pb-3 mb-4 text-xs">
                        <div>
                          <span className="font-bold text-zinc-900 dark:text-white">{order.id}</span>
                          <span className="text-zinc-400 dark:text-zinc-500 mx-2">|</span>
                          <span className="text-zinc-500 dark:text-zinc-400">{order.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
                            {order.status}
                          </span>
                          <span className="font-black text-zinc-900 dark:text-white">
                            Total: ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Item list */}
                      <div className="space-y-2.5">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                            <span>{it.quantity}x {it.name}</span>
                            <span>${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer actions */}
                      <div className="flex justify-end pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-850">
                        <button
                          onClick={() => handleReorderClick(order)}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm shadow-emerald-700/10"
                        >
                          <ShoppingBag size={13} />
                          <span>Quick Reorder</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs">No order history found.</p>
                  <button onClick={onSelectMenu} className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold mt-4 cursor-pointer">
                    Place First Order
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
