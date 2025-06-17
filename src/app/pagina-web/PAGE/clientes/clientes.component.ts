import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../service/pages/clientes/clientes.service';
import { RouterModule } from '@angular/router';
import { VistaclienteComponent, ClienteProducto } from './vistacliente/vistacliente.component';

export interface Cliente {
  idcliente: string | number;
  nombreCliente: string;
  nombreProducto: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, VistaclienteComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  paginaActual: number = 0;
  clientesPorPagina: number = 4;

  mostrarModal: boolean = false;
  clienteSeleccionado: Cliente | undefined;
  productosDelCliente: ClienteProducto[] = [];

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clientesService.getCliente().subscribe({
      next: (response: { clientes: Cliente[] }) => {
        this.clientes = response.clientes;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
      }
    });
  }

  // Paginación
  get totalPaginas(): number {
    return Math.ceil(this.clientes.length / this.clientesPorPagina);
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  get clientesPaginados(): Cliente[] {
    const inicio = this.paginaActual * this.clientesPorPagina;
    return this.clientes.slice(inicio, inicio + this.clientesPorPagina);
  }

  abrirModal(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.productosDelCliente = this.clientes
      .filter(c => c.idcliente === cliente.idcliente)
      .map(c => ({
        idcliente: typeof c.idcliente === 'number' ? c.idcliente : Number(c.idcliente),
        nombreCliente: c.nombreCliente,
        nombreProducto: c.nombreProducto
      }));
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
