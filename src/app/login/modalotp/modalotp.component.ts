import { CommonModule } from "@angular/common"
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  type QueryList,
  type ElementRef,
  type AfterViewInit,
} from "@angular/core"

@Component({
  selector: 'app-modal-otp',
  standalone: true,
  templateUrl: './modalotp.component.html',
  styleUrls: ['./modalotp.component.css'],
  imports: [CommonModule],
})
export class ModalOtpComponent implements AfterViewInit {
  @Input() show = false
  @Output() verify = new EventEmitter<string>()
  @Output() close = new EventEmitter<void>()
  @Output() resend = new EventEmitter<void>()

  @ViewChildren("inputRef") inputRefs!: QueryList<ElementRef>

  codigoArray: string[] = ["", "", "", "", "", ""]
  error = ""
  isLoading = false

  ngAfterViewInit() {
    // Enfocar el primer input cuando el modal se abre
    if (this.show && this.inputRefs.first) {
      setTimeout(() => {
        this.inputRefs.first.nativeElement.focus()
      }, 100)
    }
  }

  onKeyDown(index: number, event: KeyboardEvent, inputElement: HTMLInputElement): void {
    const key = event.key

    // Permitir solo números
    if (!/^[0-9]$/.test(key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key)) {
      event.preventDefault()
      return
    }

    // Si es un número, actualizar el valor y mover al siguiente
    if (/^[0-9]$/.test(key)) {
      event.preventDefault()
      this.codigoArray[index] = key
      this.moveToNext(index)
    }

    // Si es backspace, limpiar el campo actual y mover al anterior
    if (key === "Backspace") {
      event.preventDefault()
      if (this.codigoArray[index] !== "") {
        this.codigoArray[index] = ""
      } else if (index > 0) {
        this.codigoArray[index - 1] = ""
        this.moveToPrevious(index)
      }
    }

    // Si es delete, limpiar el campo actual
    if (key === "Delete") {
      event.preventDefault()
      this.codigoArray[index] = ""
    }

    // Navegación con flechas
    if (key === "ArrowLeft" && index > 0) {
      event.preventDefault()
      this.moveToPrevious(index)
    }

    if (key === "ArrowRight" && index < 5) {
      event.preventDefault()
      this.moveToNext(index)
    }

    // Limpiar error cuando el usuario empiece a escribir
    if (this.error) {
      this.error = ""
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault()
    const pastedData = event.clipboardData?.getData("text") || ""
    const numbers = pastedData.replace(/\D/g, "").slice(0, 6)

    if (numbers.length > 0) {
      for (let i = 0; i < 6; i++) {
        this.codigoArray[i] = numbers[i] || ""
      }

      // Enfocar el último campo lleno o el primero vacío
      const lastFilledIndex = Math.min(numbers.length - 1, 5)
      this.focusInput(lastFilledIndex)
    }
  }

  private moveToNext(currentIndex: number): void {
    if (currentIndex < 5) {
      this.focusInput(currentIndex + 1)
    }
  }

  private moveToPrevious(currentIndex: number): void {
    if (currentIndex > 0) {
      this.focusInput(currentIndex - 1)
    }
  }

  private focusInput(index: number): void {
    setTimeout(() => {
      const inputArray = this.inputRefs.toArray()
      if (inputArray[index]) {
        inputArray[index].nativeElement.focus()
      }
    }, 0)
  }

  isCodeComplete(): boolean {
    return this.codigoArray.every((digit) => digit !== "") && this.codigoArray.length === 6
  }

  enviarCodigo(): void {
    if (!this.isCodeComplete()) {
      this.error = "Por favor, completa todos los dígitos del código."
      return
    }

    this.isLoading = true
    this.error = ""

    const codigo = this.codigoArray.join("")

    // Simular validación (reemplazar con tu lógica real)
    setTimeout(() => {
      this.isLoading = false
      this.verify.emit(codigo)
    }, 1000)
  }

  cerrar(): void {
    this.resetForm()
    this.close.emit()
  }

  reenviarCodigo(): void {
    this.resetForm()
    this.resend.emit()
  }

  handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cerrar()
    }
  }

  private resetForm(): void {
    this.codigoArray = ["", "", "", "", "", ""]
    this.error = ""
    this.isLoading = false
  }

  // Método para ser llamado desde el componente padre cuando el modal se abre
  onModalOpen(): void {
    this.resetForm()
    setTimeout(() => {
      if (this.inputRefs.first) {
        this.inputRefs.first.nativeElement.focus()
      }
    }, 100)
  }
}
