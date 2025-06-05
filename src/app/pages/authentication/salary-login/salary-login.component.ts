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
  selector: 'app-Salary-login',
  standalone: true,
  imports: [
    CommonModule, // Add CommonModule for Angular directives like *ngIf
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './salary-login.component.html',
})
export class AppSalaryLoginComponent implements OnInit {
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
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

    const userName = this.form.value.username!; // Non-null assertion
    const password = this.form.value.password!; // Non-null assertion

    this.authStatusService.stopAuthCheck(); // Stop auth check before login

    this.authService.login(userName, password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        console.log('token:', response.token);
        // Handle successful login (e.g., navigate to another page)
        localStorage.setItem('token', response.token);
        localStorage.setItem('UserID', response.userID);
        localStorage.setItem('name', response.name);
        localStorage.setItem('department', response.department);
        console.log('Done Setting Local Storage');
        console.log('Navigating to /starter');
        this.router.navigate(['/dashboard']).then(success => {
          if (success) {
            console.log('Navigation to /starter successful');
          } else {
            console.log('Navigation to /starter failed');
          }
        }).catch(error => {
          console.error('Navigation error:', error);
        });
      },
      error: (error) => {
        console.error('Login error:', error);
        // Handle login error (e.g., display an error message)
      },
    });
  }
}