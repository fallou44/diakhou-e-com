import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Lazy initialization of GoogleGenAI client to prevent crash if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI Virtual Stylist will fall back to mock recommendations.");
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API for AI Consultation / Virtual Stylist Recommendation
app.post("/api/ai/recommend", async (req, res) => {
  const { skinTone, facialShape, lengthPreference, texturePreference, lifestyle, occasion, extraInfo } = req.body;

  try {
    const ai = getAIClient();
    
    const prompt = `Un utilisateur recherche des conseils personnalisés pour sa prochaine perruque ou extension Diakhou Hair & Beauty. Voici son profil:
    - Forme du visage: ${facialShape || "Non spécifié"}
    - Teint de la peau: ${skinTone || "Non spécifié"}
    - Longueur préférée: ${lengthPreference || "Non spécifié"}
    - Texture préférée (lisse, ondulé, bouclé): ${texturePreference || "Non spécifié"}
    - Style de vie / Quotidien: ${lifestyle || "Non spécifié"}
    - Occasion / Événement spécial: ${occasion || "Non spécifié"}
    - Informations supplémentaires: ${extraInfo || "Aucune"}

    En tant que styliste capillaire experte de Diakhou Hair & Beauty, s'il te plaît, génère une recommandation complète structurée en JSON.
    Veuillez respecter ce schéma JSON précisément :
    {
      "recommendedProductType": "Une phrase recommandant le type de produit (ex: Wear & Go de 20 pouces ou HD Lace Frontal lisses)",
      "justification": "Explication chaleureuse de pourquoi ce choix convient spécifiquement à la forme de son visage et de sa peau",
      "textureAdvice": "Conseils sur la texture à choisir (Body Wave, Straight, Kinky Curly, Deep Wave) selon son quotidien",
      "stylingTips": ["Astuce de coiffage 1", "Astuce de coiffage 2", "Astuce de coiffage 3"],
      "careRoutine": ["Conseil d'entretien 1", "Conseil d'entretien 2"],
      "fittingMethod": "Présente si elle doit choisir une méthode Glueless Wear & Go (sans colle) ou HD Lace"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Tu es l'experte visagiste et styliste capillaire de la marque Diakhou Hair & Beauty. Tu donnes des conseils extrêmement chaleureux, luxueux et professionnels en français. Tu dois répondre strictement au format JSON valide correspondant au schéma demandé.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedProductType: { type: Type.STRING },
            justification: { type: Type.STRING },
            textureAdvice: { type: Type.STRING },
            stylingTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            careRoutine: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            fittingMethod: { type: Type.STRING }
          },
          required: ["recommendedProductType", "justification", "textureAdvice", "stylingTips", "careRoutine", "fittingMethod"]
        }
      }
    });

    const textOutput = response.text || "{}";
    const recommendation = JSON.parse(textOutput);
    res.json({ success: true, data: recommendation });

  } catch (error: any) {
    console.error("Gemini API Error in recommend route:", error);
    
    // Fallback recommendation when API Key is missing or service is down
    const textPreference = texturePreference || "Body Wave";
    res.json({
      success: false,
      isFallBack: true,
      data: {
        recommendedProductType: `Wear & Go HD Lace Pre-Cut 4x4 - ${textPreference}`,
        justification: `D'après vos préférences de coiffage, nous vous recommandons vivement notre collection phare 'Wear & Go'. Elle rehausse magnifiquement les visages de forme ${facialShape || "ovale/ronde"} et illumine les teints ${skinTone || "tous teints"}.`,
        textureAdvice: `La texture ${textPreference} est incroyablement polyvalente, s'accordant avec votre style de vie pour un entretien minimal et un volume longue durée.`,
        stylingTips: [
          "Utilisez un spritz protecteur de chaleur avant d'appliquer un fer à boucler ou un lisseur.",
          "Définissez vos boucles ou ondulations avec une mousse légère hydratante pour éliminer les frisottis.",
          "Brossez délicatement en commençant par les pointes pour remonter vers la racine."
        ],
        careRoutine: [
          "Lavez votre perruque à l'eau tiède avec un shampooing doux sans sulfate une fois par semaine.",
          "Appliquez un après-shampooing riche en huile d'argan et laissez poser 15 minutes avant de rincer abondamment."
        ],
        fittingMethod: "La méthode Wear & Go 100% sans colle (Glueless) est idéale pour vous : elle s'enfile en 3 secondes chrono et protège parfaitement vos tempes et lisières de cheveux."
      }
    });
  }
});

// Setup Vite Development Server or Static Build Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up server in production mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
  });
}

startServer();
