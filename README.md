# WorkivaAI - Angular Chatbot

A modern Angular chatbot application that integrates with Google's Gemini API to provide intelligent conversational responses.

## Features

- Real-time AI conversations using Google Gemini Pro
- Clean, modern chat interface with responsive design
- Conversation history management with sidebar

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in and create a new API key
3. Copy your API key

### 3. Configure API Key

Open `src/environments/environment.ts` and replace the placeholder:

```typescript
export const environment = {
  production: false,
  geminiApiKey: 'your-actual-gemini-api-key-here',
  geminiApiUrl: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
};
```

### 4. Run the Application

```bash
ng serve
```


## Project Structure

```
src/
├── app/
│   ├── services/
│   │   └── ai.service.ts          # Gemini API integration
│   ├── header/                     # Chat header component
│   ├── message-panel/              # Message display component
│   ├── user-input/                 # User input component
│   ├── chat-history/               # Conversation history sidebar
│   └── app.ts                      # Main app component
├── environments/
│   ├── environment.ts              # Development environment
│   ├── environment.prod.ts         # Production environment
│   └── environment.template.ts     # Template for setup
└── styles.scss                     # Global styles
```

## Troubleshooting

### Common Issues

1. **"Please configure your Gemini API key"**
   - Make sure you've added your API key to `environment.ts`

2. **"Failed to get response from AI"**
   - Check your internet connection
   - Verify your API key is valid
   - Check Gemini service status

3. **429 Error (Too Many Requests)**
   - Wait a few minutes before sending another message
   - This is a rate-limiting issue from Google's API

## Development

### Build for Production

```bash
npm run build
```

### Testing

```bash
npm test
```
