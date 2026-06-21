import { Review } from "../types";

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "diakhou-001",
    authorName: "Aïcha S.",
    rating: 5,
    date: "Il y a 2 jours",
    content: "La perruque est incroyable ! La dentelle HD se fond littéralement avec ma peau. Moi qui suis débutante, j'ai pu l'installer en 5 minutes sans aucune colle. Le volume est superbe.",
    images: [
      "https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1543130732-4b8b60381ea0?auto=format&fit=crop&q=80&w=300"
    ],
    isVerifiedPurchase: true
  },
  {
    id: "r2",
    productId: "diakhou-001",
    authorName: "Marie T.",
    rating: 5,
    date: "Il y a 1 semaine",
    content: "Une douceur exceptionnelle. J'ai pris la 22 pouces et je ne suis pas déçue. L'effet est hyper naturel, pas de perte de cheveux au brossage.",
    isVerifiedPurchase: true
  },
  {
    id: "r3",
    productId: "diakhou-002",
    authorName: "Fatou D.",
    rating: 4,
    date: "Il y a 3 semaines",
    content: "Magnifique ! Les cheveux sont vraiment lisses et brillants. J'aurais aimé la prendre en 26 pouces finalement car la qualité est au rendez-vous. La dentelle est très fine.",
    images: [
      "https://images.unsplash.com/photo-1560362391-72990eb972db?auto=format&fit=crop&q=80&w=300"
    ],
    isVerifiedPurchase: true
  },
  {
    id: "r4",
    productId: "diakhou-004",
    authorName: "Sarah K.",
    rating: 5,
    date: "Il y a 1 mois",
    content: "Les boucles Kinky Curly sont tellement définies ! Un peu d'eau et de mousse et ça reste parfait toute la journée. Très légère à porter.",
    isVerifiedPurchase: true
  }
];

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId);
};
