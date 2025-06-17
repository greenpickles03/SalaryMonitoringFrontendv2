import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chatv2Component } from './chatv2.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [Chatv2Component],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule
  ],
  exports: [Chatv2Component],
})
export class Chatv2Module { }