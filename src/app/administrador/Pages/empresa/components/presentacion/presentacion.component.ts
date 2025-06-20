// src/app/components/presentacion/presentacion.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { QuillModule } from "ngx-quill";
import { EmpresasService, InfoInstitucional } from "../../../../../service/admin/empresa/empresas.service";


@Component({
  selector: "app-presentacion",
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./presentacion.component.html",
})
export class PresentacionComponent implements OnInit {
  showEditor = false;
  htmlContent = "";  // contendrá la descripción
  private info!: InfoInstitucional;

  constructor(private empresasSvc: EmpresasService) {}

  ngOnInit(): void {
    this.empresasSvc.getInfoInstitucional().subscribe({
      next: info => {
        this.info = info;
        this.htmlContent = info.descripcion || "";
      },
      error: err => console.error("Error al cargar presentación:", err)
    });
  }

  onEditar(): void {
    this.showEditor = true;
  }

  guardarContenido(): void {
    this.showEditor = false;
    // Actualizo solo la descripción
    this.empresasSvc.actualizarInfoInstitucional({ descripcion: this.htmlContent })
      .subscribe({
        next: () => console.log("Descripción actualizada"),
        error: err => {
          console.error("Error al guardar descripción:", err);
          alert("No se pudo guardar la presentación.");
        }
      });
  }
}
