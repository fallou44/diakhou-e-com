import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Star, ShoppingBag } from "lucide-react";
import { products, getPrice } from "../data/products";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedTexture, setSelectedTexture] = useState("Tous");
  const [maxPrice, setMaxPrice] = useState<number>(300);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = [
    { name: "Tous", id: "Tous" },
    { name: "Wear & Go", id: "Wear & Go" },
    { name: "HD Lace Frontal", id: "HD Lace Frontal" },
    { name: "Bob Perruques", id: "Bob Perruques" },
    { name: "Tissages & Closures", id: "Tissages & Closures" },
    { name: "Colorées", id: "Perruques Colorées" },
  ];

  const textures = ["Tous", "Straight", "Body Wave", "Deep Wave", "Kinky Curly"];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Tous" || p.category === activeCategory;
      const matchesTexture = selectedTexture === "Tous" || p.texture === selectedTexture;
      
      const minAvailablePrice = getPrice(p.basePrice, p.lengths[0], p.densities[0], p.flashSaleDiscount);
      const matchesPrice = minAvailablePrice <= maxPrice;

      return matchesSearch && matchesCategory && matchesTexture && matchesPrice;
    });
  }, [searchQuery, activeCategory, selectedTexture, maxPrice]);

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-rose-950 text-white py-16 px-4 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl font-black mb-4">Notre Collection</h1>
        <p className="text-pink-200 text-sm max-w-xl mx-auto">
          Découvrez notre éventail complet de perruques et mèches haut de gamme. Filtrez par texture, longueur ou budget pour trouver votre match parfait.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          {/* Search */}
          <div>
            <h3 className="text-xs font-bold text-rose-950 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-rose-500" /> Recherche
            </h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex: Bob miel..."
              className="w-full bg-white border border-rose-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-200 outline-hidden"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-rose-950 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose-500" /> Catégories
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat.id ? "bg-rose-100 text-rose-900 font-bold" : "text-stone-600 hover:bg-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Textures */}
          <div>
            <h3 className="text-xs font-bold text-rose-950 uppercase tracking-widest mb-3">Textures</h3>
            <div className="flex flex-wrap gap-2">
              {textures.map((tex) => (
                <button
                  key={tex}
                  onClick={() => setSelectedTexture(tex)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    selectedTexture === tex 
                      ? "bg-rose-950 text-white border-rose-950" 
                      : "bg-white text-stone-600 border-rose-100 hover:border-rose-300"
                  }`}
                >
                  {tex}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-bold text-rose-950 uppercase tracking-widest mb-3 flex justify-between">
              <span>Prix Max</span>
              <span className="text-rose-600">{maxPrice} €</span>
            </h3>
            <input 
              type="range" 
              min="50" 
              max="500" 
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>50 €</span>
              <span>500 €</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-bold text-rose-950">
              Résultats <span className="text-rose-500 font-sans text-sm font-normal">({filteredProducts.length} articles)</span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-rose-100">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-rose-950 mb-2">Aucun modèle trouvé</h3>
              <p className="text-sm text-stone-500 mb-6">Essayez d'ajuster vos filtres de recherche ou votre budget.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Tous");
                  setSelectedTexture("Tous");
                  setMaxPrice(300);
                }}
                className="px-6 py-2 bg-rose-100 text-rose-900 font-bold rounded-full text-sm hover:bg-rose-200 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const minPrice = getPrice(product.basePrice, product.lengths[0], product.densities[0], product.flashSaleDiscount);
                
                return (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                    <Link to={`/produit/${product.id}`} className="relative aspect-[4/5] overflow-hidden block">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {product.badge && (
                        <span className={`absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest text-white px-2.5 py-1 rounded-sm ${product.badgeColor || "bg-rose-500"}`}>
                          {product.badge}
                        </span>
                      )}
                      
                      <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-sm text-rose-950 font-bold text-xs px-6 py-2.5 rounded-full uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                          <ShoppingBag className="w-3.5 h-3.5" /> Voir détails
                        </span>
                      </div>
                    </Link>
                    
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-full">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] font-bold text-stone-600">{product.rating}</span>
                          </div>
                        </div>
                        
                        <Link to={`/produit/${product.id}`}>
                          <h3 className="font-serif font-bold text-rose-950 text-base leading-tight group-hover:text-rose-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-rose-50 flex items-end justify-between">
                        <div>
                          <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5">À partir de</div>
                          <div className="flex items-baseline gap-2">
                            {product.isFlashSale && product.flashSaleDiscount && (
                              <span className="text-xs text-stone-400 line-through font-mono">
                                {getPrice(product.basePrice, product.lengths[0], product.densities[0])}€
                              </span>
                            )}
                            <span className="font-serif text-xl font-black text-rose-900">
                              {minPrice}€
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
