import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { messages } from 'src/app/pages/chatbot/chat-data';
import { Message } from 'src/app/pages/chatbot/chat';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SERVER_URL } from '../constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSignal = signal<Message[]>(messages);
  private selectedMessageSignal = signal<Message | null>(messages[0]);

  constructor(private http: HttpClient, private router: Router) {}

  get messages() {
    return this.messagesSignal;
  }

  get selectedMessage() {
    return this.selectedMessageSignal;
  }

  sendMessage(selectedMessage: Message, msg: string) {
    if (msg.trim()) {
      // Set User Message
      const newMessage = { type: 'even', msg, date: new Date() };
      selectedMessage.chat.push(newMessage);

      // Update the messages signal with the new user message
      this.messagesSignal.update((currentMessages) =>
        currentMessages.map((message) =>
          message === selectedMessage
            ? { ...message, chat: [...selectedMessage.chat] }
            : message
        )
      );

      // Update the selected message signal
      this.selectedMessageSignal.set({ ...selectedMessage });

      // Call setChatbotResponse to get the bot's response
      this.setChatbotResponse(selectedMessage, msg);
    }
  }

  setChatbotResponse(selectedMessage: Message, msg: string) {
    this.sendToBackend(msg).subscribe(
      (response: string) => {
        console.log('response :' + response);
        // Add the bot's response to the chat
        const botResponse = { type: 'odd', msg: response, date: new Date() }; // Use the string response directly
        selectedMessage.chat.push(botResponse);

        // Update the messages signal with the bot's response
        this.messagesSignal.update((currentMessages) =>
          currentMessages.map((message) =>
            message === selectedMessage
              ? { ...message, chat: [...selectedMessage.chat] }
              : message
          )
        );

        // Update the selected message signal
        this.selectedMessageSignal.set({ ...selectedMessage });
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error case
        const errorMessage = { type: 'odd', msg: 'An error occurred. Please try again later.', date: new Date() };
        selectedMessage.chat.push(errorMessage);

        // Update the messages signal with the error message
        this.messagesSignal.update((currentMessages) =>
          currentMessages.map((message) =>
            message === selectedMessage
              ? { ...message, chat: [...selectedMessage.chat] }
              : message
          )
        );

        // Update the selected message signal
        this.selectedMessageSignal.set({ ...selectedMessage });
      }
    );
  }

  selectMessage(message: Message): void {
    this.selectedMessageSignal.set(message);
  }

  // Send the query to the backend as a request parameter
  private sendToBackend(query: string): Observable<string> {
    const url = `${SERVER_URL}/chatbot/ask`; // Login endpoint

    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('UserID');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `${token}`);
    headers = headers.set('UserID', userID || '');

    const params = new HttpParams().set('query', query);
    return this.http.post<{ response: string }>(url, null, { params, headers }).pipe(
      map((res) => res.response),
      catchError((error) => {
        console.error('API error:', error);
        if (error.status === 401) {
          this.router.navigate(['/authentication/login']);
        }
        return throwError(error);
      })
    );
  }
}