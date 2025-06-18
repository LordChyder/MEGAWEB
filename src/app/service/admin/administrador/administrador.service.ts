import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Listar todos los administradores
  getAdministradores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/administradores`);
  }

  // Crear un nuevo administrador
  crearAdministrador(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/administradores`, data);
  }

  // Actualizar un administrador existente
  actualizarAdministrador(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/administradores`, data);
  }

  // Eliminar un administrador (usa POST en lugar de DELETE)
  eliminarAdministrador(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/administradores/eliminar`, data);
  }
}
