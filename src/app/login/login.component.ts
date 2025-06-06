import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { ModalOtpComponent } from './modalotp/modalotp.component';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ModalOtpComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
        this.tokenTemporal = res.token ?? '';

        // Enviar código de verificación OTP
        this.authService.enviarCodigo(this.loginData.user).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.mostrarModalOTP = true;
              this.isLoading = false;  // Abre el modal de OTP
            } else {
              this.error = res.message;
              this.isLoading = false;  // Muestra el mensaje de error
            }
          },
          error: () => {
            this.error = 'No se pudo enviar el código OTP.';
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
        this.isLoading = false;
      }
    });
  }

  // Verificar código OTP
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

    togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  reenviarCodigoOTP() {
    this.authService.enviarCodigo(this.emailVerificacion).subscribe({
      next: () => alert('Código reenviado a tu correo electrónico'),
      error: () => alert('No se pudo reenviar el código')
    });
  }

  // Método para manejar la respuesta de Google Sign-In
  handleGoogleResponse(response: any) {
    const credential = response.credential;
    this.authService.loginConGoogle(credential).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token ?? '');
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Error al iniciar sesión con Google';
      }
    });
  }

  // Google Sign-In
  ngAfterViewInit(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '649759531112-1dad9go3dg4kijaotsrn8uog8tl646ei.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleResponse(response),
        ux_mode: 'popup',
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInBtn'),
        {
          theme: 'filled_blue',
          shape: 'pill',
          size: 'large',
          type: 'icon',
          width: '400',
        }
      );
    }
  }

  // Dispara el botón oculto de angularx-social-login
  signInWithGoogle(): void {
    const btn = document.getElementById('googleSignInBtn') as HTMLElement;
    if (btn) {
      const button = btn.querySelector('button') as HTMLElement;
      if (button) {
        button.click();
      }
    }
  }

  // Métodos adicionales
  onFacebookLogin() {
    console.log('Facebook login');
  }

  onAppleLogin() {
    console.log('Apple login');
  }
}
