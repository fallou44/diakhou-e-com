import React from "react";
import { Gem, Star, Heart, Plus } from "lucide-react";
import { Product } from "../types";
import { getPrice } from "../data/products";
import { motion } from "motion/react";

interface NewArrivalsProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string, e?: React.MouseEvent) => void;
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
}

export default function NewArrivals({
  products,
  wishlist,
  onToggleWishlist,
  onProductClick,
  onQuickAdd,
}: NewArrivalsProps) {
  // Filter for products with isNewArrival flag
  const newProducts = products.filter((p) => p.isNewArrival);

  if (newProducts.length === 0) return null;

  return (
    <section className="my-14 bg-gradient-to-r from-emerald-50/20 to-stone-50 rounded-[32px] p-8 border border-emerald-100/50 relative overflow-hidden" id="nouvel-arrivage-section">
      <div className="absolute top-10 right-10 w-24 h-24 bg-emerald-100/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Header element */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-10 pb-6 border-b border-emerald-100/30">
        <div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-extrabold uppercase tracking-widest w-max mb-2 border border-emerald-200">
            <Gem className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
            <span>EXCLUSIVITÉ NOUVEAUX DROPS</span>
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-stone-900">
            Nouvel <span className="italic font-serif text-emerald-700">Arrivage</span> Prestige
          </h2>
          <p className="text-xs text-stone-605 mt-1">
            Les tout derniers prototypes issus de nos ateliers de tissage. Un coiffage d'avant-garde.
          </p>
        </div>
        <div className="text-[10.5px] font-extrabold text-emerald-800 tracking-wider bg-emerald-100/60 hover:bg-emerald-100 px-3.5 py-1.5 rounded-full transition-colors select-none">
          ✨ Nouvelle Collection 2026/2027
        </div>
      </div>

      {/* Grid of New Arrivals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {newProducts.map((p) => {
          const isWishlisted = wishlist.includes(p.id);
          const startPrice = getPrice(p.basePrice, p.lengths[0], p.densities[0]);

          return (
            <motion.div
              layoutId={`new-${p.id}`}
              key={p.id}
              onClick={() => onProductClick(p)}
              className="group bg-white p-4 rounded-3xl border border-stone-100 hover:border-emerald-300 transition-all duration-300 cursor-pointer relative flex flex-col justify-between hover:shadow-md"
              id={`new-arrival-product-${p.id}`}
            >
              {/* Product Image Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-stone-50/50 mb-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* "New" Badge overlay */}
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-xs">
                  NEW DROP
                </div>

                {/* Wishlist trigger */}
                <button
                  onClick={(e) => onToggleWishlist(p.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-stone-800 hover:text-rose-600 shadow-sm transition-all cursor-pointer"
                  title="Ajouter aux favoris"
                >
                  <Heart className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Info Frame */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[9px] text-emerald-700 font-bold uppercase tracking-wider mb-1">
                    <span>{p.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-stone-700 text-[10px] font-mono leading-none">{p.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm tracking-tight leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[40px]">
                    {p.name}
                  </h3>

                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Price and Cart Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-4">
                  <div>
                    <span className="text-[9px] text-stone-400 block font-semibold">Dès</span>
                    <span className="font-black text-stone-900 text-lg font-mono">
                      {startPrice} €
                    </span>
                  </div>

                  <button
                    onClick={(e) => onQuickAdd(p, e)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 p-2.5 rounded-full transition-all cursor-pointer"
                    title="Ajouter rapidement au panier"
                  >
                    <Plus className="w-4 h-4 stroke-[3px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
