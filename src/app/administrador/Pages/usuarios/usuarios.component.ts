import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AgregarUsuariosModalComponent } from './agregar-usuarios-modal/agregar-usuarios-modal.component';
import { EditarUsuariosModalComponent } from './editar-usuarios-modal/editar-usuarios-modal.component';
import { EliminarUsuariosModalComponent } from './eliminar-usuarios-modal/eliminar-usuarios-modal.component';
import { UsuarioService } from '../../../service/admin/usuario/usuarios.service';


interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  perfil: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    AgregarUsuariosModalComponent,
    EditarUsuariosModalComponent,
    EliminarUsuariosModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  usuarioSeleccionado: Usuario | null = null;
  usuarioIdAEliminar: number | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  private cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: res => this.usuarios = res,
      error: err => console.error('Error al cargar usuarios', err)
    });
  }

  // --- AGREGAR ---
  abrirModalAgregar(): void {
    this.mostrarModalAgregar = true;
  }
  cerrarModalAgregar(): void {
    this.mostrarModalAgregar = false;
    this.cargarUsuarios();
  }

  // --- EDITAR ---
  abrirModalEditar(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario }; // clonamos para no mutar directo
    this.mostrarModalEditar = true;
  }
  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
    this.usuarioSeleccionado = null;
    this.cargarUsuarios();
  }

  // --- ELIMINAR ---
  abrirModalEliminar(usuarioId: number): void {
    this.usuarioIdAEliminar = usuarioId;
    this.mostrarModalEliminar = true;
  }
  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.usuarioIdAEliminar = null;
  }
  eliminarUsuario(usuarioId: number): void {
    this.usuarioService.eliminarUsuario(usuarioId).subscribe({
      next: () => {
        this.cerrarModalEliminar();
        this.cargarUsuarios();
      },
      error: err => console.error('Error eliminando usuario', err)
    });
  }
}
