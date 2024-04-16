import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';
import { subscribe } from 'diagnostics_channel';

export const guestGuard: CanActivateFn = (route, state) => {
  

  const tokenservice = inject(TokenService)
  const router = inject(Router)

  tokenservice.isAuthentication.subscribe({
    next(value) {
      if(value) {
        router.navigate(['messages'])
      }
    }
  })

  return true;  

};
