import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

  interface Cliente {
  id: number;
  Empresa: string;
  Ruc: string;
  Telefono: string;
  Contacto: string;
  Grupo: string;
  Mostrar_en_Web : string;
  status: 'ACTIVE' | 'INACTIVE';
}
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

        Clientes: Cliente[] = [
    {
      id: 1,
      Empresa: 'ANDY H.',
      Ruc: 'Rucoba Reategui',
      Telefono: 'Soporte@megayuntas.com',
      Contacto: 'ADMINISTRADOR',
      Grupo: 'ADMINISTRADOR',
      Mostrar_en_Web: 'ADMINISTRADOR',
      status: 'ACTIVE'
    },
    // …otros registros…
  ];
}
