# Dictionary Response Rendering

A modern, responsive dictionary application built with Vue 3, TypeScript, and Vite. Search for words, view detailed definitions, filter by part of speech, and explore word frequency metrics.

## Why This Project Exists

This is a personal learning project to build a polished, full-featured dictionary application. It combines API integration with a rich UI to create a smooth user experience for word lookups. Future improvements include better caching, offline support, and additional language options.

## Features

- 🔍 **Fast Word Search** - Instantly search for word definitions
- 📚 **Detailed Definitions** - View multiple definitions, pronunciations, and meanings
- 🏷️ **Part of Speech Filtering** - Filter results by noun, verb, adjective, etc.
- 📊 **Word Frequency** - See how commonly a word is used
- 🌙 **Dark Mode** - Built-in theme toggle for comfortable reading
- ⏱️ **Search History** - Quick access to recently searched words
- 🎨 **Modern UI** - Clean, responsive design with PrimeVue and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- A RapidAPI account with access to a dictionary API

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd dictionary-response-rendering
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your environment variables (see [API Key Setup](#api-key-setup) below)

4. Start the development server:

   ```bash
   pnpm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm run build
pnpm run preview
```

## API Key Setup

This application uses the **RapidAPI Dictionary API** to fetch word definitions.

### Step 1: Create a RapidAPI Account

1. Visit [RapidAPI](https://rapidapi.com/)
2. Sign up for a free account (free tier includes 2,500 requests/month)

### Step 2: Subscribe to the Dictionary API

1. Search for "Dictionary API" or go to a popular dictionary API like "Wordsapi"
2. Click "Subscribe" to the free plan
3. You'll receive your API Host and API Key

### Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_RAPIDAPI_URL=https://wordsapiv1.p.rapidapi.com
VITE_RAPIDAPI_HOST=wordsapiv1.p.rapidapi.com
VITE_RAPIDAPI_KEY=your_actual_api_key_here
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### Step 4: Verify Setup

Start the dev server and search for a word. If you see results, your API key is working!

## How to Use

1. **Search for a Word**: Type any word in the search bar at the top
2. **View Results**: The app displays definitions, pronunciation, and part of speech
3. **Filter by Part of Speech**: Use the filter bar to narrow results (e.g., show only nouns)
4. **Check Word Frequency**: See the frequency meter to understand how common a word is
5. **View History**: Click on any word in your recent search history to quickly revisit it
6. **Toggle Dark Mode**: Click the theme toggle in the top-right corner

## Project Structure

```
src/
├── components/         # Vue components for UI elements
├── stores/             # Pinia store for state management
├── api/                # API integration and utilities
├── lib/                # Helper functions, types, and  constants
└── App.vue             # Main application component
```

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation build tool
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **PrimeVue** - Component library
- **RapidAPI** - Dictionary API provider

## Troubleshooting

### "Word Not Found" Error

- Check your spelling
- Some uncommon words may not be in the dictionary database
- Try a simpler word to test if the API is working

### API Key Errors

- Verify your `.env.local` file exists and has correct values
- Double-check your API key hasn't expired
- Ensure you've subscribed to the Dictionary API on RapidAPI
- Restart the dev server after updating `.env.local`

### CORS Issues

- The app uses a proxy in development mode to handle CORS
- Make sure you're accessing the app through `localhost:5173`, not an IP address

## Future Improvements

- [ ] Save favorite words
- [ ] Word pronunciation audio
- [ ] Multiple language support
- [ ] Offline mode with cached definitions
- [ ] Share word definitions
- [ ] Related words suggestions

## License

This project is open source and available under the MIT License.
