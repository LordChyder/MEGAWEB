import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface Consulta {
  titulo: string;
  descripcion: string;
  fuente: string;
  color: string;
}

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  consultas: Consulta[] = [];
  consultasPorPagina = 6;
  paginaActual = 0;

  ngOnInit(): void {
    this.consultas = [
      {
        titulo: 'Ingresar Compras a Títulos Gratuitos (Costo “0.00”)',
        descripcion: 'En algunas ocasiones del mundo empresarial suele suceder operaciones especiales, como lo es Comprobantes con Costo Cero "0.00"',
        fuente: 'YUPAY | Contabilidad',
        color: 'text-green-600'
      },
      {
        titulo: 'Como corregir correlativo de series de comprobantes',
        descripcion: 'En esta opción se mostrará cómo corregir correlativos de comprobantes cuando sale el error de correlativo ya está registrado.',
        fuente: 'SCOMERS',
        color: 'text-sky-600'
      },
      {
        titulo: 'Tip: Corregir error al ejecutar el sistema SCOMERS.cpe',
        descripcion: 'En algunas ocasiones del mundo empresarial suele suceder operaciones especiales...',
        fuente: 'SCOMERS.CPE',
        color: 'text-orange-500'
      },
      {
        titulo: 'Ingresar Compras a Títulos Gratuitos (Costo “0.00”)',
        descripcion: 'En algunas ocasiones del mundo empresarial suele suceder operaciones especiales...',
        fuente: 'YUPAY | Contabilidad',
        color: 'text-green-600'
      },
      {
        titulo: 'Como corregir correlativo de series de comprobantes',
        descripcion: 'En esta opción se mostrará cómo corregir correlativos de comprobantes cuando sale el error...',
        fuente: 'SCOMERS',
        color: 'text-sky-600'
      },
      {
        titulo: 'Tip: Corregir error al ejecutar el sistema SCOMERS.cpe',
        descripcion: 'En algunas ocasiones del mundo empresarial suele suceder operaciones especiales...',
        fuente: 'SCOMERS.CPE',
        color: 'text-orange-500'
      },
      {
        titulo: 'Ingresar Compras a Títulos Gratuitos (Costo “0.00”)',
        descripcion: 'En algunas ocasiones del mundo empresarial suele suceder operaciones especiales...',
        fuente: 'YUPAY | Contabilidad',
        color: 'text-green-600'
      },
      {
        titulo: 'Como corregir correlativo de series de comprobantes',
        descripcion: 'En esta opción se mostrará cómo corregir correlativos de comprobantes cuando sale el error...',
        fuente: 'SCOMERS',
        color: 'text-sky-600'
      },
      {
        titulo: 'Tip: Corregir error al ejecutar el sistema SCOMERS.cpe',
        descripcion: 'En algunas ocasiones del mundo empresarial suele suceder operaciones especiales...',
        fuente: 'SCOMERS.CPE',
        color: 'text-orange-500'
      },
      // Puedes añadir más consultas si deseas probar la paginación
    ];
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
