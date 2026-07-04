import React, { useState } from "react";
import { ShieldCheck, ShoppingBag, Plus, Sparkles, PlusCircle, Trash, DollarSign, Users, TrendingUp, AlertCircle, Eye } from "lucide-react";
import { MenuItem, OrderDetails } from "../types";
import { MENU_ITEMS } from "../data";

interface AdminPanelProps {
  orders: OrderDetails[];
  onUpdateOrderStatus: (orderId: string, status: "Preparing" | "Out for Delivery" | "Delivered") => void;
}

export default function AdminPanel({ orders, onUpdateOrderStatus }: AdminPanelProps) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"orders" | "menu" | "customers" | "analytics">("orders");
  const [menuItemsState, setMenuItemsState] = useState<MenuItem[]>(MENU_ITEMS);

  // New menu item form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<any>("South Indian");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemImage, setNewItemImage] = useState("https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80");
  const [newItemVeg, setNewItemVeg] = useState(true);
  const [newItemVegan, setNewItemVegan] = useState(false);

  // Simulated static customers database
  const [customers, setCustomers] = useState([
    { id: "cust-1", name: "Aman Preet Singh", email: "amanpreetsingh@gmail.com", phone: "+1 (778) 288-8261", location: "Surrey, BC", joined: "Jan 12, 2026", ordersCount: 14 },
    { id: "cust-2", name: "Sarah Jenkins", email: "sarah@gmail.com", phone: "+1 (604) 555-0192", location: "Vancouver, BC", joined: "Feb 18, 2026", ordersCount: 8 },
    { id: "cust-3", name: "Karthik Raghavan", email: "karthik.r@gmail.com", phone: "+1 (250) 443-8821", location: "Victoria, BC", joined: "Mar 02, 2026", ordersCount: 19 },
    { id: "cust-4", name: "Emma Watson", email: "emma.w@gmail.com", phone: "+1 (778) 492-3301", location: "Burnaby, BC", joined: "Apr 29, 2026", ordersCount: 4 }
  ]);

  // Form handle
  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemPrice) return;

    const addedItem: MenuItem = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      description: newItemDesc || "Delicious freshly made dish with traditional recipes.",
      price: parseFloat(newItemPrice),
      category: newItemCategory,
      image: newItemImage,
      rating: 5.0,
      isVegetarian: newItemVeg,
      isVegan: newItemVegan,
      prepTime: "15-20 mins"
    };

    setMenuItemsState([addedItem, ...menuItemsState]);
    
    // reset form
    setNewItemName("");
    setNewItemPrice("");
    setNewItemDesc("");
    alert("New dish added successfully to Dakshin menu registry!");
  };

  const handleRemoveMenuItem = (id: string) => {
    setMenuItemsState(menuItemsState.filter(item => item.id !== id));
  };

  // Analytics helper calculations
  const totalSimulatedRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 1450.75; // dynamic revenue plus static historical baseline
  const activeOrdersCount = orders.filter(o => o.status !== "Delivered").length;
  const completedOrdersCount = orders.filter(o => o.status === "Delivered").length + 42;

  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold">
                Secure Central Admin Deck
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
              Dakshin Foods Console
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
              Manage live British Columbia operations, update itemized menus, and view visual sales metrics.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex space-x-1.5 bg-zinc-200/50 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {(["orders", "menu", "customers", "analytics"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAdminSubTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeAdminSubTab === tab
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Inner Tab Content */}
        {activeAdminSubTab === "orders" && (
          <div className="space-y-6">
            {/* Quick counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm">
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">Active Orders</span>
                <span className="text-2xl font-black text-zinc-900 dark:text-white block mt-1">
                  {activeOrdersCount}
                </span>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm">
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">Completed Orders</span>
                <span className="text-2xl font-black text-zinc-900 dark:text-white block mt-1">
                  {completedOrdersCount}
                </span>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm">
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">Total Dispatch Revenue</span>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 block mt-1">
                  ${totalSimulatedRevenue.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Live Queue table */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm">
              <h3 className="font-extrabold text-zinc-900 dark:text-white text-base mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                Live Dispatch Queue
              </h3>

              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-mono uppercase tracking-wider">
                        <th className="py-3 px-2">Order ID</th>
                        <th className="py-3 px-2">Recipient</th>
                        <th className="py-3 px-2">Delivery Address</th>
                        <th className="py-3 px-2">Total Paid</th>
                        <th className="py-3 px-2">Live Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                          <td className="py-3 px-2 font-bold text-zinc-900 dark:text-white">{o.id}</td>
                          <td className="py-3 px-2">
                            <span className="font-semibold block text-zinc-850 dark:text-zinc-150">{o.customerName}</span>
                            <span className="text-zinc-400 block text-[10px]">{o.customerPhone}</span>
                          </td>
                          <td className="py-3 px-2 text-zinc-500 max-w-[150px] truncate" title={o.deliveryAddress}>{o.deliveryAddress}</td>
                          <td className="py-3 px-2 font-black text-emerald-700 dark:text-emerald-400">${o.total.toFixed(2)}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 rounded font-extrabold text-[9px] uppercase tracking-wider ${
                              o.status === "Preparing" 
                                ? "bg-amber-100 text-amber-800" 
                                : o.status === "Out for Delivery" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            {o.status === "Preparing" && (
                              <button
                                onClick={() => onUpdateOrderStatus(o.id, "Out for Delivery")}
                                className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider cursor-pointer"
                              >
                                Dispatch
                              </button>
                            )}
                            {o.status === "Out for Delivery" && (
                              <button
                                onClick={() => onUpdateOrderStatus(o.id, "Delivered")}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider cursor-pointer"
                              >
                                Mark Delivered
                              </button>
                            )}
                            {o.status === "Delivered" && (
                              <span className="text-zinc-400 text-[10px] font-semibold italic">Fulfilled ✓</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag size={20} />
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">No orders in live dispatch queue yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeAdminSubTab === "menu" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Add menu item form */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm h-fit">
              <h3 className="font-extrabold text-zinc-900 dark:text-white text-base mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                Register New Dish
              </h3>

              <form onSubmit={handleAddMenuItem} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Dish Name</label>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Garlic Cheese Naan"
                    required
                    className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-850 dark:text-zinc-150"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Price ($ CAD)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      placeholder="12.99"
                      required
                      className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Category</label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-700 dark:text-zinc-300"
                    >
                      <option>South Indian</option>
                      <option>North Indian</option>
                      <option>Biryani</option>
                      <option>Vegetarian Specials</option>
                      <option>Vegan Options</option>
                      <option>Snacks</option>
                      <option>Desserts</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Image URL</label>
                  <input
                    type="url"
                    value={newItemImage}
                    onChange={(e) => setNewItemImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Description</label>
                  <textarea
                    rows={2}
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Fresh garlic cilantro flatbread cooked in clay tandoor."
                    className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none"
                  />
                </div>

                {/* Dietary checkboxes */}
                <div className="flex space-x-4 pt-1">
                  <label className="flex items-center space-x-1.5 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newItemVeg}
                      onChange={(e) => setNewItemVeg(e.target.checked)}
                      className="rounded border-zinc-300 dark:border-zinc-800 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Is Vegetarian</span>
                  </label>

                  <label className="flex items-center space-x-1.5 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newItemVegan}
                      onChange={(e) => setNewItemVegan(e.target.checked)}
                      className="rounded border-zinc-300 dark:border-zinc-800 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Is Vegan</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow"
                >
                  <PlusCircle size={15} />
                  <span>Register Menu Item</span>
                </button>
              </form>
            </div>

            {/* Menu items registry list */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm">
              <h3 className="font-extrabold text-zinc-900 dark:text-white text-base mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                Live Menu Registry ({menuItemsState.length})
              </h3>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {menuItemsState.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl text-xs"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="h-10 w-10 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <span className="font-bold text-zinc-850 dark:text-zinc-150 block truncate">{item.name}</span>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{item.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="font-black text-emerald-700 dark:text-emerald-400">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleRemoveMenuItem(item.id)}
                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Remove dish"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeAdminSubTab === "customers" && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm">
            <h3 className="font-extrabold text-zinc-900 dark:text-white text-base mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              Registered Customer Base
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-mono uppercase tracking-wider">
                    <th className="py-3 px-2">ID</th>
                    <th className="py-3 px-2">Name</th>
                    <th className="py-3 px-2">Email</th>
                    <th className="py-3 px-2">Phone</th>
                    <th className="py-3 px-2">Zone</th>
                    <th className="py-3 px-2">Joined</th>
                    <th className="py-3 px-2 text-right">Orders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                      <td className="py-3.5 px-2 text-zinc-500 font-mono">{c.id}</td>
                      <td className="py-3.5 px-2 font-bold text-zinc-900 dark:text-white">{c.name}</td>
                      <td className="py-3.5 px-2 text-zinc-600 dark:text-zinc-400">{c.email}</td>
                      <td className="py-3.5 px-2 text-zinc-600 dark:text-zinc-400">{c.phone}</td>
                      <td className="py-3.5 px-2 text-zinc-500">{c.location}</td>
                      <td className="py-3.5 px-2 text-zinc-400">{c.joined}</td>
                      <td className="py-3.5 px-2 text-right font-extrabold text-zinc-800 dark:text-zinc-200">{c.ordersCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeAdminSubTab === "analytics" && (
          <div className="space-y-6">
            
            {/* Visual Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Gross Dispatch</span>
                  <span className="text-xl font-extrabold text-zinc-900 dark:text-white mt-1 block">
                    ${totalSimulatedRevenue.toFixed(2)}
                  </span>
                </div>
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                  <DollarSign size={18} />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Served Consumers</span>
                  <span className="text-xl font-extrabold text-zinc-900 dark:text-white mt-1 block">
                    {customers.length + 24}
                  </span>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                  <Users size={18} />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Avg Ticket Size</span>
                  <span className="text-xl font-extrabold text-zinc-900 dark:text-white mt-1 block">
                    $34.50
                  </span>
                </div>
                <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                  <TrendingUp size={18} />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Conversion Rate</span>
                  <span className="text-xl font-extrabold text-zinc-900 dark:text-white mt-1 block">
                    4.8%
                  </span>
                </div>
                <div className="p-3 bg-rose-500/10 text-rose-600 rounded-xl">
                  <ShieldCheck size={18} />
                </div>
              </div>
            </div>

            {/* Custom Responsive SVG Charting */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h3 className="font-extrabold text-zinc-900 dark:text-white text-base">
                  Weekly Dispatch Velocity Chart
                </h3>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">JULY 2026 SUMMARY</span>
              </div>

              {/* Handcrafted Responsive SVG Bar Chart */}
              <div className="h-64 w-full">
                <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="40" y1="40" x2="580" y2="40" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800/50" />
                  <line x1="40" y1="100" x2="580" y2="100" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800/50" />
                  <line x1="40" y1="160" x2="580" y2="160" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-zinc-800/50" />
                  <line x1="40" y1="200" x2="580" y2="200" stroke="#cbd5e1" strokeWidth="1" className="dark:stroke-zinc-700/50" />

                  {/* Chart Bars (representing sales on Mon, Tue, Wed, Thu, Fri, Sat, Sun) */}
                  {/* Mon - $120 */}
                  <rect x="70" y="120" width="35" height="80" rx="4" fill="#1b5e20" className="hover:opacity-80 transition-opacity" />
                  {/* Tue - $150 */}
                  <rect x="145" y="100" width="35" height="100" rx="4" fill="#1b5e20" className="hover:opacity-80 transition-opacity" />
                  {/* Wed - $180 */}
                  <rect x="220" y="80" width="35" height="120" rx="4" fill="#1b5e20" className="hover:opacity-80 transition-opacity" />
                  {/* Thu - $140 */}
                  <rect x="295" y="110" width="35" height="90" rx="4" fill="#1b5e20" className="hover:opacity-80 transition-opacity" />
                  {/* Fri - $240 */}
                  <rect x="370" y="40" width="35" height="160" rx="4" fill="#f57c00" className="hover:opacity-80 transition-opacity" />
                  {/* Sat - $280 */}
                  <rect x="445" y="15" width="35" height="185" rx="4" fill="#f57c00" className="hover:opacity-80 transition-opacity" />
                  {/* Sun - $220 */}
                  <rect x="520" y="55" width="35" height="145" rx="4" fill="#1b5e20" className="hover:opacity-80 transition-opacity" />

                  {/* Axis labels */}
                  <text x="87" y="220" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">MON</text>
                  <text x="162" y="220" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">TUE</text>
                  <text x="237" y="220" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">WED</text>
                  <text x="312" y="220" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">THU</text>
                  <text x="387" y="220" fill="#f57c00" fontSize="10" textAnchor="middle" fontWeight="bold">FRI</text>
                  <text x="462" y="220" fill="#f57c00" fontSize="10" textAnchor="middle" fontWeight="bold">SAT</text>
                  <text x="537" y="220" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">SUN</text>

                  {/* Y-Axis values */}
                  <text x="30" y="45" fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">$300</text>
                  <text x="30" y="105" fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">$200</text>
                  <text x="30" y="165" fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">$100</text>
                  <text x="30" y="205" fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">$0</text>
                </svg>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-center space-x-6 mt-4 text-[11px] font-mono font-bold text-zinc-500">
                <div className="flex items-center space-x-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-emerald-700 block" />
                  <span>Weekday Baseline</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2.5 w-2.5 rounded bg-amber-500 block animate-pulse" />
                  <span>Weekend Dinner Peak</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
