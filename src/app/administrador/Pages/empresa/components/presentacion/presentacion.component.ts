import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { QuillModule } from "ngx-quill";

@Component({
  selector: "app-presentacion",
  standalone: true,
  imports: [CommonModule,FormsModule, QuillModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./presentacion.component.html",
})
export class PresentacionComponent {
  showEditor = false;
  htmlContent = '';
    guardarContenido() {
    this.showEditor = false;
    console.log('Contenido guardado:', this.htmlContent);
  }
}

