import { Component, signal, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ChatService } from '../../services/chat.service';
import { Message } from './chat';
import { AuthStatusService } from 'src/app/services/authstatus.service';
import { Nl2BrPipe  } from 'src/app/services/nl2br.pipe'; // Import the PipesModule

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Nl2BrPipe  // Add the PipesModule to the imports array
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatbotComponent implements OnInit {
  sidePanelOpened = true; 
  //input feild for  new msg
  msg = signal('');

  // MESSAGE
  selectedMessage = signal<Message | null>(null);

  messages = signal<Message[]>([]);

  filteredMessages = signal<Message[]>([]);

  searchTerm = signal('');

  userName = localStorage.getItem('name') || '';
  userDepartment = localStorage.getItem('department') || '';

  // tslint:disable-next-line - Disables all

  constructor(private chatService: ChatService, private authStatusService: AuthStatusService) {}

  ngOnInit() {
    console.log('ngOnInit called');
    this.authStatusService.startAuthCheck(); // Start auth check on component load
    console.log('startAuthCheck called');
  
    this.messages.set(this.chatService.messages());

    this.filteredMessages.set(this.messages());
    this.selectedMessage.set(this.chatService.selectedMessage());
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  selectMessage(message: Message): void {
    this.selectedMessage.set(message);

    if (this.isOver()) { // Check if the screen is small
      this.sidePanelOpened = false; // Close the sidebar
    }
  }

  sendMessage(): void {
    const currentSelectedMessage = this.selectedMessage();
    if (currentSelectedMessage) {
      this.chatService.sendMessage(currentSelectedMessage, this.msg());
      this.msg.set('');

    }
  }

  searchMessages(): void {
    this.filteredMessages.set(
      this.searchTerm().trim()
        ? this.messages().filter((message) =>
            message.from.toLowerCase().includes(this.searchTerm().toLowerCase())
          )
        : this.messages()
    );
  }
}