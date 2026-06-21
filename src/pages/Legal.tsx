import React from "react";

export default function Legal() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-extrabold text-rose-950 italic mb-4">Mentions Légales & CGV</h1>
        <p className="text-rose-600 text-sm">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[32px] border border-rose-100 shadow-sm space-y-8 text-sm text-stone-700 leading-relaxed">
        
        <section>
          <h2 className="font-bold text-lg text-rose-950 mb-3">1. Éditeur du Site</h2>
          <p>
            Le site <strong>Diakhou Hair & Beauty</strong> (ci-après le "Site") est édité par la société DIAKHOU BEAUTY SAS, au capital social de 10 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
            <br />Siège social : 12 Avenue Montaigne, 75008 Paris, France.
            <br />Directeur de la publication : Équipe de Direction Diakhou.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg text-rose-950 mb-3">2. Hébergement</h2>
          <p>
            Le site est hébergé par Vercel Inc., situé au 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg text-rose-950 mb-3">3. Propriété Intellectuelle</h2>
          <p>
            L'ensemble des éléments figurant sur le Site (textes, graphismes, logos, photographies, vidéos) est la propriété exclusive de Maison Diakhou, sauf mention contraire explicite. Toute reproduction ou représentation totale ou partielle sans notre autorisation préalable est strictement interdite et constitue une contrefaçon.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg text-rose-950 mb-3">4. Conditions Générales de Vente (CGV)</h2>
          <p>
            Les présentes CGV régissent l'ensemble des ventes réalisées depuis le Site. En passant commande, le client accepte sans réserve les présentes conditions.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
            <li><strong>Produits :</strong> Les descriptions et photographies sont les plus précises possibles mais n'ont pas de valeur contractuelle.</li>
            <li><strong>Prix :</strong> Exprimés en Euros (€) toutes taxes comprises (TTC). Les frais de livraison sont calculés lors du paiement.</li>
            <li><strong>Paiement :</strong> Le règlement s'effectue de manière sécurisée par carte bancaire via le système 3D Secure.</li>
            <li><strong>Livraison :</strong> Expédition sous 24h ouvrées. Livraisons effectuées par DHL Express.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-lg text-rose-950 mb-3">5. Droit de Rétractation et Retours</h2>
          <p>
            Conformément à la législation européenne, vous disposez d'un délai de 14 jours francs à compter de la réception de votre commande pour exercer votre droit de rétractation. Pour des raisons évidentes d'hygiène, <strong>les perruques et extensions capillaires ne doivent avoir été ni portées, ni découpées (Lace intacte), ni modifiées ou lavées</strong>. Tout produit retourné non conforme sera refusé.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg text-rose-950 mb-3">6. Données Personnelles (RGPD)</h2>
          <p>
            Les informations recueillies sont nécessaires au traitement de vos commandes. Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles, exerçable en nous contactant à l'adresse <code>privacy@diakhou-hair.com</code>.
          </p>
        </section>

      </div>
    </div>
  );
}
