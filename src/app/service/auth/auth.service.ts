// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

interface LoginResponse {
  // Define aquí la respuesta que te envía el backend,
  // por ejemplo un token JWT u otro dato
  token: string;
  // otros campos si hay
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:1903/api/auth/login';
  private apiUrlGoogle = 'http://localhost:1903/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password });
  }

  loginConGoogle(idToken: string): Observable<any> {
    return this.http.post(`${this.apiUrlGoogle}/google`, {
      idToken
    });
  }

}
