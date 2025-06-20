// src/app/components/mision/mision.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { EmpresasService, InfoInstitucional } from '../../../../../service/admin/empresa/empresas.service';


@Component({
  selector: 'app-mision',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './mision.component.html',
  styleUrls: ['./mision.component.css']
})
export class MisionComponent implements OnInit {
  showEditor = false;
  htmlContent = '';              // contendrá el texto de misión
  private info!: InfoInstitucional;

  constructor(private empresasSvc: EmpresasService) {}

  ngOnInit(): void {
    // Al iniciar, cargamos la misión desde la API
    this.empresasSvc.getInfoInstitucional().subscribe({
      next: info => {
        this.info = info;
        this.htmlContent = info.mision || '';
      },
      error: err => console.error('Error al cargar misión:', err)
    });
  }

  onEditar(): void {
    this.showEditor = true;
  }

  guardarContenido(): void {
    // Al guardar, enviamos solo el campo "mision"
    this.empresasSvc.actualizarInfoInstitucional({ mision: this.htmlContent })
      .subscribe({
        next: () => {
          this.showEditor = false;
          console.log('Misión actualizada:', this.htmlContent);
        },
        error: err => {
          console.error('Error al guardar misión:', err);
          alert('No se pudo actualizar la misión. Intenta de nuevo.');
        }
      });
  }
}
