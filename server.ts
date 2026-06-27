import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

// Ensure data folder exists with initial demo inquiries for rich business presentation
function ensureDataFolder() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    const demoInquiries = [
      {
        id: "inq-101",
        createdAt: "2026-06-25T14:30:00Z",
        fullName: "Dr. Elizabeth Vance",
        email: "e.vance@oxford.ac.uk",
        phone: "+44 1865 270000",
        stayType: "exploration_research",
        nights: 45,
        guests: 3,
        destinations: ["Shompole Conservancy", "Ewuaso Nyiro River", "Maasai Cultural Villages"],
        activities: ["Cultural tours", "Wildlife tracking", "Night game drives"],
        specialRequirements: "Conducting a research study on Ewuaso Nyiro river ecology and riparian bird nesting habits. Need dedicated local Maasai trackers and an off-grid mobile camp.",
        status: "Confirmed"
      },
      {
        id: "inq-102",
        createdAt: "2026-06-26T09:15:00Z",
        fullName: "Marcus & Sophia Laurent",
        email: "marcus.laurent@travels.fr",
        phone: "+33 6 1234 5678",
        stayType: "weekend_holiday",
        nights: 4,
        guests: 2,
        destinations: ["Shompole Conservancy", "Lake Magadi", "Lake Natron"],
        activities: ["Wildlife safaris", "Hiking adventures", "Photography"],
        specialRequirements: "Celebrating our 10th anniversary. Looking for a luxury photography safari, especially interested in capturing the pink flamingos and leopards at night.",
        status: "Reviewed"
      }
    ];
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(demoInquiries, null, 2), "utf8");
  }
}

ensureDataFolder();

// Helper to lazy-initialize the Google GenAI SDK client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it via the Settings > Secrets panel.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Get all inquiries
app.get("/api/inquiries", (req, res) => {
  try {
    ensureDataFolder();
    const fileData = fs.readFileSync(INQUIRIES_FILE, "utf8");
    const inquiries = JSON.parse(fileData);
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to read inquiries: " + error.message });
  }
});

// Submit a new booking inquiry
app.post("/api/inquiry", (req, res) => {
  try {
    const { fullName, email, phone, stayType, nights, guests, destinations, activities, specialRequirements } = req.body;

    if (!fullName || !email || !phone || !stayType || !nights || !guests) {
      return res.status(400).json({ error: "Missing required booking details. Please complete the form." });
    }

    // Enforce business rules
    const nightsNum = Number(nights);
    if (stayType === "weekend_holiday" && nightsNum > 5) {
      return res.status(400).json({ error: "Holiday and weekend itineraries are limited to a maximum of 5 nights. For longer stays, please select Exploration & Research." });
    }

    ensureDataFolder();
    const fileData = fs.readFileSync(INQUIRIES_FILE, "utf8");
    const inquiries = JSON.parse(fileData);

    const newInquiry = {
      id: `inq-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      fullName,
      email,
      phone,
      stayType,
      nights: nightsNum,
      guests: Number(guests),
      destinations: destinations || [],
      activities: activities || [],
      specialRequirements: specialRequirements || "",
      status: "Received"
    };

    inquiries.unshift(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf8");

    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to submit inquiry: " + error.message });
  }
});

// Generate dynamic, beautiful custom guest itinerary using Gemini
app.post("/api/itinerary", async (req, res) => {
  try {
    const { stayType, nights, destinations, activities, guests, specialRequirements } = req.body;

    // Default values if unspecified
    const stayTypeLabel = stayType === "weekend_holiday" ? "Weekend / Holiday Stay" : "Exploration & Research Stay";
    const actualNights = Number(nights) || (stayType === "weekend_holiday" ? 3 : 14);
    const destinationList = destinations && destinations.length > 0 ? destinations.join(", ") : "Shompole Conservancy, Lake Magadi";
    const activityList = activities && activities.length > 0 ? activities.join(", ") : "Wildlife Game Drives, Maasai Culture Walking Safari";
    const guestCount = Number(guests) || 2;
    const notes = specialRequirements || "None";

    // Validate stay type limits
    if (stayType === "weekend_holiday" && actualNights > 5) {
      return res.status(400).json({ error: "Weekend and holiday itineraries are capped at 5 nights. Please choose an Exploration & Research stay for longer durations." });
    }

    // Lazy load Gemini Client & trigger the call
    const ai = getGenAI();

    const systemInstruction = `You are Ololoolo, the Chief Safari Curator & Elder Guide of Emayian Shompole Safaris in southern Kenya.
Your tone is deeply respectful, highly professional, hospitable, and rich with authentic Maasai culture and local knowledge of the Shompole Conservancy, Lake Magadi, Lake Natron, and the Ewuaso Nyiro river.
Create an incredibly engaging, highly tailored, and realistic day-by-day itinerary.
IMPORTANT: 
- If the stay type is Exploration & Research, highlight how the safari accommodates scientific investigation, local community discussions, conservation study, and tracking rare wildlife over ${actualNights} days.
- If the stay is Weekend/Holiday (capped at 5 nights), create a highly immersive luxury experience suited for a shorter rejuvenation.
- Focus on real places and accurate experiences of the Shompole region: hot springs, red alkaline soda lakes, night game drives (which Shompole is famous for), Ewuaso Nyiro river boating or walks, Maasai cultural bomas, and walking safaris.`;

    const prompt = `Please design a personalized ${actualNights}-night itinerary for ${guestCount} guests under the "${stayTypeLabel}" package.
Selected Destinations to include: ${destinationList}
Key Focus Activities: ${activityList}
Special Guest Requirements: "${notes}"

For each day, select the most relevant local image filename from tap1.jpg to tap50.jpg, returned exactly in the format "/images/tapX.jpg" where X is 1 to 50.
Categorization Guidelines:
- If the day focuses on wildlife/predators, select from: /images/tap3.jpg, /images/tap4.jpg, /images/tap5.jpg, /images/tap6.jpg, /images/tap12.jpg, /images/tap14.jpg, /images/tap22.jpg, /images/tap28.jpg, /images/tap29.jpg, /images/tap30.jpg, /images/tap31.jpg, /images/tap35.jpg, /images/tap36.jpg, /images/tap41.jpg.
- If the day is about lodging, camps, relaxing, fire-settings, or food, select from: /images/tap1.jpg, /images/tap9.jpg, /images/tap23.jpg, /images/tap24.jpg, /images/tap25.jpg, /images/tap43.jpg, /images/tap44.jpg.
- If the day is about cultural Maasai dances, bomas, crafts, or community walks, select from: /images/tap8.jpg, /images/tap47.jpg, /images/tap48.jpg.
- If the day is about scenic waters, hot springs, flamingos, or river bend viewpoints, select from: /images/tap2.jpg, /images/tap11.jpg, /images/tap13.jpg, /images/tap17.jpg, /images/tap32.jpg.
- For general landscapes, hiking, volcanic ridges, and vehicle transits, select from other tap files like tap7.jpg, tap10.jpg, tap15.jpg, tap16.jpg, tap18.jpg, tap19.jpg, tap20.jpg, etc.

Ensure the response strictly complies with the requested JSON schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "overview", "days", "packingList", "conservationContribution", "estimatedPriceUSD"],
          properties: {
            title: {
              type: Type.STRING,
              description: "A majestic, evocative title for this custom guest safari itinerary."
            },
            overview: {
              type: Type.STRING,
              description: "A beautifully written, welcoming letter from your Maasai Elder Guide, introducing the Shompole lands."
            },
            days: {
              type: Type.ARRAY,
              description: "A day-by-day listing of experiences.",
              items: {
                type: Type.OBJECT,
                required: ["dayNumber", "title", "activities", "accommodation", "meals", "description", "image"],
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING, description: "Theme/focus of this day." },
                  activities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  accommodation: { type: Type.STRING, description: "Name of the boutique tented camp or eco-lodge for this night." },
                  meals: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  description: { type: Type.STRING, description: "Detailed, colorful narrative of the day's encounters, morning to night." },
                  image: {
                    type: Type.STRING,
                    description: "Selected appropriate local image path inside public/images, returned exactly in the format '/images/tap{1-50}.jpg' (e.g. '/images/tap12.jpg')."
                  }
                }
              }
            },
            researchFocus: {
              type: Type.STRING,
              description: "Optional segment detailing academic, ecological, or anthropological tips if stayType is exploration_research."
            },
            packingList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specific clothing and gear recommendations tailored to Shompole's hot, dry climate and hiking terrains."
            },
            conservationContribution: {
              type: Type.STRING,
              description: "A summary of how this specific itinerary directly contributes to community bursaries and Shompole conservation ranger patrols."
            },
            estimatedPriceUSD: {
              type: Type.NUMBER,
              description: "A premium, realistic estimated price per person in USD (e.g., $400 to $700 per night per guest, adjusted realistically for research versus luxury holiday stays)."
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response received from Gemini.");
    }

    const itineraryData = JSON.parse(jsonText.trim());
    res.json(itineraryData);
  } catch (error: any) {
    console.error("Gemini Itinerary Generation Error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred during itinerary creation." });
  }
});


// -------------------------------------------------------------
// VITE AND STATIC ASSETS SERVING MIDDLEWARE
// -------------------------------------------------------------

async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite HMR integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`);
    console.log(`  Emayian Shompole Safaris server is running!      `);
    console.log(`  Local Access: http://localhost:${PORT}          `);
    console.log(`====================================================`);
  });
}

initializeServer();
