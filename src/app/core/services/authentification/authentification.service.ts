import { config } from 'src/app/config/backofficeConfig.config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  private apiUrl = config.api.baseUrl;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem(config.localStorage.sufix + config.localStorage.accessToken);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body);
  }

  refreshToken(refreshToken: string): Observable<{ accessToken: string }> {
    const body = { "token": refreshToken };
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/token`, body, { headers: this.getHeaders() });
  }

  logout(refreshToken: string): Observable<any> {
    const body = { "token": refreshToken };
    return this.http.post(`${this.apiUrl}/logout`, body, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(config.localStorage.sufix + config.localStorage.accessToken);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
