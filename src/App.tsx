import React, { useState, useMemo, useEffect } from "react";
import { 
  Heart, 
  ShoppingBag, 
  ScanFace, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Flame, 
  Info, 
  CheckCircle, 
  CreditCard, 
  Lock, 
  RefreshCcw, 
  Truck, 
  Scissors, 
  Check, 
  Filter, 
  HelpCircle,
  MessageSquare,
  Gift
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FlashSales from "./components/FlashSales";
import BestSellers from "./components/BestSellers";
import NewArrivals from "./components/NewArrivals";
import CategoryBanner from "./components/CategoryBanner";
import { products, getPrice } from "./data/products";
import { Product, CartItem, Order } from "./types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

export default function App() {
  // State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  
  // Advanced filters
  const [selectedTexture, setSelectedTexture] = useState<string>("Tous");
  const [maxPrice, setMaxPrice] = useState<number>(300);

  // Modals & Panels
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  
  // Config state inside detail modal
  const [localLength, setLocalLength] = useState<number>(18);
  const [localDensity, setLocalDensity] = useState<string>("180%");
  const [localColor, setLocalColor] = useState<string>("Noir Naturel");

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState<"shopping" | "billing" | "processing" | "success">("shopping");
  const [promoCode, setPromoCode] = useState("ROSE20");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>({
    code: "ROSE20",
    discount: 0.20 // 20% OFF
  });
  const [promoMessage, setPromoMessage] = useState("Code promotionnel ROSE20 de 20% appliqué avec succès !");

  // Shipping & Billing info
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    cardNumber: "4000 1234 5678 9010",
    cardExpiry: "12/28",
    cardCvc: "382"
  });

  // Generated fake order data
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // AI Virtual Stylist Consultation Form
  const [aiForm, setAiForm] = useState({
    facialShape: "Ovale",
    skinTone: "Teint Marron Doré / Chaud",
    lengthPreference: "Long (22-26 pouces)",
    texturePreference: "Body Wave",
    lifestyle: "Actif / Professionnel soutenu",
    occasion: "Quotidien chic et Soirées",
    extraInfo: ""
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<any | null>(null);

  // Quick helper to pre-fill active length/density when selecting modal
  useEffect(() => {
    if (selectedProduct) {
      setLocalLength(selectedProduct.lengths[0]);
      setLocalDensity(selectedProduct.densities[0]);
      setLocalColor(selectedProduct.colors[0]);
    }
  }, [selectedProduct]);

  // --- STATE FOR INTERACTIVE GAMIFIED EXPERIENCE ---
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [ticketReward, setTicketReward] = useState<string | null>(null);

  // --- COMPACT INTERACTIVE QUIZ STATE ---
  const [quizActiveStep, setQuizActiveStep] = useState<number>(0); // 0 = not started, 1, 2, 3 = steps, 4 = result
  const [quizSelections, setQuizSelections] = useState<{ experience?: string; texture?: string; duration?: string }>({});

  // --- FLOATING FEED FOR SOCIAL PROOF ---
  const [socialFeedIndex, setSocialFeedIndex] = useState(0);
  const [isSocialFeedVisible, setIsSocialFeedVisible] = useState(true);

  const socialFeedActivities = useMemo(() => [
    { name: "Sarah P. de Lyon", action: "commandé la perruque Body Wave Signature 24\"", time: "il y a 2 min" },
    { name: "Mélissa G. de Paris", action: "découvert l'offre mystère de -25% !", time: "il y a 5 min" },
    { name: "Inès B. de Genève", action: "commandé la Bob Épurée Miel Balayage", time: "il y a 14 sec" },
    { name: "Chloé D. de Bruxelles", action: "complété son diagnostic visagiste IA", time: "il y a 1 min" },
    { name: "Kadiatou S. de Marseille", action: "commandé le Tissage 3 Rangs Deep Wave 20\"", time: "il y a 10 min" },
    { name: "Nora D. de Toulouse", action: "commandé la Wear & Go Kinky Curly Divine", time: "il y a 4 min" }
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSocialFeedIndex(prev => (prev + 1) % socialFeedActivities.length);
    }, 11000);
    return () => clearInterval(timer);
  }, [socialFeedActivities]);

  // Handle wishlist toggle
  const toggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
    } else {
      setWishlist(prev => [...prev, productId]);
    }
  };

  // Add Item to Cart
  const handleAddToCart = (product: Product, length: number, density: string, color: string) => {
    const existingIndex = cart.findIndex(
      item => 
        item.product.id === product.id && 
        item.selectedLength === length && 
        item.selectedDensity === density && 
        item.selectedColor === color
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart(prev => [...prev, {
        product,
        selectedLength: length,
        selectedDensity: density,
        selectedColor: color,
        quantity: 1
      }]);
    }

    // Give visual animation feedback (Open Cart mini-drawer momentarily)
    setIsCartOpen(true);
    // Auto-scroll inside drawer if needed
  };

  // Quick Cart Add with product defaults
  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(product, product.lengths[0], product.densities[0], product.colors[0]);
  };

  // Delete Cart Item or Change Quantity
  const updateCartQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter((_, i) => i !== index));
    } else {
      const updated = [...cart];
      updated[index].quantity = newQty;
      setCart(updated);
    }
  };

  // Apply promo manually
  const checkPromo = (codeToVerify?: string) => {
    const code = (codeToVerify || promoCode).trim().toUpperCase();
    if (code === "ROSE20") {
      setAppliedPromo({ code: "ROSE20", discount: 0.20 });
      setPromoMessage("Code ROSE20 appliqué (-20% sur la boutique) !");
    } else if (code === "OFFRE99") {
      setAppliedPromo({ code: "OFFRE99", discount: 0.10 });
      setPromoMessage("Code OFFRE99 appliqué (-10% sur la boutique) !");
    } else if (code === "DIAKHOU25") {
      setAppliedPromo({ code: "DIAKHOU25", discount: 0.25 });
      setPromoMessage("Félicitations ! Code Secret DIAKHOU25 appliqué (-25% sur TOUT le catalogue !) !");
    } else if (code === "DHLFREE") {
      setAppliedPromo({ code: "DHLFREE", discount: 0.00 });
      setPromoMessage("Expédition Express DHL de niveau Or 100% offerte sans minimum d'achat !");
    } else if (code === "KADOVIP") {
      setAppliedPromo({ code: "KADOVIP", discount: 0.15 });
      setPromoMessage("OFFRE VIP : -15% appliqués + Kit de coiffage et rubans de soie Diakhou offerts !");
    } else {
      setAppliedPromo(null);
      setPromoMessage("Ce code promotionnel n'est pas ou plus valide.");
    }
  };

  // Cart financial summary
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const unitPrice = getPrice(item.product.basePrice, item.selectedLength, item.selectedDensity, item.product.flashSaleDiscount);
      return total + (unitPrice * item.quantity);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return appliedPromo ? subtotal * appliedPromo.discount : 0;
  }, [subtotal, appliedPromo]);

  const deliveryPrice = useMemo(() => {
    if (appliedPromo?.code === "DHLFREE") return 0;
    return subtotal > 99 ? 0 : 9.90;
  }, [subtotal, appliedPromo]);
  
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryPrice);

  // Filter products based on Category, Texture, Search query, and Price limit
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (activeCategory !== "Tous" && p.category !== activeCategory) {
        return false;
      }
      // Texture filter
      if (selectedTexture !== "Tous" && p.texture !== selectedTexture) {
        return false;
      }
      // Search query filter (name, badge, descriptions or category)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesTexture = p.texture.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTexture) {
          return false;
        }
      }
      // Price filter based on basePrice
      const actualStartPrice = p.basePrice;
      if (actualStartPrice > maxPrice) {
        return false;
      }
      return true;
    });
  }, [activeCategory, selectedTexture, searchQuery, maxPrice]);

  // Trigger AI Virtual Stylist
  const handleAIQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    setAiRecommendation(null);

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiForm)
      });
      const result = await response.json();
      if (result.success || result.isFallBack) {
        setAiRecommendation(result.data);
      } else {
        throw new Error("API call returned unsuccesful");
      }
    } catch (err) {
      console.error(err);
      // Generate immediate fallback values if fetch fails or network error occurs
      setAiRecommendation({
        recommendedProductType: `Wear & Go HD Lace Frontal - ${aiForm.texturePreference}`,
        justification: `La texture ${aiForm.texturePreference} s'harmonise idéalement avec des traits caractérisant le visage ${aiForm.facialShape}. Elle donne de la verticalité tout en reflétant de magnifiques nuances pour un teint ${aiForm.skinTone}.`,
        textureAdvice: `C'est l'option idéale pour un style de vie résolument "${aiForm.lifestyle}". Plus besoin de passer des heures de coiffage. Indétectable et souple.`,
        stylingTips: [
          "Hydratez les pointes avec une formule d'onguent d'avoine ou d'argan bio.",
          "Portez le bonnet de nuit en satin doux inclus pour préserver la brillance.",
          "Préférez un séchage libre à température tempérée pour préserver l'intégrité de la cuticule.",
        ],
        careRoutine: [
          "Nettoyer à l'eau tiède sans froisser le tissage.",
          "Faire un masque nourrissant réparateur toutes les deux semaines.",
        ],
        fittingMethod: "Modèle enfilable 100% sécurisé et ajustable, sans colle, conçu spécialement par Diakhou Hair & Beauty pour une tenue sportive, quotidienne ou de gala."
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  // Checkout submit handler (Simulated secure step-by-step payment gateway)
  const submitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check fields
    if (!shippingForm.fullName || !shippingForm.email || !shippingForm.address || !shippingForm.city || !shippingForm.zipCode) {
      alert("Veuillez remplir l'ensemble des champs d'expédition.");
      return;
    }

    setCheckoutStep("processing");

    // Mock processing timeout (3D secure styling feel)
    setTimeout(() => {
      const newOrder: Order = {
        id: `DIAKHOU-ORD-${Math.floor(Math.random() * 900000) + 100000}`,
        date: new Date().toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        items: [...cart],
        total: grandTotal,
        address: { ...shippingForm },
        paymentMethod: "Carte Bancaire (Sécurisé 3D Secure)",
        status: "Confirmed"
      };
      setLastOrder(newOrder);
      setCart([]); // Reset Cart
      setCheckoutStep("success");
    }, 2500);
  };

  // Close modals
  const resetAppFilters = () => {
    setSearchQuery("");
    setSelectedTexture("Tous");
    setMaxPrice(300);
    setActiveCategory("Tous");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FFF5F7] text-rose-950 font-sans selection:bg-rose-200 selection:text-rose-900" id="diakhou-root">
      {/* Navbar Integration */}
      <Navbar 
        cart={cart}
        wishlist={wishlist}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Visual Banner Section */}
            <Hero 
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        onExploreProducts={() => {
          const el = document.getElementById("catalog-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="main-content">
        
        {/* --- SECTION: LES AVANTAGES EXCLUSIFS ET JEUX INTERACTIFS SENSATIONNELS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* CAROUSEL / GAMIFIED SURPRISE: GOLDEN TICKETS */}
          <div className="bg-gradient-to-br from-[#4A152C] via-[#330C1C] to-stone-900 rounded-[32px] p-6 text-white border border-pink-400/20 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-pink-500/25 border border-pink-400/30 rounded-full text-[9px] font-bold text-pink-200 tracking-wider uppercase w-max mb-3">
                <Gift className="w-3 h-3 text-pink-300 animate-spin" />
                <span>EXPÉRIENCE SENSATIONNELLE EN DIRECT</span>
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-pink-100">
                L'Envolée des Cadeaux <span className="italic font-serif text-pink-300">Diakhou</span>
              </h3>
              <p className="text-xs text-pink-200/80 mt-1 max-w-sm leading-relaxed">
                Choisissez l'une de nos trois enveloppes de soie virtuelles ci-dessous pour révéler et appliquer immédiatement votre coupon d'inauguration royal.
              </p>
            </div>

            {selectedTicket === null ? (
              <div className="grid grid-cols-3 gap-3.5 my-6">
                {[
                  { num: 1, title: "Env. Rose" },
                  { num: 2, title: "Env. Or" },
                  { num: 3, title: "Env. Poudrée" }
                ].map((ticket, index) => (
                  <button
                    key={ticket.num}
                    onClick={() => {
                      setSelectedTicket(ticket.num);
                      const rewards = ["DIAKHOU25", "DHLFREE", "KADOVIP"];
                      const selectedRewardCode = rewards[index];
                      setTicketReward(selectedRewardCode);
                      checkPromo(selectedRewardCode);
                    }}
                    className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-pink-300/20 to-pink-500/10 hover:from-pink-400/40 hover:to-pink-600/30 border-2 border-dashed border-pink-300/40 hover:border-pink-300 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.05] transition-all duration-300 p-2 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-100/10 flex items-center justify-center text-pink-300 text-lg group-hover:rotate-12 transition-transform">
                      ✉️
                    </div>
                    <div>
                      <span className="block text-[11px] font-black uppercase text-pink-300 tracking-wider">Choix {ticket.num}</span>
                      <span className="text-[9px] text-pink-150 leading-none">{ticket.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="my-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-pink-300/20 text-center">
                <div className="text-3xl mb-1">🎁</div>
                <h4 className="text-sm font-bold text-pink-200 uppercase tracking-widest">
                  Enveloppe n°{selectedTicket} Ouverte avec succès !
                </h4>
                <p className="text-xs text-pink-105 mt-2">
                  Votre code secret <strong className="font-mono text-white bg-pink-600 px-2 py-0.5 rounded font-black">{ticketReward}</strong> a été injecté et appliqué à votre panier.
                </p>
                <div className="text-[10.5px] text-pink-100 italic mt-3 bg-pink-950/40 p-2 rounded border border-pink-900/40 text-center">
                  {ticketReward === "DIAKHOU25" && "Bénéficiez instantanément de -25% de réduction absolue sur votre commande."}
                  {ticketReward === "DHLFREE" && "Livraison express DHL de 3 jours offerte en mains propres, sans aucun minimum d'achat !"}
                  {ticketReward === "KADOVIP" && "-15% sur la commande globale + notre kit ultime de bandeaux et brosses de pose."}
                </div>
                <button
                  onClick={() => { setSelectedTicket(null); setTicketReward(null); setAppliedPromo(null); setPromoMessage(""); }}
                  className="mt-4 text-[10px] uppercase font-bold text-pink-300 hover:text-white underline transition-colors cursor-pointer"
                >
                  Tenter un autre choix d'enveloppe
                </button>
              </div>
            )}

            <div className="text-[10px] text-pink-300/60 border-t border-pink-400/10 pt-3">
              * Offres réservées aux nouvelles visiteuses d'aujourd'hui. Uniquement en direct.
            </div>
          </div>

          {/* INTERACTIVE STYLE HARMONY QUIZ */}
          <div className="bg-white rounded-[32px] p-6 border border-pink-100 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-50 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFF0F2] text-rose-800 rounded-full text-[9px] font-bold uppercase tracking-wider w-max mb-3">
                <HelpCircle className="w-3 h-3 text-[#E91E63]" />
                <span>QUIZ D'HARMONIE DIAKHOU</span>
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-rose-950">
                La Clé de Votre <span className="italic font-serif text-[#E91E63]">Signature</span> Visuel
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-sm leading-relaxed">
                Trouvez la perruque ou la texture de cheveux d'exception qui complètera parfaitement vos habitudes en seulement trois clics.
              </p>
            </div>

            {/* Step-by-Step interactive elements */}
            {quizActiveStep === 0 && (
              <div className="my-6 text-center space-y-4">
                <p className="text-xs text-stone-500">
                  Faites face au miroir et laissez notre algorithme d'esthétique naturelle déterminer le meilleur match de coiffage.
                </p>
                <button
                  onClick={() => {
                    setQuizActiveStep(1);
                    setQuizSelections({});
                  }}
                  className="px-6 py-3 bg-[#E91E63] hover:bg-[#D81B60] text-white font-extrabold uppercase text-[11px] tracking-widest rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-pink-200 cursor-pointer w-full"
                >
                  Commencer le Test d'Harmonie ( Gratuit )
                </button>
              </div>
            )}

            {quizActiveStep === 1 && (
              <div className="my-5 space-y-3">
                <span className="text-[10px] text-stone-400 uppercase font-black">Question 1 / 3 : Expérience de pose</span>
                <p className="text-xs font-bold text-rose-955 mb-1">Quelle méthode de fixation correspond le mieux à vos matinées ?</p>
                {[
                  { id: "Wear & Go", label: "Wear & Go : Sans colle, à enfiler en 3s chrono", text: "Idéal pour débutantes et vie active rythmée" },
                  { id: "HD Lace Frontal", label: "Frontal HD : Avec découpe fine d'oreille à oreille", text: "Idéal pour queue de cheval et chignons ultra-naturels" },
                  { id: "Bob Perruques", label: "Bob Court : Carré structuré moderne et fluide", text: "Léger, impeccable et d'un chic absolu" }
                ].map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => {
                      setQuizSelections({ ...quizSelections, experience: choice.id });
                      setQuizActiveStep(2);
                    }}
                    className="w-full text-left p-2.5 rounded-xl border border-rose-100 hover:border-[#E81E63] hover:bg-rose-50/20 text-xs font-semibold text-[#4A152C] transition-all cursor-pointer block"
                  >
                    <span className="block font-bold">{choice.label}</span>
                    <span className="block text-[10px] text-stone-500 font-normal">{choice.text}</span>
                  </button>
                ))}
              </div>
            )}

            {quizActiveStep === 2 && (
              <div className="my-5 space-y-3">
                <span className="text-[10px] text-stone-400 uppercase font-black">Question 2 / 3 : Texture de rêve</span>
                <p className="text-xs font-bold text-rose-955 mb-1">Quelle texture réveille le plus votre style ?</p>
                {[
                  { id: "Straight", label: "Straight : Lisse miroir, soyeuse et impériale", text: "Rendu luxueux de défilé" },
                  { id: "Body Wave", label: "Body Wave : Mouvement fluide & ondulations", text: "Volupté et glamour éternel" },
                  { id: "Kinky Curly", label: "Kinky & Curly : Boucles crépon ou serrées", text: "Volume sensationnel et naturel vibrant" }
                ].map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => {
                      setQuizSelections({ ...quizSelections, texture: choice.id });
                      setQuizActiveStep(3);
                    }}
                    className="w-full text-left p-2.5 rounded-xl border border-rose-100 hover:border-[#E81E63] hover:bg-rose-50/20 text-xs font-semibold text-[#4A152C] transition-all cursor-pointer block"
                  >
                    <span className="block font-bold">{choice.label}</span>
                    <span className="block text-[10px] text-stone-500 font-normal">{choice.text}</span>
                  </button>
                ))}
              </div>
            )}

            {quizActiveStep === 3 && (
              <div className="my-5 space-y-3">
                <span className="text-[10px] text-stone-400 uppercase font-black">Question 3 / 3 : Idéal de Longueur</span>
                <p className="text-xs font-bold text-rose-955 mb-1">Quelle longueur convient à votre silhouette ?</p>
                {[
                  { id: "Short", label: "Bob Court & dynamique (10 à 16 pouces)", text: "Épurée et frais" },
                  { id: "Medium", label: "Longueur standard sensuelle (18 à 22 pouces)", text: "Excellent compromis chic" },
                  { id: "Long", label: "Grande Longueur Royale (24 à 30 pouces)", text: "Volume glamour spectaculaire" }
                ].map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => {
                      setQuizSelections({ ...quizSelections, duration: choice.id });
                      setQuizActiveStep(4);
                    }}
                    className="w-full text-left p-2.5 rounded-xl border border-rose-100 hover:border-[#E81E63] hover:bg-rose-50/20 text-xs font-semibold text-[#4A152C] transition-all cursor-pointer block"
                  >
                    <span className="block font-bold">{choice.label}</span>
                    <span className="block text-[10px] text-stone-500 font-normal">{choice.text}</span>
                  </button>
                ))}
              </div>
            )}

            {quizActiveStep === 4 && (
              <div className="my-4 p-4.5 bg-rose-50/50 rounded-2xl border border-rose-100 text-center space-y-3">
                <div className="text-xl animate-bounce">🌟</div>
                <h4 className="text-xs font-black text-rose-950 uppercase tracking-wider">Votre Diagnostic d'Harmonie Capillaire</h4>
                <div className="text-xs text-stone-700 leading-relaxed">
                  Notre outil de coiffage vous conseille la gamme <strong className="font-extrabold text-rose-800 underline">{quizSelections.experience || "Wear & Go"}</strong> avec la texture <strong className="font-extrabold text-rose-800">{quizSelections.texture || "Body Wave"}</strong>.
                </div>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Cette liaison sublime parfaitement vos traits et simplifie divinement votre routine de soins quotidiens.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveCategory(quizSelections.experience || "Tous");
                      setSelectedTexture(quizSelections.texture || "Tous");
                      setQuizActiveStep(0);
                      const el = document.getElementById("catalog-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-[#E91E63] hover:bg-[#D81B60] text-white font-extrabold text-[10px] px-3.5 py-2.5 rounded-full flex-1 uppercase tracking-wider cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    Filtrer ces Modèles
                  </button>
                  <button
                    onClick={() => setQuizActiveStep(0)}
                    className="bg-white border border-rose-200 text-rose-950 font-bold text-[10.5px] px-3.5 py-2.5 rounded-full uppercase tracking-wider cursor-pointer hover:bg-rose-50 transition-all"
                  >
                    Recommencer
                  </button>
                </div>
              </div>
            )}

            <div className="text-[10px] text-stone-400 border-t border-rose-100/60 pt-3 flex justify-between">
              <span>Conseils de stylistes certifiées</span>
              <span>✓ Test d'harmonisation 100% anonyme</span>
            </div>
          </div>

        </div>

        {/* --- DYNAMIC MARKETING SECTIONS (VENTES FLASH, BEST SELLERS, NOUVEAUTÉS) --- */}
        <FlashSales 
          products={products}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onProductClick={setSelectedProduct}
          onQuickAdd={handleQuickAdd}
        />

        <BestSellers
          products={products}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onProductClick={setSelectedProduct}
          onQuickAdd={handleQuickAdd}
        />

        <NewArrivals
          products={products}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onProductClick={setSelectedProduct}
          onQuickAdd={handleQuickAdd}
        />

        {/* Dynamic Category Intro Banner */}
        <CategoryBanner activeCategory={activeCategory} count={filteredProducts.length} />

        {/* Secondary Header / Sticky Filters Section */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-[32px] border border-rose-100 card-shadow mb-10" id="catalog-section">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            <div>
              <h2 className="font-serif text-3xl font-extrabold text-rose-950 italic flex items-center gap-2">
                Le Catalogue d'Exception <span className="text-sm font-sans not-italic font-bold bg-rose-150 text-rose-700 px-3 py-1 rounded-full">{filteredProducts.length} produits</span>
              </h2>
              <p className="text-xs text-rose-600 mt-1 max-w-xl">
                Ajustez et sublimez votre style avec des filtres précis : texture de cheveux, prix maximum, et catégories de poses d'extensions premium.
              </p>
            </div>

            {/* Quick Advanced Filters widgets */}
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto" id="filters-container">
              {/* Texture Selection Dropdown */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Texture
                </span>
                <select
                  value={selectedTexture}
                  onChange={(e) => setSelectedTexture(e.target.value)}
                  className="bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-full px-4 py-2 text-xs font-semibold text-rose-900 focus:outline-hidden focus:ring-1 focus:ring-rose-400 cursor-pointer"
                  id="filter-texture"
                >
                  <option value="Tous">Toutes les Textures</option>
                  <option value="Straight">Straight (Lisse)</option>
                  <option value="Body Wave">Body Wave (Ondulé)</option>
                  <option value="Deep Wave">Deep Wave (Ondulations Profondes)</option>
                  <option value="Kinky Curly">Kinky Curly (Boucles Crépues)</option>
                </select>
              </div>

              {/* Price Range max Filter slider */}
              <div className="flex flex-col min-w-[160px] flex-1 sm:flex-initial">
                <div className="flex justify-between items-center text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">
                  <span>Prix max</span>
                  <span className="text-rose-800 font-mono font-bold text-[11px]">{maxPrice} €</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="80"
                    max="300"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer h-1 bg-rose-100 rounded-lg appearance-none"
                    id="filter-price-slider"
                  />
                </div>
              </div>

              {/* Reset Filters */}
              {(selectedTexture !== "Tous" || maxPrice !== 300 || searchQuery !== "" || activeCategory !== "Tous") && (
                <button
                  onClick={resetAppFilters}
                  className="mt-4 sm:mt-0 text-xs font-bold text-rose-600 hover:text-rose-800 underline flex items-center gap-1 self-end cursor-pointer py-2"
                  id="btn-reset-filters"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Réinitialiser
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Dynamic Warning Alert if filters don't yield any results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[32px] border border-rose-100 p-8 card-shadow" id="empty-state-container">
            <Info className="w-12 h-12 text-rose-400 mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-rose-950">Aucun produit ne correspond</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2">
              Nous n'avons pas trouvé de perruques correspondant à votre association de filtres. Essayez d'élargir votre recherche.
            </p>
            <button
              onClick={resetAppFilters}
              className="mt-6 px-6 py-2.5 bg-rose-600 text-white font-bold rounded-full text-xs hover:bg-rose-500 transition-all shadow-md cursor-pointer"
              id="empty-state-reset-btn"
            >
              Afficher Tous les Produits
            </button>
          </div>
        ) : (
          /* High-Density Optimized Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" id="products-grid">
            {filteredProducts.map((p) => {
              const isWishlisted = wishlist.includes(p.id);
              return (
                <div 
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="group bg-white p-3 rounded-[32px] card-shadow flex flex-col border border-rose-50 hover:border-pink-200 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer relative"
                  id={`product-card-${p.id}`}
                >
                  {/* Badge & Favorite Button */}
                  <div className="absolute top-5 left-5 z-20 flex flex-col gap-1.5">
                    {p.badge && (
                      <span className={`text-[10px] uppercase font-bold tracking-widest text-white px-3 py-1 rounded-sm line-clamp-1 select-none shadow-xs text-center ${p.badgeColor || 'bg-rose-500'}`}>
                        {p.badge}
                      </span>
                    )}
                    {p.basePrice < 150 && (
                      <span className="text-[9px] uppercase font-bold text-rose-700 bg-rose-100/90 border border-rose-200 px-2 py-0.5 rounded-sm shrink-0 w-max">
                        Excellent Prix
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => toggleWishlist(p.id, e)}
                    className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/95 text-rose-950 hover:text-rose-600 shadow-md hover:scale-110 transition-all cursor-pointer"
                    title="Ajouter aux favoris"
                    id={`wishlist-btn-${p.id}`}
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>

                  {/* Modern Optimized Image Frame */}
                  <div className="relative rounded-[24px] overflow-hidden bg-rose-50/40 aspect-square flex items-center justify-center group-hover:shadow-inner transition-all duration-300">
                    <img
                      src={p.image}
                      alt={p.name}
                      placeholder="/public/icon.png"
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500 select-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="bg-rose-955 text-white/95 text-xs font-semibold px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-stone-900/80 hover:bg-stone-900 flex items-center gap-1.5">
                        <Scissors className="w-3 h-3 text-rose-400" /> Choisir mes Mesures
                      </span>
                    </div>
                  </div>

                  {/* Informational Details */}
                  <div className="px-3 py-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Subtitle brand header */}
                      <div className="flex justify-between items-center text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-1.5">
                        <span>{p.category}</span>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-rose-900 text-[11px] font-mono">{p.rating}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-rose-950 text-sm tracking-tight leading-snug group-hover:text-rose-700 transition-colors line-clamp-2">
                        {p.name}
                      </h3>

                      {/* Textures Labeling */}
                      <p className="text-xs text-rose-500 font-semibold font-serif italic mt-1 bg-rose-50/50 py-0.5 px-2 rounded-sm w-max">
                        {p.texture} Seamless Hair
                      </p>
                    </div>

                    {/* Price and Cart Call to action */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-rose-50">
                      <div>
                        <div className="text-[10px] text-gray-400 leading-none">Dès</div>
                        <span className="font-black text-rose-955 text-lg font-mono">
                          {p.basePrice} €
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => handleQuickAdd(p, e)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-800 p-2.5 rounded-full transition-all cursor-pointer flex items-center justify-center"
                        title="Ajouter rapidement en 18 pouces"
                        id={`quick-add-${p.id}`}
                      >
                        <Plus className="w-4 h-4 stroke-[3px]" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Trust Badges - Brand reassurance cards */}
      <section className="bg-white border-y border-rose-100/80 py-12 px-4 shadow-xs mt-12" id="trust-badges-bar">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-rose-100/70 text-rose-700 rounded-full flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-sm font-semibold tracking-wide text-rose-950">LIVRAISON GRATUITE EXPRESS</h4>
            <p className="text-xs text-gray-600">Reçu sous 3-5 jours ouvrés via DHL Premium de manière ultra-sécurisée.</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-rose-100/70 text-rose-700 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-sm font-semibold tracking-wide text-rose-950">PAIEMENT 100% SÉCURISÉ</h4>
            <p className="text-xs text-gray-600">Protocoles de cryptage SSL 256 bits et authentification 3D Secure v2.</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-rose-100/70 text-rose-700 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-sm font-semibold tracking-wide text-rose-950">SATISFACTION GARANTIE</h4>
            <p className="text-xs text-gray-600">Retours gratuits sous 15 jours si la perruque n'a été ni découpée ni modifiée.</p>
          </div>
          <div className="space-y-2 cursor-pointer group" onClick={() => setIsAIStylistOpen(true)}>
            <div className="w-12 h-12 bg-rose-100/70 text-rose-700 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <ScanFace className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-sm font-semibold tracking-wide text-rose-950">CONSEIL SUR MESURE</h4>
            <p className="text-xs text-gray-600">Notre styliste IA dédiée et notre assistance humaine sont disposés 24h/24.</p>
          </div>
        </div>
      </section>
          </>
        } />
        <Route path="/panier" element={<Cart cart={cart} updateCartQty={updateCartQty} clearCart={() => setCart([])} />} />
        <Route path="/favoris" element={<Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} onSelectProduct={setSelectedProduct} />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<Legal />} />
      </Routes>

      <Footer onOpenAIStylist={() => setIsAIStylistOpen(true)} />


      {/* MODAL: PRODUCT DETAILS & ADVANCED OPTIONS CONFIGURATOR */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto" id="product-detail-modal">
          <div 
            className="bg-white rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto card-shadow border border-rose-100 flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left side: Images gallery representation */}
            <div className="md:w-1/2 p-6 bg-rose-50/20 flex flex-col justify-between border-r border-rose-100/60">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#FDF2F4] mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                
                {/* Custom Badge within detail modal */}
                {selectedProduct.badge && (
                  <span className={`absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest text-white px-3 py-1 rounded-sm ${selectedProduct.badgeColor || "bg-rose-500"}`}>
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              {/* Showcase the gallery thumbnails */}
              <div className="grid grid-cols-3 gap-2.5">
                {selectedProduct.images.map((imgSrc, ind) => (
                  <div key={ind} className="rounded-lg overflow-hidden border border-rose-100 bg-[#FDF2F4] aspect-square">
                    <img
                      src={imgSrc}
                      alt="Product views"
                      className="w-full h-full object-cover select-none cursor-not-allowed hover:opacity-90 object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4.5 bg-rose-50 rounded-2xl border border-rose-100">
                <h5 className="text-[11px] font-bold uppercase text-rose-900 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-rose-600" /> GARANTIE CHEVEUX 10A REMY
                </h5>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Chaque perruque de Diakhou Hair & Beauty provient de cheveux vierges purs. Permet de décolorer jusqu'à la teinte Blond 613 sans agression.
                </p>
              </div>
            </div>

            {/* Right side: Customizable options panel */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between" id="product-detail-options">
              <div>
                {/* Header title close button */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">{selectedProduct.category}</span>
                    <h3 className="font-serif text-2xl font-bold text-rose-950 mt-1 leading-tight">{selectedProduct.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-1 text-gray-400 hover:text-stone-900 rounded-full hover:bg-stone-50"
                    id="close-detail-modal-btn"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-center gap-1 mt-2.5">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-xs font-bold text-rose-950 ml-1">({selectedProduct.reviewsCount} avis vérifiés)</span>
                  <span className="text-xs text-rose-400">|</span>
                  <span className="text-xs font-semibold text-rose-700">+{selectedProduct.salesVolume} vendus</span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-650 mt-4 leading-relaxed bg-[#FFF8FA]/80 p-3.5 rounded-xl border border-rose-100/50">
                  {selectedProduct.description}
                </p>

                {/* Advanced configuration inputs: LENGTH IN INCHES */}
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2 flex justify-between items-center">
                      <span>1. Longueur en Pouces (Inches)</span>
                      <span className="text-rose-600 font-mono font-bold text-[11px]">{localLength}" (~ {Math.round(localLength * 2.54)} cm)</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.lengths.map((len) => (
                        <button
                          key={len}
                          onClick={() => setLocalLength(len)}
                          className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            localLength === len
                              ? "bg-rose-950 text-white border-rose-950 shadow-xs"
                              : "bg-white text-stone-700 border-rose-100 hover:border-rose-300"
                          }`}
                          id={`length-selector-${len}`}
                        >
                          {len}"
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced configuration inputs: DENSITY (THREAD DENSITY PERCENTAGE) */}
                  <div>
                    <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2 flex justify-between items-center">
                      <span>2. Épaisseur / Densité du Capillat</span>
                      <span className="text-rose-600 font-bold font-sans text-[11px]">{localDensity}</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProduct.densities.map((den) => (
                        <button
                          key={den}
                          onClick={() => setLocalDensity(den)}
                          className={`py-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                            localDensity === den
                              ? "bg-rose-950 text-white border-rose-950 shadow-xs"
                              : "bg-white text-stone-700 border-rose-100 hover:border-rose-300"
                          }`}
                          id={`density-selector-${den}`}
                        >
                          {den} {den === "150%" ? "(Standard)" : den === "180%" ? "(Volumineux)" : "(Ultra-Mégavolume)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced configuration inputs: COLOR */}
                  <div>
                    <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2">
                      3. Nuance de Couleur
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((col) => (
                        <button
                          key={col}
                          onClick={() => setLocalColor(col)}
                          className={`px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            localColor === col
                              ? "bg-rose-100 text-rose-950 border-rose-400"
                              : "bg-white text-stone-700 border-rose-100 hover:border-rose-255"
                          }`}
                          id={`color-selector-${col.replace(/\s+/g, "-")}`}
                        >
                          <span className={`w-3 h-3 rounded-full ${
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

              {/* Dynamic Price Display & Cart CTA */}
              <div className="mt-8 pt-4 border-t border-rose-100 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-400 leading-none mr-2">Tarif calculé :</div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    {selectedProduct.isFlashSale && selectedProduct.flashSaleDiscount && (
                      <span className="text-stone-400 text-sm font-semibold line-through font-mono">
                        {getPrice(selectedProduct.basePrice, localLength, localDensity)} €
                      </span>
                    )}
                    <span className="font-serif text-3xl font-black text-rose-950">
                      {getPrice(selectedProduct.basePrice, localLength, localDensity, selectedProduct.flashSaleDiscount)} €
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                    ✓ TVA & Taxes de douanes incluses
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, localLength, localDensity, localColor);
                    setSelectedProduct(null); // Close
                  }}
                  className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-all scale-100 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5 flex-1 justify-center"
                  id="add-to-cart-modal-submit"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au Panier</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}


      {/* DRAWER: DESIGN-COMPATIBLE SHOPPING CART PANEL */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex justify-end" id="shopping-cart-drawer">
          <div 
            className="w-full max-w-lg bg-white h-full flex flex-col justify-between shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/40">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-700" />
                <h3 className="font-serif text-xl font-bold text-rose-950">Votre Panier d'Achat</h3>
                <span className="bg-rose-150 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-gray-400 hover:text-stone-900 rounded-full hover:bg-stone-50"
                id="close-cart-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Switcher based on Checkout step */}
            {checkoutStep === "shopping" ? (
              /* PANEL A: CART ITEMS LIST */
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-none">
                {cart.length === 0 ? (
                  <div className="text-center py-16" id="empty-cart-view">
                    <ShoppingBag className="w-16 h-16 text-rose-200 mx-auto mb-4 animate-bounce" />
                    <p className="font-serif text-lg font-bold text-rose-950">Votre panier est vide</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto mt-2">
                      Nos plus beaux modèles de perruques Wear & Go et extensions en soie n'attendent que vous !
                    </p>
                    <button
                      onClick={() => { setIsCartOpen(false); }}
                      className="mt-6 px-6 py-2.5 bg-rose-600 text-white font-bold rounded-full text-xs hover:bg-rose-505 transition-all shadow-md cursor-pointer"
                    >
                      Continuer mes Achats
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1.5 bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                      <Truck className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{subtotal > 99 ? "Félicitations ! Vous bénéficiez de l'expédition express offerte par DHL de Diakhou." : `Ajoutez ${Math.max(0, 100 - subtotal)}€ de plus pour obtenir la livraison express DHL offerte !`}</span>
                    </p>

                    <div className="space-y-4">
                      {cart.map((item, index) => {
                        const calculatedUnitPrice = getPrice(item.product.basePrice, item.selectedLength, item.selectedDensity, item.product.flashSaleDiscount);
                        
                        return (
                          <div 
                            key={`${item.product.id}-${item.selectedLength}-${item.selectedDensity}-${index}`} 
                            className="flex gap-4 p-3 bg-[#FFFBFB] rounded-2xl border border-rose-100 relative group"
                            id={`cart-item-${index}`}
                          >
                            <div className="w-20 h-24 rounded-xl overflow-hidden bg-rose-50 shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover object-top"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-bold text-rose-955 text-xs tracking-tight line-clamp-1 leading-snug">
                                  {item.product.name}
                                </h4>
                                
                                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-[10px] text-rose-600 font-semibold uppercase">
                                  <span>Taille: {item.selectedLength}"</span>
                                  <span>Densité: {item.selectedDensity}</span>
                                  <span>Teinte: {item.selectedColor}</span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center mt-3 pt-2 border-t border-rose-50">
                                {/* Quantity Toggler */}
                                <div className="flex items-center bg-white border border-rose-100 rounded-sm overflow-hidden text-xs">
                                  <button
                                    onClick={() => updateCartQty(index, item.quantity - 1)}
                                    className="p-1 px-2.5 hover:bg-rose-50 text-rose-800 font-bold transition-all cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="px-2 font-bold font-mono text-stone-900">{item.quantity}</span>
                                  <button
                                    onClick={() => updateCartQty(index, item.quantity + 1)}
                                    className="p-1 px-2.5 hover:bg-rose-50 text-rose-800 font-bold transition-all cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>

                                {/* Price computation */}
                                <div className="text-right">
                                  <span className="block font-black text-xs text-rose-955 font-mono">
                                    {calculatedUnitPrice * item.quantity} €
                                  </span>
                                  <span className="block text-[9px] text-gray-400 font-medium font-sans">
                                    {calculatedUnitPrice}€ / u.
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Delete specific item */}
                            <button
                              onClick={() => updateCartQty(index, 0)}
                              className="absolute top-2 right-2 text-stone-300 hover:text-red-500 rounded-full p-1 hover:bg-red-50 transition-colors"
                              title="Retirer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ) : checkoutStep === "billing" ? (
              /* PANEL B: SECURE PAYMENT GATEWAY AND BILLING ADDRESS FORM */
              <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
                <div className="mb-4 bg-emerald-50 text-emerald-800 p-3.5 rounded-2xl border border-emerald-100 flex gap-2 items-start text-xs">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block uppercase tracking-wide text-[10px]">Paiement 100% Crypté SSL</span>
                    <p className="text-[11px] text-emerald-700/85">
                      Vos informations bancaires sont chiffrées de bout-en-bout via l'authentification 3D Secure v2 obligatoire de notre partenaire de traitement Stripe.
                    </p>
                  </div>
                </div>

                {/* Secure Rose Gold Credit Card Visualizer */}
                <div className="relative w-full h-44 bg-gradient-to-tr from-[#4A152C] via-[#651F3C] to-stone-900 rounded-2xl p-5 text-white shadow-xl overflow-hidden mb-6 flex flex-col justify-between border border-pink-500/20 select-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Top line of virtual card */}
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <span className="block text-[8px] tracking-widest uppercase text-pink-300 font-bold">DIAKHOU VIP CARTIQUE</span>
                      <span className="text-[11px] font-serif italic text-white leading-none">Maison de Beauté</span>
                    </div>
                    {/* Chip */}
                    <div className="w-9 h-6.5 bg-gradient-to-br from-[#d4b383] to-[#bca075] rounded-md opacity-90 shadow-xs flex items-center justify-center relative">
                      <div className="w-7 h-4.5 border border-stone-950/20 rounded-xs" />
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="text-center relative z-10">
                    <span className="block font-mono text-md tracking-widest text-[#FFF5F7] font-bold">
                      {shippingForm.cardNumber || "•••• •••• •••• ••••"}
                    </span>
                  </div>

                  {/* Bottom details */}
                  <div className="flex justify-between items-end relative z-10">
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="block text-[7px] text-pink-300 font-bold uppercase tracking-wider">Titulaire</span>
                      <span className="block text-xs uppercase font-semibold text-white tracking-wide truncate">
                        {shippingForm.fullName || "CLIENT PRIVILÉGIÉ"}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-[7px] text-pink-300 font-bold uppercase tracking-wider">Expiration</span>
                      <span className="block text-xs font-mono font-bold text-white tracking-wide">
                        {shippingForm.cardExpiry || "MM/AA"}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={submitCheckout} className="space-y-4" id="shipping-form">
                  <h4 className="font-serif text-md font-bold text-rose-950 pb-1 border-b border-rose-50">
                    📂 1. Coordonnées d'Expédition DHL
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Nom Complet *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        placeholder="Nora Delon"
                        className="w-full bg-rose-50/40 border border-rose-100 text-stone-900 text-xs px-3 py-2 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Email de Suivi DHL *</label>
                      <input
                        type="email"
                        required
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        placeholder="nora@domain.com"
                        className="w-full bg-rose-50/40 border border-rose-100 text-stone-900 text-xs px-3 py-2 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Adresse de Livraison *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      placeholder="84 Rue de Rivoli"
                      className="w-full bg-rose-50/40 border border-rose-100 text-stone-900 text-xs px-3 py-2 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Ville *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        placeholder="Paris"
                        className="w-full bg-rose-50/40 border border-rose-100 text-stone-900 text-xs px-3 py-2 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Code Postal *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.zipCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                        placeholder="75004"
                        className="w-full bg-rose-50/40 border border-rose-100 text-stone-900 text-xs px-3 py-2 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Téléphone Secours Transporteur *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full bg-rose-50/40 border border-rose-100 text-stone-900 text-xs px-3 py-2 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <h4 className="font-serif text-md font-bold text-rose-950 pb-1 border-b border-rose-50 pt-2 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-pink-600" /> 2. Formulaire Bancaire Chiffré SSL
                  </h4>

                  <div>
                    <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Numéro de Carte Bancaire *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={shippingForm.cardNumber}
                        onChange={(e) => setShippingForm({ ...shippingForm, cardNumber: e.target.value })}
                        placeholder="4000 1234 5678 9010"
                        className="w-full bg-[#FFF9FA] border-2 border-rose-200 text-stone-900 font-mono text-xs px-3 py-2.5 pl-10 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                      />
                      <CreditCard className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Date d'Expiration *</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        value={shippingForm.cardExpiry}
                        onChange={(e) => setShippingForm({ ...shippingForm, cardExpiry: e.target.value })}
                        className="w-full bg-[#FFF9FA] border border-rose-200 text-stone-900 font-mono text-xs px-3 py-2.5 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Code de Sécurité CVC *</label>
                      <input
                        type="password"
                        required
                        placeholder="3 chiffres de sécurité"
                        value={shippingForm.cardCvc}
                        onChange={(e) => setShippingForm({ ...shippingForm, cardCvc: e.target.value })}
                        className="w-full bg-[#FFF9FA] border border-rose-200 text-stone-900 font-mono text-xs px-3 py-2.5 rounded-xl focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-400/90 leading-tight italic">
                    * En cliquant ci-dessous, vous acceptez que l'expédition DHL soit activée sous 24h. Le montant ne vous est prélevé que suite à confirmation opérationnelle de la chaine logistique de Diakhou Hair & Beauty.
                  </div>

                  {/* Submit Secure checkout button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-all scale-100 hover:scale-[1.01] active:scale-95 shadow-lg shadow-pink-600/10 cursor-pointer flex items-center justify-center gap-1.5"
                    id="submit-payment-btn"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Lancer le Paiement Sécurisé : {grandTotal} €</span>
                  </button>
                </form>
              </div>
            ) : checkoutStep === "processing" ? (
              /* PANEL C: SECURE INTERMEDIATE GATEWAY TIMEOUT (3D SECURE MODAL EXPERIENCE) */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center" id="processing-view">
                <div className="w-16 h-16 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin mb-6" />
                <h4 className="font-serif text-xl font-bold text-rose-950 mb-2">Chiffrement SSL Interbancaire</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Veuillez ne pas quitter la page ni rafraîchir. Nous vérifions les jetons cryptographiques de votre transaction auprès de votre banque sécurisée.
                </p>
                <div className="mt-8 bg-rose-50 p-3 rounded-2xl border border-rose-100 inline-block text-[10px] font-mono text-rose-800">
                  SECURE CONNECTION // PROTOCOL HTTPS TLS 1.3
                </div>
              </div>
            ) : (
              /* PANEL D: COMPREHENSIVE SUCCESS SCREEN WITH DETAILED RECEIPT */
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none" id="success-view">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-rose-955">Paiement Réussi !</h4>
                  <p className="text-xs text-stone-500">
                    ID Commande : <strong className="font-mono text-rose-900 font-bold">{lastOrder?.id}</strong>
                  </p>
                </div>

                <div className="bg-[#FAF9F6] p-4.5 rounded-2xl border border-rose-100 space-y-3.5 text-xs">
                  <h5 className="font-bold text-sm text-rose-950 pb-2 border-b border-rose-50 flex items-center gap-1">
                    🧾 Détail de la Facturation Diakhou
                  </h5>
                  
                  <div className="font-serif italic text-rose-805">
                    Expédié à : <strong>{lastOrder?.address.fullName}</strong>
                  </div>
                  <div className="text-[11px] text-gray-500 leading-normal">
                    Email de contact : {lastOrder?.address.email}<br />
                    Adresse finale : {lastOrder?.address.address}, {lastOrder?.address.city} ({lastOrder?.address.zipCode}), France
                  </div>

                  <div className="space-y-2 pt-2 border-t border-rose-50">
                    <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wide">Modèles achetés :</div>
                    {lastOrder?.items.map((it, ind) => (
                      <div key={ind} className="flex justify-between text-[11px]">
                        <span>{it.product.name} (x{it.quantity})</span>
                        <span className="font-mono">{getPrice(it.product.basePrice, it.selectedLength, it.selectedDensity, it.product.flashSaleDiscount) * it.quantity}€</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-rose-50 flex justify-between items-center text-sm font-bold">
                    <span>Total réglé (TTC) :</span>
                    <span className="text-rose-950 font-mono text-base">{lastOrder?.total} €</span>
                  </div>
                </div>

                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100/60 flex items-start gap-2 text-xs">
                  <Truck className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[10px] uppercase">EXPÉDITION DHL IMMÉDIATE</span>
                    <p className="text-[11px] text-rose-800/80 leading-normal">
                      Un email de suivi contenant le lien de traçabilité DHL express 24h vous sera adressé sous peu. Nous préparons votre perruque avec soin.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutStep("shopping");
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3 bg-rose-950 hover:bg-rose-900 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  id="success-view-close"
                >
                  Fermer & Continuer le Shopping
                </button>
              </div>
            )}

            {/* Shopping Cart Drawer Footer */}
            {checkoutStep === "shopping" && cart.length > 0 && (
              <div className="p-6 border-t border-rose-100 bg-[#FFFBFB] space-y-4 shadow-2xl">
                
                {/* Promo application block */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="CODE PROMO (ex: ROSE20)"
                    className="flex-1 bg-white border border-rose-200 uppercase text-xs rounded-xl px-3 focus:outline-hidden font-bold tracking-wider placeholder-rose-300"
                  />
                  <button
                    onClick={checkPromo}
                    className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl font-bold text-xs cursor-pointer transition-colors"
                  >
                    Appliquer
                  </button>
                </div>

                {/* Promo messages info */}
                {promoMessage && (
                  <p className={`text-[11px] font-bold ${appliedPromo ? "text-emerald-600" : "text-rose-500"}`}>
                    ★ {promoMessage}
                  </p>
                )}

                {/* Mathematical price listings */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Sous-total produit(s) :</span>
                    <span className="font-mono">{subtotal} €</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Remise promotionnelle ({appliedPromo.code}) :</span>
                      <span className="font-mono">-{discountAmount} €</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Livraison DHL Express :</span>
                    {deliveryPrice === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-[10px]">Offerte</span>
                    ) : (
                      <span className="font-mono">{deliveryPrice} €</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-rose-955 pt-2 border-t border-rose-100">
                    <span>Montant total global :</span>
                    <span className="text-rose-955 font-mono text-lg">{grandTotal} €</span>
                  </div>
                </div>

                {/* Go To Next Billing / Address step */}
                <button
                  onClick={() => setCheckoutStep("billing")}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold font-sans rounded-full text-xs uppercase tracking-wider transition-all scale-100 hover:scale-[1.01] active:scale-95 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  id="checkout-next-btn"
                >
                  <span>Passer la Commande Sécurisée</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}


      {/* DRAWER: DESIGN-COMPATIBLE WISHLIST PANEL */}
      {isWishlistOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex justify-end" id="wishlist-drawer">
          <div 
            className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/40">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                <h3 className="font-serif text-xl font-bold text-rose-950">Mes Favoris</h3>
                <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1 text-gray-400 hover:text-stone-900 rounded-full hover:bg-stone-50"
                id="close-wishlist-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* List view */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-none">
              {wishlist.length === 0 ? (
                <div className="text-center py-16" id="empty-wishlist-view">
                  <Heart className="w-16 h-16 text-rose-200 mx-auto mb-4 animate-pulse" />
                  <p className="font-serif text-lg font-bold text-rose-950">Aucun favori enregistré</p>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto mt-2">
                    Cliquez sur l'icône de cœur de vos perruques favorites pour les enregistrer et y accéder plus facilement !
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.filter(p => wishlist.includes(p.id)).map((item) => (
                    <div 
                      key={item.id} 
                      className="flex gap-4 p-3 bg-white rounded-2xl border border-rose-100 hover:border-rose-200 transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsWishlistOpen(false);
                      }}
                      id={`wishlist-item-${item.id}`}
                    >
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-rose-50 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-rose-955 text-xs line-clamp-1 leading-snug">{item.name}</h4>
                          <span className="text-[10px] text-rose-505 uppercase tracking-wide">{item.category}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-2">
                          <span className="font-mono font-black text-rose-950">{item.basePrice} €</span>
                          <span className="text-[10px] text-rose-600 underline font-bold">Personnaliser &rarr;</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => toggleWishlist(item.id, e)}
                        className="p-1.5 text-stone-300 hover:text-red-500 rounded-full"
                        title="Retirer"
                        id={`wishlist-remove-${item.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-rose-100 bg-rose-50/20">
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-3 bg-rose-950 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                Continuer à Parcourir
              </button>
            </div>

          </div>
        </div>
      )}


      {/* DRAWER: AI VIRTUAL STYLIST CHAT CONSULTATION */}
      {isAIStylistOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex justify-end" id="ai-stylist-drawer">
          <div 
            className="w-full max-w-lg bg-white h-full flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-950 text-white shadow-md">
              <div className="flex items-center gap-2">
                <ScanFace className="w-5 h-5 text-rose-450 animate-pulse" />
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-tight">Conseils Visagiste IA Diakhou</h3>
                  <p className="text-[10px] text-pink-200/80 leading-none">Diagnostic morphologique & astuces d'esthéticienne</p>
                </div>
              </div>
              <button
                onClick={() => setIsAIStylistOpen(false)}
                className="p-1 text-pink-200 hover:text-white rounded-full hover:bg-rose-900/40"
                id="close-ai-stylist-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* AI Stylist Form / Results */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none" id="ai-stylist-body">
              
              {/* Introduction header */}
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex gap-3 text-xs leading-relaxed">
                <div className="w-9 h-9 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
                  <ScanFace className="w-5 h-5 text-rose-700" />
                </div>
                <div>
                  <span className="font-bold text-rose-950 uppercase text-[10px] tracking-wide block">Conseillère Virtuelle Diakhou</span>
                  <p className="mt-1 text-rose-800">
                    Trouvez instantanément la perruque idéale à enfiler selon la morphologie de votre visage, l'éclat de votre peau et vos habitudes de coiffage quotidiennes.
                  </p>
                </div>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleAIQuery} className="space-y-4">
                
                <div>
                  <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1.5">
                    1. Forme du Visage
                  </label>
                  <select
                    value={aiForm.facialShape}
                    onChange={(e) => setAiForm({ ...aiForm, facialShape: e.target.value })}
                    className="w-full bg-[#FFFBFB] border border-rose-200 rounded-xl px-3 py-2 text-xs font-semibold text-rose-950 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                  >
                    <option value="Ovale">Ovale (Longueur égale, mâchoire douce)</option>
                    <option value="Ronde">Ronde (Largeur et longueur similaires, pommettes pleines)</option>
                    <option value="Carrée">Carrée (Front large, mâchoire angulaire prononcée)</option>
                    <option value="Cœur">En Cœur (Front large, menton pointu affiné)</option>
                    <option value="Triangle et Allongé">Triangle ou Allongé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1.5">
                    2. Carnation / Teint de votre peau
                  </label>
                  <select
                    value={aiForm.skinTone}
                    onChange={(e) => setAiForm({ ...aiForm, skinTone: e.target.value })}
                    className="w-full bg-[#FFFBFB] border border-rose-200 rounded-xl px-3 py-2 text-xs font-semibold text-rose-950 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                  >
                    <option value="Teint Clair / Albâtre">Teint Clair ou Albâtre (Nuances froides)</option>
                    <option value="Métisse / Caramel">Métisse ou Caramel (Nuances intermédiaires)</option>
                    <option value="Teint Marron Doré / Chaud">Teint Marron Doré / Chocolat Chaud</option>
                    <option value="Ébène / Profond">Ébène / Teint Sombre Sublime</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1.5">
                      3. Longueur Préférée
                    </label>
                    <select
                      value={aiForm.lengthPreference}
                      onChange={(e) => setAiForm({ ...aiForm, lengthPreference: e.target.value })}
                      className="w-full bg-[#FFFBFB] border border-rose-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-rose-950 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                    >
                      <option value="Court (Bob de 10-14 pouces)">Court (Bob 10-14")</option>
                      <option value="Moyen (16-20 pouces)">Moyen (16-20")</option>
                      <option value="Long (22-26 pouces)">Long (22-26")</option>
                      <option value="Très Long (28-30 pouces)">Très Long (28-30")</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1.5">
                      4. Style Spécial
                    </label>
                    <select
                      value={aiForm.texturePreference}
                      onChange={(e) => setAiForm({ ...aiForm, texturePreference: e.target.value })}
                      className="w-full bg-[#FFFBFB] border border-rose-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-rose-950 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                    >
                      <option value="Straight">Lisse d'Algérie (Straight)</option>
                      <option value="Body Wave">Ondulation Douce (Body Wave)</option>
                      <option value="Deep Wave">Boucles Profondes (Deep Wave)</option>
                      <option value="Kinky Curly">Crépu Rebondi (Kinky Curly)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1.5">
                    5. Style de Vie / Rythme Quotidien
                  </label>
                  <input
                    type="text"
                    value={aiForm.lifestyle}
                    onChange={(e) => setAiForm({ ...aiForm, lifestyle: e.target.value })}
                    placeholder="ex: Séances de sport fréquentes, Travail de bureau, Peu de temps le matin..."
                    className="w-full bg-[#FFFBFB] border border-rose-200 rounded-xl px-3 py-2.5 text-xs text-rose-950 focus:ring-1 focus:ring-rose-500 focus:outline-hidden placeholder-rose-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAiLoading}
                  className="w-full py-3.5 bg-rose-950 hover:bg-rose-900 border border-rose-950 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  id="ai-consult-submit-btn"
                >
                  {isAiLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-pink-400 border-t-white rounded-full animate-spin" />
                      <span>Analyse Morphologique en cours...</span>
                    </>
                  ) : (
                    <>
                      <ScanFace className="w-4 h-4 text-rose-455 animate-pulse" />
                      <span>Générer ma Recommandation IA</span>
                    </>
                  )}
                </button>
              </form>

              {/* AI REPORT RESULT DISPLAY AREA */}
              {aiRecommendation && (
                <div className="bg-[#FFF8FA] p-5 rounded-3xl border-2 border-rose-200 shadow-md space-y-4 animate-fadeIn" id="ai-report-box">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-rose-100 text-rose-900">
                    <ScanFace className="w-5 h-5 text-rose-500" />
                    <h4 className="font-serif font-bold text-md leading-none">Rapport de Style Personnalisé</h4>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-bold text-[10px] text-rose-500 uppercase tracking-widest block">⭐ Modèle Recommandé :</span>
                      <p className="mt-1 font-serif text-sm font-black text-rose-950 leading-snug">
                        {aiRecommendation.recommendedProductType}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-[10px] text-rose-500 uppercase tracking-widest block">💡 Justification Expert :</span>
                      <p className="mt-1 text-gray-700 leading-relaxed text-[11.5px]">
                        {aiRecommendation.justification}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-[10px] text-rose-500 uppercase tracking-widest block">🌀 Conseils de Textures :</span>
                      <p className="mt-1 text-gray-700 leading-relaxed text-[11.5px]">
                        {aiRecommendation.textureAdvice}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-[10px] text-rose-500 uppercase tracking-widest block">⚡ Méthode d'Enfilage Préconisée :</span>
                      <p className="mt-1 text-rose-800 font-semibold leading-normal">
                        {aiRecommendation.fittingMethod}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-rose-100/60 space-y-1.5">
                      <span className="font-bold text-[10px] text-rose-600 uppercase tracking-widest block">✂️ Astuces de Coiffure :</span>
                      <ul className="space-y-1 list-disc pl-4 text-gray-650 leading-relaxed">
                        {aiRecommendation.stylingTips?.map((tip: string, index: number) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-rose-100/60 space-y-1.5">
                      <span className="font-bold text-[10px] text-rose-600 uppercase tracking-widest block">🛁 Routine de Soins :</span>
                      <ul className="space-y-1 list-disc pl-4 text-gray-650 leading-relaxed">
                        {aiRecommendation.careRoutine?.map((routine: string, index: number) => (
                          <li key={index}>{routine}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-rose-100 text-center">
                    <p className="text-[10px] text-gray-400">
                      * Ce rapport a été entièrement généré par Diakhou Visagiste AI à l'aide du modèle Gemini 3.5.
                    </p>
                  </div>
                </div>
              )}

            </div>

            <div className="p-6 border-t border-rose-100 bg-rose-50/20 text-center text-xs text-rose-950 font-semibold">
              Des questions supplémentaires ? Notre équipe d'expertes est également disponible sur Whatsapp !
            </div>

          </div>
        </div>
      )}

      {/* --- FLOATING SECURE LIVE ACTIVITY STREAM (SOCIAL PROOF) --- */}
      {isSocialFeedVisible && (
        <div 
          className="fixed bottom-6 left-6 z-45 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-pink-200/80 shadow-2xl flex items-center gap-3.5 animate-fadeIn transition-all duration-300 pointer-events-auto"
          id="live-activity-feed"
        >
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-rose-700 shrink-0 font-bold text-sm relative">
            <ShoppingBag className="w-4.5 h-4.5 text-[#E91E63] animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex-1 min-w-0 pr-2">
            <span className="block text-[11px] font-black text-[#4A152C] leading-none uppercase tracking-wider mb-0.5">
              Activité en Direct
            </span>
            <p className="text-xs text-[#2A2525] font-normal leading-normal font-sans line-clamp-2">
              <strong>{socialFeedActivities[socialFeedIndex].name}</strong> {socialFeedActivities[socialFeedIndex].action}
            </p>
            <span className="block text-[9px] text-[#E91E63] font-bold mt-1 uppercase tracking-widest leading-none font-mono">
              {socialFeedActivities[socialFeedIndex].time}
            </span>
          </div>

          <button
            onClick={() => setIsSocialFeedVisible(false)}
            className="p-1 hover:bg-[#FFF5F7] rounded-full text-stone-400 hover:text-stone-700 cursor-pointer self-start"
            title="Masquer ces alertes"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      </div>
    </BrowserRouter>
  );
}
