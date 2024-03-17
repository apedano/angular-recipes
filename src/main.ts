/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment.development';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { httpInterceptorProviders } from './app/shared/http-interceptors..provider';
import { LoggingHttpInterceptor } from './app/shared/logging-http.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(), 
    provideRouter(routeConfig), 
    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders,
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
    ]),
    provideAnimationsAsync(), 
    provideAnimations(), provideAnimationsAsync()
    //, importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"recipes-ffddb","appId":"1:854402306482:web:41188fecf8f9aa32fdd4ab","databaseURL":"https://recipes-ffddb-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"recipes-ffddb.appspot.com","apiKey":"AIzaSyAL7VaINHUOoocwZXGrvw2Ne12QCtX1gR0","authDomain":"recipes-ffddb.firebaseapp.com","messagingSenderId":"854402306482"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage()))
  ]
}).catch((err) => console.error(err));
