import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Nl2BrPipe } from 'src/app/services/nl2br.pipe';
import { AuthService } from 'src/app/services/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Nl2BrPipe  
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DashboardComponent implements OnInit  {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(private authStatusService: AuthService) {

  }

    sidePanelOpened = true; 
    
    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        console.log('ngOnInit called');
        console.log('startAuthCheck called: ' + localStorage.getItem('email'));
      setInterval(() => {
        this.authStatusService.findAccountByEmail(localStorage.getItem('email')).subscribe({
            next: (response) => {
                console.log('Response received:', response);
                localStorage.setItem('name', response.name);
                localStorage.setItem('department', response.department);
                localStorage.setItem('balance', response.userDetails.incomeAmount);
            },
            error: (error) => {
                console.error('Error fetching account:', error);
            }
        })
      }, 5000);
        
    }
    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    userName = localStorage.getItem('name') || '';
    userDepartment = localStorage.getItem('department') || '';

    
}