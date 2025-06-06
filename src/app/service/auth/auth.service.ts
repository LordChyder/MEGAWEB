// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
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
  private apiUrl = 'https://pruebas.megayuntas.com/api/api/auth/login';
  private apiUrlGoogle = 'https://pruebas.megayuntas.com/api/api/auth';

  constructor(private http: HttpClient) {}


  login(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, { username, password });
  }

  loginConGoogle(idToken: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrlGoogle}/google`, { idToken });
  }

  enviarCodigo(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://pruebas.megayuntas.com/api/api/auth/enviar-codigo', { email });
  }

verificarCodigo(email: string, codigo: string): Observable<any> {
  const body = { email, codigo };  // Asegúrate de que ambos parámetros se envíen
  return this.http.post('https://pruebas.megayuntas.com/api/api/auth/verificar-codigo', body)
    .pipe(
      catchError(error => {
        console.error('Error al verificar código OTP:', error);
        return throwError(error);
      })
    );
}

}
