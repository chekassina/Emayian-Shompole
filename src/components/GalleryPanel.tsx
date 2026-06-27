import { useState } from "react";
import { IMAGES } from "../data";
import { Camera, Image as ImageIcon, Play, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function GalleryPanel() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    {
      src: IMAGES.shompoleHero,
      title: "Shompole Ridge Overlook",
      category: "Landscape",
      desc: "Our native Maasai scouts monitoring predator movements over the southern savannah at dusk."
    },
    {
      src: IMAGES.magadiFlamingos,
      title: "Lake Magadi Clouds of Pink",
      category: "Wildlife",
      desc: "Lesser Flamingos breeding on the mineral-rich thermal springs of Lake Magadi."
    },
    {
      src: IMAGES.shompoleCamp,
      title: "Emayian Luxury Camp",
      category: "Lodge",
      desc: "Boutique safari canvas under giant yellow fever trees along the river."
    },
    {
      src: IMAGES.shompoleLion,
      title: "Guardian of Shompole",
      category: "Wildlife",
      desc: "A fully grown desert lion roaming the riverine forest thickets of Shompole."
    },
    {
      src: IMAGES.shompoleLeopard,
      title: "The Ghost Leopard",
      category: "Wildlife",
      desc: "Rare nocturnal leopard photographed during a low-light tracking game drive."
    },
    {
      src: IMAGES.shompoleElephant,
      title: "Matriarch River Crossing",
      category: "Wildlife",
      desc: "A massive elephant family migrating along the muddy banks of Ewuaso Nyiro."
    },
    {
      src: IMAGES.maasaiCulture,
      title: "Maasai Jumping Ritual",
      category: "Culture",
      desc: "An authentic 'Adumu' ceremony celebrating young warriors' transition into elder leadership."
    },
    {
      src: IMAGES.shompoleHiking,
      title: "Oldonyio Sambu Ascent",
      category: "Adventure",
      desc: "Trekkers conquering the high volcanic ridges with Shompole Rift valley in the distance."
    }
  ];

  return (
    <div className="space-y-10" id="gallery-section">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-sand">Visual Journal of the Southern Rift</span>
        <h3 className="text-3xl lg:text-4xl font-display font-bold text-stone-900 tracking-tight">
          Safari & Field Gallery
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed">
          Authentic moments captured by our guests, tracking scouts, and conservation researchers across Shompole's diverse ecosystems.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedImage(item.src)}
            className="group relative rounded-3xl overflow-hidden aspect-square border border-stone-200 cursor-pointer bg-stone-100 shadow-sm"
          >
            <img 
              src={item.src} 
              alt={item.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
            />
            {/* Dark gradient overlay for text readability over light/dark photos */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            {/* Icon indicators */}
            <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md border border-stone-700 p-2 rounded-full text-brand-sand opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-3.5 h-3.5" />
            </div>

            {/* Title contents */}
            <div className="absolute bottom-4 left-4 right-4 space-y-1 text-left">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-brand-linen bg-brand-olive border border-brand-olive/20 px-2 py-0.5 rounded">
                {item.category}
              </span>
              <h5 className="text-sm font-semibold text-white tracking-tight leading-snug pt-1 font-display">
                {item.title}
              </h5>
              <p className="text-stone-300 text-[10px] leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-stone-950/90 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-transparent overflow-hidden rounded-3xl z-10"
            >
              <img 
                src={selectedImage} 
                alt="Enlarged gallery capture" 
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto rounded-3xl border border-stone-200" 
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-stone-900/90 hover:bg-stone-950 text-white p-3 rounded-full border border-stone-800 transition-all cursor-pointer text-xs font-semibold"
              >
                ✕ Close Preview
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
