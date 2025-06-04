import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SERVER_URL } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class AuthStatusService {
  private checkAuthUrl = `${SERVER_URL}/api/v1/auth/check`;
  private authCheckSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  startAuthCheck() {
    console.log('startAuthCheck called');
    this.authCheckSubscription = interval(10000).subscribe(() => {
      this.checkAuthStatus();
    });
  }

  stopAuthCheck() {
    if (this.authCheckSubscription) {
      this.authCheckSubscription.unsubscribe();
    }
  }

  private checkAuthStatus() {
    console.log('checkAuthStatus called');
    const headers = new HttpHeaders({
      'UserID': localStorage.getItem('UserID') || '',
      'Authorization': `${localStorage.getItem('token') || ''}`,
    });
    console.log('headers:', headers);

    this.http.get(this.checkAuthUrl, { headers }).pipe(
      catchError((error) => {
        console.error('API error:', error);
        if (error.status === 401) {
          this.handleUnauthorized();
        }
        throw error;
      })
    ).subscribe(
      (response) => {
        console.log('API response:', response);
      },
      (error) => {
        console.error('API call error:', error);
      }
    );
  }

  private handleUnauthorized() {
    console.log('handleUnauthorized called');
    localStorage.clear();
    this.router.navigate(['/authentication/login']);
  }
}