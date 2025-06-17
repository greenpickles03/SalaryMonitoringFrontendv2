import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatv2',
  templateUrl: './chatv2.component.html',
  styleUrls: ['./chatv2.component.css']
})
export class Chatv2Component {
  messages: { sender: string, text: string }[] = [];
  userMessage = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userMessage.trim()) {
      const userMsg = { sender: 'user', text: this.userMessage };
      this.messages.push(userMsg);
      this.saveMessage(userMsg);

      this.http.post<{ response: string }>('http://localhost:1102/api/v1/chat/message', { message: this.userMessage })
        .subscribe(res => {
          const aiMsg = { sender: 'ai', text: res.response };
          this.messages.push(aiMsg);
          this.saveMessage(aiMsg);
        });

      this.userMessage = '';
    }
  }

  startListening() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.start();
    recognition.onresult = (event: any) => {
      this.userMessage = event.results[0][0].transcript;
    };
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  saveMessage(message: { sender: string, text: string }) {
    let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    history.push(message);
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }

  ngOnInit() {
    this.messages = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  }
}
