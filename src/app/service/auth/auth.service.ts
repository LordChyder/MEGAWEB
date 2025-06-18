// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
import { ApiResponse } from '../../models/response.model';
import { environment } from '../../environment';

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
  private apiUrl = environment.apiUrl + '/auth/login'; // Asegúrate de que la URL es correcta
  
  constructor(private http: HttpClient) {}


  login(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, { username, password });
  }

}
