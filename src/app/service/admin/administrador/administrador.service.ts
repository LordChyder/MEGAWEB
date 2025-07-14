import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

actualizarAdministrador(adm: any): Observable<any> {
  const headers = this.getAuthHeaders(); // Asegúrate que esto incluya el token válido

  const params = new HttpParams()
    .set('nombres', adm.nombre)
    .set('apellidos', adm.apellido)
    .set('username', adm.username)
    .set('password', adm.password)
    .set('email', adm.email)
    .set('rolNuevoAdministrador', adm.rolNuevoAdministrador);

  return this.http.put(
    `${this.apiUrl}/administradores/${adm.id}`,
    null, // Body vacío porque los datos van como query
    { headers, params }
  );
}
  // Eliminar un administrador (usa POST en lugar de DELETE)
  eliminarAdministrador(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/administradores/eliminar?id=${id}`, {});
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
