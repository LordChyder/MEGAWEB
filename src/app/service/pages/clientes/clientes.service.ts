import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Cliente {
  idcliente: number;
  nombreCliente: string;
  imagenCliente: string;
}


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  obtenerClientes() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://pruebas.megayuntas.com:1901/api/clientes/vista';

  constructor(private http: HttpClient) {}

  obtenerProductosCliente(idcliente: number): Observable<Cliente[]> {
    const url = `${this.apiUrl}/${idcliente}`;
    return this.http.get<Cliente[]>(url);
  }
}