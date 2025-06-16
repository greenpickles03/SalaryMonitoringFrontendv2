import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ViewChild, ElementRef,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TranslateService } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatSelectChange } from '@angular/material/select';
import {IncomeService} from 'src/app/services/income.service';

interface notifications {
  id: number;
  icon: string;
  color: string;
  title: string;
  time: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  title: string;
  link: string;
  new?: boolean;
}

interface apps {
  id: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  link: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: '/assets/images/flag/icon-flag-en.svg',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
    {
      language: 'Español',
      code: 'es',
      icon: '/assets/images/flag/icon-flag-es.svg',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: '/assets/images/flag/icon-flag-fr.svg',
    },
    {
      language: 'German',
      code: 'de',
      icon: '/assets/images/flag/icon-flag-de.svg',
    },
  ];

  constructor(
    private settings: CoreService,
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }

  
  options = this.settings.getOptions();
  userName = localStorage.getItem('name') || '';
  email = localStorage.getItem('email') || '';
  balance = localStorage.getItem('balance') || '0.00';
  setDark() {
    this.settings.toggleTheme();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openBalanceDialog() {
    const dialogRef = this.dialog.open(AppIncomeDialogComponent);
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  

  notifications: notifications[] = [
    {
      id: 1,
      icon: 'a-b-2',
      color: 'primary',
      time: '8:30 AM',
      title: 'Launch Admin',
      subtitle: 'Just see the my new admin!',
    },
    {
      id: 2,
      icon: 'calendar',
      color: 'accent',
      time: '8:21 AM',
      title: 'Event today',
      subtitle: 'Just a reminder that you have event',
    },
    {
      id: 3,
      icon: 'settings',
      color: 'warning',
      time: '8:05 AM',
      title: 'Settings',
      subtitle: 'You can customize this template',
    },
    {
      id: 4,
      icon: 'a-b-2',
      color: 'success',
      time: '7:30 AM',
      title: 'Launch Templates',
      subtitle: 'Just see the my new admin!',
    },
    {
      id: 5,
      icon: 'exclamation-circle',
      color: 'error',
      time: '7:03 AM',
      title: 'Event tomorrow',
      subtitle: 'Just a reminder that you have event',
    },
  ];

  profiledd: profiledd[] = [
    // {
    //   id: 1,
    //   title: 'My Profile',
    //   link: '/',
    // },
    // {
    //   id: 2,
    //   title: 'My Subscription',
    //   link: '/',
    // },
    // {
    //   id: 3,
    //   title: 'My Invoice',
    //   new: true,
    //   link: '/',
    // },
    // {
    //   id: 4,
    //   title: ' Account Settings',
    //   link: '/',
    // },
     {
      id: 6,
      title: 'Balance',
      link: '/',
    },
    {
      id: 5,
      title: 'Sign Out',
      link: '/authentication/login',
    },
   
  ];

  apps: apps[] = [
    {
      id: 1,
      icon: 'solar:chat-line-line-duotone',
      color: 'primary',
      title: 'Chat Application',
      subtitle: 'Messages & Emails',
      link: '/',
    },
    {
      id: 2,
      icon: 'solar:checklist-minimalistic-line-duotone',
      color: 'accent',
      title: 'Todo App',
      subtitle: 'Completed task',
      link: '/',
    },
    {
      id: 3,
      icon: 'solar:bill-list-line-duotone',
      color: 'success',
      title: 'Invoice App',
      subtitle: 'Get latest invoice',
      link: '/',
    },
    {
      id: 4,
      icon: 'solar:calendar-line-duotone',
      color: 'error',
      title: 'Calendar App',
      subtitle: 'Get Dates',
      link: '/',
    },
    {
      id: 5,
      icon: 'solar:smartphone-2-line-duotone',
      color: 'warning',
      title: 'Contact Application',
      subtitle: '2 Unsaved Contacts',
      link: '/',
    },
    {
      id: 6,
      icon: 'solar:ticket-line-duotone',
      color: 'primary',
      title: 'Tickets App',
      subtitle: 'Create new ticket',
      link: '/',
    },
    {
      id: 7,
      icon: 'solar:letter-line-duotone',
      color: 'accent',
      title: 'Email App',
      subtitle: 'Get new emails',
      link: '/',
    },
    {
      id: 8,
      icon: 'solar:book-2-line-duotone',
      color: 'warning',
      title: 'Courses',
      subtitle: 'Create new course',
      link: '/',
    },
  ];
}

@Component({
  selector: 'search-dialog',
  standalone: true,
  imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule],
  templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  navItemsData = navItems.filter((navitem) => navitem.displayName);

  // filtered = this.navItemsData.find((obj) => {
  //   return obj.displayName == this.searchinput;
  // });
}

@Component({
  selector: 'income-dialog',
  standalone: true,
  imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule],
  templateUrl: 'add-income.component.html',
})
export class AppIncomeDialogComponent {
  sourceOfIncome: string = '';
  amount: number;
  description: string | null = null;
  dialog: MatDialog;
  constructor(private incomeService: IncomeService) {}

  incomeSources = [
    { value: 'salary', label: 'Salary' },
    { value: 'business', label: 'Business' },
    { value: 'investment', label: 'Investment' },
    { value: 'gift', label: 'Gift' },
    { value: 'other', label: 'Other' }
  ];

  @ViewChild('amountInput') amountInput!: ElementRef;
  @ViewChild('descriptionInput') descriptionInput!: ElementRef;

  onSelectionChange(event: MatSelectChange) {
    this.sourceOfIncome = event.value;
    console.log('Selected Source of Income:', this.sourceOfIncome);
  }
  today: Date = new Date();
  formattedDate: string = new Intl.DateTimeFormat('en-CA').format(this.today);

  onSubmit() {
    const userID = localStorage.getItem('userID') || '';
    const amountValue = parseFloat(this.amount !== null ? this.amount.toString() : '0');
    const inputValue = parseFloat(localStorage.getItem('balance') || '0');
    console.log('Amount:', (amountValue + inputValue).toFixed(2));
    console.log('Source of Income:', this.sourceOfIncome);
    console.log('Description:', this.description);
    console.log('Amount Input Element:', this.formattedDate); 
    console.log('Description Input Element:', userID); // Assuming you want to log the email

    this.incomeService.addIncome(userID,this.description,
      this.sourceOfIncome,(amountValue + inputValue).toFixed(2),this.formattedDate).subscribe({
      next: (response) => {
          console.log('Income added successfully:', response);
          if (response.success) {
            // Update local storage with the new balance
            localStorage.setItem('balance', (amountValue + inputValue).toFixed(2));
            // Reset form fields
            this.amount = 0;
            this.sourceOfIncome = '';
            this.description = null;
            // Reset input fields
            if (this.amountInput) {
              this.amountInput.nativeElement.value = '';
            }
            if (this.descriptionInput) {
              this.descriptionInput.nativeElement.value = '';
            }
            setTimeout(() => {
              this.sourceOfIncome = ''; // Ensures reactivity
            });
          
          }
      }
    })
    this.dialog.closeAll(); // Close the dialog after successful submission
  }
  ngOnInit() {
    const inputValue = parseFloat(localStorage.getItem('balance') || '0');
    // Initialize the navItemsData with filtered items that have displayName  
    console.log('ngOnInit called');
    // this.navItemsData = this.navItems.filter((navitem) => navitem.displayName);
    setInterval(() => {
      console.log('Repeating every 5 seconds');
      localStorage.setItem('balance', (13 + inputValue).toFixed(2));
      console.log('Updated balance:', localStorage.getItem('balance'));
    }, 5000);
  }
  navItemsData = navItems.filter((navitem) => navitem.displayName);
  // filtered = this.navItemsData.find((obj) => obj.displayName === this.searchText);

  
}