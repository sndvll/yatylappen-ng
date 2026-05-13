import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { IconsModule } from './shared/icons';
import { LanguageModule } from './core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter([]),
    importProvidersFrom(LanguageModule),
    importProvidersFrom(IconsModule),
  ]
};
