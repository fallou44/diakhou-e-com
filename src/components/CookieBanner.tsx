import React, { useState, useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("diakhou_cookie_consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("diakhou_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("diakhou_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-rose-100 p-5 sm:p-6 rounded-2xl shadow-[0_-10px_40px_rgba(233,30,99,0.15)] flex flex-col md:flex-row gap-4 md:items-center justify-between pointer-events-auto animate-fadeIn relative">
        <button 
          onClick={handleDecline} 
          className="absolute top-3 right-3 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex-1 pr-6 md:pr-0">
          <h3 className="font-bold text-rose-950 text-sm flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Vos préférences de navigation
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed max-w-2xl">
            Diakhou Hair & Beauty utilise des cookies pour assurer le bon fonctionnement du site, personnaliser votre expérience d'achat et analyser notre trafic. En cliquant sur "Accepter", vous consentez à l'utilisation de tous les cookies conformément à notre politique de confidentialité (RGPD).
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-bold text-stone-500 hover:text-rose-950 transition-colors"
          >
            Continuer sans accepter
          </button>
          <button 
            onClick={handleAccept}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-transform hover:scale-105 shadow-md shadow-rose-200"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
