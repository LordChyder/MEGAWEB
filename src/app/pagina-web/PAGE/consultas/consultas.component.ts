import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

interface Consulta {
  id: string | number;
  titulo: string;
  descripcion: string;
  producto: string;
}

export interface BusquedaReciente {
  titulo: string;
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

  busquedasRecientes: BusquedaReciente[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Cargar consultas
    this.http.get<Consulta[]>('http://pruebas.megayuntas.com:1901/api/consultas').subscribe({
      next: (data) => {
        this.consultas = data;
      },
      error: (err) => {
        console.error('Error al cargar consultas desde la API:', err);
      }
    });

    // Cargar búsquedas recientes
    this.http.get<BusquedaReciente[]>('http://pruebas.megayuntas.com:1901/api/busquedas/recientes').subscribe({
      next: (data) => {
        this.busquedasRecientes = data;
      },
      error: (err) => {
        console.error('Error al cargar búsquedas recientes desde la API:', err);
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

  irAVistaConsulta(titulo: string): void {
    const consultaEncontrada = this.consultas.find(
      (c) => c.titulo.trim().toLowerCase() === titulo.trim().toLowerCase()
    );

    if (consultaEncontrada) {
      this.router.navigate(['/vistaconsulta', consultaEncontrada.id]);
    } else {
      alert('No se encontró una consulta que coincida con esta búsqueda.');
    }
  }
}
