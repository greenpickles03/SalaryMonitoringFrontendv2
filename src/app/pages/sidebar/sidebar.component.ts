import { Component, signal, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { Nl2BrPipe  } from 'src/app/services/nl2br.pipe'; // Import the PipesModule

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
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
})
export class SidebarComponent {
  sidePanelOpened: boolean = true;

  toggleSidebar() {
    this.sidePanelOpened = !this.sidePanelOpened;
  }
}