import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

    constructor(private authService: AuthService,  private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        // Guarda el token o haz lo que necesites después del login exitoso
        localStorage.setItem('token', res.token);
        this.error = '';
        alert('Login exitoso');
        // Redirige a otra página si quieres
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Credenciales incorrectas o error en el login';
      },
    });
  }

  isRegisterMode: boolean = true;
  isLoginMode: boolean = false;

  RegistertoggleMode() {
    this.isRegisterMode = !this.isRegisterMode;}
    
  LoginToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}

