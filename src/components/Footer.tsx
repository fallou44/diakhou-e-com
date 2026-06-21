import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ScanFace, ArrowRight } from "lucide-react";

export default function Footer({ onOpenAIStylist }: { onOpenAIStylist?: () => void }) {
  return (
    <footer className="bg-[#1A0B12] text-pink-50 rounded-t-[40px] mt-16 pt-20 pb-8 px-4 sm:px-6 lg:px-8 shadow-[0_-20px_50px_-15px_rgba(233,30,99,0.1)] relative overflow-hidden" id="main-footer">
      
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16 pb-12 border-b border-white/10">
          <div className="text-center lg:text-left">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-stone-100 mb-3 tracking-tight">
              Rejoignez le Cercle <span className="italic text-rose-300">Diakhou</span>
            </h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Inscrivez-vous pour recevoir nos offres secrètes, nos conseils beauté personnalisés et un accès anticipé à nos nouvelles collections HD Lace.
            </p>
          </div>
          <div className="w-full max-w-md relative group">
            <input 
              type="email" 
              placeholder="Votre adresse email d'exception..." 
              className="w-full bg-white/5 border border-rose-800/60 rounded-full py-4 pl-6 pr-16 text-sm text-stone-100 placeholder-pink-300/50 focus:outline-hidden focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-inner"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-pink-600 hover:bg-pink-500 rounded-full flex items-center justify-center text-stone-100 transition-colors cursor-pointer shadow-md">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-pink-100/10 border border-pink-200/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="font-serif font-black text-2xl leading-none text-stone-100 tracking-tighter">D</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-lg tracking-widest text-stone-100 uppercase leading-none">
                    Diakhou
                  </span>
                  <span className="font-serif italic text-rose-300 font-medium text-xs tracking-wide mt-1 leading-none">
                    Hair & Beauty
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-[13px] text-stone-400 leading-relaxed max-w-xs">
              Maison de haute coiffure spécialisée dans les extensions et perruques premium 100% naturelles. L'excellence de la texture, l'art de la pose.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-rose-900/40 border border-rose-800/50 flex items-center justify-center text-pink-300 hover:bg-pink-600 hover:text-stone-100 hover:border-pink-500 transition-all shadow-xs">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-stone-100 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></span>
              La Maison
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Notre Histoire", path: "/a-propos" },
                { name: "Catalogue E-Shop", path: "/" },
                { name: "Service Client", path: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[13px] text-stone-400 hover:text-stone-100 hover:translate-x-1 inline-block transition-all duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aide & Info */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-stone-100 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></span>
              Informations
            </h4>
            <ul className="space-y-4">
              {[
                { name: "FAQ & Guide d'Entretien", path: "/faq" },
                { name: "Livraison & Retours", path: "/faq" },
                { name: "Mentions Légales & CGV", path: "/mentions-legales" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[13px] text-stone-400 hover:text-stone-100 hover:translate-x-1 inline-block transition-all duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={onOpenAIStylist}
                  className="group relative w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-stone-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(233,30,99,0.3)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <ScanFace className="w-4 h-4 relative z-10" /> 
                  <span className="relative z-10">Consultation IA</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-stone-100 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></span>
              Contact
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3.5 text-[13px] text-stone-400">
                <div className="w-8 h-8 rounded-full bg-rose-900/40 border border-rose-800/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-rose-300" />
                </div>
                <span className="leading-relaxed mt-1">12 Avenue Montaigne<br />75008 Paris, France</span>
              </li>
              <li className="flex items-center gap-3.5 text-[13px] text-stone-400">
                <div className="w-8 h-8 rounded-full bg-rose-900/40 border border-rose-800/30 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-rose-300" />
                </div>
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3.5 text-[13px] text-stone-400">
                <div className="w-8 h-8 rounded-full bg-rose-900/40 border border-rose-800/30 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-rose-300" />
                </div>
                <span>contact@diakhou-hair.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-stone-500 uppercase tracking-widest font-medium">
            &copy; {new Date().getFullYear()} Diakhou Hair & Beauty. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <span className="text-2xl drop-shadow-xs">💳</span>
            <span className="text-2xl drop-shadow-xs">🍏</span>
            <span className="text-2xl drop-shadow-xs">📦</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
