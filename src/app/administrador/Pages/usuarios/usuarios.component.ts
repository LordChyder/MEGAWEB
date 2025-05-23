import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgregarUsuariosModalComponent } from './agregar-usuarios-modal/agregar-usuarios-modal.component';
import { EditarUsuariosModalComponent } from './editar-usuarios-modal/editar-usuarios-modal.component';
import { EliminarUsuariosModalComponent } from './eliminar-usuarios-modal/eliminar-usuarios-modal.component';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  perfil: string;
  status: 'ACTIVE' | 'INACTIVE';
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, AgregarUsuariosModalComponent,
    EditarUsuariosModalComponent,
    EliminarUsuariosModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  usuarioIdAEliminar: number | null = null;

  Usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'ANDY H.',
      apellido: 'Rucoba Reategui',
      email: 'Soporte@megayuntas.com',
      perfil: 'ADMINISTRADOR',
      status: 'ACTIVE'
    },
    // …otros registros…
  ];

  // FUNCION DE AGREGAR USUARIO
  abrirModalAgregar(): void {
    this.mostrarModalAgregar = true;
  }
  cerrarModalAgregar(): void {
    this.mostrarModalAgregar = false;
  }

  // FUNCION DE EDITAR USUARIO
  abrirModalEditar(): void {
    this.mostrarModalEditar = true;
  }
  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
  }

  // FUNCION DE ELIMINAR USUARIO
  abrirModalEliminar(usuarioId: number): void {
    this.usuarioIdAEliminar = usuarioId;
    this.mostrarModalEliminar = true;
  }
  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.usuarioIdAEliminar = null;
  }
  eliminarUsuario(usuarioId: number): void {
    // Aquí implementarías la lógica para eliminar el usuario
    this.Usuarios = this.Usuarios.filter((usuario) => usuario.id !== usuarioId);
    this.cerrarModalEliminar();
  }
}
