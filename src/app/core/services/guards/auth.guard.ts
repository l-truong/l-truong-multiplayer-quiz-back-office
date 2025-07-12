import { config } from 'src/app/config/backofficeConfig.config';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accessToken = localStorage.getItem(config.localStorage.sufix + config.localStorage.accessToken);

  if (accessToken) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};