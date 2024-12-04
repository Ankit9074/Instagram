const express = require('express');
const scraper = require('./scraper');
const compression = require('compression');

const app = express();

// Middleware
app.use(compression());
app.use(express.static('public')); // Serve static assets

// Routes
app.get('/scrape', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).send('Username is required');

  try {
    const profileData = await scraper.getProfileData(username);
    res.json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Instagram data');
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
