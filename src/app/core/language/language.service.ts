import {Injectable} from '@angular/core';
import {LANG_SV} from '../../i18n/sv';
import {TranslateService} from '@ngx-translate/core';
import {LANG_EN} from '../../i18n/en';

@Injectable()
export class LanguageService {

  constructor(private translate: TranslateService) {}

  public init(): void {
    this.translate.setTranslation('sv', LANG_SV);
    this.translate.setTranslation('en', LANG_EN);
    this.translate.setDefaultLang('sv');
    this.setLanguage(localStorage.getItem('language') || 'sv');
  }

  public setLanguage(language: string): void {
    localStorage.setItem('language', language);
    this.translate.use(language);
  }

  public get currentLang(): string {
    return this.translate.currentLang;
  }

}
