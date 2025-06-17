import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz clara para representar productos adquiridos por cliente
export interface ClienteProducto {
  idcliente: number;
  nombreCliente: string;
  nombreProducto: string;
}

@Injectable({
  providedIn: 'root'
})
export class VistaclienteService {
  // Endpoint base para acceder a clientes y sus productos
  private baseUrl = 'http://pruebas.megayuntas.com:1901/api/clientes/vista';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los productos adquiridos por un cliente específico
   * @param idcliente ID del cliente
   * @returns Observable con la lista de productos adquiridos
   */
  getClienteProducto(idcliente: number): Observable<ClienteProducto[]> {
    const url = `${this.baseUrl}/${idcliente}`;
    return this.http.get<ClienteProducto[]>(url);
  }
}
