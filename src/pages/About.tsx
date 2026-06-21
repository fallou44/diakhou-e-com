import React from "react";
import { Gem, ShieldCheck, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl lg:text-5xl font-extrabold text-rose-950 italic mb-4">Notre Histoire</h1>
        <p className="text-rose-600 max-w-2xl mx-auto text-sm">
          Découvrez la genèse de Maison Diakhou Hair & Beauty, l'excellence de la haute coiffure et des extensions premium.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=1200" 
            alt="Diakhou Studio" 
            className="rounded-[32px] shadow-2xl object-cover aspect-[4/3]"
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-serif text-3xl font-bold text-rose-950">L'Excellence du Cheveu Vierge</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Fondée avec la conviction que chaque femme mérite une couronne parfaite, Maison Diakhou est née d'une passion inébranlable pour la beauté authentique. Nous parcourons le monde pour sélectionner les fibres capillaires les plus nobles, garantissant un grade 10A 100% Remy Hair, non traité chimiquement.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Notre signature réside dans nos dentelles HD (Haute Définition) brevetées et nos perruques Wear & Go, conçues pour s'adapter à toutes les carnations et offrir une invisibilité totale dès la racine.
          </p>
        </div>
      </div>

      <div className="bg-rose-50/50 rounded-[40px] p-10 md:p-16 border border-rose-100 mt-12 text-center">
        <h2 className="font-serif text-3xl font-bold text-rose-950 mb-10">Nos Engagements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-50 flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-rose-500 mb-3" />
            <h3 className="font-bold text-rose-950 text-sm mb-2">Qualité Contrôlée</h3>
            <p className="text-xs text-stone-500">Chaque perruque passe par un contrôle rigoureux de 14 points avant expédition.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-50 flex flex-col items-center">
            <Gem className="w-8 h-8 text-rose-500 mb-3" />
            <h3 className="font-bold text-rose-950 text-sm mb-2">Innovation Continue</h3>
            <p className="text-xs text-stone-500">Créateurs des modèles Wear & Go 3D sans colle pour un confort absolu.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-50 flex flex-col items-center">
            <Heart className="w-8 h-8 text-rose-500 mb-3" />
            <h3 className="font-bold text-rose-950 text-sm mb-2">Éthique & Respect</h3>
            <p className="text-xs text-stone-500">Un approvisionnement transparent et éthique, valorisant le donateur et l'artisan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
