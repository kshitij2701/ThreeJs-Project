import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Make a request to the Unsplash API to get a random image based on the prompt
    const unsplashResponse = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(prompt)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    if (unsplashResponse.ok) {
      const unsplashData = await unsplashResponse.json();
      console.log("Unsplash API Response:", unsplashData);
      const imageUrl = unsplashData.urls.regular;

      res.status(200).json({ photo: imageUrl });
    } else {
      console.error("Unsplash API Error:", unsplashResponse.statusText);
      res.status(500).json({ message: "Error fetching image from Unsplash API" });
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
