import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI Taxonomic Classifier Endpoint
app.post('/api/classify', async (req, res) => {
  try {
    const { objectName, categoryHint, parameters } = req.body;

    if (!objectName) {
      return res.status(400).json({ error: 'objectName is required' });
    }

    const ai = getAiClient();
    if (!ai) {
      // Fallback structured analysis if GEMINI_API_KEY is not yet populated
      return res.json({
        name: objectName,
        latinName: `Taxon Astronomicum ${objectName.replace(/[^a-zA-Z0-9]/g, '_')}`,
        category: categoryHint || 'Celestial Specimen',
        hierarchy: ['Universe', 'Galaxies', 'Stellar Systems', 'Planets', 'Terrestrial Worlds'],
        taxonomicData: {
          realm: 'Universum (Cosmos Primordialis)',
          clade: 'Galaxiae Spirales (Via Lactea)',
          order: 'Systema Stellare Astrometricum',
          family: 'Planetae Telluricae',
          genus: 'Exoterra Zonahabitabilis',
          species: `${objectName} (Varietas Typica)`,
          binomialLatin: `Exoterra scientifica ${objectName.toLowerCase().replace(/[^a-z0-9]/g, '')}`
        },
        scientificDescription: `Scientific taxonomic specimen record for ${objectName}. High-resolution transit spectrometry and astrometric calculations indicate a differentiated physical profile consistent with contemporary astrophysical models.`,
        atmosphericAnalysis: `Spectroscopic envelope characterized by volatile molecular absorption bands and photochemical equilibrium under host stellar irradiation.`,
        taxonomicReasoning: `Placed within the taxonomic lineage based on derived planetary radius, equilibrium temperature, and stellar spectral type compatibility.`
      });
    }

    const prompt = `You are a Victorian Royal Astronomical Society curator and botanical-style taxonomist analyzing celestial bodies using the "Cosmic Analysis & Astronomical Taxonomic Logic" framework (an astronomical adaptation of the APG IV botanical classification system).

Analyze the following celestial object or candidate:
Object Name: "${objectName}"
Category Hint: "${categoryHint || 'Unknown'}"
Optional Parameters: "${parameters || 'None'}"

Provide a thorough, scientifically accurate taxonomic classification formatted strictly as JSON with the following structure:
{
  "name": "${objectName}",
  "latinName": "Botanical-style Latin binomial (e.g. Exoplaneta terrestria habitabilis K-186f or Nebula ionizata orionis major m-42)",
  "category": "Standard astrophysical classification (e.g. Rocky Exoplanet, Emission Nebula, Red Supergiant)",
  "distance": "Distance in light-years or parsecs",
  "hostStarOrGalaxy": "Host star or parent galaxy system",
  "hierarchy": ["Universe", "Galaxies", "Stellar Systems", "Planets", "Terrestrial Worlds"],
  "taxonomicData": {
    "realm": "Universum (Cosmos Primordialis)",
    "clade": "Galactic Clade in Latin",
    "order": "Order in Latin",
    "family": "Family in Latin",
    "genus": "Genus in Latin",
    "species": "Species in Latin",
    "binomialLatin": "Full Binomial Latin nomenclature"
  },
  "scientificDescription": "Detailed 3-4 sentence academic Victorian botanical-astronomical archive description of the object, atmospheric profile, temperature regime, and physical dynamics.",
  "atmosphericAnalysis": "Detailed paragraph detailing molecular absorption bands (CO2, H2O, CH4, etc.), mean molecular weight, and photochemical hazes.",
  "taxonomicReasoning": "Explicit explanation of why this specimen is placed in this exact branch of the Cosmic Phylogenetic Tree.",
  "spectralSignatures": [
    { "molecule": "CO2", "wavelength": "4.3 μm", "intensity": 85, "note": "Greenhouse thermal stabilizer" },
    { "molecule": "H2O", "wavelength": "1.4 μm", "intensity": 65, "note": "Atmospheric vapor condensation" },
    { "molecule": "N2", "wavelength": "Continuum", "intensity": 75, "note": "Primary barosphere" }
  ],
  "compositionBreakdown": [
    { "label": "Silicate Mantle", "percentage": 65, "color": "#8c6d31" },
    { "label": "Metallic Core", "percentage": 30, "color": "#1e3a5f" },
    { "label": "Volatiles", "percentage": 5, "color": "#4a7c59" }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Classification error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Deep Spectral Query Endpoint
app.post('/api/spectral-analysis', async (req, res) => {
  try {
    const { objectName, spectralType } = req.body;
    const ai = getAiClient();
    
    if (!ai) {
      return res.json({
        analysis: `Detailed spectral breakdown for ${objectName}: Primary absorption dip at 1.4μm (H2O), secondary CO2 band at 4.3μm, Rayleigh scattering slope consistent with nitrogen-rich atmosphere.`,
        habitabilityScore: 82,
        biosignatureRating: 'Probable Class I Candidate'
      });
    }

    const prompt = `Provide an astronomical transmission spectroscopy and biosignature evaluation for ${objectName} (${spectralType || 'terrestrial'}). Return a JSON object with:
    {
      "analysis": "2-3 sentences of deep spectral absorption analysis",
      "habitabilityScore": number between 0 and 100,
      "biosignatureRating": "e.g. Class I High-Probability Biosignature",
      "recommendedInstruments": ["JWST NIRSpec", "ELT METIS", "Habitable Worlds Observatory"]
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server with Vite Middleware
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cosmic Taxonomic Archive Server running on port ${PORT}`);
  });
}

start();
