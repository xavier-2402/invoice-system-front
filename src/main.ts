import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

export function getBaseUrl() {
  return 'http://localhost:8080'; //desarrollo
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },

];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));

  export function copyWith<T>(original: T, updates: Partial<T>): T {
    return { ...original, ...updates };
  }