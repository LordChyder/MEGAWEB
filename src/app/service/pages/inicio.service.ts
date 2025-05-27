import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Producto {
  id: string;
  imagen: string;
  nombre: string;
  descripcion: string;
}

interface Publicacion {
  imagen: string;
  titulo: string;
  fecha: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  api_url: string = 'http://localhost:1901/api/productos';
  constructor(private httpClient: HttpClient) { }

  getProducto(): Observable<{ productos: Producto[] }>{
    return this.httpClient.get<{ productos: Producto[] }>(this.api_url);
  }

}

export class PublicacionesService {

  api_url: string = 'http://localhost:1901/api/publicaciones';
  constructor(private httpClient: HttpClient) { }

  getPublicacion(): Observable<{ publicaciones: Publicacion[] }> {
    return this.httpClient.get<{ publicaciones: Publicacion[] }>(this.api_url);
  }

}
