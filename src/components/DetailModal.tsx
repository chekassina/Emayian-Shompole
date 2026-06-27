import { SafariPackage, Destination, WildlifeSpecies } from "../types";
import { useState, useEffect } from "react";
import { 
  X, Check, Clock, Compass, Tag, Info, ShieldCheck, 
  ChevronLeft, ChevronRight, MapPin, Sparkles, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "tour" | "destination" | "wildlife";
  item: SafariPackage | Destination | WildlifeSpecies | null;
  onBookTour?: (pkg: SafariPackage) => void;
}

// Helper to resolve related folder photos for each item
const getFolderPhotos = (type: "tour" | "destination" | "wildlife", item: any): string[] => {
  if (!item) return ["/images/tap1.jpg"];
  
  if (type === "tour") {
    const pkg = item as SafariPackage;
    if (pkg.id === "pkg-1") {
      return ["/images/tap9.jpg", "/images/tap1.jpg", "/images/tap10.jpg", "/images/tap3.jpg"];
    } else if (pkg.id === "pkg-2") {
      return ["/images/tap3.jpg", "/images/tap4.jpg", "/images/tap2.jpg", "/images/tap5.jpg"];
    } else if (pkg.id === "pkg-3") {
      return ["/images/tap8.jpg", "/images/tap14.jpg", "/images/tap9.jpg", "/images/tap12.jpg"];
    } else if (pkg.id === "pkg-4") {
      return ["/images/tap7.jpg", "/images/tap13.jpg", "/images/tap2.jpg", "/images/tap1.jpg"];
    }
  } else if (type === "destination") {
    const dest = item as Destination;
    if (dest.id === "dest-1") {
      return ["/images/tap1.jpg", "/images/tap9.jpg", "/images/tap3.jpg", "/images/tap14.jpg"];
    } else if (dest.id === "dest-2") {
      return ["/images/tap2.jpg", "/images/tap7.jpg", "/images/tap11.jpg", "/images/tap1.jpg"];
    } else if (dest.id === "dest-3") {
      return ["/images/tap11.jpg", "/images/tap2.jpg", "/images/tap1.jpg", "/images/tap13.jpg"];
    } else if (dest.id === "dest-4") {
      return ["/images/tap12.jpg", "/images/tap5.jpg", "/images/tap4.jpg", "/images/tap9.jpg"];
    } else if (dest.id === "dest-5") {
      return ["/images/tap13.jpg", "/images/tap7.jpg", "/images/tap1.jpg", "/images/tap10.jpg"];
    } else if (dest.id === "dest-6") {
      return ["/images/tap14.jpg", "/images/tap8.jpg", "/images/tap12.jpg", "/images/tap9.jpg"];
    }
  } else if (type === "wildlife") {
    const species = item as WildlifeSpecies;
    const name = species.name;
    if (name.includes("Lion")) {
      return ["/images/tap3.jpg", "/images/tap1.jpg", "/images/tap9.jpg", "/images/tap14.jpg"];
    } else if (name.includes("Leopard")) {
      return ["/images/tap4.jpg", "/images/tap3.jpg", "/images/tap12.jpg", "/images/tap10.jpg"];
    } else if (name.includes("Elephant")) {
      return ["/images/tap5.jpg", "/images/tap6.jpg", "/images/tap1.jpg", "/images/tap12.jpg"];
    } else if (name.includes("Giraffe")) {
      return ["/images/tap6.jpg", "/images/tap5.jpg", "/images/tap1.jpg", "/images/tap13.jpg"];
    } else if (name.includes("Flamingo")) {
      return ["/images/tap2.jpg", "/images/tap11.jpg", "/images/tap1.jpg", "/images/tap13.jpg"];
    }
  }
  
  return [item.image || "/images/tap1.jpg"];
};

export default function DetailModal({ isOpen, onClose, type, item, onBookTour }: DetailModalProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  
  // Reset photo index when item changes
  useEffect(() => {
    setActivePhotoIdx(0);
  }, [item]);

  if (!item || !isOpen) return null;

  const photos = getFolderPhotos(type, item);
  const currentPhoto = photos[activePhotoIdx] || item.image;

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Dark Backdrop with blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md cursor-pointer"
          id="detail-modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh] sm:max-h-[85vh] border border-stone-200"
          id="detail-modal-container"
        >
          {/* Header Title with dark/sand banner */}
          <div className="bg-[#1c1917] px-6 py-4 flex items-center justify-between text-left text-white shrink-0">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-sand font-bold flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                Emayian Shompole &bull; {type} Details
              </span>
              <h3 className="text-lg sm:text-xl font-display font-bold tracking-tight text-white leading-none">
                {type === "tour" ? (item as SafariPackage).title : type === "destination" ? (item as Destination).name : (item as WildlifeSpecies).name}
              </h3>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-full transition-all border border-stone-700 cursor-pointer"
              id="close-detail-modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content wrapper */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left bg-stone-50">
            
            {/* Left Column: Folder Photo interactive album */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase text-stone-400 font-bold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-sand" />
                  Interactive Photo Folder
                </h4>
                <p className="text-[11px] text-stone-500 font-serif">
                  Explore genuine, un-retouched visuals from the conservancy.
                </p>
              </div>

              {/* Main Photo Display */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-sm group">
                <img 
                  src={currentPhoto} 
                  alt="Selected folder item" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-500" 
                />
                
                {/* Visual shading overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Left and Right Chevron Controls */}
                {photos.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                      title="Previous Photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                      title="Next Photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Caption / Pagination indicators */}
                <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-mono text-stone-300 border border-stone-800">
                  FILE {activePhotoIdx + 1} OF {photos.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              {photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2.5">
                  {photos.map((ph, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activePhotoIdx === idx 
                          ? "border-brand-olive scale-[1.02] shadow-sm" 
                          : "border-stone-200 opacity-60 hover:opacity-100 hover:scale-[1.01]"
                      }`}
                    >
                      <img 
                        src={ph} 
                        alt="Folder thumbnail" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Deep descriptive data fields */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              {/* Type specific information blocks */}
              <div className="space-y-5">
                
                {/* 1. TOUR DETAILS */}
                {type === "tour" && (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-olive bg-brand-olive/10 border border-brand-olive/10 px-2.5 py-0.5 rounded-full">
                        {(item as SafariPackage).duration} Pre-Curated Safari
                      </span>
                      <h4 className="text-xl font-display font-bold text-stone-950 mt-1">
                        {(item as SafariPackage).title}
                      </h4>
                      <p className="text-stone-500 italic text-xs font-serif leading-relaxed">
                        &ldquo;{(item as SafariPackage).subtitle}&rdquo;
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-[10px] font-mono uppercase text-stone-400 font-bold tracking-wider">
                        Expedition Summary
                      </h5>
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-serif">
                        {(item as SafariPackage).description}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <h5 className="text-[10px] font-mono uppercase text-stone-400 font-bold tracking-wider">
                        Core Package Inclusions
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(item as SafariPackage).inclusions.map((inc, i) => (
                          <li key={i} className="text-xs text-stone-600 flex items-start gap-1.5 font-sans">
                            <Check className="w-3.5 h-3.5 text-brand-olive shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-brand-linen/60 border border-stone-200 rounded-xl flex justify-between items-center text-xs">
                      <span className="font-mono text-stone-500 uppercase tracking-wide">Standard Tariff:</span>
                      <strong className="text-stone-900 font-bold text-sm bg-white px-3 py-1 rounded-lg border border-stone-200">
                        {(item as SafariPackage).priceFrom}
                      </strong>
                    </div>

                    <div className="text-xs text-stone-500">
                      <span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">Key Route Waypoints:</span>
                      <span className="font-serif italic mt-0.5 block">{(item as SafariPackage).destinations.join(" &bull; ")}</span>
                    </div>
                  </>
                )}

                {/* 2. DESTINATION DETAILS */}
                {type === "destination" && (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-sand bg-brand-olive px-2.5 py-0.5 rounded-full text-white">
                        Scenic Rift Valley Gem
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mt-1">
                        {(item as Destination).name}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-[10px] font-mono uppercase text-stone-400 font-bold tracking-wider">
                        Introduction & Geography
                      </h5>
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-serif">
                        {(item as Destination).description}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <h5 className="text-[10px] font-mono uppercase text-stone-400 font-bold tracking-wider">
                        Unmissable Highlights
                      </h5>
                      <ul className="space-y-2">
                        {(item as Destination).highlights.map((hl, i) => (
                          <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-brand-olive/10 text-brand-olive flex items-center justify-center font-mono font-semibold text-[10px] shrink-0 border border-brand-olive/10 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="font-serif leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-brand-linen/60 border border-stone-200 rounded-xl space-y-1.5">
                      <h5 className="text-[10px] font-mono uppercase text-brand-olive tracking-wider flex items-center gap-1.5 font-bold">
                        <Info className="w-4 h-4 text-brand-sand shrink-0" />
                        Essential Visitor Guidelines
                      </h5>
                      <p className="text-stone-700 text-xs leading-relaxed font-sans">
                        {(item as Destination).visitorInfo}
                      </p>
                    </div>
                  </>
                )}

                {/* 3. WILDLIFE DETAILS */}
                {type === "wildlife" && (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-olive bg-brand-olive/10 border border-brand-olive/10 px-2.5 py-0.5 rounded-full">
                        {(item as WildlifeSpecies).category} Species Guide
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mt-1 leading-none">
                        {(item as WildlifeSpecies).name}
                      </h4>
                      <span className="text-[11px] font-mono italic text-brand-sand block">
                        {(item as WildlifeSpecies).scientificName}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-[10px] font-mono uppercase text-stone-400 font-bold tracking-wider">
                        Ecosystem Adaptation
                      </h5>
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-serif">
                        {(item as WildlifeSpecies).description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-white border border-stone-200 rounded-xl text-left space-y-1">
                        <span className="text-[9px] font-mono uppercase text-stone-400 block font-bold">Best Tracking window</span>
                        <p className="text-stone-700 text-xs font-serif leading-relaxed">{(item as WildlifeSpecies).bestTime}</p>
                      </div>
                      <div className="p-3 bg-white border border-stone-200 rounded-xl text-left space-y-1">
                        <span className="text-[9px] font-mono uppercase text-stone-400 block font-bold">Typical Behavior</span>
                        <p className="text-stone-700 text-xs font-serif leading-relaxed">{(item as WildlifeSpecies).behavior}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-left">
                        <h5 className="text-[10px] font-mono uppercase text-emerald-800 font-bold tracking-wide">
                          Protected & Coexisting
                        </h5>
                        <p className="text-emerald-700 text-xs leading-relaxed font-serif">
                          This species is fully protected in our community-patrolled wildlife buffer zone, supported directly by visitor conservation fees.
                        </p>
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Action Drawer bottom */}
              <div className="pt-5 border-t border-stone-200 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                  EMAYIAN SHOMPOLE TRUST &bull; KENYA
                </span>
                
                {type === "tour" && onBookTour ? (
                  <button
                    onClick={() => {
                      onBookTour(item as SafariPackage);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-brand-olive hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border-none"
                  >
                    Configure Booking Reservation
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none"
                  >
                    Close Detail Page
                  </button>
                )}
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
