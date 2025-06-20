// src/app/service/admin/usuario/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /** Si no estás usando interceptor, descomenta esto y pásalo en cada llamada */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** Listar todos los usuarios */
  getUsuarios(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/usuarios`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Crear un nuevo usuario */
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/usuarios`,
      usuario,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Actualizar un usuario existente */
  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/usuarios`,
      usuario,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Eliminar un usuario (usa POST) */
  eliminarUsuario(usuarioId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/usuarios/eliminar`,
      { id: usuarioId },
      { headers: this.getAuthHeaders() }
    );
  }
}
