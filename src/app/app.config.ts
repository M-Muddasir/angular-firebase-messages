import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp, getApps, getApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { MessagesEffects } from './messages/store/messages.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimations(),
    provideFirebaseApp(() => {
      if (getApps().length > 0) {
        return getApp();
      } else {
        return initializeApp(environment.firebase);
      }
    }),
    provideFirestore(() => getFirestore()),
    provideStore(reducers, { metaReducers }),
    provideEffects([MessagesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
