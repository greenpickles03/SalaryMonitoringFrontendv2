import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SERVER_URL } from '../constant';

@Injectable({
  providedIn: 'root',
})

export class IncomeService {
    private incomeUrl = `${SERVER_URL}/api/v1/income/createIncome`; // Income endpoint
    
    constructor(private http: HttpClient) {}

    addIncome(userAccountId: any, incomeDesc: any, incomeSource: any,
        incomeAmount: any, incomeDate: any
    ): Observable<any> {
        const body = {
            userAccountId,
            incomeDesc,
            incomeSource,
            incomeAmount,
            incomeDate
        };
        return this.http.post<any>(this.incomeUrl, body).pipe(
            map((response) => {
                // Handle successful response
                return response;
            }),
            catchError((error) => {
                // Handle error
                console.error('Error adding income:', error);
                return throwError(error);
            })
        );
    }
    
    // Method to get income data
    getIncomeData(): Observable<any> {
        return this.http.get<any>(this.incomeUrl).pipe(
        map((response) => {
            // Handle successful response
            return response;
        }),
        catchError((error) => {
            // Handle error
            console.error('Error fetching income data:', error);
            return throwError(error);
        })
        );
    }
}