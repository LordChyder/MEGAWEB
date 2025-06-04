import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const adminGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token || jwtHelper.isTokenExpired(token)) {
    router.navigate(['/login']);
    return false;
  }

  const decoded = jwtHelper.decodeToken(token);
  const role = decoded?.idRol;

  if (role === 1 || role === 2) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
