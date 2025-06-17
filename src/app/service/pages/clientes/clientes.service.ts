import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  idcliente: number;
  nombreCliente: string;
  nombreProducto: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseUrl = 'http://pruebas.megayuntas.com:1901/api/clientes/vista';

  constructor(private httpClient: HttpClient) {}

  getCliente(): Observable<{ clientes: Cliente[] }> {
    return this.httpClient.get<{ clientes: Cliente[] }>(this.baseUrl);
  }
}
