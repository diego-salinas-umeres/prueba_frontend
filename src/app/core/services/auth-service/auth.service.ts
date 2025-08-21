import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserRegisterRequest, UserRegisterResponse, UserLoginRequest, UserLoginResponse } from '../../models/user.model';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/users`

  constructor(
    private http: HttpClient
  ) { }

  register(user: UserRegisterRequest): Observable<UserRegisterResponse>{
    return this.http.post<UserRegisterResponse>(`${this.baseUrl}/register`, user);
  }

  login(credentials: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role || null;
    } catch (e) {
      console.error('Error al decodificar token', e);
      return null;
    }
  }

}
