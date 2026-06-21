import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-rose-950 text-pink-50 pt-16 pb-8 border-t border-rose-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-3xl leading-none text-white tracking-tighter">
                D
              </span>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-lg tracking-wider text-white uppercase leading-none">
                  Diakhou
                </span>
                <span className="font-serif italic text-pink-300 font-bold text-xs tracking-wide mt-0.5 leading-none">
                  Hair & Beauty
                </span>
              </div>
            </div>
            <p className="text-xs text-pink-200/80 leading-relaxed max-w-sm">
              Maison de haute coiffure spécialisée dans les extensions et perruques premium 100% naturelles. L'excellence de la texture, l'art de la pose.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-rose-900 flex items-center justify-center text-pink-200 hover:bg-[#E91E63] hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-rose-900 flex items-center justify-center text-pink-200 hover:bg-[#E91E63] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-rose-900 flex items-center justify-center text-pink-200 hover:bg-[#E91E63] hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Maison Diakhou</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/a-propos" className="text-xs text-pink-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xs text-pink-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  Catalogue E-Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs text-pink-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  Service Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Aide & Info */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Aide & Info</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-xs text-pink-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  FAQ & Guide d'Entretien
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-xs text-pink-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-xs text-pink-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  Mentions Légales & CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs text-pink-200">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                <span>12 Avenue Montaigne<br />75008 Paris, France</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-pink-200">
                <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-pink-200">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <span>contact@diakhou-hair.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rose-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-pink-300/60 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Diakhou Hair & Beauty. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-[20px]">💳</span>
            <span className="text-[20px]">🍏</span>
            <span className="text-[20px]">📦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
