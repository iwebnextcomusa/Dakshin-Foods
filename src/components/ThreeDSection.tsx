import React, { useState } from "react";
import { Sparkles, Heart, Utensils, Star, Flame } from "lucide-react";

interface DishShowcase {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  rating: number;
  preparationTime: string;
  spicyLevel: "Mild" | "Medium" | "Hot";
  tags: string[];
}

const SHOWCASE_DISHES: DishShowcase[] = [
  {
    id: "dosa",
    name: "Classic Masala Dosa",
    tagline: "Golden Crispy perfection",
    description: "Our signature crispy fermented rice-and-lentil crepe wrapped around a savory, spiced potato masala filling. Perfectly roasted in pure ghee and served with freshly ground coconut chutney, tangy tomato chutney, and rich vegetable sambar.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    preparationTime: "12-15 mins",
    spicyLevel: "Medium",
    tags: ["Crispy", "Gluten-Free Option", "Vegan Preferred"]
  },
  {
    id: "idli",
    name: "Steamed Idli & Medu Vada Platter",
    tagline: "Fluffy & Crunchy harmony",
    description: "Three soft, melt-in-the-mouth steamed idlis paired with a crispy, golden-brown medu vada. Crafted using traditional stone-ground batter, offering the perfect balance of fluffy and crispy textures to dip in our signature piping hot sambar.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    preparationTime: "8-10 mins",
    spicyLevel: "Mild",
    tags: ["High Protein", "Traditional", "Light Meal"]
  },
  {
    id: "biryani",
    name: "Dakshin Royal Chicken Biryani",
    tagline: "Fragrant slow-cooked masterpiece",
    description: "Premium fragrant basmati rice layered with tender, marinated chicken, fresh mint, coriander, and caramelized onions. Slow-cooked under 'Dum' (steam pressure) to lock in deep, authentic southern spices and delicate aromas.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200&auto=format&fit=crop",
    rating: 4.95,
    preparationTime: "20 mins",
    spicyLevel: "Hot",
    tags: ["Slow Cooked", "Spicy", "Chef Special"]
  }
];

export default function ThreeDSection() {
  const [selectedDish, setSelectedDish] = useState<DishShowcase>(SHOWCASE_DISHES[0]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center", transform: "scale(1)" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.12)"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center",
      transform: "scale(1)"
    });
  };

  return (
    <section className="relative w-full bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3 border border-emerald-100 dark:border-emerald-900/30">
              <Sparkles size={12} className="text-amber-500 animate-pulse" />
              <span>Interactive Flavor Showcase</span>
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight text-zinc-900 dark:text-white">
              Signature Creations
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl text-sm leading-relaxed">
              Explore our highly-acclaimed culinary art. Click the buttons to switch dishes and hover over the picture to explore the fine textures of our stone-ground organic ingredients.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 mt-4 md:mt-0 p-1.5 bg-zinc-100 dark:bg-zinc-900/80 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 w-fit">
            {SHOWCASE_DISHES.map((dish) => (
              <button
                key={dish.id}
                onClick={() => {
                  setSelectedDish(dish);
                  setIsLiked(false);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                  selectedDish.id === dish.id
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {dish.name.split(" ")[1] || dish.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Picture frame taking 7 columns (replaces the canvas) */}
          <div className="lg:col-span-7 flex flex-col">
            <div 
              className="relative aspect-video sm:aspect-auto sm:h-[400px] w-full rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-900 shadow-xl border border-zinc-200/60 dark:border-zinc-800/40 group cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Featured Image with Zoom/Parallax Effect */}
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                style={zoomStyle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-150 ease-out"
              />

              {/* Accent Gradient Grads */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

              {/* Top Pill Tags */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                {selectedDish.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/90 dark:bg-zinc-950/90 text-emerald-800 dark:text-emerald-300 rounded-lg shadow-sm border border-zinc-200/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom Text Overlays on Image */}
              <div className="absolute bottom-5 left-6 right-6 z-10 text-white flex justify-between items-end">
                <div>
                  <span className="text-amber-400 font-extrabold text-[11px] uppercase tracking-widest block mb-1">
                    {selectedDish.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight">
                    {selectedDish.name}
                  </h3>
                </div>

                {/* Like Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                  className={`p-3 rounded-2xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
                    isLiked 
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "scale-110" : ""} />
                </button>
              </div>
            </div>
          </div>

          {/* Details & Specs taking 5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-md border border-zinc-100 dark:border-zinc-800/80">
            <div>
              {/* Title & Reviews */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-widest">
                  Gastronomy Profile
                </span>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-100 dark:border-amber-900/30">
                  <Star size={13} className="fill-amber-500 stroke-amber-500" />
                  <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400">
                    {selectedDish.rating}
                  </span>
                </div>
              </div>

              <h4 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-3">
                {selectedDish.name}
              </h4>

              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                {selectedDish.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/40">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Heat Index
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Flame size={14} className={
                      selectedDish.spicyLevel === "Hot" 
                        ? "text-red-500" 
                        : selectedDish.spicyLevel === "Medium"
                        ? "text-amber-500"
                        : "text-emerald-500"
                    } />
                    <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
                      {selectedDish.spicyLevel}
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/40">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Preparation Time
                  </span>
                  <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 block">
                    {selectedDish.preparationTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Note / Footer Area of the card */}
            <div className="mt-8 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Utensils size={14} />
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                <strong className="text-zinc-700 dark:text-zinc-300">Stone-ground organic batter:</strong> Fermented for exactly 14 hours for probiotic health and superior crispy texture. Made daily in British Columbia.
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
