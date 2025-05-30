import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Publicacion {
  id: string | number;
  imagen: string;
  titulo: string;
  fecha: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private api_url = 'http://172.29.195.108:1901/api/publicaciones';

  constructor(private httpClient: HttpClient) {}

  getPublicacion(): Observable<{ publicaciones: Publicacion[] }> {
    return this.httpClient.get<{ publicaciones: Publicacion[] }>(this.api_url);
  }
}
