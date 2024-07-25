require('dotenv').config(); // Add this line at the top to load environment variables

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID, // Your Client ID from environment variable
    process.env.GOOGLE_CLIENT_SECRET, // Your Client Secret from environment variable
    process.env.GOOGLE_REDIRECT_URL // Your Redirect URL from environment variable
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN // Replace with your refresh token from environment variable
});

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

async function getSheetData(spreadsheetId, range) {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    return response.data.values;
}

module.exports = {
    getSheetData,
};
