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
    return this.http.post(`${this.apiUrl}/administradores`, null, { params: data });
  }

  // Actualizar un administrador existente
  actualizarAdministrador(adm: any): Observable<any> {
  return this.http.put(
    `${this.apiUrl}/administradores/${adm.id}`,
    adm,
    { headers: this.getAuthHeaders() }
  );
}

  // Eliminar un administrador (usa POST en lugar de DELETE)
  eliminarAdministrador(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/administradores/eliminar`, data);
  }

  // Método para obtener los encabezados de autenticación
  private getAuthHeaders(): { [header: string]: string } {
    // Reemplaza el siguiente token por el método real de obtención del token
    const token = localStorage.getItem('authToken') || '';
    return {
      'Authorization': `Bearer ${token}`
    };
  }
}
