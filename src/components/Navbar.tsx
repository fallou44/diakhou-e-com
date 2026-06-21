import React, { useState } from "react";
import { ShoppingBag, Heart, Gem, Search, ShieldCheck, Menu, X, User } from "lucide-react";
import { CartItem } from "../types";
import { Link } from "react-router-dom";

interface NavbarProps {
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: any) => void;
}

export default function Navbar({
  cart,
  wishlist,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
            <Gem className="w-4 h-4 animate-pulse text-pink-200" />
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
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-rose-950 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

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
              <div className="flex flex-col items-center justify-center">
                <span className="font-serif font-black text-rose-950 text-3xl leading-none tracking-tighter group-hover:text-rose-600 transition-colors">DIAKHOU</span>
                <span className="font-sans font-bold text-rose-400 text-[9px] tracking-[0.3em] uppercase leading-none mt-1">HAIR & BEAUTY</span>
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

            {/* Right Section: Icon Controls */}
            <div className="flex items-center justify-end gap-1 sm:gap-3 shrink-0">
              {/* User Account */}
              <Link
                to="/connexion"
                className="p-2 sm:p-2.5 text-rose-950 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors relative cursor-pointer hidden sm:block"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
              </Link>
              
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

        {/* Mobile Full Screen Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full h-screen bg-white/95 backdrop-blur-xl border-t border-pink-100 z-50 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une perruque..."
                  className="w-full bg-rose-50/50 hover:bg-rose-50 border-transparent text-rose-950 text-sm pl-11 pr-4 py-3.5 rounded-2xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-200 focus:border-pink-200 placeholder-rose-300 transition-all shadow-inner"
                />
              </div>

              {/* Mobile Categories */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 px-2">Catégories</h3>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-rose-50 text-rose-600 shadow-xs"
                        : "text-rose-950 hover:bg-rose-50/50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              


            </div>
          </div>
        )}
      </div>
    </header>
  );
}
