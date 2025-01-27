import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import {BehaviorSubject} from 'rxjs';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() { }

  setTokens(access_token: string, refresh_token: string): void {
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
    this.loggedInSubject.next(true);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    this.loggedInSubject.next(false);
  }

  public getUserRoles(): string[] {
    const token = localStorage.getItem('access_token');
    if (!token) return []
    const decodedToken: any = jwtDecode(token);
    return decodedToken?.authorities || [];
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
