import React, { useState, useEffect } from "react";
import { 
  Compass, Calendar, Users, Check, Sparkles, MapPin, Loader2, 
  Phone, Mail, Star, Plus, Minus, Clock, Heart, Info, X, Send,
  ShieldCheck, ArrowRight, HelpCircle, AlertCircle, MessageSquare,
  ChevronDown, Folder
} from "lucide-react";
import { SAFARI_PACKAGES, IMAGES } from "./data";
import { BookingInquiry, SafariPackage } from "./types";
import { motion, AnimatePresence } from "motion/react";

// Import modular components
import ItineraryPlanner from "./components/ItineraryPlanner";
import DestinationGuide from "./components/DestinationGuide";
import WildlifeEx from "./components/WildlifeEx";
import AboutUs from "./components/AboutUs";
import GalleryPanel from "./components/GalleryPanel";
import BlogPanel from "./components/BlogPanel";
import StaffPanel from "./components/StaffPanel";
import DetailModal from "./components/DetailModal";
import PhotoFolderPanel from "./components/PhotoFolderPanel";

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedTour, setSelectedTour] = useState<SafariPackage | null>(null);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState<boolean>(false);

  // Reservation Form State
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [stayType, setStayType] = useState<"weekend_holiday" | "exploration_research">("weekend_holiday");
  const [nights, setNights] = useState<number>(3);
  const [guests, setGuests] = useState<number>(2);
  const [selectedDests, setSelectedDests] = useState<string[]>(["Shompole Conservancy"]);
  const [selectedActs, setSelectedActs] = useState<string[]>(["Wildlife safaris"]);
  const [notes, setNotes] = useState<string>("");

  // Booking Feedback States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ id: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Administrative views state
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navigateTo = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-fill form from customized options
  const handleFillBooking = (inquiry: BookingInquiry) => {
    setFullName(inquiry.fullName || "");
    setEmail(inquiry.email || "");
    setPhone(inquiry.phone || "");
    setStayType(inquiry.stayType);
    setNights(inquiry.nights);
    setGuests(inquiry.guests);
    setSelectedDests(inquiry.destinations);
    setSelectedActs(inquiry.activities);
    setNotes(inquiry.specialRequirements || "");

    // Navigate to booking page and scroll to top
    setActiveTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Quick user feedback message
    const notification = document.getElementById("booking-badge-notif");
    if (notification) {
      notification.classList.remove("hidden");
      setTimeout(() => notification.classList.add("hidden"), 4000);
    }
  };

  // Direct package booking click
  const handleBookPackage = (pkg: SafariPackage) => {
    setStayType(pkg.nights <= 5 ? "weekend_holiday" : "exploration_research");
    setNights(pkg.nights);
    setSelectedDests(pkg.destinations);
    setSelectedActs(pkg.id === "pkg-3" ? ["Cultural tours"] : ["Wildlife safaris"]);
    setNotes(`Interested in pre-curated package: "${pkg.title}". Please quote inclusions.`);
    
    // Navigate to booking page and scroll to top
    setActiveTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handles toggle destinations in form
  const handleToggleFormDest = (dest: string) => {
    setSelectedDests(prev => 
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  // Handles toggle activities in form
  const handleToggleFormAct = (act: string) => {
    setSelectedActs(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  // Submit actual inquiry to API
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    // Business rule validation
    if (stayType === "weekend_holiday" && nights > 5) {
      setSubmitError("Holiday and weekend itineraries are limited to 5 nights max. Choose 'Exploration & Research' for longer durations.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          stayType,
          nights,
          guests,
          destinations: selectedDests,
          activities: selectedActs,
          specialRequirements: notes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to log booking reservation.");
      }

      setSubmitSuccess({ id: data.inquiry.id });
      // Reset fields upon success
      setFullName("");
      setEmail("");
      setPhone("");
      setNotes("");
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong during booking submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-stone-800 font-sans antialiased selection:bg-brand-olive selection:text-white flex flex-col justify-between">
      {/* Dynamic Alert Banner for auto-fill */}
      <div 
        id="booking-badge-notif" 
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-olive text-white font-semibold text-xs px-5 py-3 rounded-full shadow-lg items-center gap-2 hidden flex"
      >
        <Sparkles className="w-4 h-4 text-brand-sand animate-bounce" />
        <span>Custom itinerary loaded into Reservation Desk!</span>
      </div>

      {/* -------------------------------------------------------------
          HEADER & NAVIGATION
          ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#fdfaf5]/90 backdrop-blur-md border-b border-stone-200 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          {/* Logo brand */}
          <button 
            onClick={() => navigateTo("home")} 
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer bg-transparent border-none p-0"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-olive flex items-center justify-center shadow-sm text-white font-serif font-black text-lg group-hover:scale-105 transition-transform">
              ES
            </div>
            <div>
              <h1 className="text-sm font-display font-black tracking-tight uppercase leading-none text-stone-900">
                Emayian Shompole
              </h1>
              <span className="text-[10px] font-mono tracking-wider uppercase text-brand-olive font-semibold block mt-1">
                Safaris &bull; Kenya
              </span>
            </div>
          </button>

          {/* Desktop anchor scrolls with professional dropdown */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-mono tracking-wide text-stone-600 uppercase">
            <button 
              onClick={() => { navigateTo("home"); setIsPagesDropdownOpen(false); }} 
              className={`hover:text-brand-olive transition-colors cursor-pointer bg-transparent border-none ${activeTab === "home" ? "text-brand-olive font-bold border-b-2 border-brand-olive pb-1" : ""}`}
            >
              Home
            </button>
            <button 
              onClick={() => { navigateTo("planner"); setIsPagesDropdownOpen(false); }} 
              className={`hover:text-brand-olive transition-colors cursor-pointer bg-transparent border-none ${activeTab === "planner" ? "text-brand-olive font-bold border-b-2 border-brand-olive pb-1" : ""}`}
            >
              AI Planner
            </button>

            {/* Pages dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsPagesDropdownOpen(true)}
              onMouseLeave={() => setIsPagesDropdownOpen(false)}
            >
              <button 
                onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
                className={`hover:text-brand-olive transition-colors cursor-pointer bg-transparent border-none flex items-center gap-1.5 ${
                  ["tours", "destinations", "wildlife", "about", "blog", "crm", "folder"].includes(activeTab) 
                    ? "text-brand-olive font-bold border-b-2 border-brand-olive pb-1" 
                    : ""
                }`}
              >
                <span>Explore Pages</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isPagesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Highly professional dropdown menu panel */}
              <AnimatePresence>
                {isPagesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[480px] bg-white border border-stone-200 rounded-2xl shadow-xl z-50 p-4 grid grid-cols-12 gap-4"
                  >
                    {/* Left sidebar banner inside dropdown */}
                    <div className="col-span-4 bg-brand-linen/60 border border-stone-100 rounded-xl p-3 flex flex-col justify-between text-left">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-brand-olive font-mono tracking-wider">EMAYIAN TRUST</span>
                        <h4 className="text-xs font-display font-bold text-stone-900 leading-tight">Empowering Maasai Communities</h4>
                      </div>
                      <p className="text-[10px] text-stone-500 font-serif leading-relaxed mt-2">
                        100% community-owned conservancies in Kenya's Rift Valley.
                      </p>
                      <div className="text-[9px] font-mono text-brand-sand font-bold mt-2">
                        SINCE 2012 &bull; PROUDLY COEXISTING
                      </div>
                    </div>

                    {/* Right grid links */}
                    <div className="col-span-8 grid grid-cols-2 gap-2 text-left normal-case">
                      {[
                        { id: "tours", label: "Safari Packages", desc: "Pre-curated trails", icon: Compass, color: "bg-amber-100 text-amber-800" },
                        { id: "destinations", label: "Destinations", desc: "Scenic Rift guides", icon: MapPin, color: "bg-blue-100 text-blue-800" },
                        { id: "wildlife", label: "Wildlife Encounters", desc: "Rare Rift species", icon: Heart, color: "bg-rose-100 text-rose-800" },
                        { id: "about", label: "About Us", desc: "Our conservation story", icon: Users, color: "bg-emerald-100 text-emerald-800" },
                        { id: "blog", label: "Travel Guides", desc: "Expert tips & blog", icon: HelpCircle, color: "bg-indigo-100 text-indigo-800" },
                        { id: "folder", label: "Photo Folder Vault", desc: "Browse 50 repo files", icon: Folder, color: "bg-teal-100 text-teal-800" },
                        { id: "crm", label: "Staff Portal", desc: "Booking management", icon: ShieldCheck, color: "bg-stone-200 text-stone-800" }
                      ].map((page) => {
                        const IconComponent = page.icon;
                        return (
                          <button
                            key={page.id}
                            onClick={() => {
                              navigateTo(page.id);
                              setIsPagesDropdownOpen(false);
                            }}
                            className={`flex items-start gap-2.5 p-2 rounded-xl hover:bg-stone-50 transition-all text-left w-full cursor-pointer bg-transparent border-none ${
                              activeTab === page.id ? "bg-stone-50 border border-stone-200/50" : ""
                            }`}
                          >
                            <span className={`p-1.5 rounded-lg shrink-0 ${page.color}`}>
                              <IconComponent className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <h5 className="text-[11px] font-bold text-stone-900 leading-none font-display">
                                {page.label}
                              </h5>
                              <span className="text-[9px] text-stone-400 block mt-1 leading-tight font-serif">
                                {page.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action Call buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/254712345678?text=I'm%20interested%20in%20Emayian%20Shompole%20Safaris"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => navigateTo("booking")}
              className="px-4 py-2 bg-brand-olive hover:bg-stone-850 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer border-none"
            >
              Book Now
            </button>

            {/* Hamburger button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 hover:text-brand-olive focus:outline-none cursor-pointer bg-transparent border-none"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Compass className="w-5 h-5 animate-pulse" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation overlay drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-[#fdfaf5] border-t border-stone-200 pb-6 px-4 space-y-3 pt-4 font-mono text-xs uppercase text-left tracking-wider"
            >
              <button 
                onClick={() => { navigateTo("home"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 border-b border-stone-100 bg-transparent border-none cursor-pointer ${activeTab === "home" ? "text-brand-olive font-bold" : "text-stone-600"}`}
              >
                Home
              </button>
              <button 
                onClick={() => { navigateTo("planner"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 border-b border-stone-100 bg-transparent border-none cursor-pointer ${activeTab === "planner" ? "text-brand-olive font-bold" : "text-stone-600"}`}
              >
                AI Planner
              </button>
              <button 
                onClick={() => { navigateTo("tours"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 border-b border-stone-100 bg-transparent border-none cursor-pointer ${activeTab === "tours" ? "text-brand-olive font-bold" : "text-stone-600"}`}
              >
                Tours
              </button>
              <button 
                onClick={() => { navigateTo("destinations"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 border-b border-stone-100 bg-transparent border-none cursor-pointer ${activeTab === "destinations" ? "text-brand-olive font-bold" : "text-stone-600"}`}
              >
                Destinations
              </button>
              <button 
                onClick={() => { navigateTo("wildlife"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 border-b border-stone-100 bg-transparent border-none cursor-pointer ${activeTab === "wildlife" ? "text-brand-olive font-bold" : "text-stone-600"}`}
              >
                Wildlife
              </button>
              <button 
                onClick={() => { navigateTo("about"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 border-b border-stone-100 bg-transparent border-none cursor-pointer ${activeTab === "about" ? "text-brand-olive font-bold" : "text-stone-600"}`}
              >
                About Us
              </button>
              <button 
                onClick={() => { navigateTo("blog"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 border-b border-stone-100 bg-transparent border-none cursor-pointer ${activeTab === "blog" ? "text-brand-olive font-bold" : "text-stone-600"}`}
              >
                Guides
              </button>
              <button 
                onClick={() => { navigateTo("crm"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 border-b border-stone-100 bg-transparent border-none cursor-pointer ${activeTab === "crm" ? "text-brand-olive font-bold" : "text-stone-600"}`}
              >
                Staff Portal
              </button>
              <button 
                onClick={() => { navigateTo("booking"); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-2 font-bold bg-transparent border-none cursor-pointer ${activeTab === "booking" ? "text-brand-olive" : "text-stone-800"}`}
              >
                Book Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* -------------------------------------------------------------
          MAIN ROUTED CONTENT
          ------------------------------------------------------------- */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "home" && (
              <>
                {/* HERO & INTRODUCTION SECTION */}
                <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 lg:px-8 bg-stone-900">
                  {/* Absolute Background image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={IMAGES.shompoleHero} 
                      alt="Majestic Shompole plains" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-50"
                    />
                    {/* Visual shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/70 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-transparent to-transparent"></div>
                  </div>

                  {/* Content alignment wrapper */}
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10 w-full items-center">
                    <div className="lg:col-span-8 space-y-6 text-left">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-olive/20 text-brand-sand border border-brand-olive/30">
                        <Compass className="w-3.5 h-3.5 text-brand-sand" />
                        Empowering Communities & Wildlife Coexistence
                      </span>

                      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white tracking-tight leading-none">
                        Where Wilderness <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand to-amber-300">
                          Meets Ancient Culture
                        </span>
                      </h2>

                      <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl font-serif">
                        Experience the breathtaking beauty and raw adventure of Shompole Conservancy, Lake Magadi, and Lake Natron. Guided exclusively by the Maasai community, we offer luxury weekend escapes, photographic safaris, and specialized research stays extending weeks up to months.
                      </p>

                      {/* Quick buttons */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <button 
                          onClick={() => navigateTo("planner")}
                          className="px-6 py-3.5 bg-brand-olive hover:bg-stone-850 text-white font-semibold rounded-xl text-sm transition-all shadow-sm hover:translate-y-[-1px] cursor-pointer border-none"
                        >
                          Plan Custom AI Itinerary
                        </button>
                        <button 
                          onClick={() => navigateTo("tours")}
                          className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-medium border border-stone-200 rounded-xl text-sm transition-all cursor-pointer shadow-xs"
                        >
                          Browse Tour Packages
                        </button>
                      </div>
                    </div>

                    {/* Quick experience summary cards */}
                    <div className="lg:col-span-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="bg-white/95 backdrop-blur-md border border-stone-200 p-5 rounded-2xl flex items-start gap-3.5 shadow-sm text-left">
                        <div className="w-9 h-9 rounded-lg bg-brand-olive/10 text-brand-olive flex items-center justify-center shrink-0">
                          <Star className="w-5 h-5 fill-brand-sand text-brand-sand" />
                        </div>
                        <div>
                          <h4 className="text-stone-900 font-bold text-sm font-display">2-Day Shompole weekend</h4>
                          <p className="text-stone-600 text-xs mt-0.5 leading-relaxed font-serif">Perfect quick-seeker escape designed for local and corporate breaks.</p>
                        </div>
                      </div>

                      <div className="bg-white/95 backdrop-blur-md border border-stone-200 p-5 rounded-2xl flex items-start gap-3.5 shadow-sm text-left">
                        <div className="w-9 h-9 rounded-lg bg-brand-olive/10 text-brand-olive flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-brand-olive" />
                        </div>
                        <div>
                          <h4 className="text-stone-900 font-bold text-sm font-display">Months of Exploration</h4>
                          <p className="text-stone-600 text-xs mt-0.5 leading-relaxed font-serif">Specialized research and ecological studies fully supported up to months.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* AI Interactive Banner Teaser */}
                <div className="py-16 px-4 lg:px-8 bg-brand-linen">
                  <div className="bg-brand-olive text-white rounded-3xl p-8 sm:p-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
                    <div className="space-y-3 text-left md:max-w-xl">
                      <span className="inline-flex items-center gap-1 text-xs font-mono uppercase bg-white/20 px-2.5 py-1 rounded-full text-brand-sand font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-brand-sand animate-pulse" />
                        Community Innovation
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-tight">Craft Your Community Safari with AI</h3>
                      <p className="text-sm font-serif text-stone-100 leading-relaxed">
                        Specify your academic research limits, seasonal photography guidelines, or family retreat dates. Our custom generative engine maps a perfect bespoke itinerary instantly.
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo("planner")}
                      className="px-6 py-3.5 bg-brand-sand hover:bg-white text-stone-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shrink-0 cursor-pointer shadow-sm border-none"
                    >
                      Open AI Custom Planner
                    </button>
                  </div>
                </div>

                {/* Pre-curated packages overview */}
                <section className="py-20 px-4 lg:px-8 bg-white border-t border-stone-200">
                  <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                      <div className="text-left space-y-1">
                        <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-olive">Featured Wilderness Trails</span>
                        <h3 className="text-3xl font-display font-bold text-stone-900">Featured Tours</h3>
                      </div>
                      <button 
                        onClick={() => navigateTo("tours")}
                        className="text-xs font-mono uppercase font-bold text-brand-olive hover:text-stone-900 flex items-center gap-1 cursor-pointer bg-transparent border-none"
                      >
                        Browse All Packages
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {SAFARI_PACKAGES.slice(0, 2).map((pkg) => (
                        <div 
                          key={pkg.id}
                          onClick={() => setSelectedTour(pkg)}
                          className="group bg-brand-linen border border-stone-200 rounded-3xl overflow-hidden hover:border-brand-olive/25 hover:shadow-lg transition-all duration-300 flex flex-col justify-between shadow-xs text-left cursor-pointer"
                        >
                          {/* Upper block image */}
                          <div className="relative h-64 overflow-hidden">
                            <img 
                              src={pkg.image} 
                              alt={pkg.title} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-stone-200 px-3 py-1.5 rounded-xl font-mono text-xs text-brand-olive font-semibold shadow-sm">
                              Starts from: <strong className="text-stone-900 font-sans">{pkg.priceFrom}</strong>
                            </div>
                            <div className="absolute top-4 right-4 bg-brand-olive text-white px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                              {pkg.tag}
                            </div>
                          </div>

                          <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between text-left">
                            <div className="space-y-4">
                              <div>
                                <span className="text-xs text-brand-olive font-mono tracking-wide block uppercase font-medium">
                                  {pkg.duration} Stay
                                </span>
                                <h4 className="text-xl font-display font-bold text-stone-900 tracking-tight mt-0.5">
                                  {pkg.title}
                                </h4>
                              </div>
                              <p className="text-stone-600 text-xs leading-relaxed font-serif line-clamp-3">
                                {pkg.description}
                              </p>
                            </div>

                            <div className="pt-6 border-t border-stone-100 flex items-center justify-between gap-4">
                              <span className="text-[11px] text-stone-500 font-serif">
                                {pkg.destinations.join(", ")}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTour(pkg);
                                }}
                                className="px-4 py-2 bg-stone-50 hover:bg-brand-olive hover:text-white text-brand-olive font-semibold rounded-xl text-xs transition-all cursor-pointer border border-stone-200"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Traditional Trust Highlight */}
                <section className="py-20 px-4 lg:px-8 bg-brand-linen border-t border-stone-200">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
                    <div className="space-y-6">
                      <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-olive">Community Coexistence</span>
                      <h3 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">Our Ancestral Conservation Journey</h3>
                      <p className="text-stone-600 text-sm leading-relaxed font-serif">
                        Unlike traditional commercial reserves, Emayian Shompole is 100% community-owned and run. Our group ranch guidelines represent a groundbreaking template for wildlife coexistence and cultural preservation in East Africa.
                      </p>
                      <button
                        onClick={() => navigateTo("about")}
                        className="px-5 py-3 bg-brand-olive hover:bg-stone-850 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer border-none"
                      >
                        Read the Full Story
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden h-80 shadow-md">
                      <img src={IMAGES.maasaiCulture} alt="Maasai culture" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-stone-950/20"></div>
                    </div>
                  </div>
                </section>

                {/* Testimonials summary */}
                <section className="py-20 px-4 lg:px-8 bg-white border-t border-stone-200">
                  <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                      <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-olive">Traveler Voices</span>
                      <h3 className="text-3xl font-display font-bold text-stone-900">What Our Guests Say</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          name: "Claire & David Sterling",
                          country: "Boston, USA",
                          text: "Watching a pride of lions hunt at midnight in Shompole was magical. Our Maasai guide, James, knew every single paw print. The luxury camp felt like a dream under the stars.",
                          type: "5-Night Anniversary"
                        },
                        {
                          name: "Dr. Kenji Tanaka",
                          country: "Kyoto, Japan",
                          text: "As an avian ecologist, I stayed with Emayian for 2 months. Their field logistics and mobile camp setups are outstanding. Highly professional group.",
                          type: "2-Month Scientific stay"
                        },
                        {
                          name: "The Henderson Family",
                          country: "Cape Town, SA",
                          text: "We only had 3 days, but Emayian packed it with memories of a lifetime. Geothermal baths, spear throwing lessons, and close encounters with elephants.",
                          type: "Weekend Holiday"
                        }
                      ].map((test, idx) => (
                        <div key={idx} className="bg-brand-linen border border-stone-200 p-6 rounded-2xl flex flex-col justify-between text-left shadow-xs">
                          <p className="text-stone-700 text-xs italic font-serif leading-relaxed">
                            &ldquo;{test.text}&rdquo;
                          </p>
                          <div className="pt-4 border-t border-stone-200 mt-4 flex items-center justify-between">
                            <div>
                              <h5 className="text-xs font-bold text-stone-900">{test.name}</h5>
                              <span className="text-[10px] text-stone-400 font-mono">{test.country}</span>
                            </div>
                            <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold text-brand-olive">
                              {test.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === "planner" && (
              <div className="py-8 bg-[#fdfaf5]">
                {/* Custom Page Header */}
                <div className="py-16 bg-brand-olive text-white text-center relative overflow-hidden mb-12">
                  <div className="absolute inset-0 opacity-20">
                    <img src={IMAGES.shompoleCamp} alt="Camp" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-brand-sand">Intelligent Expedition Architect</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">Custom AI Itinerary Planner</h2>
                    <p className="text-stone-100 text-sm max-w-xl mx-auto leading-relaxed font-serif">
                      Draft your bespoke scientific, photography, or weekend community safari instantly. Complete options and see suggestions backed by our Maasai rangers.
                    </p>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                  <ItineraryPlanner onFillBooking={handleFillBooking} />
                </div>
              </div>
            )}

            {activeTab === "tours" && (
              <div className="py-8 bg-[#fdfaf5]">
                {/* Custom Page Header */}
                <div className="py-16 bg-[#1c1917] text-white text-center relative overflow-hidden mb-12">
                  <div className="absolute inset-0 opacity-40">
                    <img src={IMAGES.shompoleHero} alt="Tours" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
                  </div>
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-brand-sand">Pre-Curated Masterpieces</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">Featured Safari Packages</h2>
                    <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed font-serif">
                      From weekend community breaks to long conservation expeditions, browse our signature trails guided by Shompole Maasai experts.
                    </p>
                  </div>
                </div>

                {/* Full Packages List */}
                <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {SAFARI_PACKAGES.map((pkg) => (
                      <div 
                        key={pkg.id}
                        onClick={() => setSelectedTour(pkg)}
                        className="group bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-brand-olive/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between shadow-xs text-left cursor-pointer"
                      >
                        {/* Upper block image */}
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={pkg.image} 
                            alt={pkg.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent"></div>
                          
                          {/* Floating price badge */}
                          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-stone-200 px-3 py-1.5 rounded-xl font-mono text-xs text-brand-olive font-semibold shadow-sm">
                            Starts from: <strong className="text-stone-900 font-sans">{pkg.priceFrom}</strong>
                          </div>

                          {/* Tag */}
                          <div className="absolute top-4 right-4 bg-brand-olive text-white px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                            {pkg.tag}
                          </div>
                        </div>

                        {/* Card contents */}
                        <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div>
                              <span className="text-xs text-brand-olive font-mono tracking-wide block uppercase font-medium">
                                {pkg.duration} Stay
                              </span>
                              <h4 className="text-xl sm:text-2xl font-display font-bold text-stone-900 tracking-tight mt-0.5">
                                {pkg.title}
                              </h4>
                              <p className="text-xs text-stone-500 mt-1 italic font-serif">
                                &ldquo;{pkg.subtitle}&rdquo;
                              </p>
                            </div>

                            <p className="text-stone-600 text-xs leading-relaxed font-serif line-clamp-3">
                              {pkg.description}
                            </p>

                            {/* Inclusions checklist list */}
                            <div className="space-y-2">
                              <h5 className="text-[11px] font-mono uppercase text-stone-400 tracking-wider font-semibold">
                                Core Package Inclusions:
                              </h5>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {pkg.inclusions.slice(0, 4).map((inc, i) => (
                                  <li key={i} className="text-xs text-stone-600 font-serif flex items-start gap-2">
                                    <Check className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                                    <span>{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Actions buttons */}
                          <div className="pt-6 border-t border-stone-100 flex items-center justify-between gap-4">
                            <div className="text-[11px] text-stone-500">
                              <span>Destinations:</span>
                              <div className="font-semibold text-stone-700 mt-0.5">
                                {pkg.destinations.join(", ")}
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTour(pkg);
                              }}
                              className="px-5 py-3 bg-stone-50 hover:bg-brand-olive hover:text-white text-brand-olive font-semibold rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-stone-200 hover:border-brand-olive shadow-xs"
                            >
                              Explore Package Folder
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "destinations" && (
              <div className="py-8 bg-[#fdfaf5]">
                {/* Custom Page Header */}
                <div className="py-16 bg-stone-900 text-white text-center relative overflow-hidden mb-12">
                  <div className="absolute inset-0 opacity-30">
                    <img src={IMAGES.magadiFlamingos} alt="Flamingos" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-brand-sand">Explore The Rift Valley Basin</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">Expedition Guide & Gallery</h2>
                    <p className="text-stone-200 text-sm max-w-xl mx-auto leading-relaxed font-serif">
                      Traverse volcanic mountains, soda wetlands, and pristine river forests. Complete with a stunning photo diary.
                    </p>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16 pb-16">
                  {/* Destination Guide component */}
                  <DestinationGuide />

                  {/* Separate title for Gallery segment */}
                  <div className="border-t border-stone-200 pt-16 text-left">
                    <GalleryPanel />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wildlife" && (
              <div className="py-8 bg-[#fdfaf5]">
                {/* Custom Page Header */}
                <div className="py-16 bg-stone-900 text-white text-center relative overflow-hidden mb-12">
                  <div className="absolute inset-0 opacity-35">
                    <img src={IMAGES.shompoleLion} alt="Lions" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-brand-sand">Species Census & Tracking Guidelines</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">Wildlife Encyclopaedia</h2>
                    <p className="text-stone-200 text-sm max-w-xl mx-auto leading-relaxed font-serif">
                      Discover the majestic animals sharing this land, with native Maasai tracking lore and scientific conservation statuses.
                    </p>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
                  <WildlifeEx />
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="py-8 bg-[#fdfaf5]">
                {/* Custom Page Header */}
                <div className="py-16 bg-brand-olive text-white text-center relative overflow-hidden mb-12">
                  <div className="absolute inset-0 opacity-20">
                    <img src={IMAGES.maasaiCulture} alt="Culture" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-brand-sand">Our Ancestral Conservation Journey</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">About Emayian Shompole</h2>
                    <p className="text-stone-100 text-sm max-w-xl mx-auto leading-relaxed font-serif">
                      Learn how a 100% Maasai community-led trust balances local livelihoods, ancient traditions, and predator-prey harmony.
                    </p>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
                  <AboutUs />
                </div>
              </div>
            )}

            {activeTab === "blog" && (
              <div className="py-8 bg-[#fdfaf5]">
                {/* Custom Page Header */}
                <div className="py-16 bg-[#1c1917] text-white text-center relative overflow-hidden mb-12">
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-brand-sand">Rift Valley Chronicles & Tips</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">Expedition Guides & Stories</h2>
                    <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed font-serif">
                      Read safety recommendations, photography gear guides, bird-watching checklists, and historic tribal lore.
                    </p>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
                  <BlogPanel />
                </div>
              </div>
            )}

            {activeTab === "crm" && (
              <div className="py-8 bg-[#fdfaf5]">
                {/* Custom Page Header */}
                <div className="py-16 bg-[#0c0a09] text-white text-center relative overflow-hidden mb-12 border-b border-stone-900">
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-500 font-mono">Back-Office Operations Console</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">Staff Inquiry CRM Ledger</h2>
                    <p className="text-stone-400 text-sm max-w-xl mx-auto leading-relaxed font-mono">
                      Internal administrative desk for reviewing client files, scientific stays, and custom AI drafts.
                    </p>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
                  <StaffPanel />
                </div>
              </div>
            )}

            {activeTab === "folder" && (
              <div className="py-8 bg-[#fdfaf5]">
                {/* Custom Page Header */}
                <div className="py-16 bg-[#134e4a] text-white text-center relative overflow-hidden mb-12">
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-brand-sand">System Static Resource Indexer</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">Image Folder Vault</h2>
                    <p className="text-teal-100 text-sm max-w-xl mx-auto leading-relaxed font-serif">
                      Browse all 50 premium conservation and landscape images located inside the project&rsquo;s public directory.
                    </p>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
                  <PhotoFolderPanel />
                </div>
              </div>
            )}

            {activeTab === "booking" && (
              <div className="py-8 bg-gray-950">
                {/* Custom Page Header */}
                <div className="py-16 bg-[#0c0a09] text-white text-center relative overflow-hidden border-b border-gray-900 mb-12">
                  <div className="absolute inset-0 opacity-20">
                    <img src={IMAGES.safariVehicle} alt="Safari Vehicle" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-500 font-bold">Traditional Maasai Welcoming Desk</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-bold">Reserve Your Expedition</h2>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
                      Complete your inquiry layout. Our safari coordination team will review details and follow up with a finalized invoice within 12 hours.
                    </p>
                  </div>
                </div>

                {/* Inquiry Form */}
                <div className="max-w-4xl mx-auto px-4 pb-20">
                  <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                    <AnimatePresence mode="wait">
                      {submitSuccess ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-12 space-y-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mx-auto">
                            <Check className="w-8 h-8 stroke-[3]" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-2xl font-display font-bold text-white">Inquiry Successfully Registered!</h4>
                            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                              Asha (Chief Booking Coordinator) has received your Shompole request. Your unique Reservation Voucher Code is:
                            </p>
                            <span className="inline-block px-4 py-2 bg-gray-950 border border-amber-500/20 text-amber-400 font-mono font-bold text-sm tracking-wider rounded-xl mt-3">
                              {submitSuccess.id}
                            </span>
                          </div>
                          <div className="pt-6">
                            <button
                              onClick={() => setSubmitSuccess(null)}
                              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs rounded-xl transition-all cursor-pointer"
                            >
                              Create Another Booking
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.form 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmitBooking} 
                          className="space-y-6 text-left"
                        >
                          {/* Feedback line */}
                          {submitError && (
                            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-xs text-red-400">
                              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                              <p>{submitError}</p>
                            </div>
                          )}

                          {/* Personal details */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
                              <input 
                                type="text" 
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Johnathan Doe"
                                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
                              <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john.doe@academic.com"
                                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">WhatsApp or Phone</label>
                              <input 
                                type="tel" 
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 555-019-2834"
                                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                              />
                            </div>
                          </div>

                          {/* Stay properties */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Stay Focus</label>
                              <select 
                                value={stayType}
                                onChange={(e) => {
                                  const type = e.target.value as "weekend_holiday" | "exploration_research";
                                  setStayType(type);
                                  if (type === "weekend_holiday") setNights(prev => Math.min(prev, 5));
                                  else setNights(prev => Math.max(prev, 7));
                                }}
                                className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-all focus:ring-1 focus:ring-amber-500"
                              >
                                <option value="weekend_holiday">Weekend / Holiday (Max 5 Nights)</option>
                                <option value="exploration_research">Exploration & Research (Up to Months)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                Stay Duration (Nights)
                              </label>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => setNights(prev => Math.max(stayType === "weekend_holiday" ? 1 : 6, prev - 1))}
                                  className="px-3 py-3 bg-gray-950 border border-gray-800 rounded-l-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <input 
                                  type="number" 
                                  required
                                  value={nights}
                                  readOnly
                                  className="w-full bg-gray-950 border-y border-gray-800 text-center py-3 text-sm text-white font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => setNights(prev => Math.min(stayType === "weekend_holiday" ? 5 : 90, prev + 1))}
                                  className="px-3 py-3 bg-gray-950 border border-gray-800 rounded-r-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <span className="text-[10px] text-gray-500 mt-1 block">
                                {stayType === "weekend_holiday" ? "* Holiday stays restricted to 5 nights max" : "* Academic Stays support up to 90 nights"}
                              </span>
                            </div>

                            <div>
                              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Guests</label>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                                  className="px-3 py-3 bg-gray-950 border border-gray-800 rounded-l-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <input 
                                  type="number" 
                                  required
                                  value={guests}
                                  readOnly
                                  className="w-full bg-gray-950 border-y border-gray-800 text-center py-3 text-sm text-white font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => setGuests(prev => Math.min(12, prev + 1))}
                                  className="px-3 py-3 bg-gray-950 border border-gray-800 rounded-r-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Destinations Multi select in Form */}
                          <div>
                            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Include Destinations</label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                "Shompole Conservancy",
                                "Lake Magadi",
                                "Lake Natron",
                                "Ewuaso Nyiro River",
                                "Oldonyio Sambu Mountains",
                                "Maasai Cultural Villages"
                              ].map(dest => (
                                <button
                                  key={dest}
                                  type="button"
                                  onClick={() => handleToggleFormDest(dest)}
                                  className={`px-3 py-2 text-xs border rounded-xl transition-all cursor-pointer ${
                                    selectedDests.includes(dest)
                                      ? "bg-amber-500/15 border-amber-500 text-white"
                                      : "bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700"
                                  }`}
                                >
                                  {dest}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Activities Multi-select in Form */}
                          <div>
                            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Preferred Experiences</label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                "Wildlife safaris",
                                "Cultural tours",
                                "Hiking adventures",
                                "Photography",
                                "Wildlife tracking",
                                "Geothermal mud bathing",
                                "Scientific research"
                              ].map(act => (
                                <button
                                  key={act}
                                  type="button"
                                  onClick={() => handleToggleFormAct(act)}
                                  className={`px-3 py-1.5 text-xs border rounded-xl transition-all cursor-pointer ${
                                    selectedActs.includes(act)
                                      ? "bg-amber-500/15 border-amber-500 text-white"
                                      : "bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700"
                                  }`}
                                >
                                  {act}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Special requirements */}
                          <div>
                            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Special Guidelines / Dietary or Research focus</label>
                            <textarea 
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Specify any detail (e.g., flight terminal pickups in Nairobi, bird nesting parameters, medical equipment backup needed, wheel-chair requirements...)"
                              rows={4}
                              className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-all"
                            />
                          </div>

                          {/* Submit Button */}
                          <div className="pt-2">
                            <button
                              type="submit"
                              disabled={isSubmitting || selectedDests.length === 0}
                              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Logging Inquiry on Secure Node Server...
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  Submit Safari Inquiry
                                </>
                              )}
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* -------------------------------------------------------------
          CONTACT AND DIRECTIONS DIRECTORY (SECTION 10)
          ------------------------------------------------------------- */}
      <section className="py-16 px-4 lg:px-8 bg-gray-950 border-t border-gray-900 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Quick contact desk */}
          <div className="space-y-4">
            <h4 className="text-xl font-display font-bold text-white tracking-tight">Emayian Shompole Safaris</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Serving the Maasai Shompole community, Ewuaso Nyiro basin, and Lakes Magadi/Natron. Standard bookings curated out of our Nairobi Coordination Desk and Shompole Base Camp.
            </p>
            <div className="space-y-3 pt-2 text-xs text-gray-300 font-mono">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+254 712 345 678 (Nairobi Desk)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+254 722 999 000 (Shompole Base Camp)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:cpromark201@gmail.com" className="hover:text-amber-400 transition-colors">bookings@shompolesafaris.com</a>
              </div>
            </div>
          </div>

          {/* Social connections */}
          <div className="space-y-4">
            <h4 className="text-xl font-display font-bold text-white tracking-tight">Conservation Partnerships</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              We collaborate closely with Maasai group ranch trustees, Kenya Wildlife Service (KWS), and wetlands bird nesting census groups to coordinate non-disruptive, highly ethical travel.
            </p>
            <div className="flex gap-2 pt-2">
              <span className="text-[10px] bg-gray-900 border border-gray-800 px-3 py-1 rounded-xl text-gray-400">KWS Certified</span>
              <span className="text-[10px] bg-gray-900 border border-gray-800 px-3 py-1 rounded-xl text-gray-400">Ecotourism Kenya Gold</span>
              <span className="text-[10px] bg-gray-900 border border-gray-800 px-3 py-1 rounded-xl text-gray-400">Shompole Trust Jointure</span>
            </div>
          </div>

          {/* Location Mock map */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-500 font-bold uppercase block">Field Coordinates</span>
              <h5 className="text-white font-bold text-sm">Shompole Head Office Location</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed mt-1">
                Shompole Conservancy, Kenya Rift Valley (GPS: 1.9056° S, 36.1951° E)
              </p>
            </div>
            
            <button 
              onClick={() => navigateTo("booking")}
              className="mt-4 p-3 bg-gray-950 border border-gray-800/80 rounded-xl flex items-center justify-between text-left w-full hover:border-amber-500 transition-colors cursor-pointer bg-transparent"
            >
              <span className="text-[10px] text-gray-500 font-mono">1.9056° S, 36.1951° E</span>
              <span className="text-[10px] font-bold text-amber-400">Open Inquiry Desk</span>
            </button>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          FOOTER
          ------------------------------------------------------------- */}
      <footer className="bg-black py-8 px-4 text-center border-t border-gray-900 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 Emayian Shompole Safaris. All ancestral tracking and community boma guidelines preserved under international ecotourism trust.</p>
          <div className="flex gap-4 font-mono text-[11px]">
            <span>Nairobi Desk &bull; bookings@shompolesafaris.com</span>
          </div>
        </div>
      </footer>

      {/* Premium Detail Modal for Safari Packages */}
      <DetailModal
        isOpen={selectedTour !== null}
        onClose={() => setSelectedTour(null)}
        type="tour"
        item={selectedTour}
        onBookTour={handleBookPackage}
      />
    </div>
  );
}
