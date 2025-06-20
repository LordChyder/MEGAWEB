import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AdministradorService } from '../../../service/admin/administrador/administrador.service';
import { CommonModule } from '@angular/common';
import { AgregarAdministradoresModalComponent } from './agregar-administradores-modal/agregar-administradores-modal.component';
import { EliminarAdministradoresModalComponent } from './eliminar-administradores-modal/eliminar-administradores-modal.component';
import { EditarAdministradoresModalComponent } from './editar-administradores-modal/editar-administradores-modal.component';


@Component({
  selector: 'app-administradores',
  standalone: true,
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css'], // si usas Tailwind, puede estar vacío
  imports: [CommonModule,AgregarAdministradoresModalComponent,
              EditarAdministradoresModalComponent, EliminarAdministradoresModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdministradoresComponent implements OnInit {

    // Propiedad para almacenar el administrador seleccionado
  administradorSeleccionado: any;

  admins: any[] = [];

  // Modales (si los usas luego)
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  adminsIdAEliminar: number | null = null;

  constructor(private administradorService: AdministradorService) {}

  ngOnInit(): void {
    this.administradorService.getAdministradores().subscribe({
      next: (data) => {
        this.admins = data.map((a: any) => ({
          id: a.id,
          nombre: a.nombres,
          username: a.username,
          apellido: a.apellidos,
          email: a.email,
          perfil: a.rol,
        }));
      },
      error: (err) => {
        console.error('Error al cargar administradores', err);
      }
    });
  }

  // Métodos para abrir/cerrar modales
  abrirModalAgregar() {
    this.mostrarModalAgregar = true;
  }

  cerrarModalAgregar() {
    this.mostrarModalAgregar = false;
  }

abrirModalEditar(admin: any): void {
  this.administradorSeleccionado = admin; // Asignamos el administrador a editar
  this.mostrarModalEditar = true;
}

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }

  abrirModalEliminar(id: number) {
    this.mostrarModalEliminar = true;
    this.adminsIdAEliminar = id;
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.adminsIdAEliminar = null;
  }

  eliminarAdministrador(id: number) {
    // aún no implementado
    this.cerrarModalEliminar();
  }
}
