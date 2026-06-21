import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Award, Flame, ChevronLeft, ChevronRight, Play, Pause, BadgePercent } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  onOpenAIStylist: () => void;
  onExploreProducts: () => void;
}

interface SlideItem {
  id: number;
  badge: string;
  badgeIcon: React.ReactNode;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  image: string;
  features: string[];
  promoText: string;
  accentColor: string;
  buttonText: string;
}

export default function Hero({ onOpenAIStylist, onExploreProducts }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: SlideItem[] = [
    {
      id: 1,
      badge: "INNOVATION SANS COLLE",
      badgeIcon: <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-100 animate-pulse" />,
      titlePrefix: "Collection Révolutionnaire",
      titleHighlight: "Wear & Go",
      titleSuffix: "En 3 Secondes Chrono.",
      subtitle: "Maison Diakhou réinvente la pose. Enfilez votre couronne sans colle ni adhésif. Ajustement ultra confortable par bande 3D élastique et dentelle invisible pré-découpée.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200",
      features: ["Pose instantanée sans colle", "Ligne frontale pré-pluchée", "Élastique confort 3D ajustable"],
      promoText: "KADEAU DE BIENVENUE : Kit d'installation pro offert",
      accentColor: "from-rose-500 to-pink-600",
      buttonText: "Découvrir Wear & Go"
    },
    {
      id: 2,
      badge: "DENTELLE ROYALE HD",
      badgeIcon: <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-100 rotate-12" />,
      titlePrefix: "Fusion Indétectable",
      titleHighlight: "HD Lace Frontal",
      titleSuffix: "13x6 Signature.",
      subtitle: "La fusion la plus fine et souple du monde. Notre dentelle HD suisse fusionne totalement avec toutes les nuances de teint de peau pour un fini cuir chevelu magistral.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200",
      features: ["Dentelle HD Suisse invisible", "Noeuds pré-blanchis minutieusement", "Raie libre profonde et modulable"],
      promoText: "LIVRAISON DHL EXPRESS OFFERTE ce week-end",
      accentColor: "from-amber-600 to-stone-900",
      buttonText: "Explorer les Frontales"
    },
    {
      id: 3,
      badge: "HAUTE COLORATION PREMIUM",
      badgeIcon: <Award className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />,
      titlePrefix: "Osez l'Éclat des",
      titleHighlight: "Balayages Couture",
      titleSuffix: "et Bob Divins.",
      subtitle: "Carrés droits impeccables, tevelures sensuelles Rose Gold et miel ombré. Couleurs élaborées par nos experts qui préservent l'incroyable soyeux des cheveux d'origine.",
      image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=1200",
      features: ["Teintes riches multi-reflets vibrants", "100% Remy hair d'une fluidité divine", "Fibre nourrie anti-ternissement"],
      promoText: "ÉDITION LIMITÉE : Accessoires de coiffage soyeux inclus",
      accentColor: "from-pink-500 to-rose-700",
      buttonText: "Voir les Colorations"
    }
  ];

  // Auto-play control logic
  const startTimer = () => {
    stopTimer();
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6500); // 6.5s per slide for comfortable reading
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [isPlaying, currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-white to-white py-6 md:py-12 px-4 sm:px-6 lg:px-8" 
      id="diakhou-hero-slider"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* Absolute Ambient Background Blobs */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-pink-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-amber-50/25 rounded-full blur-3xl pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white rounded-[40px] border border-rose-100 shadow-2xl overflow-hidden relative min-h-[580px] lg:min-h-[640px] flex items-stretch">
          
          {/* Slides Carousel Wrapper */}
          <AnimatePresence mode="wait">
            {slides.map((slide, sIdx) => {
              if (sIdx !== currentSlide) return null;
              
              return (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch"
                >
                  
                  {/* Left Column: Rich editorial content */}
                  <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative bg-gradient-to-br from-[#FFFBFB] via-white to-white">
                    {/* Tiny floral-styled watermark pattern behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-50/20 font-serif font-bold text-[15rem] leading-none pointer-events-none select-none">
                      D
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                      {/* Top badge */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 border border-rose-100 text-rose-900 rounded-full text-[10px] font-black tracking-widest uppercase">
                        {slide.badgeIcon}
                        <span>{slide.badge}</span>
                      </div>

                      {/* Main Dynamic Elegant Headline */}
                      <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-[54px] tracking-tight text-rose-950 leading-[1.1]">
                        {slide.titlePrefix}{" "}
                        <span className="font-serif italic font-medium text-[#E91E63] decoration-pink-300 decoration-wavy underline underline-offset-4">
                          {slide.titleHighlight}
                        </span>{" "}
                        {slide.titleSuffix}
                      </h1>

                      {/* Subtitle */}
                      <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl">
                        {slide.subtitle}
                      </p>

                      {/* Bulleted checklist items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {slide.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-stone-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Section */}
                    <div className="mt-8 pt-6 border-t border-rose-100 relative z-10">
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                        {/* Primary Explore button */}
                        <button
                          onClick={onExploreProducts}
                          className="px-8 py-4 bg-[#E91E63] hover:bg-rose-950 text-white rounded-full text-xs font-extrabold uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{slide.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        {/* AI Stylist button */}
                        <button
                          onClick={onOpenAIStylist}
                          className="px-8 py-3.5 bg-white hover:bg-pink-50 text-rose-950 border-2 border-pink-100 hover:border-pink-350 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-[#E91E63] animate-pulse" />
                          <span>Conseil Visagiste IA</span>
                        </button>
                      </div>

                      {/* Sticky Promotional mini label */}
                      <div className="mt-4 flex items-center gap-2 text-[#E91E63] text-xs font-bold font-serif italic">
                        <BadgePercent className="w-4 h-4 text-[#E91E63]" />
                        <span>{slide.promoText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Stunning Full Height Image Banner */}
                  <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                    <img
                      src={slide.image}
                      alt={slide.titleHighlight}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Visual Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-rose-950/20 via-transparent to-black/20" />

                    {/* Glowing Trust Badge */}
                    <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-pink-100 shadow-xl flex items-center gap-3">
                      <div className="w-9 h-9 bg-rose-950 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-inner">
                        ★ M
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black text-[#4A152C] leading-none uppercase tracking-wider">Maison Diakhou</h5>
                        <p className="text-[9px] text-stone-500 mt-0.5 font-semibold">Qualité Haute Couture Certifiée</p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Manual Arrow Controls (Left/Right absolute floats) */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 b-10 h-10 rounded-full bg-white/90 hover:bg-[#E91E63] hover:text-white text-rose-950 border border-rose-100 shadow-lg flex items-center justify-center transition-all cursor-pointer z-25 active:scale-90"
            aria-label="Diapositive précédente"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 b-10 h-10 rounded-full bg-white/90 hover:bg-[#E91E63] hover:text-white text-rose-950 border border-rose-100 shadow-lg flex items-center justify-center transition-all cursor-pointer z-25 active:scale-90"
            aria-label="Diapositive suivante"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Autoplay Pause/Play toggle and Carousel Indicator bars */}
          <div className="absolute bottom-6 left-10 z-20 flex items-center gap-4 bg-rose-950/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
            
            {/* Play Pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
              title={isPlaying ? "Suspendre la rotation automatique" : "Activer la rotation automatique"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>

            {/* Pagination Lines */}
            <div className="flex gap-1.5">
              {slides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlide(dotIdx)}
                  className={`relative h-1.5 transition-all rounded-full overflow-hidden cursor-pointer ${
                    dotIdx === currentSlide ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Aller à la diapositive ${dotIdx + 1}`}
                >
                  {/* Dynamic loader animation inside active bar */}
                  {dotIdx === currentSlide && isPlaying && (
                    <motion.div
                      initial={{ left: "-100%" }}
                      animate={{ left: "0%" }}
                      transition={{ duration: 6.5, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-[#E91E63] w-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Quick slide step number */}
            <span className="text-[10px] font-mono text-white/50 tracking-wider font-bold">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
