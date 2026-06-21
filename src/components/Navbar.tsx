import React from "react";
import { ShoppingBag, Heart, Sparkles, Search, ShieldCheck } from "lucide-react";
import { CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
  wishlist: string[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIStylist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: any) => void;
}

export default function Navbar({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
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
    <header className="sticky top-0 z-40 bg-[#FFF5F7]/95 backdrop-blur-md border-b border-pink-100 shadow-xs" id="diakhou-header">
      {/* Promo Ticker Banner */}
      <div className="bg-[#E91E63] text-white text-xs py-2 px-4 transition-all duration-300" id="diakhou-promo-ticker">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center gap-1 font-medium tracking-wide">
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 animate-pulse text-pink-200" />
            <span>OFFRE DIAKHOU LUXE : -20% sur tout le site avec le code <strong className="font-bold underline text-pink-100">ROSE20</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-pink-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-white" /> Paiement 100% Sécurisé Garanti
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Livraison Express DHL Offerte dès 99€</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Logo - Fully Customized to match the image precisely */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group" 
          onClick={() => setActiveCategory("Tous")}
          id="diakhou-logo-container"
        >
          {/* Circular Logo graphic from the user image */}
          <div className="w-12 h-12 rounded-full bg-[#FFD1DC] border-2 border-pink-200 flex items-center justify-center relative shadow-xs shrink-0 transform group-hover:scale-105 transition-all">
            {/* Crown icon on top left of the logo */}
            <span className="absolute -top-[5px] -left-[2px] rotate-[-15deg] text-[15px]" title="Crown">👑</span>
            {/* The Monogram D inside the pink circle */}
            <span className="font-serif font-black text-rose-950 text-2xl leading-none ml-0.5 tracking-tighter">
              D
            </span>
          </div>
          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-lg sm:text-xl tracking-wider text-rose-950 uppercase leading-none">
              Diakhou
            </span>
            <span className="font-serif italic text-rose-600 font-bold text-xs sm:text-sm tracking-wide mt-0.5 leading-none">
              Hair & Beauty
            </span>
          </div>
        </div>

        {/* Search Bar - Aesthetic & Modern */}
        <div className="hidden md:flex flex-1 max-w-md relative" id="search-bar-navbar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une perruque Wear & Go, HD Lace Frontal, Bob..."
            className="w-full bg-white border border-pink-200 text-rose-950 text-xs pl-4 pr-10 py-2.5 rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#E91E63]/30 focus:border-[#E91E63] placeholder-pink-300 transition-all font-sans"
            id="search-input"
          />
          <Search className="w-4 h-4 text-pink-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Icon Controls */}
        <div className="flex items-center sm:gap-4 gap-2" id="navbar-actions">
          {/* AI Virtual Stylist Button (Featured) */}
          <button
            onClick={onOpenAIStylist}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#4A152C] hover:bg-pink-900 border border-[#4A152C] text-pink-100 hover:text-white rounded-full text-xs font-bold tracking-wide shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group active:scale-95"
            id="nav-btn-ai-stylist"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-350 group-hover:animate-bounce shrink-0" />
            <span className="hidden sm:inline">Diagnostic Visagiste IA</span>
            <span className="sm:hidden font-mono text-[10px]">IA</span>
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-rose-950 hover:text-[#E91E63] rounded-full hover:bg-pink-50/50 transition-colors relative cursor-pointer"
            title="Favoris"
            id="nav-btn-wishlist"
          >
            <Heart className={`w-5.5 h-5.5 ${wishlist.length > 0 ? "fill-[#E91E63] text-[#E91E63]" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E91E63] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Shopping Cart Icon */}
          <button
            onClick={onOpenCart}
            className="p-2 text-rose-950 hover:text-[#E91E63] rounded-full hover:bg-pink-50/50 transition-colors relative cursor-pointer"
            title="Panier"
            id="nav-btn-cart"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#E91E63] text-white font-semibold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <nav className="bg-white border-t border-pink-100/50 overflow-x-auto scrollbar-none" id="categories-nav">
        <div className="max-w-7xl mx-auto px-4 flex justify-start sm:justify-center gap-1 sm:gap-6 py-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-pink-100/80 text-rose-950 shadow-xs"
                  : "text-rose-900 hover:text-[#E91E63] hover:bg-pink-50/40"
              }`}
              id={`cat-nav-${cat.id.replace(/\s+/g, "-")}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
