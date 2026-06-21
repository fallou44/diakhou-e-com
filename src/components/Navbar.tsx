import React from "react";
import { ShoppingBag, Heart, Crown, Search, ShieldCheck, ScanFace } from "lucide-react";
import { CartItem } from "../types";
import { Link } from "react-router-dom";

interface NavbarProps {
  cart: CartItem[];
  wishlist: string[];
  onOpenAIStylist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: any) => void;
}

export default function Navbar({
  cart,
  wishlist,
  onOpenAIStylist,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: NavbarProps) {
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { name: "Tous l'Éventail", id: "Tous" },
    { name: "Wear & Go (Sans Colle)", id: "Wear & Go" },
    { name: "HD Lace Frontal", id: "HD Lace Frontal" },
    { name: "Bob Perruques", id: "Bob Perruques" },
    { name: "Tissages & Closures", id: "Tissages & Closures" },
    { name: "Colorées Éditions", id: "Perruques Colorées" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full" id="diakhou-header">
      {/* Promo Ticker Banner */}
      <div className="bg-[#E91E63] text-white text-[11px] sm:text-xs py-2.5 px-4 transition-all duration-300 shadow-md relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center gap-1.5 font-medium tracking-wide">
          <div className="flex items-center gap-1.5">
            <Crown className="w-4 h-4 animate-pulse text-pink-200" />
            <span>OFFRE DIAKHOU LUXE : -20% sur tout le site avec le code <strong className="font-bold underline text-pink-100 ml-1 tracking-widest">ROSE20</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] text-pink-100">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-white" /> Paiement 100% Sécurisé Garanti
            </span>
            <span className="hidden md:inline text-pink-300">|</span>
            <span className="hidden md:inline">Livraison Express DHL Offerte dès 99€</span>
          </div>
        </div>
      </div>

      {/* Glassmorphism Main Navbar */}
      <div className="bg-white/85 backdrop-blur-xl border-b border-pink-100 shadow-[0_4px_30px_rgba(233,30,99,0.05)] relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
            
            {/* Logo Section */}
            <Link 
              to="/"
              className="flex items-center gap-3 sm:gap-4 cursor-pointer select-none group focus:outline-hidden shrink-0" 
              onClick={() => {
                setActiveCategory("Tous");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Refined Luxury Logo Mark */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-pink-200 to-rose-100 border border-white shadow-[0_4px_15px_rgba(233,30,99,0.15)] flex items-center justify-center relative transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                <span className="absolute -top-[4px] -left-[2px] rotate-[-20deg] text-[12px] sm:text-[14px] drop-shadow-xs" title="Crown">👑</span>
                <span className="font-serif font-black text-rose-950 text-xl sm:text-2xl leading-none ml-0.5 tracking-tighter">D</span>
              </div>
              {/* Typography */}
              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-xl sm:text-[22px] tracking-[0.15em] text-rose-950 uppercase leading-none mb-1 sm:mb-1.5">
                  Diakhou
                </span>
                <span className="font-sans font-bold text-rose-500 text-[8px] sm:text-[10px] tracking-[0.25em] uppercase leading-none">
                  Hair & Beauty
                </span>
              </div>
            </Link>

            {/* Premium Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une perruque HD Lace, Wear & Go..."
                className="w-full bg-rose-50/50 hover:bg-rose-50 border-transparent text-rose-950 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-200 focus:border-pink-200 placeholder-rose-300 transition-all shadow-inner"
              />
            </div>

            {/* Icon Controls */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              {/* AI Button */}
              <button
                onClick={onOpenAIStylist}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-rose-950 hover:bg-rose-900 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_4px_15px_rgba(74,21,44,0.2)] hover:shadow-[0_4px_20px_rgba(233,30,99,0.3)] transition-all duration-300 cursor-pointer group active:scale-95"
              >
                <ScanFace className="w-4 h-4 text-pink-300 group-hover:animate-pulse" />
                <span>IA Visagiste</span>
              </button>
              
              {/* Wishlist */}
              <Link
                to="/favoris"
                className="p-2 sm:p-2.5 text-rose-950 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors relative cursor-pointer"
              >
                <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${wishlist.length > 0 ? "fill-rose-500 text-rose-500" : "stroke-[1.5]"}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/panier"
                className="p-2 sm:p-2.5 text-rose-950 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors relative cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                {totalCartCount > 0 && (
                  <span className="absolute top-0 right-0 sm:top-1 sm:right-1 bg-rose-600 text-white font-bold text-[9px] sm:text-[10px] min-w-[16px] sm:min-w-[18px] h-[16px] sm:h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Navigation Bar (Sleek Tabs) */}
        <nav className="border-t border-pink-100/60 bg-white/40">
          <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto scrollbar-none">
            <div className="flex space-x-6 sm:space-x-8 w-full md:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative py-3.5 sm:py-4 px-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? "text-rose-950"
                      : "text-rose-400 hover:text-rose-700"
                  }`}
                >
                  {cat.name}
                  {activeCategory === cat.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] sm:h-[3px] bg-rose-950 rounded-t-full shadow-[0_-2px_10px_rgba(233,30,99,0.5)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
