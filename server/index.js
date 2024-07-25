require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { getSheetData, checkStrikes } = require('./googleSheets');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Endpoint to get data from Google Sheets and return specific columns
app.get('/api/feedback', async (req, res) => {
  try {
    const data = await getSheetData('1Ux9aQTC_-jAmpkjNJ5vbR6Ydq9GkbRul1L_1iew77ZQ', 'Form Responses 1!B:D'); // Columns B to D
    const strikes = checkStrikes(data);
    res.json({ data, strikes });
  } catch (error) {
    console.error('Detailed error fetching data from Google Sheets:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching data from Google Sheets');
  }
});

<<<<<<< HEAD
app.listen(PORT, '0.0.0.0', () => {
=======
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
>>>>>>> 8418368 (Initial commit)
  console.log(`Server is running on port ${PORT}`);
});
