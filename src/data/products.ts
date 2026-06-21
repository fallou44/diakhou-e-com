import { Product } from "../types";

export const products: Product[] = [
  {
    id: "diakhou-001",
    name: "Perruque Glueless Wear & Go 6x4 HD Lace Wig - Body Wave Signature",
    category: "Wear & Go",
    texture: "Body Wave",
    basePrice: 145,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewsCount: 342,
    badge: "Best Seller",
    badgeColor: "bg-rose-500",
    description: "Une création signature par Diakhou Hair & Beauty. Cette perruque révolutionnaire sans colle s'enfile prête à porter en seulement 3 secondes chronométrées. Équipée d'une dentelle HD invisible pré-découpée, d'une bande d'ajustement élastique 3D confortable et de nœuds pré-blanchis minutieusement pour un effet cuir chevelu naturel impeccable.",
    lengths: [14, 16, 18, 20, 22, 24, 26, 28],
    densities: ["150%", "180%", "250%"],
    colors: ["Noir Naturel", "Châtain Foncé"],
    salesVolume: 1250,
    isBestSeller: true
  },
  {
    id: "diakhou-002",
    name: "13x4 HD Lace Frontal Wig - Cheveux Lisses Algériens Soyeux",
    category: "HD Lace Frontal",
    texture: "Straight",
    basePrice: 189,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.8,
    reviewsCount: 220,
    badge: "HD Invisible",
    badgeColor: "bg-stone-800",
    description: "Notre dentelle HD d'exception, la plus fine et souple du marché. Diakhou Hair & Beauty garantit qu'elle fusionne totalement avec n'importe quelle nuance de teint. Grade de cheveux 100% Remy d'une douceur extraordinaire, lisses et très soyeux.",
    lengths: [16, 18, 20, 22, 24, 26, 28, 30],
    densities: ["150%", "180%", "250%"],
    colors: ["Noir Naturel", "Châtain Chocolat"],
    salesVolume: 980,
    isBestSeller: true
  },
  {
    id: "diakhou-003",
    name: "Perruque Bob Épurée Glueless - Miel Intense Balayage Couture",
    category: "Bob Perruques",
    texture: "Straight",
    basePrice: 110,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.7,
    reviewsCount: 145,
    badge: "-20% Flash",
    badgeColor: "bg-amber-500",
    description: "Une coupe carré droite sophistiquée arborant un somptueux dégradé de couleur miel chaud. Idéal pour un look frais, énergique et d'un chic absolu au quotidien.",
    lengths: [10, 12, 14, 16],
    densities: ["150%", "180%"],
    colors: ["Balayage Miel", "Noir Naturel"],
    salesVolume: 740,
    isFlashSale: true,
    flashSaleDiscount: 20,
    stockLeft: 4
  },
  {
    id: "diakhou-004",
    name: "Wear & Go 5x5 HD Lace Bob Wig - Kinky Curly Wave Divine",
    category: "Wear & Go",
    texture: "Kinky Curly",
    basePrice: 125,
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewsCount: 198,
    badge: "Nouvel Arrivage",
    badgeColor: "bg-emerald-600",
    description: "Du volume intense et des boucles Kinky authentiques et profondes. Équipée du bandeau magique ajustable de Diakhou Hair & Beauty pour une tenue impeccable sur de longues journées sans glisser, le tout sans colle.",
    lengths: [12, 14, 16, 18, 20],
    densities: ["180%", "250%"],
    colors: ["Noir Naturel"],
    salesVolume: 610,
    isNewArrival: true
  },
  {
    id: "diakhou-005",
    name: "Tissage 3 Rangs Premium - Deep Wave Locks Volumineuses",
    category: "Tissages & Closures",
    texture: "Deep Wave",
    basePrice: 95,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.6,
    reviewsCount: 112,
    badge: "10A Classic",
    badgeColor: "bg-[#795548]",
    description: "Mèches de cheveux vierges d'une texture Deep Wave uniforme et rebondie d'une qualité inégalée. Elles conservent leur rebond naturel et leur hydratation après chaque shampoing. Zéro perte.",
    lengths: [12, 14, 16, 18, 20, 22, 24, 26, 28],
    densities: ["150%", "180%"],
    colors: ["Noir Naturel", "Châtain Doré"],
    salesVolume: 530
  },
  {
    id: "diakhou-006",
    name: "Perruque HD Lace Frontal - Rose Gold Céleste Édition Royale",
    category: "Perruques Colorées",
    texture: "Straight",
    basePrice: 210,
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewsCount: 88,
    badge: "-25% Vente Flash",
    badgeColor: "bg-[#FF5722]",
    description: "Couleur Rose Gold sensuelle mélangée de façon fluide avec des nuances roses pastel nacrées. Dotée d'une dentelle HD d'oreille à oreille pré-plumée à la main pour une allure moderne digne des tapis rouges.",
    lengths: [18, 20, 22, 24, 26],
    densities: ["180%", "250%"],
    colors: ["Rose Gold", "Rose Pastelle"],
    salesVolume: 320,
    isFlashSale: true,
    flashSaleDiscount: 25,
    stockLeft: 7
  },
  {
    id: "diakhou-007",
    name: "Perruque 13x6 HD Lace - Burgundy Auburn Wand Curls de Gala",
    category: "Perruques Colorées",
    texture: "Body Wave",
    basePrice: 198,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.8,
    reviewsCount: 95,
    badge: "Nouvel Arrivage",
    badgeColor: "bg-emerald-600",
    description: "Un ton bordeaux profond et de sublimes boucles serrées volumineuses. Diakhou Hair & Beauty a concocté cette magnifique nuance pour redonner immédiatement éclat et tonus au visage.",
    lengths: [16, 18, 20, 22, 24, 26, 28],
    densities: ["180%", "250%"],
    colors: ["Bourgogne Auburn", "Noir/Bourgogne Ombré"],
    salesVolume: 490,
    isNewArrival: true
  },
  {
    id: "diakhou-008",
    name: "Wear & Go 4x4 HD Lace Wig - Cheveux Lisses Ébène Premium",
    category: "Wear & Go",
    texture: "Straight",
    basePrice: 139,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 5.0,
    reviewsCount: 184,
    badge: "Best Seller",
    badgeColor: "bg-rose-500",
    description: "Idéale pour les débutantes, cette perruque de cheveux lisses et brillants de grade 10A d'une douceur absolue. Glueless, zéro colle, s'installe très facilement avec des peignes d'ancrages et des élastiques renforcés intégrés.",
    lengths: [14, 16, 18, 20, 22, 24],
    densities: ["180%", "250%"],
    colors: ["Noir Naturel", "Châtain Foncé"],
    salesVolume: 820,
    isBestSeller: true
  },
  {
    id: "diakhou-009",
    name: "Premium Frontal HD Wig - Spiral Bounce Kinky Curly Luxe",
    category: "HD Lace Frontal",
    texture: "Kinky Curly",
    basePrice: 175,
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewsCount: 156,
    badge: "Nouveau Luxe",
    badgeColor: "bg-emerald-600",
    description: "Une dentelle frontale HD pré-plumée de niveau professionnel. Les ondulations bouclées et volumineuses offrent un fini volumateur naturel exceptionnel qui dure toute l'année.",
    lengths: [16, 18, 20, 22, 24, 26],
    densities: ["180%", "250%"],
    colors: ["Noir Naturel", "Châtain Naturel"],
    salesVolume: 710,
    isNewArrival: true
  },
  {
    id: "diakhou-010",
    name: "Luxury Silk 360 HD Lace Wig - Soft Curly Queen",
    category: "HD Lace Frontal",
    texture: "Kinky Curly",
    basePrice: 220,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewsCount: 412,
    badge: "Best Seller #1",
    badgeColor: "bg-rose-500",
    description: "La perruque reine de notre gamme. Une dentelle HD 360 complète qui permet toutes les coiffures possibles (queues de cheval hautes, tresses, chignons) avec un fondu de peau absolument invisible. Cheveux vierges ultra-denses et d'un soyeux divin.",
    lengths: [18, 20, 22, 24, 26, 28, 30],
    densities: ["180%", "250%"],
    colors: ["Noir Naturel", "Châtain Foncé"],
    salesVolume: 1450,
    isBestSeller: true
  },
  {
    id: "diakhou-011",
    name: "Wig 13x4 HD Lace Frontal - Ginger Orange Sunset d'Exception",
    category: "Perruques Colorées",
    texture: "Body Wave",
    basePrice: 195,
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.8,
    reviewsCount: 76,
    badge: "-30% Flash",
    badgeColor: "bg-[#FF5722]",
    description: "Une couleur gingembre épicée chatoyante et chaleureuse pour un look vibrant ultra-recherché. Ses ondulations volumineuses de type Body Wave subliment le port de tête.",
    lengths: [16, 18, 20, 22, 24, 26],
    densities: ["150%", "180%", "250%"],
    colors: ["Ginger Orange", "Noir Naturel"],
    salesVolume: 290,
    isFlashSale: true,
    flashSaleDiscount: 30,
    stockLeft: 3
  },
  {
    id: "diakhou-012",
    name: "Wear & Go 5x5 HD Wig - Premium Yaki Straight Smooth",
    category: "Wear & Go",
    texture: "Straight",
    basePrice: 155,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewsCount: 92,
    badge: "Nouvel Arrivage",
    badgeColor: "bg-emerald-600",
    description: "Découvrez la perfection de la texture Yaki Straight soufflée, reproduisant la brillance et la texture de cheveux naturels défrisés ou lissés au fer. Glueless 5x5 avec dentelle HD indétectable.",
    lengths: [16, 18, 20, 22, 24, 26],
    densities: ["180%", "250%"],
    colors: ["Noir Naturel"],
    salesVolume: 180,
    isNewArrival: true
  }
];

// Price calculation based on length, density, and optional flash discount
export const getPrice = (basePrice: number, length: number, density: string, flashSaleDiscount?: number): number => {
  // Base length is assumed to be 14" (or lowest available for the product)
  // Let's add $15 for every 2 inches over 14"
  const lengthFactor = length > 14 ? ((length - 14) / 2) * 15 : 0;
  
  // Density factor
  // "150%" -> +0%
  // "180%" -> +15%
  // "250%" -> +30%
  let densityPercent = 0;
  if (density === "180%") densityPercent = 0.15;
  if (density === "250%") densityPercent = 0.30;

  const standardPrice = basePrice + lengthFactor;
  let finalPrice = standardPrice * (1 + densityPercent);
  
  // Apply flash sale discount if present
  if (flashSaleDiscount && flashSaleDiscount > 0) {
    finalPrice = finalPrice * (1 - flashSaleDiscount / 100);
  }
  
  return Math.round(finalPrice);
};
