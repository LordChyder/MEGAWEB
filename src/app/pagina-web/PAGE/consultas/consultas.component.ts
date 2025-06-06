import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Consulta {
  id: string | number;
  titulo: string;
  descripcion: string;
  producto: string;
}

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  consultas: Consulta[] = [];
  consultasPorPagina = 6;
  paginaActual = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Consulta[]>('http://pruebas.megayuntas.com:1901/api/consultas').subscribe({
      next: (data) => {
        this.consultas = data;
      },
      error: (err) => {
        console.error('Error al cargar consultas desde la API:', err);
      }
    });
  }

  obtenerConsultasPaginadas(): Consulta[] {
    const inicio = this.paginaActual * this.consultasPorPagina;
    return this.consultas.slice(inicio, inicio + this.consultasPorPagina);
  }

  siguientePagina(): void {
    if ((this.paginaActual + 1) * this.consultasPorPagina < this.consultas.length) {
      this.paginaActual++;
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }
}
