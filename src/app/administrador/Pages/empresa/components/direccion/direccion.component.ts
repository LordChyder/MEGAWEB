// src/app/components/direccion/direccion.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpresasService, InfoInstitucional } from '../../../../../service/admin/empresa/empresas.service';


@Component({
  selector: 'app-direccion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  showEditor = false;
  htmlContent = '';             // contendrá la dirección
  private info!: InfoInstitucional;

  constructor(private empresasSvc: EmpresasService) {}

  ngOnInit(): void {
    // Al iniciar, cargamos la dirección desde la API
    this.empresasSvc.getInfoInstitucional().subscribe({
      next: info => {
        this.info = info;
        this.htmlContent = info.direccion || '';
      },
      error: err => console.error('Error al cargar dirección:', err)
    });
  }

  onEditar(): void {
    this.showEditor = true;
  }

  guardarContenido(): void {
    // Al guardar, enviamos solo el campo "direccion"
    this.empresasSvc.actualizarInfoInstitucional({ direccion: this.htmlContent })
      .subscribe({
        next: () => {
          this.showEditor = false;
          console.log('Dirección actualizada:', this.htmlContent);
        },
        error: err => {
          console.error('Error al guardar dirección:', err);
          alert('No se pudo actualizar la dirección. Intenta de nuevo.');
        }
      });
  }
}
