import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User as UserIcon, LogIn, UserPlus } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-[#FCF9FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to home */}
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center gap-2 text-rose-950 hover:text-rose-600 transition-colors text-sm font-bold uppercase tracking-widest cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center justify-center text-center">
          <Link to="/" className="cursor-pointer">
            <h2 className="font-serif font-black text-rose-950 text-4xl leading-none tracking-tighter">DIAKHOU</h2>
            <p className="font-sans font-bold text-rose-400 text-[10px] tracking-[0.3em] uppercase leading-none mt-1">HAIR & BEAUTY</p>
          </Link>
          <h2 className="mt-8 text-center text-3xl font-serif font-bold text-rose-950">
            {isLogin ? "Bon retour parmi nous" : "Créer votre compte"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            {isLogin ? "Accédez à votre espace exclusif." : "Rejoignez l'élite de la coiffure haute couture."}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-2xl sm:rounded-[32px] sm:px-10 border border-rose-100">
          
          {/* Toggle Login / Register */}
          <div className="flex p-1 bg-rose-50/50 rounded-full mb-8 border border-rose-100/60">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                isLogin ? "bg-white text-rose-950 shadow-xs border border-rose-100" : "text-rose-400 hover:text-rose-600"
              }`}
            >
              Se Connecter
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                !isLogin ? "bg-white text-rose-950 shadow-xs border border-rose-100" : "text-rose-400 hover:text-rose-600"
              }`}
            >
              S'inscrire
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Full Name field (Only on register) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-rose-950 uppercase tracking-widest mb-1.5">
                  Nom Complet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-rose-300" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-200 sm:text-sm bg-[#FFFBFB] text-rose-950 placeholder-rose-300 transition-all outline-hidden"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-rose-950 uppercase tracking-widest mb-1.5">
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-rose-300" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-200 sm:text-sm bg-[#FFFBFB] text-rose-950 placeholder-rose-300 transition-all outline-hidden"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-rose-950 uppercase tracking-widest mb-1.5">
                Mot de Passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-rose-300" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-200 sm:text-sm bg-[#FFFBFB] text-rose-950 placeholder-rose-300 transition-all outline-hidden"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-rose-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Se souvenir de moi
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-rose-950 hover:bg-rose-900 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-rose-900 transition-colors uppercase tracking-widest cursor-pointer"
              >
                {isLogin ? (
                  <>
                    <LogIn className="w-5 h-5" />
                    Se connecter
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Créer mon compte
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
