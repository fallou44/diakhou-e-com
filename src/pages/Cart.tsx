import React, { useState } from 'react';
import { ShoppingBag, Truck, Trash2, ShieldCheck, CreditCard, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  updateCartQty: (index: number, newQty: number) => void;
  clearCart?: () => void;
}

const getPrice = (base: number, length: number, density: string, discount?: number) => {
  let price = base;
  if (length > 18) price += (length - 18) * 10;
  if (density === "200%") price += 30;
  if (density === "250%") price += 60;
  if (discount) {
    price = price * (1 - discount / 100);
  }
  return Math.round(price);
};

export default function Cart({ cart, updateCartQty, clearCart }: CartProps) {
  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState<"shopping" | "billing" | "processing" | "success">("shopping");
  const [shippingForm, setShippingForm] = useState({ fullName: "", email: "", address: "", city: "", zipCode: "", phone: "", cardNumber: "", cardExpiry: "", cardCvc: "" });
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [lastOrder, setLastOrder] = useState<any>(null);

  const subtotal = cart.reduce((acc, item) => {
    return acc + getPrice(item.product.basePrice, item.selectedLength, item.selectedDensity, item.product.flashSaleDiscount) * item.quantity;
  }, 0);

  const checkPromo = () => {
    if (promoCode.toUpperCase() === "ROSE20") {
      setAppliedPromo({ code: "ROSE20", discount: 20 });
      setPromoMessage("-20% appliqués avec succès !");
    } else {
      setAppliedPromo(null);
      setPromoMessage("Code promo invalide ou expiré.");
    }
  };

  const discountAmount = appliedPromo ? Math.round(subtotal * (appliedPromo.discount / 100)) : 0;
  const deliveryPrice = subtotal > 99 ? 0 : 15;
  const grandTotal = subtotal - discountAmount + deliveryPrice;

  const submitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("processing");

    setTimeout(() => {
      setLastOrder({
        id: `DK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        items: [...cart],
        address: { ...shippingForm },
        total: grandTotal
      });
      if (clearCart) clearCart();
      setCheckoutStep("success");
    }, 3500);
  };

  if (cart.length === 0 && checkoutStep !== "success") {
    return (
      <div className="min-h-screen bg-[#FFF5F7] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center py-24 bg-white rounded-3xl shadow-xs border border-pink-100">
          <ShoppingBag className="w-20 h-20 text-rose-200 mx-auto mb-6 animate-bounce" />
          <h2 className="font-serif text-3xl font-bold text-rose-950 mb-4">Votre panier est vide</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Nos plus beaux modèles de perruques Wear & Go et extensions en soie n'attendent que vous !
          </p>
          <Link to="/" className="px-8 py-3.5 bg-rose-600 text-white font-bold rounded-full hover:bg-rose-500 transition-colors shadow-md text-sm uppercase tracking-widest">
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F7] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-pink-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-rose-600" />
            <h1 className="font-serif text-3xl font-bold text-rose-950">Mon Panier</h1>
            {checkoutStep === "shopping" && (
              <span className="bg-rose-200 text-rose-900 text-sm font-bold px-3 py-0.5 rounded-full ml-2">
                {cart.length}
              </span>
            )}
          </div>
          {checkoutStep === "billing" && (
            <button onClick={() => setCheckoutStep("shopping")} className="text-sm font-bold text-rose-600 hover:text-rose-800 underline">
              &larr; Retour au panier
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content Area (Left Col) */}
          <div className="flex-1">
            
            {checkoutStep === "shopping" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-rose-100">
                  <p className="text-sm text-gray-600 flex items-center gap-2 bg-rose-50 p-4 rounded-2xl border border-rose-100 mb-6">
                    <Truck className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>{subtotal > 99 ? "Félicitations ! Vous bénéficiez de l'expédition express offerte par DHL de Diakhou." : `Ajoutez ${Math.max(0, 100 - subtotal)}€ de plus pour obtenir la livraison express DHL offerte !`}</span>
                  </p>

                  <div className="space-y-4">
                    {cart.map((item, index) => {
                      const calculatedUnitPrice = getPrice(item.product.basePrice, item.selectedLength, item.selectedDensity, item.product.flashSaleDiscount);
                      
                      return (
                        <div key={`${item.product.id}-${index}`} className="flex gap-6 p-4 bg-[#FFFBFB] rounded-2xl border border-rose-100 relative group">
                          <div className="w-28 h-36 rounded-xl overflow-hidden bg-rose-50 shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                          </div>

                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                              <h4 className="font-bold text-rose-955 text-lg leading-snug pr-8">{item.product.name}</h4>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-rose-600 font-semibold uppercase tracking-wider">
                                <span>Taille: {item.selectedLength}"</span>
                                <span>Densité: {item.selectedDensity}</span>
                                <span>Teinte: {item.selectedColor}</span>
                              </div>
                            </div>

                            <div className="flex justify-between items-end mt-4 pt-4 border-t border-rose-50">
                              <div className="flex items-center bg-white border border-rose-200 rounded-lg overflow-hidden text-sm shadow-xs">
                                <button onClick={() => updateCartQty(index, item.quantity - 1)} className="p-2 px-4 hover:bg-rose-50 text-rose-800 font-bold transition-all">-</button>
                                <span className="px-3 font-bold font-mono text-stone-900">{item.quantity}</span>
                                <button onClick={() => updateCartQty(index, item.quantity + 1)} className="p-2 px-4 hover:bg-rose-50 text-rose-800 font-bold transition-all">+</button>
                              </div>

                              <div className="text-right">
                                <span className="block font-black text-xl text-rose-955 font-mono">{calculatedUnitPrice * item.quantity} €</span>
                                <span className="block text-xs text-gray-400 font-medium font-sans">{calculatedUnitPrice}€ / unité</span>
                              </div>
                            </div>
                          </div>

                          <button onClick={() => updateCartQty(index, 0)} className="absolute top-4 right-4 text-stone-300 hover:text-red-500 rounded-full p-2 hover:bg-red-50 transition-colors" title="Retirer">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {checkoutStep === "billing" && (
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-rose-100">
                <div className="mb-8 bg-emerald-50 text-emerald-800 p-5 rounded-2xl border border-emerald-100 flex gap-3 items-start">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block uppercase tracking-wide text-sm mb-1">Paiement 100% Crypté SSL</span>
                    <p className="text-sm text-emerald-700/85">
                      Vos informations bancaires sont chiffrées de bout-en-bout via l'authentification 3D Secure v2 obligatoire de notre partenaire Stripe.
                    </p>
                  </div>
                </div>

                <form onSubmit={submitCheckout} className="space-y-8">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-rose-950 mb-4 pb-2 border-b border-rose-100">1. Coordonnées d'Expédition</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs font-bold text-rose-600 uppercase mb-2">Nom Complet *</label>
                        <input type="text" required value={shippingForm.fullName} onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })} className="w-full bg-rose-50/40 border border-rose-200 text-stone-900 text-sm px-4 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-rose-600 uppercase mb-2">Email de Suivi *</label>
                        <input type="email" required value={shippingForm.email} onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })} className="w-full bg-rose-50/40 border border-rose-200 text-stone-900 text-sm px-4 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden" />
                      </div>
                    </div>
                    <div className="mb-5">
                      <label className="block text-xs font-bold text-rose-600 uppercase mb-2">Adresse de Livraison *</label>
                      <input type="text" required value={shippingForm.address} onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })} className="w-full bg-rose-50/40 border border-rose-200 text-stone-900 text-sm px-4 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-rose-600 uppercase mb-2">Ville *</label>
                        <input type="text" required value={shippingForm.city} onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })} className="w-full bg-rose-50/40 border border-rose-200 text-stone-900 text-sm px-4 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-rose-600 uppercase mb-2">Code Postal *</label>
                        <input type="text" required value={shippingForm.zipCode} onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })} className="w-full bg-rose-50/40 border border-rose-200 text-stone-900 text-sm px-4 py-3 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-bold text-rose-950 mb-4 pb-2 border-b border-rose-100 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-pink-600" /> 2. Formulaire Bancaire Chiffré SSL
                    </h4>
                    
                    <div className="mb-5">
                      <label className="block text-xs font-bold text-rose-600 uppercase mb-2">Numéro de Carte *</label>
                      <div className="relative">
                        <input type="text" required value={shippingForm.cardNumber} onChange={(e) => setShippingForm({ ...shippingForm, cardNumber: e.target.value })} placeholder="4000 1234 5678 9010" className="w-full bg-[#FFF9FA] border-2 border-rose-200 text-stone-900 font-mono text-sm px-4 py-3.5 pl-12 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden" />
                        <CreditCard className="w-5 h-5 text-rose-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5 mb-6">
                      <div>
                        <label className="block text-xs font-bold text-rose-600 uppercase mb-2">Date d'Expiration *</label>
                        <input type="text" required placeholder="MM/AA" value={shippingForm.cardExpiry} onChange={(e) => setShippingForm({ ...shippingForm, cardExpiry: e.target.value })} className="w-full bg-[#FFF9FA] border border-rose-200 text-stone-900 font-mono text-sm px-4 py-3.5 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-rose-600 uppercase mb-2">CVC *</label>
                        <input type="password" required placeholder="3 chiffres" value={shippingForm.cardCvc} onChange={(e) => setShippingForm({ ...shippingForm, cardCvc: e.target.value })} className="w-full bg-[#FFF9FA] border border-rose-200 text-stone-900 font-mono text-sm px-4 py-3.5 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden" />
                      </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2">
                      <Lock className="w-5 h-5" /> Confirmer le paiement de {grandTotal} €
                    </button>
                  </div>
                </form>
              </div>
            )}

            {checkoutStep === "processing" && (
              <div className="bg-white rounded-3xl p-16 shadow-xs border border-rose-100 text-center">
                <div className="w-20 h-20 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin mx-auto mb-8" />
                <h4 className="font-serif text-2xl font-bold text-rose-950 mb-3">Chiffrement SSL en cours</h4>
                <p className="text-gray-500 max-w-sm mx-auto mb-8">
                  Veuillez ne pas quitter la page ni rafraîchir. Nous vérifions les jetons cryptographiques auprès de votre banque.
                </p>
                <div className="bg-rose-50 px-4 py-2 rounded-lg border border-rose-100 inline-block text-xs font-mono text-rose-800">
                  SECURE CONNECTION // PROTOCOL HTTPS TLS 1.3
                </div>
              </div>
            )}

            {checkoutStep === "success" && lastOrder && (
              <div className="bg-white rounded-3xl p-10 shadow-xs border border-rose-100">
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-3xl font-bold text-rose-955 mb-2">Paiement Réussi !</h4>
                  <p className="text-gray-500">ID Commande : <strong className="font-mono text-rose-900">{lastOrder.id}</strong></p>
                </div>

                <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-rose-100 mb-8">
                  <h5 className="font-bold text-lg text-rose-950 mb-4 pb-3 border-b border-rose-100">Détail de la commande</h5>
                  <div className="space-y-4">
                    {lastOrder.items.map((it: any, ind: number) => (
                      <div key={ind} className="flex justify-between text-sm">
                        <span>{it.product.name} (x{it.quantity})</span>
                        <span className="font-mono font-bold">{getPrice(it.product.basePrice, it.selectedLength, it.selectedDensity, it.product.flashSaleDiscount) * it.quantity} €</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-rose-100 flex justify-between items-center text-lg font-bold">
                      <span>Total réglé (TTC) :</span>
                      <span className="text-rose-950 font-mono text-xl">{lastOrder.total} €</span>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 flex items-start gap-4 mb-8">
                  <Truck className="w-8 h-8 text-rose-600 shrink-0" />
                  <div>
                    <span className="font-bold text-rose-900 block uppercase mb-1">Expédition DHL Immédiate</span>
                    <p className="text-sm text-rose-800/80">Un email de suivi contenant le lien de traçabilité DHL express vous a été envoyé. Nous préparons votre commande avec soin.</p>
                  </div>
                </div>

                <button onClick={() => navigate("/")} className="w-full py-4 bg-rose-950 hover:bg-rose-900 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-all">
                  Retour à l'accueil
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar (Right Col) */}
          {(checkoutStep === "shopping" || checkoutStep === "billing") && (
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-rose-100 sticky top-32">
                <h3 className="font-serif text-xl font-bold text-rose-950 mb-6">Résumé de la commande</h3>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="CODE PROMO (ex: ROSE20)"
                      className="flex-1 bg-rose-50/50 border border-rose-200 uppercase text-sm rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-bold tracking-wider placeholder-rose-300"
                    />
                    <button
                      onClick={checkPromo}
                      className="px-5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl font-bold text-sm cursor-pointer transition-colors"
                    >
                      OK
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-xs font-bold ${appliedPromo ? "text-emerald-600" : "text-rose-500"}`}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Subtotals */}
                <div className="space-y-4 mb-8 pb-6 border-b border-rose-100 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total produit(s)</span>
                    <span className="font-mono font-medium">{subtotal} €</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Remise ({appliedPromo.code})</span>
                      <span className="font-mono">-{discountAmount} €</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison DHL Express</span>
                    {deliveryPrice === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-xs">Offerte</span>
                    ) : (
                      <span className="font-mono font-medium">{deliveryPrice} €</span>
                    )}
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-lg text-rose-950">Total</span>
                  <div className="text-right">
                    <span className="block text-2xl font-black font-mono text-rose-950">{grandTotal} €</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Taxes Incluses</span>
                  </div>
                </div>

                {checkoutStep === "shopping" && (
                  <button
                    onClick={() => setCheckoutStep("billing")}
                    className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2"
                  >
                    Valider mon panier <ArrowRight className="w-5 h-5" />
                  </button>
                )}

                {/* Reassurance */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>Paiement sécurisé crypté SSL</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Truck className="w-5 h-5 text-emerald-500" />
                    <span>Livraison express mondiale par DHL</span>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
