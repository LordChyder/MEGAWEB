import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministradorService } from '../../../../service/admin/administrador/administrador.service';

@Component({
  selector: 'app-editar-administradores-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-administradores-modal.component.html',
  styleUrls: ['./editar-administradores-modal.component.css']
})
export class EditarAdministradoresModalComponent {
  @Input() administrador: any = {
  nombres: '',
  apellidos: '',
  username: '',
  email: '',
  passwordActual: '',
  password: '',
  rolNuevoAdministrador: 1
}; // Recibe el administrador a editar
  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizado = new EventEmitter<void>(); // Para refrescar la lista en el padre

  confirmPassword = '';

  constructor(private administradorService: AdministradorService) {}

  // Método para cerrar el modal
  cerrarModal(): void {
    this.cerrar.emit();
  }

  // Método para guardar los cambios en el administrador
  guardarAdministrador(): void {
    if (this.administrador.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Llamada al servicio para actualizar el administrador
    this.administradorService.actualizarAdministrador(this.administrador).subscribe({
      next: (res) => {
        console.log('Administrador actualizado:', res);
        this.actualizado.emit(); // Refrescar lista en el padre
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al actualizar administrador:', err);
        alert('Error al actualizar administrador.');
      }
    });
  }
}
