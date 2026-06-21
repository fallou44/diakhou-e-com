import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Star, ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react";
import { products, getPrice } from "../data/products";
import { getReviewsByProductId } from "../data/reviews";
import { Product, CartItem, Review } from "../types";

interface ProductDetailsProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function ProductDetails({ cart, setCart }: ProductDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Config state
  const [localLength, setLocalLength] = useState<number>(18);
  const [localDensity, setLocalDensity] = useState<string>("180%");
  const [localColor, setLocalColor] = useState<string>("Noir Naturel");
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setLocalLength(found.lengths[0]);
      setLocalDensity(found.densities[0]);
      setLocalColor(found.colors[0]);
      setActiveImage(found.image);
      setReviews(getReviewsByProductId(found.id));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const newItem: CartItem = {
      product,
      selectedLength: localLength,
      selectedDensity: localDensity,
      selectedColor: localColor,
      quantity: 1
    };

    setCart(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && 
        item.selectedLength === localLength &&
        item.selectedDensity === localDensity &&
        item.selectedColor === localColor
      );
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, newItem];
    });
    
    // Animate or redirect
    navigate("/panier");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif text-rose-950 font-bold mb-4">Produit introuvable</h2>
        <button onClick={() => navigate("/")} className="text-rose-600 font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </button>
      </div>
    );
  }

  const currentPrice = getPrice(product.basePrice, localLength, localDensity, product.flashSaleDiscount);
  const originalPrice = getPrice(product.basePrice, localLength, localDensity);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <button onClick={() => navigate(-1)} className="text-rose-600 font-bold flex items-center gap-2 hover:underline mb-8 cursor-pointer">
        <ArrowLeft className="w-4 h-4" /> Retour
      </button>

      <div className="bg-white rounded-[32px] w-full card-shadow border border-rose-100 flex flex-col lg:flex-row overflow-hidden mb-12">
        {/* Left side: Images gallery representation */}
        <div className="lg:w-1/2 p-6 md:p-10 bg-rose-50/20 flex flex-col justify-start border-b lg:border-b-0 lg:border-r border-rose-100/60">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#FDF2F4] mb-4 group">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            
            {product.badge && (
              <span className={`absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest text-white px-3 py-1 rounded-sm ${product.badgeColor || "bg-rose-500"}`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Showcase the gallery thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((imgSrc, ind) => (
              <button 
                key={ind} 
                onClick={() => setActiveImage(imgSrc)}
                className={`rounded-lg overflow-hidden border-2 aspect-square transition-all cursor-pointer ${activeImage === imgSrc ? 'border-rose-500' : 'border-transparent hover:border-rose-300'}`}
              >
                <img
                  src={imgSrc}
                  alt="Product view"
                  className="w-full h-full object-cover object-top"
                />
              </button>
            ))}
          </div>

          <div className="mt-8 p-5 bg-rose-50 rounded-2xl border border-rose-100">
            <h5 className="text-[11px] font-bold uppercase text-rose-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-rose-600" /> GARANTIE CHEVEUX 10A REMY
            </h5>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Chaque perruque de Diakhou Hair & Beauty provient de cheveux vierges purs. Permet de décolorer jusqu'à la teinte Blond 613 sans agression. Cuticules alignées pour garantir zéro emmêlement.
            </p>
          </div>
        </div>

        {/* Right side: Customizable options panel */}
        <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">{product.category}</span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-rose-950 mt-2 leading-tight">{product.name}</h1>
            </div>

            <div className="flex items-center gap-1 mt-3">
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-sm font-bold text-rose-950 ml-2">({product.reviewsCount} avis vérifiés)</span>
              <span className="text-sm text-rose-400 mx-2">|</span>
              <span className="text-sm font-semibold text-rose-700">+{product.salesVolume} vendus</span>
            </div>

            <p className="text-sm text-gray-650 mt-6 leading-relaxed bg-[#FFF8FA]/80 p-4.5 rounded-xl border border-rose-100/50">
              {product.description}
            </p>

            <div className="mt-8 space-y-6">
              {/* Length */}
              <div>
                <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-3 flex justify-between items-center">
                  <span>1. Longueur en Pouces (Inches)</span>
                  <span className="text-rose-600 font-mono font-bold text-xs">{localLength}" (~ {Math.round(localLength * 2.54)} cm)</span>
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {product.lengths.map((len) => (
                    <button
                      key={len}
                      onClick={() => setLocalLength(len)}
                      className={`px-4 py-2.5 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                        localLength === len
                          ? "bg-rose-950 text-white border-rose-950 shadow-md transform scale-105"
                          : "bg-white text-stone-700 border-rose-100 hover:border-rose-300"
                      }`}
                    >
                      {len}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Density */}
              <div>
                <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-3 flex justify-between items-center">
                  <span>2. Épaisseur / Densité du Capillat</span>
                  <span className="text-rose-600 font-bold font-sans text-xs">{localDensity}</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.densities.map((den) => (
                    <button
                      key={den}
                      onClick={() => setLocalDensity(den)}
                      className={`py-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                        localDensity === den
                          ? "bg-rose-950 text-white border-rose-950 shadow-md transform scale-105"
                          : "bg-white text-stone-700 border-rose-100 hover:border-rose-300"
                      }`}
                    >
                      <span className="block text-sm">{den}</span>
                      <span className="block font-normal text-[10px] mt-0.5 opacity-80">
                        {den === "150%" ? "Standard" : den === "180%" ? "Volumineux" : "Ultra-Mégavolume"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-3">
                  3. Nuance de Couleur
                </h4>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setLocalColor(col)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                        localColor === col
                          ? "bg-rose-100 text-rose-950 border-rose-400 shadow-sm"
                          : "bg-white text-stone-700 border-rose-100 hover:border-rose-255"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full shadow-inner ${
                        col.includes("Noir") ? "bg-stone-900" :
                        col.includes("Miel") || col.includes("Doré") ? "bg-[#d4b383]" :
                        col.includes("Rose") ? "bg-pink-300" : "bg-red-900"
                      }`} />
                      <span>{col}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-rose-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1">Tarif Final :</div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  {product.isFlashSale && product.flashSaleDiscount && (
                    <span className="text-stone-400 text-lg font-semibold line-through font-mono">
                      {originalPrice} €
                    </span>
                  )}
                  <span className="font-serif text-4xl font-black text-rose-950">
                    {currentPrice} €
                  </span>
                </div>
                <div className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> TVA & Taxes de douanes incluses
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-full text-sm uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-rose-500/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Ajouter au Panier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 bg-white rounded-3xl p-8 border border-pink-100 shadow-sm">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-rose-100">
          <div>
            <h2 className="text-2xl font-serif font-bold text-rose-950">Avis de nos Clientes</h2>
            <p className="text-sm text-stone-500 mt-1">L'expérience Diakhou Hair & Beauty racontée par celles qui la vivent.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-rose-950">{product.rating.toFixed(1)}</div>
            <div className="flex items-center gap-0.5 text-amber-500 mt-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-xs text-stone-400 mt-1">Sur {product.reviewsCount} avis</div>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-10 text-stone-500">
            Aucun avis pour ce modèle pour l'instant. Soyez la première à partager votre expérience !
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-rose-50/30 p-6 rounded-2xl border border-rose-50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-bold font-serif text-lg">
                      {review.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-rose-950 text-sm flex items-center gap-1.5">
                        {review.authorName}
                        {review.isVerifiedPurchase && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-0.5">
                            <CheckCircle className="w-2.5 h-2.5" /> Achat vérifié
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed italic">"{review.content}"</p>
                
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {review.images.map((img, i) => (
                      <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-rose-100">
                        <img src={img} alt="Avis cliente" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
