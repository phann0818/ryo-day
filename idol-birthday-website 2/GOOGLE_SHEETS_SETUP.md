# Google Sheets Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Luna Birthday Messages" (or any name you prefer)
4. Set up the following columns in row 1:

| A | B | C | D | E |
|---|---|---|---|---|
| Username | Message | Emoji | Year | Timestamp |

## Step 2: Add Sample Data

Add some sample messages in the following rows:

| Username | Message | Emoji | Year | Timestamp |
|----------|---------|-------|------|-----------|
| StarryFan | Happy birthday Luna! Your smile brightens our days! 🌟 | 🌟 | 2024 | 2024-01-15T10:30:00Z |
| MoonlightDreamer | Another year of being amazing! Hope your day is magical! | 💫 | 2024 | 2024-01-15T11:45:00Z |
| SunshineSupporter | Happy birthday to the most wonderful person! ✨ | ✨ | 2023 | 2023-01-15T09:20:00Z |

## Step 3: Make the Sheet Public

1. Click "Share" button in the top right
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Copy the sheet ID from the URL (the long string between `/d/` and `/edit`)

Example URL: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
Sheet ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

## Step 4: Get Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click and enable it
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

## Step 5: Configure Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_API_KEY=your_api_key_here
\`\`\`

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to your website
3. Check if messages load from your Google Sheet
4. Try different years to see filtered results

## Sheet Structure Requirements

- **Column A (Username)**: The display name for the message author
- **Column B (Message)**: The birthday message content
- **Column C (Emoji)**: Optional emoji to display as avatar (e.g., 🌟, 💫, ✨)
- **Column D (Year)**: The year this message is for (e.g., 2024, 2023)
- **Column E (Timestamp)**: Optional timestamp for sorting (ISO format recommended)

## Adding New Messages

To add new messages, simply add new rows to your Google Sheet with the required columns filled out. The website will automatically fetch and display them.

## Security Notes

- The API key used here is for read-only access to public sheets
- For production, consider implementing proper authentication
- Never commit your `.env.local` file to version control
- Consider using environment variables in your deployment platform (Vercel)

## Troubleshooting

- **Messages not loading**: Check if the sheet is public and the ID is correct
- **API errors**: Verify the API key is valid and Google Sheets API is enabled
- **Empty results**: Ensure the year column matches exactly (case-sensitive)
- **CORS errors**: Make sure you're using the correct Google Sheets API endpoint

## Adding New Messages

To add new messages, simply add new rows to your Google Sheet with the required columns filled out. The website will automatically fetch and display them.

## Security Notes

- The API key used here is for read-only access to public sheets
- For production, consider implementing proper authentication
- Never commit your `.env.local` file to version control
- Consider using environment variables in your deployment platform (Vercel)

## Troubleshooting

- **Messages not loading**: Check if the sheet is public and the ID is correct
- **API errors**: Verify the API key is valid and Google Sheets API is enabled
- **Empty results**: Ensure the year column matches exactly (case-sensitive)
- **CORS errors**: Make sure you're using the correct Google Sheets API endpoint
