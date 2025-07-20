# Angular AI Chatbot

A modern Angular chatbot application that integrates with Google's Gemini API to provide intelligent conversational responses.

## Features

- 🤖 Real-time AI conversations using Google Gemini Pro
- 💬 Clean, modern chat interface
- ⚡ Loading indicators and typing animations
- 🔄 Conversation history management
- 🎨 Responsive design with smooth animations

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Gemini API Key

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Copy the template file: `cp src/environments/environment.template.ts src/environments/environment.ts`
3. Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual API key:

```typescript
export const environment = {
  production: false,
  geminiApiKey: 'your-actual-gemini-api-key-here',
  geminiApiUrl: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
};
```

⚠️ **Security Note**: Never commit your `environment.ts` file to version control. It's already added to `.gitignore`.

### 3. Run the Application

```bash
npm start
```

The application will be available at `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── services/
│   │   └── ai.service.ts          # Gemini API integration
│   ├── header/                     # Chat header component
│   ├── message-panel/              # Message display component
│   ├── user-input/                 # User input component
│   ├── utility/
│   │   └── constants.ts            # Message interface
│   └── app.ts                      # Main app component
├── environments/
│   └── environment.ts              # Environment configuration
└── styles.scss                     # Global styles
```

## Key Components

### AI Service (`ai.service.ts`)
- Handles all Gemini API communication
- Manages conversation history
- Provides error handling and response processing

### Message Interface (`constants.ts`)
```typescript
export interface Message {
  id: string;
  sender: string;  // 'user' or 'assistant'
  content: string;
  dateTime: Date;
}
```

### App Component (`app.ts`)
- Manages conversation state
- Handles user input and AI responses
- Shows loading states during API calls

## API Configuration

The application uses Google's Gemini Pro API with the following settings:
- **Model**: `gemini-pro`
- **Max Output Tokens**: 1000
- **Temperature**: 0.7
- **Top P**: 0.8
- **Top K**: 40

## Error Handling

The application includes comprehensive error handling:
- API key validation
- Network error handling
- Rate limiting protection
- User-friendly error messages

## Security Notes

⚠️ **Important**: Never commit your API key to version control. The environment file should be added to `.gitignore` in production.

## Troubleshooting

### Common Issues

1. **"Please configure your Gemini API key"**
   - Make sure you've added your API key to `environment.ts`

2. **"Failed to get response from AI"**
   - Check your internet connection
   - Verify your API key is valid
   - Check Gemini service status

3. **CORS Errors**
   - The application uses the official Gemini API endpoint
   - CORS should not be an issue in production

## Development

### Adding New Features

1. **Custom System Prompts**: Modify the conversation flow in `ai.service.ts`
2. **Different Models**: Change the model parameter in the API request
3. **Advanced Features**: Add streaming, function calling, or other Gemini features

### Testing

```bash
npm test
```

## License

This project is for educational purposes. Please ensure compliance with Google's usage policies.

## Contributing

Feel free to submit issues and enhancement requests!
