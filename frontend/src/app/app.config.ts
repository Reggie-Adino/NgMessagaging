import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';

import { MessageState } from './store/MessageState';
import { UserState } from './store/UserState';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
   importProvidersFrom(NgxsModule.forRoot([MessageState, UserState])),provideAnimations(), 
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), 
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([httpInterceptor]))       
  ]
  
};
