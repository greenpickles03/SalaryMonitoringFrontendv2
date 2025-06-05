import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStatusService } from 'src/app/services/authstatus.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    CommonModule, // Add CommonModule for Angular directives like *ngIf
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  options = this.settings.getOptions();

  constructor(
    private settings: CoreService,
    private router: Router,
    private authService: AuthService,
    private authStatusService: AuthStatusService
  ) {}

  ngOnInit() {
    localStorage.clear(); // Clear local storage on component load
    this.authStatusService.stopAuthCheck(); // Stop auth check on component load
  }

  // Form Group for login
  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  // Getter for easy access to form controls
  get f() {
    return this.form.controls;
  }

  // Submit method
  submit() {
    if (this.form.invalid) {
      return; // Stop execution if the form is invalid
    }

    const userName = this.form.value.uname!; // Non-null assertion
    const password = this.form.value.password!; // Non-null assertion

    // this.authStatusService.stopAuthCheck(); 

    this.authService.login(userName, password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        console.log('Login response:', response);
        console.log('token:', response.token);
        // Handle successful login (e.g., navigate to another page)
        localStorage.setItem('token', response.token);
        localStorage.setItem('UserID', response.userID);
        localStorage.setItem('name', response.name);
        console.log('Done Setting Local Storage');
        console.log('Navigating to /chatbot');
        // this.router.navigate(['/chatbot']).then(success => {
        //   if (success) {
        //     console.log('Navigation to /chatbot successful');
        //   } else {
        //     console.log('Navigation to /chatbot failed');
        //   }
        // }).catch(error => {
        //   console.error('Navigation error:', error);
        // });
      },
      error: (error) => {
        console.error('Login error:', error);
        // Handle login error (e.g., display an error message)
      },
    });
  }
}