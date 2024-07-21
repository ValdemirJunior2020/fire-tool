require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { getSheetData, checkStrikes } = require('./googleSheets');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Endpoint to get data from Google Sheets and check for strikes
app.get('/api/feedback', async (req, res) => {
  try {
    const data = await getSheetData('1Ux9aQTC_-jAmpkjNJ5vbR6Ydq9GkbRul1L_1iew77ZQ', 'Sheet1!A:Z'); // Replace with your sheet ID and range
    const strikes = checkStrikes(data);
    res.json({ data, strikes });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
