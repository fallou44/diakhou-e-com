import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Qu'est-ce qu'une perruque Wear & Go (Glueless) ?",
    answer: "Une perruque Wear & Go est conçue pour être enfilée et retirée en quelques secondes sans utiliser de colle ou d'adhésif. Elle intègre une bande élastique 3D ajustable et une dentelle pré-découpée pour une tenue sécurisée et un effet naturel instantané."
  },
  {
    question: "Quelle est la différence entre une dentelle HD et une dentelle transparente ?",
    answer: "La HD Lace (Haute Définition) est la dentelle la plus fine et souple du marché. Elle est quasiment invisible à l'œil nu et se fond parfaitement avec toutes les carnations de peau, contrairement à la dentelle classique ou transparente qui est légèrement plus épaisse."
  },
  {
    question: "Comment entretenir ma perruque 100% Remy Hair ?",
    answer: "Lavez votre perruque tous les 10 à 15 jours avec un shampoing doux sans sulfates. Appliquez un masque hydratant, démêlez délicatement avec une brosse adaptée (de bas en haut), et laissez sécher à l'air libre de préférence pour préserver la cuticule."
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nous expédions nos commandes via DHL Express. Pour la France métropolitaine, comptez 24h à 48h après expédition. Pour l'international, les délais varient entre 3 à 5 jours ouvrés."
  },
  {
    question: "Puis-je décolorer ou lisser mes extensions Diakhou ?",
    answer: "Absolument. Nos cheveux étant 100% humains et vierges (Grade 10A+), vous pouvez les décolorer (jusqu'au blond 613), les lisser ou les boucler. Veillez toutefois à toujours utiliser un spray thermoprotecteur."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl lg:text-5xl font-extrabold text-rose-950 italic mb-4">FAQ</h1>
        <p className="text-rose-600 text-sm">
          Toutes les réponses à vos questions sur nos produits, la livraison et l'entretien.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-rose-100 bg-white rounded-2xl overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-rose-50/50 cursor-pointer transition-colors"
            >
              <span className="font-bold text-rose-950 text-sm text-left">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-rose-500 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-rose-500 shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-5 pt-1 border-t border-rose-50 bg-[#FFFBFB]">
                <p className="text-xs text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
