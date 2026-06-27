import { SafariPackage, Destination, WildlifeSpecies, Testimonial, BlogArticle } from "./types";

// Generated image assets from tool
export const IMAGES = {
  shompoleHero: "/images/tap1.jpg",
  magadiFlamingos: "/images/tap2.jpg",
  shompoleLion: "/images/tap3.jpg",
  
  // Public high-quality curated conservation and travel photo links
  shompoleLeopard: "/images/tap4.jpg",
  shompoleElephant: "/images/tap5.jpg",
  shompoleGiraffe: "/images/tap6.jpg",
  shompoleHiking: "/images/tap7.jpg",
  maasaiCulture: "/images/tap8.jpg",
  shompoleCamp: "/images/tap9.jpg",
  safariVehicle: "/images/tap10.jpg"
};

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: "pkg-1",
    title: "2 Days, 1 Night Shompole Escape",
    subtitle: "The Perfect Weekend Wilderness Quick-Seeker",
    duration: "2 Days, 1 Night",
    nights: 1,
    priceFrom: "$350 per person",
    description: "An intense, deeply refreshing plunge into the Shompole Conservancy. Ideal for weekenders or short holiday breaks. Includes a late afternoon game drive, a bush dinner hosted under baobabs, and a sunrise walking safari led by Maasai trackers.",
    inclusions: [
      "1 Night luxury tented camp accommodation",
      "All meals (Organic farm-to-table dining)",
      "Evening and morning game drives",
      "Maasai guided walking safari",
      "Shompole Conservancy conservation fees",
      "4x4 Open-sided safari vehicle transport"
    ],
    destinations: ["Shompole Conservancy", "Ewuaso Nyiro River"],
    image: IMAGES.shompoleCamp,
    tag: "Weekend Quickie"
  },
  {
    id: "pkg-2",
    title: "Vibrant Rift Wildlife & Flamingos Odyssey",
    subtitle: "The Ultimate Photographic & Predator Safari",
    duration: "5 Days, 4 Nights",
    nights: 4,
    priceFrom: "$1,450 per person",
    description: "A premium holiday safari designed for wildlife photographers and nature lovers. We focus heavily on Shompole's famous night predators (lions, leopards) and the jaw-dropping alkaline visual tapestries of Lakes Magadi and Natron.",
    inclusions: [
      "4 Nights boutique luxury safari lodge",
      "Unlimited game drives including exclusive night tracking",
      "Sunset sundowners at Lake Magadi's bubbling hot springs",
      "Professional birdwatching guide at Lake Natron",
      "All park, reserve, and conservancy entry fees",
      "Full board meals & premium bush beverages"
    ],
    destinations: ["Shompole Conservancy", "Lake Magadi", "Lake Natron", "Oldonyio Sambu Mountains"],
    image: IMAGES.shompoleLion,
    tag: "Highly Popular"
  },
  {
    id: "pkg-3",
    title: "Maasai Cultural & Anthropological Tour",
    subtitle: "True Connection with the Guardians of the Rift",
    duration: "4 Days, 3 Nights",
    nights: 3,
    priceFrom: "$980 per person",
    description: "An authentic, respectful immersion into Maasai daily life, medicine, and deep-rooted ecosystem tracking. This tour directly supports village education bursaries and clean water initiatives in Shompole.",
    inclusions: [
      "3 Nights traditional eco-boma guest chalets",
      "Participation in morning livestock herding & traditional beadwork",
      "Maasai ethnobotany tour (discovering native medicinal plants)",
      "Traditional jumping dances & elders story-telling under the stars",
      "All community and local village hosting fees",
      "Local authentic Maasai meals modified for international guests"
    ],
    destinations: ["Maasai Cultural Villages", "Ewuaso Nyiro River"],
    image: IMAGES.maasaiCulture,
    tag: "Cultural Immerse"
  },
  {
    id: "pkg-4",
    title: "Oldonyio Sambu High Ridge Hiking",
    subtitle: "High-Altitude Volcanic Ridge Conquest",
    duration: "3 Days, 2 Nights",
    nights: 2,
    priceFrom: "$720 per person",
    description: "For the adventurous hiker looking to climb the dramatic crags of the Oldonyio Sambu range, looking down over the scorching soda pans of the Rift Valley floor. Fully escorted by armed conservancy rangers and Maasai pack-donkeys.",
    inclusions: [
      "2 Nights lightweight high-altitude wilderness dome camping",
      "Dedicated professional mountain guides & armed rangers",
      "All camping equipment, meals cooked by a bush chef",
      "Maasai pack-donkey logistics support",
      "Emergency high-altitude evacuation insurance",
      "Lake Magadi hot spring swim recovery on descent"
    ],
    destinations: ["Oldonyio Sambu Mountains", "Lake Magadi"],
    image: IMAGES.shompoleHiking,
    tag: "Adventure Seek"
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    name: "Shompole Conservancy",
    description: "A privately managed Maasai community conservancy wedged between Lake Magadi and Lake Natron. Shompole represents one of Kenya's most successful human-wildlife coexistence experiments. Because it is community-run, we can offer exclusive night drives, walking safaris, and raw tracking that national parks prohibit.",
    highlights: [
      "Home to the unique desert-adapted lions & rare melanistic leopards",
      "Authentic community ownership directly benefiting Maasai households",
      "Dramatic riverine forests clashing with raw, baking-hot volcanic rock plains",
      "Excellent visibility of nocturnal creatures using specialized red-light search lamps"
    ],
    visitorInfo: "Best visited during dry seasons (June to October and December to March). Bring light-colored, highly breathable linen clothing; temperatures can reach 38°C (100°F) in the afternoon.",
    image: IMAGES.shompoleHero
  },
  {
    id: "dest-2",
    name: "Lake Magadi",
    description: "A surreal, blindingly white and baby-pink soda lake covering over 100 square kilometers of the Rift Valley floor. Solid trona crusts allow walking across parts of the lake, where natural hot springs bubble up at temperatures over 45°C. The landscape resembles another planet.",
    highlights: [
      "Surreal pink salt crusts & deep volcanic fissures",
      "Therapeutic geothermal hot springs famous for skin mud baths",
      "Nesting grounds for thousands of avocets and plovers",
      "Dramatic panoramic lookouts over the Great Rift Valley escarpment"
    ],
    visitorInfo: "Bring solid water shoes if you intend to bathe in the thermal hot springs to protect your feet from silica deposits. Excellent for dawn drone photography (permissions arranged by us).",
    image: IMAGES.magadiFlamingos
  },
  {
    id: "dest-3",
    name: "Lake Natron",
    description: "Directly straddling the border of Kenya and Tanzania, Lake Natron is one of the most alkaline lakes in the world. Heated by the active volcano Ol Doinyo Lengai, it is the exclusive breeding ground for 75% of the world's near-threatened Lesser Flamingos. The water holds a deep crimson hue due to salt-loving bacteria.",
    highlights: [
      "The primary global sanctuary and birthing suites for Lesser Flamingos",
      "Stunning views of the active 'Mountain of God' (Ol Doinyo Lengai)",
      "Unbelievable deep-red salt water photography contrasting with pink birds",
      "Prehistoric homid fossil footprints preserved along the dried clay shores"
    ],
    visitorInfo: "The mud can be extremely caustic; guests must stay strictly on designated pathways with our expert guides. Binoculars are highly recommended for non-intrusive bird observation.",
    image: "/images/tap11.jpg"
  },
  {
    id: "dest-4",
    name: "Ewuaso Nyiro River",
    description: "A vital, life-giving green ribbon of dense riverine forest cutting through the scorching semi-desert of Shompole. The brown, silt-rich waters support giant yellow fever trees, massive Nile crocodiles, families of bathing hippos, and an absolute paradise of over 450 bird species.",
    highlights: [
      "Shaded, cool sanctuary escaping the harsh desert heat",
      "Boat tracking for giant Nile crocodiles & snorting hippo pods",
      "Guided canopy walks to spot rare blue monkeys and colobus families",
      "Scenic riverbank sundowners and Maasai spear-throwing tournaments"
    ],
    visitorInfo: "Pack lightweight long-sleeved shirts and high-quality insect repellent for riverbank walks, particularly in the late afternoon. High binoculars recommended.",
    image: "/images/tap12.jpg"
  },
  {
    id: "dest-5",
    name: "Oldonyio Sambu Mountains",
    description: "An ancient, craggy volcanic range rising sharply out of the flat rift floor. Clad in dry montane acacia scrub, these heights offer sweeping, cool air currents and unmatched 360-degree viewpoints looking down onto the salt pans of Magadi and the shimmering heat waves of the Natron basin.",
    highlights: [
      "Challenging treks escaping the thermal heat of the plains",
      "Home to high-altitude klipspringers and nesting birds of prey",
      "Authentic encounters with high-pasture Maasai herding posts",
      "Incredible camp spots overlooking the vast African Rift"
    ],
    visitorInfo: "Requires a reasonable standard of physical fitness. Good hiking boots with deep tread are mandatory. Trekking poles are highly useful for loose volcanic shale.",
    image: "/images/tap13.jpg"
  },
  {
    id: "dest-6",
    name: "Maasai Cultural Villages",
    description: "Authentic community bomas (circular mud-and-thatch settlements surrounded by thorn-fence corrals) that have stood in Shompole for generations. These are not commercial stages; they are real, active homesteads where the Shompole Maasai preserve their language, age-set governance, and pastoral rituals.",
    highlights: [
      "Direct discussions with local community elders and matriarchs",
      "Learning traditional campfire songs, folklore, and spear crafts",
      "Tasting local milk-and-honey preparations in traditional gourds",
      "Understanding how community land conservancies directly pay for local healthcare"
    ],
    visitorInfo: "Always ask your Maasai guide before taking photos of individuals. Respect local modesty guidelines. Gift purchases from the village beadwork directly go to the women's collective.",
    image: "/images/tap14.jpg"
  }
];

export const WILDLIFE_SPECIES: WildlifeSpecies[] = [
  {
    name: "Desert-Adapted Lion",
    scientificName: "Panthera leo",
    description: "Shompole's lions have adapted beautifully to the high Rift Valley heat. They boast slightly smaller, lighter manes, longer legs, and are exceptionally active during the cool, pitch-black nights, hunting successfully in the riverine thickets.",
    bestTime: "Night game drives (8:00 PM to midnight) or dawn tracking",
    behavior: "Extremely social, highly stealthy, often resting in deep shade or fever tree trunks during daylight hours to evade the baking heat.",
    category: "Predator",
    image: IMAGES.shompoleLion
  },
  {
    name: "The Ghost Leopard",
    scientificName: "Panthera pardus",
    description: "The rocky lava escarpments and fever trees of Ewuaso Nyiro provide the absolute perfect cover for leopards. Shompole is known among wildlife research circles for its high density of leopards, including rare dark and melanistic individuals.",
    bestTime: "Late dusk tracking or thermal camera drives",
    behavior: "Solitary, elusive, and incredibly strong. They drag their kills (often gazelles or impalas) high into yellow fever trees to keep them from hyenas.",
    category: "Predator",
    image: IMAGES.shompoleLeopard
  },
  {
    name: "Savannah Elephant",
    scientificName: "Loxodonta africana",
    description: "Migratory herds of elephants frequently cross the Shompole plains to feed in the swampy reed beds of the Ewuaso Nyiro river. They are large, majestic, and completely at home in the community lands.",
    bestTime: "Midday riverbank safaris",
    behavior: "Highly intelligent matriarch-led families. They can cover up to 50km a day tracking water sources, using the mountains for navigation.",
    category: "Mammal",
    image: IMAGES.shompoleElephant
  },
  {
    name: "Reticulated Giraffe",
    scientificName: "Giraffa camelopardalis",
    description: "The iconic towers of Reticulated Giraffes, with their sharp, geometric white-bordered reddish patches, walk gracefully among Shompole's thorny acacia woodlands, browsing high shoots unreachable by other mammals.",
    bestTime: "Morning walking safaris",
    behavior: "Gentle, alert, and constantly communicating via low-frequency infrasound. Often seen in loose family groups searching for high acacias.",
    category: "Mammal",
    image: IMAGES.shompoleGiraffe
  },
  {
    name: "Lesser Flamingo",
    scientificName: "Phoeniconaias minor",
    description: "The absolute crown jewel of the Rift's lakes. Sporting bright pink plumage fueled by spirulina algae, these birds create magnificent pink clouds of feathers during mating dances.",
    bestTime: "Golden hour shoreline walks at Lake Magadi",
    behavior: "Highly synchronized flocks. They filter-feed using their specialized upside-down bills to extract microscopic blue-green algae from caustic soda waters.",
    category: "Bird",
    image: IMAGES.magadiFlamingos
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Claire & David Sterling",
    country: "Boston, USA",
    stayType: "5-Night Anniversary Luxury",
    rating: 5,
    text: "Words cannot describe the magic of watching a pride of lions hunt at midnight in Shompole. Our Maasai guide, James, knew every single paw print. The luxury camp felt like a dream under the stars, completely integrated with nature. Emayian is doing safari the right way—empowering locals and protecting the wildlife.",
    date: "May 2026"
  },
  {
    id: "test-2",
    name: "Dr. Kenji Tanaka",
    country: "Kyoto, Japan",
    stayType: "2-Month Ecological Research",
    rating: 5,
    text: "As an avian ecologist studying Great Rift wetlands, I stayed with Emayian Shompole Safaris for 2 months. Their logistics, mobile camp hosting, and the deep environmental tracking skills of their rangers are outstanding. They custom-tailored an itinerary that balanced academic precision with beautiful Maasai hospitality.",
    date: "April 2026"
  },
  {
    id: "test-3",
    name: "The Henderson Family",
    country: "Cape Town, South Africa",
    stayType: "Weekend Holiday Getaway",
    rating: 5,
    text: "We only had 3 days, but Emayian packed it with memories of a lifetime. Geothermal baths at Lake Magadi, beautiful spear-throwing lessons with warriors, and close encounters with elephants. My kids are still talking about the Maasai stargazing folklore. Perfect family hospitality!",
    date: "June 2026"
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-1",
    title: "Understanding Human-Wildlife Coexistence: The Shompole Model",
    category: "Conservation",
    readTime: "6 min read",
    excerpt: "How the community-owned Shompole Conservancy created a haven for lions and leopards while increasing household income for Maasai pastoralists.",
    content: "For decades, traditional conservation meant building high fences and keeping humans out. But in the southern Great Rift Valley, the Maasai community of Shompole is writing a different story. By dedicating 10,000 hectares of ancestral grazing land solely to wildlife conservation, and creating community-run scout patrols, they have turned an area once plagued by conflict into Kenya's safest predator corridor. Today, tourists' fees pay directly for secondary school bursaries and village health dispensaries, demonstrating that a living lion is infinitely more valuable than a speared one...",
    date: "June 14, 2026",
    author: "James Ole Shompole (Conservancy Scout)",
    image: IMAGES.shompoleHero
  },
  {
    id: "blog-2",
    title: "What to Pack for Shompole's Volcanic Terrains & Soda Lakes",
    category: "Travel Guide",
    readTime: "4 min read",
    excerpt: "A comprehensive packing guide for Shompole's scorching sun, caustic muds, geothermal hot springs, and high volcanic winds.",
    content: "Shompole is a land of extremes. One day you are walking across dry, cracking mudflats reflecting 38°C sun, and the next you are climbing volcanic ridges swept by high winds, or soaking in hot springs. To survive and enjoy this majestic region, standard safari gear needs some upgrades. First, you need high-durability closed-toe water shoes; Lake Magadi's geothermal waters have sharp crystalline structures and caustic alkaline mud. Second, pack a physical UV-blocking umbrella and high SPF mineral sunscreens. Third, lightweight hiking poles are a lifesaver on the loose volcanic scree of the Oldonyio Sambu foothills...",
    date: "May 28, 2026",
    author: "Sophia Laurent (Travel Photographer)",
    image: IMAGES.shompoleHiking
  },
  {
    id: "blog-3",
    title: "An Anthropologist's Guide to Maasai Beadwork and Age-Sets",
    category: "Culture",
    readTime: "8 min read",
    excerpt: "De-coding the complex social messages hidden in Maasai beaded necklaces, color patterns, and warrior transition ceremonies.",
    content: "To the untrained eye, Maasai beadwork is simply a beautiful craft. To a Maasai elder, it is a complex, readable resume. Every color, circle size, and metal token tells a story of the wearer's age-group (or 'Olaji'), their warrior achievements, marital status, and social stature. Red beads represent courage and unity, white beads signify purity and livestock health, while blue beads praise the sky god Enkai for rain. When you visit a Shompole cultural boma, the women's beadwork collective shares these age-old codes, offering visitors a profound window into an oral history written in glass...",
    date: "April 19, 2026",
    author: "Matriarch Noomali Ole Lekuto",
    image: IMAGES.maasaiCulture
  }
];
