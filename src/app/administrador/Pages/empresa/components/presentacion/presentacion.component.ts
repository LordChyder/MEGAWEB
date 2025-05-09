import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-presentacion",
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./presentacion.component.html",
})
export class PresentacionComponent {
  // Datos de ejemplo
}
