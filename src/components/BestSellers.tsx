import React from "react";
import { Star, Heart, Plus, Trophy, Sparkles } from "lucide-react";
import { Product } from "../types";
import { getPrice } from "../data/products";
import { motion } from "motion/react";

interface BestSellersProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string, e?: React.MouseEvent) => void;
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
}

export default function BestSellers({
  products,
  wishlist,
  onToggleWishlist,
  onProductClick,
  onQuickAdd,
}: BestSellersProps) {
  // Filter bestsellers and sort them by salesVolume descending
  const bestSellerProducts = products
    .filter((p) => p.isBestSeller)
    .sort((a, b) => (b.salesVolume || 0) - (a.salesVolume || 0))
    .slice(0, 4); // Top 4 Best Sellers

  const getRankBadgeProps = (index: number) => {
    switch (index) {
      case 0:
        return {
          bg: "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-amber-200",
          icon: "👑 Top #1",
        };
      case 1:
        return {
          bg: "bg-gradient-to-r from-stone-400 to-slate-500 text-white shadow-slate-200",
          icon: "🥈 Top #2",
        };
      case 2:
        return {
          bg: "bg-gradient-to-r from-[#9C27B0] to-[#E040FB] text-white shadow-purple-200",
          icon: "🥉 Top #3",
        };
      default:
        return {
          bg: "bg-rose-950 text-white",
          icon: `✨ N°${index + 1} Best Seller`,
        };
    }
  };

  // Fun verified review quotes for our top wigs to give the feeling of a highly polished boutique
  const reviewQuotes: Record<string, string> = {
    "diakhou-001": "« Incroyable ! Reçue hier, posée aujourd'hui en 3 secondes. Lace ultra indétectable ! » – Sarah K.",
    "diakhou-002": "« La fluidité de ces cheveux est extraordinaire. Aucun nœud après 3 lavages ! » – Nora D.",
    "diakhou-008": "« Parfait pour les débutantes comme moi. Sans colle, tient très bien toute la journée. » – Aminata S.",
    "diakhou-010": "« Dentelle 360 magnifique, j'ai pu l'attacher en chignon haut sans aucun souci ! » – Marie L. de Genève",
  };

  if (bestSellerProducts.length === 0) return null;

  return (
    <section className="my-14 bg-white rounded-[32px] p-8 border border-rose-50 card-shadow relative overflow-hidden" id="best-sellers-section">
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-pink-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with trophy icon */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-10 pb-6 border-b border-rose-50">
        <div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-[10px] font-extrabold uppercase tracking-widest w-max mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
            <span>COUPOLE DES MEILLEURES VENTES</span>
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-rose-950">
            Les <span className="italic font-serif text-[#E91E63]">Coups de Cœur</span> Absolus
          </h2>
          <p className="text-xs text-stone-505 mt-1">
            Les modèles plébiscités, certifiés par plus de 4 500 avis d'expertes.
          </p>
        </div>
        <div className="text-xs text-[#E91E63] font-black tracking-widest uppercase flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-pink-400 rotate-12" />
          Mise à jour aujourd'hui
        </div>
      </div>

      {/* Grid of Best Sellers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestSellerProducts.map((p, index) => {
          const isWishlisted = wishlist.includes(p.id);
          const badgeProps = getRankBadgeProps(index);
          const quote = reviewQuotes[p.id] || "« Qualité d'extensions d'exception. Je recommande à 100% ! »";

          // Calculate standard starting price
          const startPrice = getPrice(p.basePrice, p.lengths[0], p.densities[0]);

          return (
            <motion.div
              layoutId={`best-${p.id}`}
              key={p.id}
              onClick={() => onProductClick(p)}
              className="group flex flex-col justify-between bg-[#FFFBFB] p-4 rounded-3xl border border-rose-50/60 hover:border-amber-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative"
              id={`best-seller-product-${p.id}`}
            >
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-rose-50/35 mb-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Platinum Rank Badge */}
                <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${badgeProps.bg} shadow-md`}>
                  {badgeProps.icon}
                </div>

                {/* Wishlist button */}
                <button
                  onClick={(e) => onToggleWishlist(p.id, e)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/95 text-rose-950 hover:text-rose-600 shadow-sm transition-all"
                  title="Ajouter aux favoris"
                >
                  <Heart className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
                </button>

                {/* Sales Volume Counter */}
                <div className="absolute bottom-3 left-3 right-3 bg-rose-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex justify-between items-center text-[10px] text-white">
                  <span className="font-semibold">{p.salesVolume} Commandes</span>
                  <span className="text-pink-300 font-bold">★ {p.rating}</span>
                </div>
              </div>

              {/* Informational Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-[#E91E63] font-bold uppercase tracking-wider block mb-1">
                    {p.category} • {p.texture}
                  </span>
                  
                  <h3 className="font-bold text-rose-950 text-sm tracking-tight leading-snug group-hover:text-amber-700 transition-colors line-clamp-2 min-h-[40px]">
                    {p.name}
                  </h3>

                  {/* Customer Review Bubble */}
                  <div className="my-2.5 p-2 bg-white rounded-xl border border-rose-100/40 text-[10px] text-stone-500 italic leading-snug font-serif">
                    {quote}
                  </div>
                </div>

                {/* Price and Cart checkout */}
                <div className="flex items-center justify-between pt-3 border-t border-rose-50 mt-1">
                  <div>
                    <span className="text-[9px] text-stone-400 block font-semibold">À partir de :</span>
                    <span className="font-black text-rose-955 text-lg font-mono">
                      {startPrice} €
                    </span>
                  </div>

                  <button
                    onClick={(e) => onQuickAdd(p, e)}
                    className="bg-rose-50 hover:bg-amber-100 text-[#E91E63] hover:text-amber-805 p-2.5 rounded-full transition-all cursor-pointer shadow-xs hover:shadow-sm"
                    title="Ajouter au Panier"
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
