import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
subtitulo: any;
  id: string | number;
  imagen: string;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api_url = 'http://pruebas.megayuntas.com:1901/api/productos';

  constructor(private httpClient: HttpClient) {}

  getProducto(): Observable<{ productos: Producto[] }> {
    return this.httpClient.get<{ productos: Producto[] }>(this.api_url);
  }
}
