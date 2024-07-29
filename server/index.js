const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { getSheetData, checkStrikes } = require('./googleSheets');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API endpoint
app.get('/api/feedback', (req, res) => {
  // Your existing API logic
  res.send('API Endpoint');
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
