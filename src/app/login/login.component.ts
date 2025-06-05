import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { ModalOtpComponent } from './modalotp/modalotp.component';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ModalOtpComponent],
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

  error = '';
  isLoginMode = true;
  emailVerificacion = '';
  tokenTemporal = '';
  mostrarModalOTP = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  // Login tradicional
  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.authService.login(this.loginData.user, this.loginData.password).subscribe({
      next: (res) => {
        this.emailVerificacion = this.loginData.user;
        this.tokenTemporal = res.token;

        this.authService.enviarCodigo(this.loginData.user).subscribe({
          next: () => this.mostrarModalOTP = true,
          error: () => this.error = 'No se pudo enviar el código OTP.'
        });
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }

  // Doble verificación por OTP
  verificarCodigoOTP(codigo: string) {
    this.authService.verificarCodigo(this.emailVerificacion, codigo).subscribe({
      next: () => {
        localStorage.setItem('token', this.tokenTemporal);
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Código inválido o expirado');
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

  cerrarModalOTP() {
    this.mostrarModalOTP = false;
  }

  reenviarCodigoOTP() {
    this.authService.enviarCodigo(this.emailVerificacion).subscribe({
      next: () => alert('Código reenviado a tu correo electrónico'),
      error: () => alert('No se pudo reenviar el código')
    });
  }

  // Google Sign-In moderno
  ngAfterViewInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user && user.idToken) {
        this.authService.loginConGoogle(user.idToken).subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/']);
          },
          error: () => {
            this.error = 'Error al iniciar sesión con Google';
          }
        });
      }
    });
  }

  // Iniciar sesión con Google
  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // Extras
  onFacebookLogin() {
    console.log('Facebook login');
  }

  onAppleLogin() {
    console.log('Apple login');
  }
}
