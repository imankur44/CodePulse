import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iLoginRequest } from '../models/iLogin-request.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedIn.asObservable();
  private baseUrl = 'http://localhost:5154/api';

  constructor(private router: Router, private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  login(model: iLoginRequest): Observable<any> {
    this.loggedIn.next(true);
    return this.http.post<any>(`${this.baseUrl}/login`, model);
  }

  signup(model: iLoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, model);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  logoutClick(): void {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  
}
