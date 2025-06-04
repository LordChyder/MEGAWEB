import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Documento {
  document: string;
  descripcion: string;
}

export interface Multimedia {
  imagen: string;
  descripcion: string;
}

export interface DetalleProducto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  caracteristicas: string;
  video: string;
  documentacion: Documento[];
  multimedia: Multimedia[];
}

@Injectable({
  providedIn: 'root'
})
export class VistaproductoService {

  private api_url = 'http://pruebas.megayuntas.com:1901/api/productos';

  constructor(private httpClient: HttpClient) { }

  getProducto(id: number): Observable<DetalleProducto> {
    return this.httpClient.get<DetalleProducto>(`${this.api_url}/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener el producto:', error);
        return throwError(() => new Error('No se pudo obtener el producto. Intente nuevamente más tarde.'));
      })
    );
  }
}
