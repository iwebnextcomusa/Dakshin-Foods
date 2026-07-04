import React, { useState } from "react";
import { Search, SlidersHorizontal, Leaf, Clock, Star, Plus, Minus, ShoppingCart, Check, Info, X } from "lucide-react";
import { MenuItem } from "../types";
import { MENU_ITEMS } from "../data";

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, qty: number) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc" | "rating">("rating");
  
  // Selected item detail modal
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Individual item quantities in grid
  const [gridQuantities, setGridQuantities] = useState<{ [id: string]: number }>({});

  const categories = [
    "All",
    "South Indian",
    "North Indian",
    "Biryani",
    "Vegetarian Specials",
    "Vegan Options",
    "Snacks",
    "Desserts",
    "Beverages",
  ];

  // Filter and sort items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesVeg = !vegOnly || item.isVegetarian;
    const matchesVegan = !veganOnly || item.isVegan;

    return matchesSearch && matchesCategory && matchesVeg && matchesVegan;
  }).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const handleQtyChange = (itemId: string, direction: "inc" | "dec") => {
    const current = gridQuantities[itemId] || 1;
    if (direction === "inc") {
      setGridQuantities({ ...gridQuantities, [itemId]: current + 1 });
    } else {
      setGridQuantities({ ...gridQuantities, [itemId]: Math.max(1, current - 1) });
    }
  };

  const triggerAddToCart = (item: MenuItem, qty: number) => {
    onAddToCart(item, qty);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            Signature Cuisine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mt-1">
            Browse Our Authentic Menu
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            Freshly prepared with authentic Indian spices, high-quality local Canadian ingredients, and love. Filter by category or dietary requirements below.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-150 dark:border-zinc-800 shadow-sm mb-8 space-y-6">
          
          {/* Row 1: Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Search Butter Chicken, Dosa, Samosas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-zinc-800 dark:text-zinc-100"
              />
            </div>

            {/* Sorting & Filters Toggle */}
            <div className="flex flex-wrap gap-4 items-center justify-end w-full md:w-auto">
              {/* Veg Toggle */}
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                  vegOnly 
                    ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-900" 
                    : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"
                }`}
              >
                <Leaf size={14} className={vegOnly ? "text-emerald-600" : "text-zinc-400"} />
                <span>Vegetarian Only</span>
              </button>

              {/* Vegan Toggle */}
              <button
                onClick={() => setVeganOnly(!veganOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                  veganOnly 
                    ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-900" 
                    : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"
                }`}
              >
                <Leaf size={14} className={veganOnly ? "text-emerald-600" : "text-zinc-400"} />
                <span>Vegan Only</span>
              </button>

              {/* Sorting Selection */}
              <div className="flex items-center space-x-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl">
                <SlidersHorizontal size={14} className="text-zinc-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-zinc-700 dark:text-zinc-300 font-semibold focus:outline-none border-none pr-1"
                >
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-zinc-100 dark:border-zinc-800 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white shadow-md shadow-emerald-800/10"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const qty = gridQuantities[item.id] || 1;
              const isAdded = justAddedId === item.id;
              
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Dish Image & Badges */}
                  <div className="relative h-48 w-full overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {item.isVegetarian && (
                        <span className="px-2 py-1 rounded-lg bg-emerald-700/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm flex items-center space-x-1">
                          <Leaf size={10} />
                          <span>VEG</span>
                        </span>
                      )}
                      {item.isVegan && (
                        <span className="px-2 py-1 rounded-lg bg-emerald-950/95 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm flex items-center space-x-1">
                          <Leaf size={10} />
                          <span>VEGAN</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-[10px] font-bold rounded-lg backdrop-blur-sm flex items-center space-x-1">
                      <Clock size={11} className="text-amber-400" />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Category */}
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                          {item.category}
                        </span>
                        <div className="flex items-center text-amber-500 font-bold bg-amber-500/5 dark:bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/10">
                          <Star size={11} className="fill-amber-500 mr-1" />
                          <span>{item.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Name & Desc */}
                      <h3 className="font-bold text-zinc-900 dark:text-white text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mt-1.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5">
                      {/* Price Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                          ${item.price.toFixed(2)}
                        </span>
                        
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors"
                          title="View details"
                        >
                          <Info size={15} />
                        </button>
                      </div>

                      {/* Interactive Controls */}
                      <div className="flex items-center space-x-2">
                        {/* Qty selectors */}
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 p-1">
                          <button
                            onClick={() => handleQtyChange(item.id, "dec")}
                            className="p-1 rounded-lg text-zinc-500 hover:bg-white dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item.id, "inc")}
                            className="p-1 rounded-lg text-zinc-500 hover:bg-white dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Add button */}
                        <button
                          onClick={() => triggerAddToCart(item, qty)}
                          className={`flex-1 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all duration-300 shadow-sm cursor-pointer ${
                            isAdded
                              ? "bg-amber-500 text-white ring-2 ring-amber-400/20 shadow-amber-500/10"
                              : "bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white hover:scale-[1.02] shadow-emerald-700/10"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} className="animate-pulse" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={13} />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">No dishes matched your search criteria. Try removing some filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setVegOnly(false);
                setVeganOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-600 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => { setSelectedItem(null); setModalQty(1); }}
              className="absolute top-4 right-4 z-10 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Modal Image */}
            <div className="h-60 w-full relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-5 left-6 text-white">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold block mb-1">
                  {selectedItem.category}
                </span>
                <h3 className="text-2xl font-black tracking-tight">{selectedItem.name}</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                {selectedItem.description}
              </p>

              {/* Specific info rows */}
              <div className="grid grid-cols-3 gap-4 border-y border-zinc-100 dark:border-zinc-800 my-6 py-4">
                <div className="text-center">
                  <span className="text-[10px] font-mono text-zinc-400 block">RATING</span>
                  <div className="flex items-center justify-center text-amber-500 font-bold mt-1 text-sm">
                    <Star size={14} className="fill-amber-500 mr-1" />
                    <span>{selectedItem.rating.toFixed(1)} / 5.0</span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono text-zinc-400 block">PREP TIME</span>
                  <div className="flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold mt-1 text-sm">
                    <Clock size={14} className="text-emerald-600 mr-1" />
                    <span>{selectedItem.prepTime}</span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono text-zinc-400 block">DIETARY</span>
                  <div className="flex items-center justify-center text-zinc-750 dark:text-zinc-250 font-semibold mt-1 text-xs">
                    {selectedItem.isVegan ? (
                      <span className="text-emerald-700 dark:text-emerald-400">100% Vegan</span>
                    ) : selectedItem.isVegetarian ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Vegetarian</span>
                    ) : (
                      <span className="text-zinc-500">Traditional</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom add bar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-400">TOTAL PRICE</span>
                  <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                    ${(selectedItem.price * modalQty).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Qty picker */}
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 p-1.5">
                    <button
                      onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                      className="p-1 rounded-lg text-zinc-500 hover:bg-white dark:hover:bg-zinc-900 transition-all cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {modalQty}
                    </span>
                    <button
                      onClick={() => setModalQty(modalQty + 1)}
                      className="p-1 rounded-lg text-zinc-500 hover:bg-white dark:hover:bg-zinc-900 transition-all cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Add button */}
                  <button
                    onClick={() => {
                      triggerAddToCart(selectedItem, modalQty);
                      setSelectedItem(null);
                      setModalQty(1);
                    }}
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <ShoppingCart size={14} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
