import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

interface WishlistProps {
  wishlist: string[];
  toggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: any) => void;
}

export default function Wishlist({ wishlist, toggleWishlist, onSelectProduct }: WishlistProps) {
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FFF5F7] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 border-b border-pink-200 pb-4">
          <Heart className="w-8 h-8 text-rose-600 fill-rose-600" />
          <h1 className="font-serif text-3xl font-bold text-rose-950">Mes Favoris</h1>
          <span className="bg-rose-200 text-rose-900 text-sm font-bold px-3 py-0.5 rounded-full ml-2">
            {wishlist.length}
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-xs border border-pink-100">
            <Heart className="w-20 h-20 text-rose-200 mx-auto mb-6 animate-pulse" />
            <h2 className="font-serif text-2xl font-bold text-rose-950 mb-2">Aucun favori enregistré</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Cliquez sur l'icône de cœur de vos perruques favorites pour les enregistrer et y accéder plus facilement !
            </p>
            <Link to="/" className="px-8 py-3 bg-rose-600 text-white font-bold rounded-full hover:bg-rose-500 transition-colors shadow-md">
              Découvrir nos collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative"
                onClick={() => onSelectProduct(item)}
              >
                <button
                  onClick={(e) => toggleWishlist(item.id, e)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-50 shadow-xs"
                >
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                </button>
                <div className="aspect-[4/5] bg-rose-50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] text-rose-500 uppercase tracking-widest font-bold mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-rose-950 text-sm mb-2 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-mono font-black text-rose-950 text-lg">{item.basePrice} €</span>
                    <span className="text-xs text-rose-600 font-bold underline decoration-rose-200 underline-offset-4 group-hover:decoration-rose-600 transition-colors">
                      Personnaliser
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
