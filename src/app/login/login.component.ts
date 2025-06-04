declare const google: any;

import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  loginData = {
    user: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  error: string = '';
  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  // Login tradicional
  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.authService.login(this.loginData.user, this.loginData.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.error = '';
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }

  // Registro (dummy por ahora)
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

  // 🔐 Google Sign-In
  ngAfterViewInit(): void {
    // Asegúrate de tener el script en index.html
    // <script src="https://accounts.google.com/gsi/client" async defer></script>
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '649759531112-1dad9go3dg4kijaotsrn8uog8tl646ei.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleResponse(response),
        ux_mode: 'popup' // ← esto evita redireccionamientos
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInBtn'),
        { theme: 'outline', size: 'large', shape: 'circle' }
      );
    }
  }

  handleGoogleResponse(response: any) {
    const credential = response.credential; // JWT de Google
    this.authService.loginConGoogle(credential).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Error al iniciar sesión con Google';
      }
    });
  }
}
