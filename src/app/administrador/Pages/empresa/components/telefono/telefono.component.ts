// src/app/components/telefono/telefono.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpresasService, InfoInstitucional } from '../../../../../service/admin/empresa/empresas.service';


@Component({
  selector: 'app-telefono',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})
export class TelefonoComponent implements OnInit {
  showEditor = false;
  htmlContent = '';                // contendrá el teléfono
  private info!: InfoInstitucional;

  constructor(private empresasSvc: EmpresasService) {}

  ngOnInit(): void {
    // Al iniciar, cargamos el teléfono desde la API
    this.empresasSvc.getInfoInstitucional().subscribe({
      next: info => {
        this.info = info;
        this.htmlContent = info.telefono || '';
      },
      error: err => console.error('Error al cargar teléfono:', err)
    });
  }

  onEditar(): void {
    this.showEditor = true;
  }

  guardarContenido(): void {
    // Al guardar, enviamos solo el campo "telefono"
    this.empresasSvc.actualizarInfoInstitucional({ telefono: this.htmlContent })
      .subscribe({
        next: () => {
          this.showEditor = false;
          console.log('Teléfono actualizado:', this.htmlContent);
        },
        error: err => {
          console.error('Error al guardar teléfono:', err);
          alert('No se pudo actualizar el teléfono. Intenta de nuevo.');
        }
      });
  }
}
