import React from "react";
import { Heart, MessageCircle } from "lucide-react";

export default function InstagramFeed() {
  const instagramPosts = [
    { id: 1, img: "https://images.unsplash.com/photo-1595959183075-c1d09e57ad44?auto=format&fit=crop&q=80&w=400", likes: 1240, comments: 45 },
    { id: 2, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400", likes: 890, comments: 23 },
    { id: 3, img: "https://images.unsplash.com/photo-1605497746444-ac9dbd3d4401?auto=format&fit=crop&q=80&w=400", likes: 2100, comments: 120 },
    { id: 4, img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400", likes: 1560, comments: 67 },
    { id: 5, img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400", likes: 3420, comments: 198 },
  ];

  return (
    <section className="bg-white py-16 border-t border-rose-50">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-rose-950">Suivez notre Mouvement</h2>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm text-rose-500 font-bold hover:underline mt-2 inline-block">@diakhou_hair_beauty</a>
      </div>

      <div className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
        <div className="flex w-full min-w-max">
          {instagramPosts.map((post) => (
            <a 
              key={post.id} 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="relative w-48 h-48 md:w-64 md:h-64 sm:flex-1 shrink-0 group overflow-hidden cursor-pointer snap-center"
            >
              <img 
                src={post.img} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Heart className="w-5 h-5 fill-white" />
                  {post.likes}
                </div>
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  {post.comments}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
