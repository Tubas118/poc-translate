import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportedLanguagesService {

  private readonly supportedLanguagesMap: Map<string, string>;

  private readonly translateToLanguageCodeMap: Map<string, string>;
  
  private readonly supportedLanguageCodes;

  private readonly supportedLanguageTranslateIds;

  constructor(private translate: TranslateService) {
    this.supportedLanguagesMap = new Map<string, string>();

    environment.supportedLanguages.forEach(entry => {
      this.supportedLanguagesMap.set(entry[0], entry[1]);
    });

    this.supportedLanguageCodes = Array.from(this.supportedLanguagesMap.keys());
    this.supportedLanguageTranslateIds = Array.from(this.supportedLanguagesMap.values());

    this.translate.addLangs(this.supportedLanguageCodes);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.translateToLanguageCodeMap = new Map<string, string>();
    this.supportedLanguagesMap.forEach((value, key) => {
      this.translateToLanguageCodeMap.set(value, key);
    });
  }

  getSupportedLanguagesMap(): Map<string, string> {
    return this.supportedLanguagesMap;
  }

  getAvailableLanguageCodes(): string[] {
    return this.translate.getLangs();
  }

  getAvailableLanguageTranslateIds(): string[] {
    return this.supportedLanguageTranslateIds;
  }

  onLanguageSelectionChange(event:Event): void {
    const translateId = (event.target as HTMLSelectElement).value;
    const code = this.translateToLanguageCodeMap.get(translateId) || this.translate.defaultLang;
    this.translate.use(code);
  }

  assignActiveLanguageIdFromCode(code: string): void {
    this.translate.use(code);
  }

}
