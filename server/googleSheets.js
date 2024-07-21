const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    '207015306049-tk9k2s91u4qr62dc4qrs1lo3qi3hbjrd.apps.googleusercontent.com',
    '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',
    'http://localhost'
);

oauth2Client.setCredentials({
    refresh_token: '1//0556_iWB-baFzCgYIARAAGAUSNwF-L9IrwXPEK-tr8W9GAE8Sy5tVpJUegFr77nhsTxA5rVI5nfWAwh8y686mkX8Rl3pn5m40aCI' // Your new refresh token
});

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

async function getSheetData(spreadsheetId, range) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        return response.data.values;
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw error;
    }
}

function checkStrikes(feedbackData) {
    if (feedbackData.length === 0) {
        return {};
    }

    const headers = feedbackData[0];
    const typeOfFeedbackIndex = headers.indexOf('type of feedback');
    if (typeOfFeedbackIndex === -1) {
        throw new Error("Column 'type of feedback' not found in the sheet");
    }

    const strikes = {};
    feedbackData.slice(1).forEach(row => {
        const agent = row[0]; // Assuming the agent's name/ID is in the first column
        const feedbackType = row[typeOfFeedbackIndex];
        if (feedbackType.toLowerCase() === 'corrective') {
            if (!strikes[agent]) {
                strikes[agent] = 0;
            }
            strikes[agent]++;
        }
    });
    return strikes;
}

module.exports = {
    getSheetData,
    checkStrikes,
};
