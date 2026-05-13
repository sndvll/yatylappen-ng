import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, Dices } from 'lucide-angular';
import { LanguageModule } from './core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter([]),
    importProvidersFrom(LanguageModule),
    importProvidersFrom(LucideAngularModule.pick({ dices: Dices })),
  ]
};
