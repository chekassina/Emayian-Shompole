import { useState } from "react";
import { BLOG_ARTICLES } from "../data";
import { BlogArticle } from "../types";
import { BookOpen, Calendar, User, Clock, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BlogPanel() {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  return (
    <div className="space-y-10" id="blog-section">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-sand">Shompole Conservation & Field Notes</span>
        <h3 className="text-3xl lg:text-4xl font-display font-bold text-stone-900 tracking-tight">
          Blog & Southern Rift Field Guides
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed">
          Deepen your understanding of Maasai tribal age-sets, conservation biology dynamics, wetland migrations, and practical wilderness preparation.
        </p>
      </div>

      {/* Blog Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_ARTICLES.map((article) => (
          <div 
            key={article.id}
            className="group bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-brand-olive/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-brand-olive text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {article.category}
                </div>
              </div>

              {/* Contents */}
              <div className="p-5 space-y-3 text-left">
                <div className="flex items-center gap-3 text-stone-400 text-[10px] font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                
                <h4 className="text-lg font-display font-bold text-stone-900 tracking-tight group-hover:text-brand-olive transition-colors line-clamp-2">
                  {article.title}
                </h4>
                
                <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Read actions */}
            <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-mono flex items-center gap-1">
                <User className="w-3 h-3 text-brand-sand" />
                By {article.author.split(" (")[0]}
              </span>
              
              <button
                onClick={() => setActiveArticle(article)}
                className="text-xs font-semibold text-brand-olive group-hover:text-brand-sand flex items-center gap-1 cursor-pointer"
              >
                Read Article
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            {/* Drawer/Dialog Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-brand-linen border border-stone-200 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col text-left"
            >
              {/* Close header button */}
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 z-20 bg-stone-900/80 hover:bg-stone-900 text-white p-2 rounded-full border border-stone-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-56 sm:h-72">
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-linen via-brand-linen/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-brand-olive px-2.5 py-1 rounded-full">
                    {activeArticle.category}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 tracking-tight mt-3">
                    {activeArticle.title}
                  </h4>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 space-y-4 max-h-[400px] overflow-y-auto bg-white">
                <div className="flex flex-wrap items-center gap-4 text-stone-500 text-xs font-mono border-b border-stone-100 pb-4">
                  <span className="flex items-center gap-1.5 text-brand-olive">
                    <User className="w-3.5 h-3.5" />
                    Authored by: {activeArticle.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Published: {activeArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {activeArticle.readTime}
                  </span>
                </div>

                <div className="text-stone-700 text-sm leading-relaxed space-y-4 pt-2">
                  <p className="font-semibold text-stone-800 italic border-l-2 border-brand-sand pl-4 py-1 font-serif">
                    &ldquo;{activeArticle.excerpt}&rdquo;
                  </p>
                  <p className="whitespace-pre-line leading-loose text-stone-700 font-serif">
                    {activeArticle.content}
                  </p>
                  <p className="text-stone-500 text-xs">
                    This article was compiled in consultation with the Shompole Elder Councils, local conservancy scouts, and our native field trackers to ensure accurate and ethical cultural and biological representation. All copyright and bead-code ownership rights are held in common by the community Beadwork Matriarch collective and Emayian Shompole.
                  </p>
                </div>
              </div>

              {/* Close Footer */}
              <div className="px-6 py-4 bg-brand-linen border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 bg-brand-olive hover:bg-stone-800 text-white rounded-xl text-xs transition-all font-semibold cursor-pointer"
                >
                  Close Article Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
