import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pagina-web/pagina-web.component').then(m => m.PaginaWebComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./administrador/administrador.component').then(m => m.AdministradorComponent),
  },
  {
    path: '**', // Ruta comodín (por si no coincide con ninguna otra)
    redirectTo: '', // Redirige a página principal
    pathMatch: 'full',
  },
];
