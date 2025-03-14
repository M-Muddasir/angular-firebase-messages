import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp, getApps, getApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimations(),
    provideFirebaseApp(() => {
      // Check if Firebase app is already initialized to prevent duplicate initialization
      if (getApps().length > 0) {
        return getApp();
      } else {
        return initializeApp(environment.firebase);
      }
    }),
    provideFirestore(() => getFirestore())
  ]
};
