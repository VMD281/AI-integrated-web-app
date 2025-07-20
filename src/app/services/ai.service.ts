import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Message } from '../utility/constants';

export interface GeminiContent {
  parts: Array<{
    text: string;
  }>;
}

export interface GeminiRequest {
  contents: Array<{
    role: 'user' | 'model';
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
  };
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private readonly apiUrl = environment.geminiApiUrl;
  private readonly apiKey = environment.geminiApiKey;

  constructor(private http: HttpClient) {
    console.log('AI Service initialized with API URL:', this.apiUrl);
    console.log('API Key configured:', this.isApiKeyConfigured());
  }

  sendMessage(userMessage: string, conversationHistory: Message[]): Observable<string> {
    console.log('Sending message to Gemini:', userMessage);
    console.log('Conversation history length:', conversationHistory.length);
    
    const contents: Array<{
      role: 'user' | 'model';
      parts: Array<{ text: string }>;
    }> = [];

    const recentMessages = conversationHistory.slice(-10);
    recentMessages.forEach(msg => {
      if (msg.content !== userMessage) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      }
    });

    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const requestBody: GeminiRequest = {
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 0.8,
        topK: 40
      }
    };

    const url = `${this.apiUrl}?key=${this.apiKey}`;
    
    console.log('Making API call to:', url);
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    return this.http.post<GeminiResponse>(url, requestBody)
      .pipe(
        map(response => {
          console.log('Gemini API response:', response);
          if (response.candidates && response.candidates.length > 0) {
            const responseText = response.candidates[0].content.parts[0].text;
            console.log('Extracted response text:', responseText);
            return responseText;
          } else {
            console.error('No candidates in response:', response);
            throw new Error('No response from Gemini');
          }
        }),
        catchError(error => {
          console.error('Error calling Gemini API:', error);
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            error: error.error,
            message: error.message
          });
          return throwError(() => new Error('Failed to get response from AI'));
        })
      );
  }

  isApiKeyConfigured(): boolean {
    return this.apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && this.apiKey.length > 0;
  }
}
