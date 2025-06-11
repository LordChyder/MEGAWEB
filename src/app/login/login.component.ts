import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';


declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    user: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  error = '';
  isLoginMode = true;
  emailVerificacion = '';
  tokenTemporal = '';
  mostrarModalOTP = false;
  isLoading = false;  
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Login tradicional
  onLogin(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    this.authService.login(this.loginData.user, this.loginData.password).subscribe({
      next: (res) => {
        this.emailVerificacion = this.loginData.user;

      },
      error: () => {
        this.error = 'Credenciales incorrectas';
        this.isLoading = false;
      }
    });
  }

  // Registro básico
  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }
    console.log('Datos de registro:', this.registerData);
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }


    togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
