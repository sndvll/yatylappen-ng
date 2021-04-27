import {Injectable} from '@angular/core';
import {LANG_SV} from '../../i18n/sv';
import {TranslateService} from '@ngx-translate/core';
import {LANG_EN} from '../../i18n/en';
import {PersistenceService} from '../persistence';

@Injectable()
export class LanguageService {

  constructor(private translate: TranslateService,
              private persistence: PersistenceService) {}

  public init(): void {
    this.translate.setTranslation('sv', LANG_SV);
    this.translate.setTranslation('en', LANG_EN);
    this.translate.setDefaultLang(this.persistence.language);
    this.setLanguage(this.persistence.language);
  }

  public setLanguage(language: string): void {
    this.persistence.language = language;
    this.translate.use(language);
  }

  public get currentLang(): string {
    return this.translate.currentLang;
  }

}
