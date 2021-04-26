import {Injectable} from '@angular/core';
import {LANG_SV} from '../../i18n/sv';
import {TranslateService} from '@ngx-translate/core';
import {LANG_EN} from '../../i18n/en';

@Injectable()
export class LanguageService {

  constructor(private translate: TranslateService) {
    this.init();
    this.setLanguage('sv');
  }

  public init(): void {
    this.translate.setTranslation('sv', LANG_SV);
    this.translate.setTranslation('en', LANG_EN);
    this.translate.setDefaultLang('sv');
  }

  public setLanguage(language: 'sv' | 'en'): void {
    this.translate.use(language);
  }

}
