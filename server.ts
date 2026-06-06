import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Mock database for pets
const initialPets = [
  {
    id: "1",
    pet_name: "Papi",
    pet_image_url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200",
    breed: "Golden Retriever",
    age: "2 Yaş",
    status: "playing",
    owner_name: "Can",
    latitude: 41.015,
    longitude: 28.979
  },
  {
    id: "2",
    pet_name: "Duman",
    pet_image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200",
    breed: "British Shorthair",
    age: "1.5 Yaş",
    status: "resting",
    owner_name: "Melis",
    latitude: 41.025,
    longitude: 28.965
  },
  {
    id: "3",
    pet_name: "Milo",
    pet_image_url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200",
    breed: "Jack Russell",
    age: "3 Yaş",
    status: "walking",
    owner_name: "Bora",
    latitude: 41.008,
    longitude: 28.985
  },
  {
    id: "4",
    pet_name: "Köfte",
    pet_image_url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=200",
    breed: "Pug",
    age: "1 Yaş",
    status: "active",
    owner_name: "Ece",
    latitude: 41.022,
    longitude: 28.995
  },
  {
    id: "5",
    pet_name: "Pamuk",
    pet_image_url: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=200",
    breed: "Ankara Kedisi",
    age: "4 Yaş",
    status: "resting",
    owner_name: "Selen",
    latitude: 41.012,
    longitude: 28.955
  },
  {
    id: "6",
    pet_name: "Zeytin",
    pet_image_url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=200",
    breed: "Tekir",
    age: "6 Aylık",
    status: "playing",
    owner_name: "Aslı",
    latitude: 41.018,
    longitude: 28.989
  }
];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Route for retrieving dynamic pets
  app.get("/api/pets", (req, res) => {
    res.json(initialPets);
  });

  // API Route to add a dynamic pet
  app.post("/api/pets", (req, res) => {
    const { pet_name, pet_image_url, breed, age, status, owner_name, latitude, longitude } = req.body;
    if (!pet_name || !pet_image_url) {
      return res.status(400).json({ error: "Pet name and image URL are required" });
    }
    const newPet = {
      id: Math.random().toString(36).substring(2, 9),
      pet_name,
      pet_image_url,
      breed: breed || "Karışık",
      age: age || "1 Yaş",
      status: status || "active",
      owner_name: owner_name || "Bilinmiyor",
      latitude: latitude || 41.012 + (Math.random() - 0.5) * 0.02,
      longitude: longitude || 28.97 + (Math.random() - 0.5) * 0.04
    };
    initialPets.push(newPet);
    res.status(201).json(newPet);
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
