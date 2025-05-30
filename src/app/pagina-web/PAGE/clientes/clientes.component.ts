import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  mostrarModal = false;
  clienteSeleccionado: any = null;

  // Lista de clientes
  clientes = [
    {
      nombre: 'SERVICIOS E INVERSIONES\nVIMA S.A.C.',
      imagen: 'https://img.icons8.com/ios-filled/50/000000/user.png',
      productos: ['Yupai', 'Scommer']
    },
    {
      nombre: 'STANDARD\nTARAPOTO S.A.C.',
      imagen: 'https://img.icons8.com/ios-filled/50/000000/user.png',
      productos: ['Producto X', 'Producto Y']
    },
    {
      nombre: 'EMPRESA DE PRUEBA\nDEMO CLIENTE',
      imagen: 'https://img.icons8.com/ios-filled/50/000000/user.png',
      productos: ['Producto A']
    },
    {
      nombre: 'CLIENTE 4',
      imagen: 'https://img.icons8.com/ios-filled/50/000000/user.png',
      productos: ['Scommer']
    },
    {
      nombre: 'CLIENTE 5',
      imagen: 'https://img.icons8.com/ios-filled/50/000000/user.png',
      productos: ['Yupai', 'Otros']
    },
    {
      nombre: 'CLIENTE 6',
      imagen: 'https://img.icons8.com/ios-filled/50/000000/user.png',
      productos: ['Demo 1']
    },
    {
      nombre: 'CLIENTE EXTRA',
      imagen: 'https://img.icons8.com/ios-filled/50/000000/user.png',
      productos: ['Producto Z']
    }
  ];

  // Abrir modal y guardar cliente seleccionado
  abrirModal(cliente: any): void {
    this.clienteSeleccionado = cliente;
    this.mostrarModal = true;
  }

  // Cerrar modal y limpiar selección
  cerrarModal(): void {
    this.mostrarModal = false;
    this.clienteSeleccionado = null;
  }

  // Propiedad opcional para detectar si hay más de 6 clientes
  get hayOverflow(): boolean {
    return this.clientes.length > 6;
  }
}
