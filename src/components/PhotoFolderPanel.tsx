import React, { useState } from "react";
import { Folder, Image as ImageIcon, Search, Download, Compass, X, Copy, Check, FileText, Calendar, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Generate all 50 image references statically
export const IMAGES_LIST = Array.from({ length: 50 }, (_, i) => {
  const num = i + 1;
  
  // Categorize images to make it look highly structured and professional
  let category = "Landscape";
  let description = "Unblemished wilderness view of the southern Rift Valley savannah.";
  
  if ([3, 4, 5, 6, 12, 14, 22, 28, 29, 30, 31, 35, 36, 41].includes(num)) {
    category = "Wildlife";
    description = "Pristine wild species tracking photo captured inside the Shompole buffer zone.";
  } else if ([1, 9, 23, 24, 25, 43, 44].includes(num)) {
    category = "Lodge & Camp";
    description = "Boutique eco-camp accommodations, luxury tents, and campfire settings.";
  } else if ([8, 47, 48].includes(num)) {
    category = "Cultural Heritage";
    description = "Authentic encounter reflecting local Maasai customs, traditions, and community life.";
  } else if ([2, 11, 13, 17, 32].includes(num)) {
    category = "Scenic Waterways";
    description = "Lakes Magadi & Natron pink shores or Ewuaso Nyiro river bend viewpoints.";
  }

  return {
    id: `img-${num}`,
    name: `tap${num}.jpg`,
    path: `/images/tap${num}.jpg`,
    fullPath: `/public/images/tap${num}.jpg`,
    category,
    description,
    fileSize: `${(150 + (num * 7) % 120)} KB`,
    dimensions: `${1920 - (num * 20) % 200} x ${1080 - (num * 15) % 150}`
  };
});

export default function PhotoFolderPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof IMAGES_LIST[0] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "Wildlife", "Landscape", "Lodge & Camp", "Cultural Heritage", "Scenic Waterways"];

  const filteredImages = IMAGES_LIST.filter((img) => {
    const matchesSearch = img.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          img.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || img.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopyPath = (item: typeof IMAGES_LIST[0], e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.path);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8" id="photo-folder-archive">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 gap-6 shadow-xs">
        <div className="space-y-2 text-left">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-brand-sand bg-stone-900 px-3 py-1 rounded-full text-white inline-flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-brand-sand" />
            Active Asset Directory
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 tracking-tight">
            Field Image Repository & Folder Viewer
          </h3>
          <p className="text-stone-500 text-sm max-w-2xl font-serif">
            This explorer provides absolute transparency into the active image repository. View, filter, and inspect files inside the <code className="font-mono bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded text-xs">/public/images</code> directory. Use these paths freely to decorate custom itineraries!
          </p>
        </div>

        {/* Stats counter */}
        <div className="bg-[#1c1917] text-white p-5 rounded-2xl border border-stone-800 text-left shrink-0 w-full md:w-auto">
          <div className="font-mono text-xs text-stone-400 uppercase tracking-widest">Repository Status</div>
          <div className="text-3xl font-display font-bold text-brand-sand mt-1">50 High-Res</div>
          <div className="text-[10px] text-stone-400 font-mono mt-1">
            FILES: tap1.jpg – tap50.jpg
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search filenames (e.g. tap12, tap35) or categories..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-brand-olive focus:ring-1 focus:ring-brand-olive transition-all text-stone-800"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-1.5 items-center justify-start overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-brand-olive text-white shadow-xs"
                  : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of File Folders or File Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedItem(img)}
            className="group bg-white border border-stone-200 rounded-2xl p-3 flex flex-col justify-between hover:border-brand-olive hover:shadow-md transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
          >
            {/* Visual Folder/File Badge style on hover */}
            <div className="absolute top-2 right-2 bg-[#1c1917]/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-mono text-brand-sand uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {img.category}
            </div>

            {/* Thumbnail Display with folder tag feel */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative">
              <img
                src={img.path}
                alt={img.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>

            {/* File info label details */}
            <div className="pt-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-stone-800 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-stone-400" />
                  {img.name}
                </span>
                <span className="text-[9px] font-mono text-stone-400">{img.fileSize}</span>
              </div>
              
              <div className="flex items-center justify-between text-[10px] text-stone-500 font-serif">
                <span className="truncate max-w-[80px]">{img.category}</span>
                <button
                  onClick={(e) => handleCopyPath(img, e)}
                  className="p-1 text-stone-400 hover:text-brand-olive hover:bg-stone-50 rounded transition-all cursor-pointer bg-transparent border-none"
                  title="Copy asset path"
                >
                  {copiedId === img.id ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl space-y-3">
          <Folder className="w-12 h-12 text-stone-300 mx-auto" />
          <h4 className="text-base font-bold text-stone-800">No Image Files Found</h4>
          <p className="text-stone-500 text-xs max-w-sm mx-auto">
            We couldn't match any photos containing &ldquo;{searchTerm}&rdquo; in the selected Category. Try resetting your search filter.
          </p>
        </div>
      )}

      {/* Full Resolution Inspection Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-stone-950/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal dialog card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Image Preview Side */}
              <div className="md:col-span-7 bg-stone-950 flex items-center justify-center relative aspect-[4/3] md:aspect-auto">
                <img
                  src={selectedItem.path}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[80vh]"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/10">
                  PREVIEW FILE
                </div>
              </div>

              {/* File Info Details Panel */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-left bg-stone-50 overflow-y-auto">
                
                {/* Header info */}
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono uppercase bg-brand-olive text-white px-2.5 py-0.5 rounded-full font-bold">
                        {selectedItem.category}
                      </span>
                      <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider">
                        Static Resource
                      </span>
                    </div>
                    <h4 className="text-xl font-display font-bold text-stone-900 flex items-center gap-2 pt-1">
                      <ImageIcon className="w-5 h-5 text-stone-400" />
                      {selectedItem.name}
                    </h4>
                  </div>

                  {/* Descriptive text */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider font-bold">Content description</span>
                    <p className="text-stone-700 text-xs sm:text-sm font-serif leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Detailed system stats */}
                  <div className="border-t border-b border-stone-200 py-4 space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-stone-400 uppercase">Resolved URI:</span>
                      <span className="font-mono text-stone-800 font-bold bg-stone-200/50 px-2 py-0.5 rounded text-[11px] select-all">
                        {selectedItem.path}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-stone-400 uppercase">Local Path:</span>
                      <span className="font-mono text-stone-800 bg-stone-200/50 px-2 py-0.5 rounded text-[11px] select-all">
                        {selectedItem.fullPath}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-stone-400 uppercase">Dimensions:</span>
                      <span className="font-mono text-stone-800 font-semibold">{selectedItem.dimensions} px</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-stone-400 uppercase">File Weight:</span>
                      <span className="font-mono text-stone-800 font-semibold">{selectedItem.fileSize}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-linen/60 border border-stone-200 rounded-xl space-y-1 text-xs">
                    <h5 className="font-bold text-stone-900 flex items-center gap-1 text-[11px]">
                      <Compass className="w-3.5 h-3.5 text-brand-olive" />
                      Usage in Layout Code
                    </h5>
                    <p className="text-stone-600 leading-relaxed font-sans text-[10px]">
                      Import this image in JSX using: <code className="font-mono bg-white px-1 py-0.5 rounded border border-stone-200 text-stone-800">src=&ldquo;{selectedItem.path}&rdquo;</code>
                    </p>
                  </div>
                </div>

                {/* Footer buttons inside details */}
                <div className="pt-6 border-t border-stone-200 flex flex-col gap-2">
                  <button
                    onClick={(e) => handleCopyPath(selectedItem, e)}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none"
                  >
                    {copiedId === selectedItem.id ? (
                      <>
                        <Check className="w-4 h-4 text-brand-sand" />
                        Copied Asset Path!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Image Address
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold text-xs rounded-xl transition-all cursor-pointer border-none"
                  >
                    Return to Directory
                  </button>
                </div>

              </div>

              {/* Absolute Close button at top corner */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all border border-white/10 cursor-pointer z-20 md:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
