import { useState } from "react";
import { WILDLIFE_SPECIES } from "../data";
import { WildlifeSpecies } from "../types";
import { Eye, Clock, ShieldCheck, Tag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import DetailModal from "./DetailModal";

export default function WildlifeEx() {
  const [activeTab, setActiveTab] = useState<"All" | "Predator" | "Mammal" | "Bird">("All");
  const [activeSpecies, setActiveSpecies] = useState<WildlifeSpecies | null>(null);

  const filteredWildlife = activeTab === "All"
    ? WILDLIFE_SPECIES
    : WILDLIFE_SPECIES.filter(w => w.category === activeTab);

  return (
    <div className="space-y-10" id="wildlife-section">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-olive">Ranger-led Predator & Wetland Safaris</span>
        <h3 className="text-3xl lg:text-4xl font-display font-bold text-stone-900 tracking-tight">
          Southern Rift Wildlife Encounters
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed font-serif">
          The arid landscapes of Shompole hold some of East Africa's most resilient and unique wildlife populations, famous for night activity and desert adaptation.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2">
        {(["All", "Predator", "Mammal", "Bird"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-brand-olive border-brand-olive text-white shadow-sm"
                : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
            }`}
          >
            {tab === "All" ? "All Species" : `${tab}s`}
          </button>
        ))}
      </div>

      {/* Grid of Wildlife */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredWildlife.map((animal) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={animal.name}
              onClick={() => setActiveSpecies(animal)}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-brand-olive/50 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row shadow-xs cursor-pointer group"
            >
              {/* Left Column: Image */}
              <div className="relative w-full md:w-2/5 h-56 md:h-auto overflow-hidden">
                <img
                  src={animal.image}
                  alt={animal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/20 via-transparent to-transparent"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-stone-200 text-brand-olive px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Tag className="w-2.5 h-2.5 text-brand-sand" />
                  {animal.category}
                </div>
              </div>

              {/* Right Column: Information */}
              <div className="p-6 md:w-3/5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-display font-bold text-stone-900 tracking-tight leading-none">
                        {animal.name}
                      </h4>
                      <span className="text-[10px] font-mono italic text-brand-sand mt-1 block">
                        {animal.scientificName}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-brand-olive group-hover:underline flex items-center gap-0.5">
                      Explore Folder <Sparkles className="w-2.5 h-2.5 text-brand-sand animate-pulse" />
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed mt-3 font-serif line-clamp-3">
                    {animal.description}
                  </p>
                </div>

                {/* Tracking stats */}
                <div className="space-y-2 pt-4 border-t border-stone-100 text-[11px]">
                  <div className="flex items-center gap-2 text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-brand-olive shrink-0" />
                    <span>
                      <strong className="text-stone-800">Best Tracking Window:</strong> {animal.bestTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500">
                    <Eye className="w-3.5 h-3.5 text-brand-olive shrink-0" />
                    <span>
                      <strong className="text-stone-800">Typical Behavior:</strong> {animal.behavior}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span className="font-serif text-[10px]">Fully protected in Community Conservancy zones.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Premium Detail Modal with Folder Photos */}
      <DetailModal 
        isOpen={activeSpecies !== null}
        onClose={() => setActiveSpecies(null)}
        type="wildlife"
        item={activeSpecies}
      />
    </div>
  );
}
