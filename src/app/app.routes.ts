import { Routes } from '@angular/router';
import { PaginaWebComponent } from './pagina-web/pagina-web.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },

  {
    path: '',
    component: PaginaWebComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pagina-web/PAGE/inicio/inicio.component').then(m => m.InicioComponent),
      },
      {
        path: 'nosotros',
        loadComponent: () =>
          import('./pagina-web/PAGE/nosotros/nosotros.component').then(m => m.NosotrosComponent),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./pagina-web/PAGE/productos/productos.component').then(m => m.ProductosComponent),
      },
      {
        path: 'consultas',
        loadComponent: () =>
          import('./pagina-web/PAGE/consultas/consultas.component').then(m => m.ConsultasComponent),
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pagina-web/PAGE/clientes/clientes.component').then(m => m.ClientesComponent),
      },
    ],
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
