import React, { useState, useEffect } from "react";
import { Flame, Star, ShoppingBag, Heart, Plus } from "lucide-react";
import { Product } from "../types";
import { getPrice } from "../data/products";
import { motion } from "motion/react";

interface FlashSalesProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string, e?: React.MouseEvent) => void;
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
}

export default function FlashSales({
  products,
  wishlist,
  onToggleWishlist,
  onProductClick,
  onQuickAdd,
}: FlashSalesProps) {
  // Flash sale countdown state: hours, minutes, seconds until midnight
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });

  useEffect(() => {
    // Generate an end of the day or rotating countdown
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      let diff = endOfDay.getTime() - now.getTime();
      if (diff < 0) diff = 1000 * 60 * 60 * 4; // Reset to 4h fallback

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale);

  if (flashProducts.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-rose-50 to-[#FFF0F2] rounded-[32px] p-8 border border-rose-100 shadow-lg my-12 relative overflow-hidden" id="vente-flash-section">
      {/* Decorative ambient blobs */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-100/30 rounded-full blur-2xl pointer-events-none" />

      {/* Header element with Countdown */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-rose-100/80 relative z-10">
        <div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F2] text-[#E91E63] rounded-full text-[10px] font-extrabold uppercase tracking-wider w-max mb-2">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
            <span>VENTES FLASH EXCLUSIVES</span>
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-rose-950">
            Offres <span className="italic font-serif text-[#E91E63]">Éphémères</span> Diakhou
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Les pièces les plus demandées à prix de rêve. Les stocks libres s'épuisent en temps réel.
          </p>
        </div>

        {/* Real Countdown timer */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-rose-100 shadow-xs">
          <span className="text-[10px] font-black uppercase text-rose-900 tracking-wider mr-2">Finit Dans:</span>
          <div className="flex items-center gap-1">
            <div className="flex flex-col items-center">
              <span className="font-mono text-sm font-black bg-rose-950 text-white px-2 py-1 rounded-sm w-8 text-center">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-[8px] mt-0.5 text-stone-400 font-bold">HRS</span>
            </div>
            <span className="font-bold text-rose-950 animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="font-mono text-sm font-black bg-rose-950 text-white px-2 py-1 rounded-sm w-8 text-center">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-[8px] mt-0.5 text-stone-400 font-bold">MIN</span>
            </div>
            <span className="font-bold text-rose-950 animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="font-mono text-sm font-black bg-rose-600 text-white px-2 py-1 rounded-sm w-8 text-center">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="text-[8px] mt-0.5 text-rose-400 font-bold">SEC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {flashProducts.map((p) => {
          const isWishlisted = wishlist.includes(p.id);
          
          // Show default initial product price based on first index lengths and densities
          const defaultLength = p.lengths[0];
          const defaultDensity = p.densities[0];
          
          const rawPrice = getPrice(p.basePrice, defaultLength, defaultDensity);
          const salePrice = getPrice(p.basePrice, defaultLength, defaultDensity, p.flashSaleDiscount);
          
          // Stock percent left (max assumed 10)
          const stock = p.stockLeft || 5;
          const progressPercent = (stock / 10) * 100;

          return (
            <motion.div
              layoutId={`flash-${p.id}`}
              key={p.id}
              onClick={() => onProductClick(p)}
              className="bg-white p-4 rounded-3xl border border-rose-100 card-shadow flex flex-col justify-between hover:border-pink-300 hover:scale-[1.01] transition-all duration-300 cursor-pointer relative group overflow-hidden"
              id={`flash-product-${p.id}`}
            >
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-rose-50/20 aspect-video mb-4 flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black tracking-widest px-2.5 py-1 rounded-sm shadow-xs uppercase select-none">
                  -{p.flashSaleDiscount}% OFF
                </span>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => onToggleWishlist(p.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-rose-950 hover:text-red-500 shadow-xs hover:scale-105 transition-all cursor-pointer"
                  title="Ajouter aux favoris"
                >
                  <Heart className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Info Area */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                    <span>{p.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-stone-800 text-[10px] font-mono leading-none">{p.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-rose-950 text-sm tracking-tight leading-snug group-hover:text-[#E91E63] transition-colors line-clamp-2 min-h-[40px]">
                    {p.name}
                  </h3>

                  {/* Stock urgency tracker */}
                  <div className="my-3 block">
                    <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-wider mb-1">
                      <span className="text-red-650 flex items-center gap-1">
                        🔥 Seulement {stock} pièces dispos
                      </span>
                      <span className="text-stone-400 font-mono">{stock}/10 restants</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${progressPercent}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          stock <= 3 ? "bg-red-600 animate-pulse" : "bg-orange-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Add to Cart button */}
                <div className="flex items-center justify-between pt-3 border-t border-rose-50 mt-2">
                  <div>
                    <div className="text-[9px] text-stone-400 uppercase font-bold tracking-wider mb-0.5">Offre Spéciale :</div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-red-650 text-xl font-mono leading-none">
                        {salePrice} €
                      </span>
                      <span className="text-stone-400 text-xs font-semibold line-through font-mono">
                        {rawPrice} €
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => onQuickAdd(p, e)}
                    className="bg-red-650 hover:bg-rose-950 text-white p-2.5 rounded-full transition-all cursor-pointer flex items-center justify-center group/btn shadow-xs hover:shadow-md"
                    title="Ajouter rapidement au panier"
                  >
                    <Plus className="w-4 h-4 stroke-[3px] group-hover/btn:rotate-90 transition-transform" />
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
