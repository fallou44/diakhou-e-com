import React from "react";
import { Gem, CheckCircle2, Star, Percent, ShieldCheck, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CategoryBannerProps {
  activeCategory: string;
  count: number;
}

interface BannerDetails {
  title: string;
  italicTitle: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  duration: string;
  laceType: string;
  maintenanceRating: string;
  bonusPromo?: string;
}

const bannerData: Record<string, BannerDetails> = {
  "Tous": {
    title: "Le Grand Éventail",
    italicTitle: "Diakhou",
    tagline: "La quintessence absolue de l'art de la coiffure haute couture.",
    description: "Parcourez l'intégralité de nos chefs-d'œuvre capillaires. Des fibres 100% Remy d'une fluidité extraordinaire, assemblées à la main avec notre dentelle invisible HD brevetée pour un port somptueux, naturel, et zéro compromis.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=1200",
    features: ["Cheveux 100% Humains Vierges", "Effet Cuir Chevelu Réaliste", "Customisation & Coupe Professionnelle"],
    duration: "2 à 3 ans de vie",
    laceType: "HD Lace invisible universel",
    maintenanceRating: "Facile à Intermédiaire",
    bonusPromo: "ROSE20 : -20% sur tout le catalogue"
  },
  "Wear & Go": {
    title: "Collection Glueless •",
    italicTitle: "Wear & Go",
    tagline: "Installez votre couronne en 3 secondes chrono sans colle.",
    description: "La révolution absolue pour les débutantes ou les journées actives. Dotées de notre bande d'ajustement élastique 3D d'oreille à oreille et d'une dentelle invisible pré-coupée à l'avance. Posez, ajustez, rayonnez !",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200",
    features: ["Zéro colle ou adhésif chimique", "Ligne frontale pré-pluchée", "Peignes d'ancrage hypoallergéniques"],
    duration: "100% Prêt à Porter",
    laceType: "HD Lace pré-détourée",
    maintenanceRating: "Ultra Simple (Débutant)",
    bonusPromo: "Cadeau d'intégration : Kit de pose offert"
  },
  "HD Lace Frontal": {
    title: "Série Royale d'Oreille à Oreille •",
    italicTitle: "HD Lace Frontal",
    tagline: "Fusion totale et invisibilité absolue sur toutes les peaux.",
    description: "Nos dentelles frontales HD ultra-pelliculaires sont l'atout séduction indétectable par excellence. Une liberté absolue d'orienter votre raie (13x4 & 13x6) avec des nœuds méticuleusement blanchis à la main pour un effet fondu impénétrable.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200",
    features: ["Dentelles Suisses haute densité", "Raie libre fluide & profonde", "Nœuds pré-blanchis avec précision"],
    duration: "Tenue 4 à 6 semaines par pose",
    laceType: "HD Film Lace Premium (0.15mm)",
    maintenanceRating: "Professionnel / Régulier",
    bonusPromo: "Accompagnement visagiste IA gratuit"
  },
  "Bob Perruques": {
    title: "Les Carrés Épurés •",
    italicTitle: "Bob & Short cuts",
    tagline: "Lignes graphiques tranchantes, volumes structurés et modernes.",
    description: "Le summum du chic urbain au carré. Qu'il soit droite lisse, incliné asymétrique ou intensifié par un dégradé de couleur miel, chaque Bob préserve une densité régulière et un mouvement fluide pour rehausser immédiatement votre port de tête.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200",
    features: ["Coupes droites ciselées au laser", "Zéro gonflement au niveau de la nuque", "Retouche facile au fer à lisser"],
    duration: "Entretien rapide 5 min/jour",
    laceType: "Glueless 5x5 ou Frontale HD",
    maintenanceRating: "Très Facile",
    bonusPromo: "Sérum protecteur thermique inclus"
  },
  "Tissages & Closures": {
    title: "Faisceaux Mèches Luxe •",
    italicTitle: "Tissages & Closures",
    tagline: "Volumes majestueux, trames doubles-renforcées.",
    description: "Idéal pour des poses tissées traditionnelles robustes ou des confections de perruques artisanales uniques. Nos mèches russes de grade 10B conservent l'intégralité de leur cuticule pour un rebond brillant d'une douceur exceptionnelle.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=1200",
    features: ["Double tressage anti-perte de cheveux", "Peut être blanchi ou recoloré", "Texture rebondissante originelle"],
    duration: "Durée de vie supérieure à 3 ans",
    laceType: "Fermeture Closure / Mèches Seules",
    maintenanceRating: "Standard",
    bonusPromo: "Acheter 3 paquets = -15% sur la closure"
  },
  "Perruques Colorées": {
    title: "Balayage Couture & Nuances •",
    italicTitle: "Édition Colorée",
    tagline: "Du bordeaux envoûtant au Sunset Orange flamboyant, osez l'éclat.",
    description: "Des couleurs luxueuses et vibrantes réalisées par nos maîtres coloristes partenaires d'exception. Chaque fibre conserve son hydratation interne et sa solidité structurales grâce à des pigments d'origine végétale ultra-respectueux.",
    features: ["Teintes riches multi-reflets", "Protection UV intégrée à la fibre", "Rétention de brillance miroir"],
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=1200",
    duration: "Couleurs anti-ternissement",
    laceType: "Frontal HD Customisée",
    maintenanceRating: "Régulier (Shampoing Revigorant)",
    bonusPromo: "-25% temporaire sur les coloritions phares"
  }
};

export default function CategoryBanner({ activeCategory, count }: CategoryBannerProps) {
  // Gracefully fallback to "Tous" if the activeCategory has no customized banner mapping
  const info = bannerData[activeCategory] || bannerData["Tous"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-white rounded-[32px] overflow-hidden border border-rose-100 shadow-xl my-8 relative flex flex-col lg:flex-row min-h-[380px]"
        id="dynamic-category-banner"
      >
        {/* Left Side: Rich aesthetic banner image with soft color tint */}
        <div className="lg:w-1/2 relative min-h-[250px] lg:min-h-full overflow-hidden flex items-stretch">
          <img
            src={info.image}
            alt={info.title}
            className="w-full h-full object-cover object-top transition duration-700 hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
          {/* Seductive gradient overlaying the image */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-rose-950/80 via-rose-950/40 to-transparent flex flex-col justify-end p-6 lg:p-8" />
          
          {/* Overlay Tag */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-100 text-[10px] font-black tracking-widest text-[#E91E63] uppercase flex items-center gap-1 shadow-md">
            <Gem className="w-3.5 h-3.5 text-pink-500 fill-pink-100 animate-pulse" />
            <span>EXCLUSIVITÉ DIAKHOU</span>
          </div>

          {/* Quick Counter label overlay inside image */}
          <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 bg-rose-950/80 border border-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-bold tracking-wider uppercase font-mono">{count} Modèles Disponibles</span>
          </div>
        </div>

        {/* Right Side: Editorial text copy & facts */}
        <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-[#FCF9FA] to-white relative">
          {/* Subtle background graphics */}
          <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-pink-100/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            {/* Nav Path */}
            <span className="text-[10px] text-pink-500 font-extrabold uppercase tracking-widest block mb-1">
              Diakhou Hair & Beauty &bull; {count} Références
            </span>

            {/* Dynamic Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
              {info.title} <span className="italic font-serif text-[#E91E63] tracking-tight">{info.italicTitle}</span>
            </h1>

            {/* Tagline */}
            <p className="font-bold text-xs text-rose-800 mt-2 font-serif italic">
              « {info.tagline} »
            </p>

            {/* In-depth Category description */}
            <p className="text-stone-600 text-xs mt-3 leading-relaxed max-w-xl">
              {info.description}
            </p>

            {/* Bullets List */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {info.features.map((feat, index) => (
                <div key={index} className="flex items-center gap-1.5 text-stone-700 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fact parameters table & specific promotional strip */}
          <div className="mt-6 pt-5 border-t border-rose-100/80 flex flex-wrap gap-4 justify-between items-center relative z-10">
            {/* Parameters list */}
            <div className="flex gap-4 sm:gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Lace Intégrée</span>
                <span className="text-xs font-bold text-rose-950 font-mono mt-0.5">{info.laceType}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Entretien Requis</span>
                <span className="text-xs font-bold text-rose-950 font-mono mt-0.5">{info.maintenanceRating}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Durabilité</span>
                <span className="text-xs font-bold text-rose-950 font-mono mt-0.5">{info.duration}</span>
              </div>
            </div>

            {/* Promotion offer badge */}
            {info.bonusPromo && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 border border-rose-100 text-[#E91E63] text-[10px] font-black uppercase tracking-wider rounded-xl">
                <Percent className="w-3.5 h-3.5 text-[#E91E63] shrink-0" />
                <span>{info.bonusPromo}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
