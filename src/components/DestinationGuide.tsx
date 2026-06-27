import { MapPin, ArrowUpRight } from "lucide-react";
import { DESTINATIONS } from "../data";
import { Destination } from "../types";
import { useState } from "react";
import DetailModal from "./DetailModal";

export default function DestinationGuide() {
  const [activeDest, setActiveDest] = useState<Destination | null>(null);

  return (
    <div className="space-y-10" id="destinations-section">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-sand">Discover Kenya's Deep Southern Rift Valley</span>
        <h3 className="text-3xl lg:text-4xl font-display font-bold text-stone-900 tracking-tight">
          Untamed Destinations
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed">
          From blinding salt flats to riverine canopies, explore pristine ecosystems managed solely by the Maasai communities who call them home.
        </p>
      </div>

      {/* Grid displaying the destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESTINATIONS.map((dest) => (
          <div 
            key={dest.id}
            onClick={() => setActiveDest(dest)}
            className="group bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-brand-olive/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Image with overlay */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-stone-200 px-2.5 py-1 rounded-full text-[10px] font-mono text-brand-olive font-semibold shadow-sm">
                  <MapPin className="w-3 h-3 text-brand-sand" />
                  Southern Great Rift Valley
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 space-y-3 text-left">
                <h4 className="text-xl font-display font-bold text-stone-900 tracking-tight">
                  {dest.name}
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                  {dest.description}
                </p>
              </div>
            </div>

            {/* Inclusions / Highlights snippet & action */}
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[10px] text-stone-400 font-mono">
                {dest.highlights.length} Core Wonders
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDest(dest);
                }}
                className="text-xs font-semibold text-brand-olive group-hover:text-brand-sand flex items-center gap-1 cursor-pointer"
              >
                Explore Highlights
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Detail Modal with Folder Photos */}
      <DetailModal 
        isOpen={activeDest !== null}
        onClose={() => setActiveDest(null)}
        type="destination"
        item={activeDest}
      />
    </div>
  );
}
