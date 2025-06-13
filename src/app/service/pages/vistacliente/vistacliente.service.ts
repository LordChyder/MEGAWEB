import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VistaClienteProducto {
  idcliente: number;
  nombreCliente: string;
  nombreProducto: string;
}

@Injectable({
  providedIn: 'root'
})
export class VistaclienteService {

  private apiUrl = 'http://pruebas.megayuntas.com:1901/api/clientes/vista';

  constructor(private http: HttpClient) {}

  obtenerProductosCliente(idcliente: number): Observable<VistaClienteProducto[]> {
    const url = `${this.apiUrl}/${idcliente}`;
    return this.http.get<VistaClienteProducto[]>(url);
  }
}
