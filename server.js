import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dogFacts from "./dog_facts-1.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// --- Breed and Category tagging ---

const breeds = [
  "Labrador", "Golden Retriever", "German Shepherd", "Bulldog", "Poodle",
  "Beagle", "Rottweiler", "Dachshund", "Boxer", "Siberian Husky",
  "Great Dane", "Doberman", "Chihuahua", "Pug", "Pomeranian",
  "Border Collie", "Dalmatian", "Greyhound", "Pit Bull", "Akita",
  "Basset Hound", "Bloodhound", "Chow Chow", "Cocker Spaniel", "Collie",
  "Corgi", "French Bulldog", "Irish Wolfhound", "Mastiff", "Newfoundland",
  "Pekingese", "Saint Bernard", "Shih Tzu", "Yorkshire Terrier", "Basenji",
  "Maltese", "Samoyed", "Whippet", "Alaskan Malamute", "Cavalier King Charles",
];

const categories = [
  { name: "History", keywords: ["ancient", "history", "century", "war", "roman", "greek", "egypt", "medieval", "middle ages", "b.c", "a.d", "originated", "first", "oldest"] },
  { name: "Health", keywords: ["health", "disease", "cancer", "blind", "deaf", "temperature", "heart", "obesity", "bite", "rabies", "poison", "chocolate", "toxic", "vet", "spay", "neuter"] },
  { name: "Science", keywords: ["smell", "hear", "vision", "brain", "dna", "genome", "chromosome", "intelligent", "iq", "smart", "sense", "frequency", "hertz", "receptor"] },
  { name: "Fun Facts", keywords: ["dream", "sleep", "tail", "bark", "swim", "run", "fast", "speed", "tongue", "paw", "nose", "wet", "curl"] },
  { name: "Records", keywords: ["record", "largest", "smallest", "fastest", "oldest", "heaviest", "tallest", "most popular", "longest"] },
  { name: "Pop Culture", keywords: ["movie", "beatles", "disney", "hollywood", "president", "titanic", "wizard of oz", "famous", "celebrity"] },
  { name: "Behavior", keywords: ["pack", "submissive", "dominan", "territorial", "jealous", "loyal", "aggressive", "friendly", "train", "command", "learn", "understand"] },
];

function tagFact(fact) {
  const lower = fact.toLowerCase();
  const factBreeds = breeds.filter(b => lower.includes(b.toLowerCase()));
  const factCategories = categories
    .filter(c => c.keywords.some(k => lower.includes(k)))
    .map(c => c.name);

  // Default category if none matched
  if (factCategories.length === 0) factCategories.push("General");
  if (factBreeds.length === 0) factBreeds.push("General");

  return { text: fact, breeds: factBreeds, categories: factCategories };
}

const taggedFacts = dogFacts.map(tagFact);

// Get unique breeds and categories from data
const allBreeds = [...new Set(taggedFacts.flatMap(f => f.breeds))].sort();
const allCategories = [...new Set(taggedFacts.flatMap(f => f.categories))].sort();

// --- API Routes ---

/** GET /api/breeds - Returns available breeds */
app.get("/api/breeds", (req, res) => {
  res.json({ breeds: allBreeds, success: true });
});

/** GET /api/categories - Returns available categories */
app.get("/api/categories", (req, res) => {
  res.json({ categories: allCategories, success: true });
});

/**
 * GET /facts
 * Query Parameters:
 *   - number (optional): number of facts to return
 *   - breed (optional): filter by breed
 *   - category (optional): filter by category
 */
app.get("/facts", (req, res) => {
  const { number, breed, category } = req.query;

  let filtered = taggedFacts;

  // Filter by breed
  if (breed) {
    filtered = filtered.filter(f =>
      f.breeds.some(b => b.toLowerCase() === breed.toLowerCase())
    );
  }

  // Filter by category
  if (category) {
    filtered = filtered.filter(f =>
      f.categories.some(c => c.toLowerCase() === category.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    return res.json({ facts: [], message: "No facts found for the given filters.", success: true });
  }

  // If no number parameter, return all matching facts
  if (number === undefined) {
    return res.json({ facts: filtered.map(f => f.text), success: true });
  }

  const count = parseInt(number, 10);

  if (isNaN(count) || count < 1) {
    return res.status(400).json({
      error: "The 'number' parameter must be a positive integer.",
      success: false,
    });
  }

  const limit = Math.min(count, filtered.length);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  const selectedFacts = shuffled.slice(0, limit).map(f => f.text);

  return res.json({ facts: selectedFacts, success: true });
});

// Serve the landing page for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found. Try GET /facts",
    success: false,
  });
});

app.listen(PORT, () => {
  console.log(`Dog Facts API is running at http://localhost:${PORT}`);
});
