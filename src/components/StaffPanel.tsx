import { useState, useEffect } from "react";
import { BookingInquiry } from "../types";
import { 
  Users, Calendar, Clock, Inbox, Mail, Phone, CheckCircle, 
  RefreshCw, MapPin, ClipboardList, Filter, ShieldAlert, Sparkles, BookOpen 
} from "lucide-react";
import { motion } from "motion/react";

export default function StaffPanel() {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "weekend_holiday" | "exploration_research">("all");
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    const fetchInquiries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/inquiries");
        if (!response.ok) {
          throw new Error("Failed to load back-office reservations ledger.");
        }
        const data = await response.json();
        setInquiries(data);
      } catch (err: any) {
        setError(err.message || "Could not synchronize with bookings database.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, [refreshCount]);

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  const getStatusStyle = (status: string | undefined) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Reviewed":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Received":
      default:
        return "bg-brand-olive/10 text-brand-olive border-brand-olive/10";
    }
  };

  const filteredInquiries = filterType === "all"
    ? inquiries
    : inquiries.filter(inq => inq.stayType === filterType);

  return (
    <div className="bg-brand-linen border border-stone-200 rounded-3xl p-6 lg:p-10 shadow-sm relative overflow-hidden" id="staff-section">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-olive/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-700">Live Back-Office CRM Ledger</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-stone-900 tracking-tight mt-1">
              Reservations & Custom Inquiries Database
            </h3>
            <p className="text-stone-500 text-xs mt-1 font-serif">
              Simulated admin workspace. Watch your custom submissions appear here securely in real-time.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            className="self-start sm:self-center px-4 py-2 bg-white hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border border-stone-200 hover:border-stone-300 shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-brand-olive" : ""}`} />
            Sync Ledger
          </button>
        </div>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Filter className="w-4 h-4 text-brand-olive" />
            <span>Filter Ledger:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                filterType === "all"
                  ? "bg-brand-olive border-brand-olive text-white"
                  : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              All Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setFilterType("weekend_holiday")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                filterType === "weekend_holiday"
                  ? "bg-brand-olive/10 border-brand-olive/30 text-brand-olive"
                  : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              Weekend / Holiday
            </button>
            <button
              onClick={() => setFilterType("exploration_research")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                filterType === "exploration_research"
                  ? "bg-brand-olive/10 border-brand-olive/30 text-brand-olive"
                  : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              Research & Study
            </button>
          </div>
        </div>

        {/* Inquiries list */}
        {isLoading && inquiries.length === 0 ? (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl">
            <RefreshCw className="w-8 h-8 text-brand-olive animate-spin mx-auto mb-3" />
            <h4 className="text-stone-900 text-sm font-semibold">Synchronizing with Cloud Database...</h4>
            <p className="text-stone-500 text-xs max-w-sm mt-1 mx-auto">Connecting to your back-office data file safely...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-2">
            <ShieldAlert className="w-8 h-8 text-red-500 mx-auto" />
            <h4 className="text-red-900 text-sm font-semibold font-display">Synchronization Halted</h4>
            <p className="text-stone-600 text-xs max-w-md mx-auto">{error}</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl py-16 text-center space-y-3">
            <Inbox className="w-10 h-10 text-stone-300 mx-auto" />
            <div>
              <h4 className="text-stone-900 text-sm font-semibold">No Bookings Match Filter</h4>
              <p className="text-stone-500 text-xs mt-1 font-serif">Submit an inquiry on the front booking form to view your live data here!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {filteredInquiries.map((inq) => (
              <div 
                key={inq.id}
                className="bg-white border border-stone-200 hover:border-stone-300 rounded-2xl p-5 space-y-4 transition-all shadow-xs"
              >
                {/* Header line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-brand-linen border border-stone-200 text-brand-olive flex items-center justify-center font-mono font-bold text-xs">
                      {inq.fullName.charAt(0)}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 font-display">
                        {inq.fullName}
                      </h4>
                      <span className="text-[10px] text-stone-400 font-mono">
                        UID: {inq.id} &bull; Received {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "Just now"}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-medium ${getStatusStyle(inq.status)}`}>
                    {inq.status || "Received"}
                  </span>
                </div>

                {/* Details layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs text-stone-600">
                  {/* Left segment */}
                  <div className="md:col-span-4 space-y-2.5 md:border-r border-stone-100 pr-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <a href={`mailto:${inq.email}`} className="hover:text-brand-olive transition-colors">{inq.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{inq.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>
                        Stay Focus: <strong className="text-brand-olive font-mono">{inq.stayType === "weekend_holiday" ? "Weekend" : "Research"}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>{inq.guests} Guests &bull; {inq.nights} Nights Stay</span>
                    </div>
                  </div>

                  {/* Right segment */}
                  <div className="md:col-span-8 space-y-3 pl-0 md:pl-2">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 font-mono block mb-1">Requested Itinerary Core Focus</span>
                      <div className="flex flex-wrap gap-1.5">
                        {inq.destinations.map(d => (
                          <span key={d} className="bg-stone-50 border border-stone-200 text-stone-700 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-brand-olive" />
                            {d}
                          </span>
                        ))}
                        {inq.activities.map(a => (
                          <span key={a} className="bg-brand-olive/10 border border-brand-olive/10 text-brand-olive px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {inq.specialRequirements && (
                      <div>
                        <span className="text-[10px] uppercase text-stone-400 font-mono block mb-1">Special Requirements & Research Fields</span>
                        <p className="bg-brand-linen p-3 rounded-xl border border-stone-200 text-stone-700 text-xs leading-relaxed italic font-serif">
                          &ldquo;{inq.specialRequirements}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
