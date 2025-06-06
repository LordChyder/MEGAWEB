import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Consultas{
    id: string | number;
    titulo: string;
    descripcion: string;
    producto: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  private api_url = 'http://pruebas.megayuntas.com:1901/api/consultas';

  constructor(private httpClient: HttpClient) { }
  getConsulta(): Observable<{consultas: Consultas[]}> {
    return this.httpClient.get<{ consultas: Consultas[] }>(this.api_url);
  }
}
