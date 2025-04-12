import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

  headers: any;

  userData = new BehaviorSubject(null);
  private api = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient, private router:Router) {
    if (this.isLoggedIn()) {
      this.decodeUserData();
    }

    // TODO: To be removed
    const token = localStorage.getItem('access_token');
    if (token) {
      this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      this.headers = new HttpHeaders();
    }
    // End to be revoced

  }

  decodeUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('access_token'));
    let decodedToken: any = jwtDecode(encodedToken);
    if (this.userData.value == null) {
      this.userData.next(decodedToken);
    }
    return decodedToken;
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data).pipe(tap(this.saveTokens));
  }

  login(data: any) {
    return this.http.post(`${this.api}/login`, data).pipe(tap(this.saveTokens));
  }

  refresh() {
    const refreshToken = localStorage.getItem('refresh');
    return this.http.post(`${this.api}/refresh`, { refreshToken }).pipe(tap(this.saveTokens));
  }

  saveTokens = (res: any) => {
    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('refresh_token', res.refresh_token);
  };


  getAccessToken() {
    return localStorage.getItem('access_token');
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') != null; 
  }
  
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userData.next(null);
    this.router.navigate(['/']);
  }
  
}
