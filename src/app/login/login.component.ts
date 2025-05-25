import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Agregamos FormsModule
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Datos para LOGIN
  loginData = {
    user: '',
    password: ''
  };

  // Datos para REGISTRO
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  error: string = '';
  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  // Método para login
  onLogin() {
    this.authService.login(this.loginData.user, this.loginData.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.error = '';
        alert('Login exitoso');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Credenciales incorrectas o error en el login';
      },
    });
  }

  // Método para registro
  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    // Aquí llamarías a tu servicio de registro
    console.log('Datos de registro:', this.registerData);
    // this.authService.register(this.registerData).subscribe({...});
  }

  // Toggle entre modos
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = ''; // Limpiar errores al cambiar modo
  }
}