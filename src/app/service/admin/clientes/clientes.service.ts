// src/app/service/clientes/clientes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface Cliente {
    id: number;
    Empresa: string;
    Ruc: string;
    Telefono: string;
    Contacto: string;
    Grupo: string;
    Mostrar_en_Web: string;
  // añade aquí los demás campos que tu API requiera
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** GET /api/clientes — Listar clientes activos */
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(
      this.baseUrl,
      { headers: this.authHeaders() }
    );
  }

  /** POST /api/clientes — Registrar un nuevo cliente */
  crearCliente(nuevo: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(
      this.baseUrl,
      nuevo,
      { headers: this.authHeaders() }
    );
  }
}
