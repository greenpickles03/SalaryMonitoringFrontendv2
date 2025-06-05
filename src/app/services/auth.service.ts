import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SERVER_URL } from '../constant';
import { AuthStatusService } from './authstatus.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${SERVER_URL}/api/v1/user-account/getUserAccount`; // Login endpoint

  constructor(private http: HttpClient, private authStatusService: AuthStatusService) {}

  // Login method
  
  // Login method
  login(username: string, password: string): Observable<any> {
    const body = 
      {
        username: username, // Username from the form
        password: password, // Password from the form
        // Additional parameters can be added here if needed
      } // Request body

    return this.http.post<any>(this.loginUrl, body).pipe(
      map((response) => {
        // Handle successful login
        // console.log('Login response:', response);
        // console.log('Login Successful');
        //this.authStatusService.startAuthCheck(); // Start auth check
        return response;
      }),
      catchError((error) => {
        // Handle login error
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
}