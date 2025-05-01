import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoginMode: boolean = true;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;}

    onSubmit() {
      if (this.isLoginMode) {
        //this.authService.login(); // marcar como autenticado
        //this.router.navigate(['/pagina-web']); // redirigir
      } else {
        // lógica de registro simulada
        this.isLoginMode = true; // después de registrar, vuelve al login
      }
    }

}
