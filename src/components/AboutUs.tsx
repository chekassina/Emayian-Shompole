import { ShieldCheck, Users, TreePine, Heart, Award, Milestone } from "lucide-react";
import { IMAGES } from "../data";

export default function AboutUs() {
  const values = [
    {
      icon: Users,
      title: "100% Community Owned Impact",
      desc: "All conservation fees directly fund Maasai household bursaries, clean water pipelines, and teachers' salaries in Shompole. Your presence provides direct financial security to local people."
    },
    {
      icon: TreePine,
      title: "Active Habitat Guardians",
      desc: "We operate a zero-hunting, full-patrol policy in collaboration with Maasai community scouts. Our presence has seen Shompole predator populations double over the past six years."
    },
    {
      icon: ShieldCheck,
      title: "Authentic, Non-Commercial Hosting",
      desc: "No forced souvenir stalls or staged dances. We host respectful cultural exchanges in genuine ancestral settlements, ensuring our Maasai elders dictate their own representation."
    },
    {
      icon: Milestone,
      title: "Pioneering Desert Tracking",
      desc: "Specialized in southern dry-country logistics. From active volcanic ridgeline hikes to deep night game drives under red spotlights, we explore where national parks cannot tread."
    }
  ];

  return (
    <div className="space-y-16" id="about-section">
      {/* Narrative grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left column: descriptive text */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-sand">
            Guardians of the Southern Great Rift Valley
          </span>
          <h3 className="text-3xl lg:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            Coexisting with Wilderness, <br/>
            <span className="italic font-light text-brand-olive">Empowering Communities</span>
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            Emayian Shompole Safaris was founded by a collective of Maasai elders, local conservancy scouts, and passionate eco-tourism experts. Driven by a deep commitment to preserving our ancestral lands, we offer travelers an unfiltered, immersive path into Kenya's deep southern frontier.
          </p>
          <p className="text-stone-500 text-sm leading-relaxed">
            Unlike commercialized Northern parks, the Shompole Conservancy is entirely owned and governed by the local Maasai community. Here, cattle herding and lion tracking coexist in a fluid balance. When you safari with us, you are not merely a spectator; you are directly sustaining a pristine ecosystem where humans and magnificent wildlife flourish side-by-side.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="border-l-2 border-brand-olive pl-4">
              <span className="text-3xl font-display font-bold text-stone-900">10k+</span>
              <span className="text-xs text-stone-500 block font-mono">Hectares Protected</span>
            </div>
            <div className="border-l-2 border-brand-olive pl-4">
              <span className="text-3xl font-display font-bold text-stone-900">100%</span>
              <span className="text-xs text-stone-500 block font-mono">Maasai Native Guides</span>
            </div>
          </div>
        </div>

        {/* Right column: layered images */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 border border-stone-200">
            <img 
              src={IMAGES.shompoleHero} 
              alt="Maasai standing on ridge" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-brand-olive border border-stone-300 text-white p-5 rounded-3xl max-w-xs shadow-xl hidden sm:block">
            <Award className="w-8 h-8 stroke-[1.5] mb-2 text-brand-sand" />
            <h5 className="font-bold text-sm font-display text-brand-linen">Elite Eco-Tourism Gold Standard</h5>
            <p className="text-[10px] text-stone-200 leading-normal mt-1">
              Recognized for groundbreaking work in community-governed wildlife security and local school funding.
            </p>
          </div>
        </div>
      </div>

      {/* Values presentation */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h4 className="text-2xl font-display font-bold text-stone-900 tracking-tight italic">
            Our Core Principles
          </h4>
          <p className="text-stone-500 text-xs mt-1">
            Why travelers from Oxford academics to anniversary couples choose Emayian Shompole.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div 
                key={v.title}
                className="p-6 bg-white border border-stone-200 rounded-3xl space-y-3 hover:border-brand-olive/30 hover:shadow-md transition-all duration-300 flex gap-4 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-olive/10 text-brand-olive flex items-center justify-center shrink-0 border border-brand-olive/10">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-base font-semibold text-stone-900 font-display">
                    {v.title}
                  </h5>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
