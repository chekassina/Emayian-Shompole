import { useState } from "react";
import { 
  Sparkles, Calendar, Users, MapPin, Loader2, Check, 
  HelpCircle, Shield, FileText, Gift, DollarSign, Backpack, BookOpen, Clock,
  FolderOpen, Image as ImageIcon, Search, X
} from "lucide-react";
import { CustomItinerary, BookingInquiry } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES_LIST } from "./PhotoFolderPanel";

interface ItineraryPlannerProps {
  onFillBooking: (inquiry: BookingInquiry) => void;
}

export default function ItineraryPlanner({ onFillBooking }: ItineraryPlannerProps) {
  // Planner State
  const [stayType, setStayType] = useState<"weekend_holiday" | "exploration_research">("weekend_holiday");
  const [nights, setNights] = useState<number>(3);
  const [guests, setGuests] = useState<number>(2);
  const [selectedDests, setSelectedDests] = useState<string[]>(["Shompole Conservancy", "Lake Magadi"]);
  const [selectedActs, setSelectedActs] = useState<string[]>(["Wildlife safaris", "Photography"]);
  const [notes, setNotes] = useState<string>("");
  
  // Loading and Result State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<CustomItinerary | null>(null);

  // Swap Image States
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [activeDayIdx, setActiveDayIdx] = useState<number | null>(null);
  const [imageSearch, setImageSearch] = useState<string>("");
  const [imageCategory, setImageCategory] = useState<string>("All");

  const destinations = [
    "Shompole Conservancy",
    "Lake Magadi",
    "Lake Natron",
    "Ewuaso Nyiro River",
    "Oldonyio Sambu Mountains",
    "Maasai Cultural Villages"
  ];

  const activities = [
    "Wildlife safaris",
    "Cultural tours",
    "Hiking adventures",
    "Photography",
    "Wildlife tracking",
    "Geothermal mud bathing",
    "Scientific research"
  ];

  // Adjust nights based on stay type rule
  const handleStayTypeChange = (type: "weekend_holiday" | "exploration_research") => {
    setStayType(type);
    if (type === "weekend_holiday") {
      setNights(prev => Math.min(prev, 5));
    } else {
      setNights(prev => Math.max(prev, 7));
    }
  };

  const toggleDestination = (dest: string) => {
    setSelectedDests(prev => 
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  const toggleActivity = (act: string) => {
    setSelectedActs(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const generateAIEstimate = async () => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const response = await fetch("/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stayType,
          nights,
          destinations: selectedDests,
          activities: selectedActs,
          guests,
          specialRequirements: notes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate your personalized itinerary.");
      }

      setItinerary(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Ensure you have configured your Gemini API Key in the Secrets Panel.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerBookThis = () => {
    if (!itinerary) return;
    
    // Auto-fill the form in the parent state
    onFillBooking({
      fullName: "",
      email: "",
      phone: "",
      stayType,
      nights,
      guests,
      destinations: selectedDests,
      activities: selectedActs,
      specialRequirements: `Auto-filled from custom itinerary: "${itinerary.title}". Special request context: ${notes}`
    });

    // Scroll smoothly to form
    const formElement = document.getElementById("booking-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-brand-linen border border-stone-200 rounded-3xl p-6 lg:p-10 shadow-sm relative overflow-hidden" id="itinerary-planner">
      {/* Subtle organic background grids */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-olive/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-sand/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-olive/10 text-brand-olive border border-brand-olive/10 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Customizer
            </span>
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-stone-900 tracking-tight">
              Personalized Guest Itinerary Designer
            </h3>
            <p className="text-stone-500 text-sm mt-1">
              Co-create your perfect adventure with our Maasai Chief Safari Curator, Ololoolo.
            </p>
          </div>
        </div>

        {/* Configuration grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configurator inputs */}
          <div className="space-y-6">
            {/* Stay type selector with custom constraints */}
            <div>
              <label className="block text-stone-700 font-medium text-sm mb-3">
                1. Select Adventure Focus & Duration Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleStayTypeChange("weekend_holiday")}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    stayType === "weekend_holiday"
                      ? "bg-brand-olive/10 border-brand-olive text-stone-900 ring-2 ring-brand-olive/10"
                      : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">Holiday / Weekend Stay</span>
                    <Clock className="w-4 h-4 text-brand-olive" />
                  </div>
                  <span className="text-xs text-stone-500 leading-normal block">
                    Luxury rejuvenation and escapes. Standard holiday breaks capped at <strong>5 nights max</strong>.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStayTypeChange("exploration_research")}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    stayType === "exploration_research"
                      ? "bg-brand-olive/10 border-brand-olive text-stone-900 ring-2 ring-brand-olive/10"
                      : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">Exploration & Research</span>
                    <BookOpen className="w-4 h-4 text-brand-olive" />
                  </div>
                  <span className="text-xs text-stone-500 leading-normal block">
                    Detailed field studies, photography logs, or ecological tracking. Can stay <strong>weeks up to months</strong>.
                  </span>
                </button>
              </div>
            </div>

            {/* Slider with dynamic constraints */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-stone-700 font-medium">
                  2. Number of Nights to Stay
                </label>
                <span className="font-mono text-brand-olive font-semibold bg-brand-olive/10 px-2 py-0.5 rounded border border-brand-olive/10">
                  {nights} {nights === 1 ? "Night" : "Nights"}
                </span>
              </div>
              
              <input
                type="range"
                min={stayType === "weekend_holiday" ? 1 : 6}
                max={stayType === "weekend_holiday" ? 5 : 90}
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full accent-brand-olive cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
                {stayType === "weekend_holiday" ? (
                  <>
                    <span>Min: 1 night</span>
                    <span className="text-brand-olive/80">Weekend/Holiday Limit: 5 nights max</span>
                  </>
                ) : (
                  <>
                    <span>Min: 6 nights</span>
                    <span>Max: 90 nights (3 months)</span>
                  </>
                )}
              </div>
            </div>

            {/* Guest count */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-stone-700 font-medium">
                  3. Total Guests
                </label>
                <span className="font-mono text-brand-olive font-semibold bg-brand-olive/10 px-2 py-0.5 rounded border border-brand-olive/10">
                  {guests} {guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-brand-olive cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
                <span>1 Traveler</span>
                <span>Group/Family: 12 Guests Max</span>
              </div>
            </div>

            {/* Destination Checklist */}
            <div>
              <label className="block text-stone-700 font-medium text-sm mb-3">
                4. Select Shompole Destinations to Include
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => toggleDestination(dest)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                      selectedDests.includes(dest)
                        ? "bg-brand-olive/10 border-brand-olive/40 text-stone-900"
                        : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      selectedDests.includes(dest) 
                        ? "border-brand-olive bg-brand-olive text-white" 
                        : "border-stone-300 bg-transparent"
                    }`}>
                      {selectedDests.includes(dest) && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    {dest}
                  </button>
                ))}
              </div>
              {selectedDests.length === 0 && (
                <p className="text-xs text-brand-sand mt-1.5 flex items-center gap-1 font-semibold">
                  * Please select at least one destination to focus your guide.
                </p>
              )}
            </div>

            {/* Activities Checklist */}
            <div>
              <label className="block text-stone-700 font-medium text-sm mb-3">
                5. Highlight Preferred Experiences
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {activities.map((act) => (
                  <button
                    key={act}
                    type="button"
                    onClick={() => toggleActivity(act)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-left text-[11px] transition-all cursor-pointer ${
                      selectedActs.includes(act)
                        ? "bg-brand-olive/10 border-brand-olive/40 text-stone-900"
                        : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all ${
                      selectedActs.includes(act) 
                        ? "border-brand-olive bg-brand-olive text-white" 
                        : "border-stone-300 bg-transparent"
                    }`}>
                      {selectedActs.includes(act) && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-stone-700 font-medium text-sm mb-2">
                6. Custom Research Goals or Special Interests
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., focus on ornithology / birding, recording traditional songs, tracking leopards at night, mobility limits, dietary needs..."
                rows={3}
                className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand-olive focus:ring-1 focus:ring-brand-olive transition-all"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateAIEstimate}
              disabled={isLoading || selectedDests.length === 0}
              className="w-full py-4 bg-brand-olive hover:bg-stone-800 text-white font-semibold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-display"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Consulting Guide Elder Ololoolo...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-brand-sand" />
                  Generate AI Custom Itinerary
                </>
              )}
            </button>
          </div>

          {/* Display Output panel */}
          <div className="bg-white border border-stone-200 rounded-3xl p-4 lg:p-6 flex flex-col justify-between min-h-[450px]">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 h-full space-y-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-brand-olive/20 border-t-brand-olive animate-spin"></div>
                    <Sparkles className="w-6 h-6 text-brand-sand absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-semibold text-stone-900">Curating Your Maasai Expedition...</h4>
                    <p className="text-stone-500 text-xs max-w-sm mt-2 leading-relaxed">
                      Elders are compiling mapping coordinates, tracking predator movements, arranging community boma guides, and estimating traditional conservation contributions.
                    </p>
                  </div>
                  <div className="space-y-1 w-full max-w-xs pt-4">
                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-olive to-brand-sand animate-[pulse_1.5s_infinite]" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">Status: Formulating full-stack response...</span>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-red-900 font-semibold font-display">Itinerary Creation Interrupted</h4>
                    <p className="text-stone-600 text-xs mt-2 leading-relaxed max-w-sm">
                      {error}
                    </p>
                  </div>
                  <button 
                    onClick={generateAIEstimate}
                    className="px-4 py-2 bg-brand-olive hover:bg-stone-800 text-white rounded-xl text-xs transition-all cursor-pointer font-medium"
                  >
                    Retry Consulting Guide
                  </button>
                </motion.div>
              )}

              {!itinerary && !isLoading && !error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 h-full flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-olive/10 flex items-center justify-center text-brand-olive border border-brand-olive/10">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="max-w-sm">
                    <h4 className="text-stone-900 font-display font-medium text-lg italic">Your Bespoke Journey Awaits</h4>
                    <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                      Select your travel dates, preferred Rift destinations, and adventure activities, then hit the generate button. Our AI will craft an authentic local plan instantly.
                    </p>
                  </div>
                </motion.div>
              )}

              {itinerary && !isLoading && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 overflow-y-auto max-h-[550px] pr-2 text-left"
                >
                  {/* Top summary card */}
                  <div className="border-b border-stone-100 pb-4">
                    <h4 className="text-xl font-display font-bold text-brand-olive tracking-tight leading-snug">
                      {itinerary.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      <span className="text-[10px] bg-stone-50 text-stone-600 font-mono px-2 py-0.5 rounded-lg border border-stone-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brand-olive" />
                        {nights} Nights
                      </span>
                      <span className="text-[10px] bg-stone-50 text-stone-600 font-mono px-2 py-0.5 rounded-lg border border-stone-200 flex items-center gap-1">
                        <Users className="w-3 h-3 text-brand-olive" />
                        {guests} Guests
                      </span>
                      <span className="text-[10px] bg-brand-olive/10 text-brand-olive font-mono px-2 py-0.5 rounded-lg border border-brand-olive/10">
                        {stayType === "weekend_holiday" ? "Weekend / Holiday" : "Research & Field Study"}
                      </span>
                    </div>
                    <p className="text-stone-700 text-xs italic leading-relaxed mt-4 bg-brand-linen p-3.5 rounded-2xl border border-stone-200 font-serif">
                      &ldquo;{itinerary.overview}&rdquo;
                    </p>
                  </div>

                  {/* Day by Day presentation */}
                  <div className="space-y-6">
                    <h5 className="text-xs font-mono uppercase text-stone-400 tracking-wider">
                      The Daily Trail
                    </h5>
                    {itinerary.days.map((day, idx) => (
                      <div key={day.dayNumber} className="border-l-2 border-brand-olive/30 pl-4 py-3 hover:border-brand-olive transition-all flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-brand-olive">
                              DAY {day.dayNumber}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono bg-stone-100 px-2 py-0.5 rounded-md">
                              {day.accommodation}
                            </span>
                          </div>
                          <h6 className="text-sm font-semibold text-stone-900 mt-1 font-display">
                            {day.title}
                          </h6>
                          <p className="text-stone-600 text-xs leading-relaxed mt-1.5 font-serif">
                            {day.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {day.meals.map((meal) => (
                              <span key={meal} className="text-[9px] bg-stone-200/60 text-stone-600 px-1.5 py-0.5 rounded font-mono">
                                {meal}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Day Image Display with Swap Control */}
                        <div className="w-full md:w-36 shrink-0 space-y-1.5 text-center">
                          <div className="relative aspect-[4/3] w-full md:w-36 md:h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 group">
                            <img 
                              src={day.image || "/images/tap1.jpg"} 
                              alt={day.title} 
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-[#1c1917]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                onClick={() => {
                                  setActiveDayIdx(idx);
                                  setIsSelectorOpen(true);
                                }}
                                className="px-2 py-1 bg-brand-sand text-stone-950 font-mono text-[9px] rounded shadow-xs font-bold hover:bg-white transition-all border-none cursor-pointer"
                              >
                                Change Image
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setActiveDayIdx(idx);
                              setIsSelectorOpen(true);
                            }}
                            className="text-[10px] font-mono text-brand-olive hover:text-stone-900 flex items-center justify-center gap-1 mx-auto bg-transparent border-none cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            Swap Photo
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Optional Research Focus block */}
                  {itinerary.researchFocus && (
                    <div className="p-4 bg-brand-linen/80 border border-brand-olive/10 rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-1.5 text-brand-olive text-xs font-semibold">
                        <BookOpen className="w-4 h-4 text-brand-sand" />
                        ECOLOGICAL & FIELD WORK GUIDANCE
                      </div>
                      <p className="text-stone-700 text-xs leading-relaxed font-serif">
                        {itinerary.researchFocus}
                      </p>
                    </div>
                  )}

                  {/* Packing List */}
                  <div>
                    <h5 className="text-xs font-mono uppercase text-stone-400 tracking-wider mb-2.5 flex items-center gap-1 font-bold">
                      <Backpack className="w-3.5 h-3.5 text-brand-sand" />
                      Recommended Packing Gear
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {itinerary.packingList.map((item, idx) => (
                        <li key={idx} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-brand-olive shrink-0 mt-0.5" />
                          <span className="font-serif">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Conservation block */}
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold">
                      <Gift className="w-4 h-4" />
                      COMMUNITY CONSERVATION IMPACT
                    </div>
                    <p className="text-emerald-950 text-xs leading-relaxed font-serif">
                      {itinerary.conservationContribution}
                    </p>
                  </div>

                  {/* Bottom booking actions and pricing */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-linen/80 p-4 rounded-2xl">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 font-mono block">Estimated Cost Per Person</span>
                      <span className="text-2xl font-display font-bold text-stone-900 flex items-center">
                        <DollarSign className="w-5 h-5 text-brand-olive -mr-1" />
                        {itinerary.estimatedPriceUSD.toLocaleString()}
                        <span className="text-xs text-stone-500 font-normal ml-1 font-sans">USD</span>
                      </span>
                    </div>

                    <button
                      onClick={triggerBookThis}
                      className="px-5 py-3 bg-brand-sand hover:bg-brand-olive text-stone-950 hover:text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer font-display"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Reserve This Custom Plan
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Local Image Vault Selector Modal */}
      <AnimatePresence>
        {isSelectorOpen && activeDayIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSelectorOpen(false);
                setActiveDayIdx(null);
              }}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="bg-[#1c1917] p-6 text-left text-white flex justify-between items-center shrink-0">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-sand font-bold flex items-center gap-1.5">
                    <FolderOpen className="w-3.5 h-3.5 text-brand-sand" />
                    Day {activeDayIdx + 1} Image Swap
                  </span>
                  <h4 className="text-lg font-display font-bold text-white">
                    Select a Local Photo from public/images/
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setIsSelectorOpen(false);
                    setActiveDayIdx(null);
                  }}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-full transition-colors cursor-pointer border-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Filters / Search Bar */}
              <div className="p-4 bg-stone-50 border-b border-stone-100 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shrink-0">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search folder file names or categories..."
                    value={imageSearch}
                    onChange={(e) => setImageSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-olive transition-all text-stone-800"
                  />
                </div>
                
                <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0 whitespace-nowrap max-w-full">
                  {["All", "Wildlife", "Landscape", "Lodge & Camp", "Cultural Heritage", "Scenic Waterways"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setImageCategory(cat)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer border ${
                        imageCategory === cat
                          ? "bg-brand-olive text-white border-brand-olive shadow-xs"
                          : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid content */}
              <div className="flex-1 p-6 overflow-y-auto bg-stone-50 text-left">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {IMAGES_LIST.filter((img) => {
                    const matchesSearch = img.name.toLowerCase().includes(imageSearch.toLowerCase()) || img.category.toLowerCase().includes(imageSearch.toLowerCase());
                    const matchesCategory = imageCategory === "All" || img.category === imageCategory;
                    return matchesSearch && matchesCategory;
                  }).map((img) => (
                    <div
                      key={img.id}
                      onClick={() => {
                        if (activeDayIdx !== null && itinerary) {
                          const updatedDays = [...itinerary.days];
                          updatedDays[activeDayIdx] = {
                            ...updatedDays[activeDayIdx],
                            image: img.path
                          };
                          setItinerary({
                            ...itinerary,
                            days: updatedDays
                          });
                          setIsSelectorOpen(false);
                          setActiveDayIdx(null);
                        }
                      }}
                      className="group bg-white border border-stone-200 rounded-xl p-2 cursor-pointer hover:border-brand-olive hover:shadow-sm transition-all"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 relative">
                        <img
                          src={img.path}
                          alt={img.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-1.5 right-1.5 bg-stone-900/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-brand-sand uppercase tracking-wider">
                          {img.category}
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-stone-700 truncate max-w-[120px]">
                          {img.name}
                        </span>
                        <span className="text-[9px] font-mono text-stone-400">
                          {img.fileSize}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-stone-100 border-t border-stone-200 text-right shrink-0 flex justify-between items-center">
                <span className="text-[10px] font-mono text-stone-500 uppercase">
                  Click on any image to apply to Day {activeDayIdx + 1}
                </span>
                <button
                  onClick={() => {
                    setIsSelectorOpen(false);
                    setActiveDayIdx(null);
                  }}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs transition-colors cursor-pointer border-none"
                >
                  Cancel Selection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
