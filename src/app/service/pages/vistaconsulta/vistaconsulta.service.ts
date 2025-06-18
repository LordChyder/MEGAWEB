import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface Paso {
  tituloPaso: string;
  imagenPaso: string;
  descripcionPaso: string; // HTML
}

export interface ConsultaDetalle {
  tituloConsulta: string;
  nombreProducto: string;
  descripcionConsulta: string;
  pasos: Paso[];
}

@Injectable({
  providedIn: 'root'
})
export class VistaconsultaService {
  private api_url = environment.apiUrl + '/consultas/vista';

  constructor(private http: HttpClient) {}

  obtenerConsulta(id: number): Observable<ConsultaDetalle> {
    const url = `${this.api_url}/${id}`;
    return this.http.get<ConsultaDetalle>(url);
  }
}
