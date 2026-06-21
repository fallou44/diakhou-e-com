import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl lg:text-5xl font-extrabold text-rose-950 italic mb-4">Contactez-Nous</h1>
        <p className="text-rose-600 max-w-2xl mx-auto text-sm">
          Une question concernant une commande ou besoin d'un conseil personnalisé ? Notre équipe est à votre écoute.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-rose-950 text-white rounded-[32px] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <h2 className="font-serif text-2xl font-bold mb-8">Informations</h2>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <MapPin className="w-5 h-5 text-pink-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase mb-1">Siège & Showroom</h3>
                  <p className="text-xs text-pink-100/80 leading-relaxed">12 Avenue Montaigne<br/>75008 Paris, France<br/>(Sur rendez-vous uniquement)</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <Phone className="w-5 h-5 text-pink-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase mb-1">Service Client</h3>
                  <p className="text-xs text-pink-100/80">+33 1 23 45 67 89<br/>Du Lundi au Vendredi, de 9h à 18h</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <Mail className="w-5 h-5 text-pink-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase mb-1">Email</h3>
                  <p className="text-xs text-pink-100/80">contact@diakhou-hair.com</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <a 
              href="https://wa.me/33600000000" 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-4 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-colors shadow-lg shadow-[#25D366]/20 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              Assistance directe sur WhatsApp
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 md:p-10 rounded-[32px] border border-rose-100 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-rose-950 mb-6">Envoyez-nous un message</h2>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Nom complet</label>
                <input type="text" className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-hidden" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Email</label>
                <input type="email" className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-hidden" placeholder="vous@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Sujet</label>
              <select className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-hidden text-stone-700">
                <option>Question sur un produit</option>
                <option>Suivi de commande</option>
                <option>Demande de partenariat</option>
                <option>Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">Message</label>
              <textarea rows={5} className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-hidden resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
            </div>

            <button type="submit" className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4">
              <Send className="w-4 h-4" />
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
