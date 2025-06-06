// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ApiResponse } from '../../models/response.model';

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
  private apiUrl = 'https://pruebas.megayuntas.com:1901/api/auth/login';
  private apiUrlGoogle = 'http://localhost:1903/api/auth';

  constructor(private http: HttpClient) {}


  login(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, { username, password });
  }

  loginConGoogle(idToken: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrlGoogle}/google`, { idToken });
  }

  enviarCodigo(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:1903/api/auth/enviar-codigo', { email });
  }

  verificarCodigo(email: string, codigo: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:1903/api/auth/verificar-codigo', { email, codigo });
  }

}
