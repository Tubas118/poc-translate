import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportedLanguagesService {

  private readonly supportedLanguagesMap: Map<string, SupportedLanguage>;

  private readonly translateToLanguageCodeMap: Map<string, string>;
  
  private readonly supportedLanguageCodes;

  private readonly supportedLanguageTranslateIds;

  private langRtl?: boolean;

  constructor() {
    this.supportedLanguagesMap = new Map<string, SupportedLanguage>();

    environment.supportedLanguages.forEach(entry => {
      const key = entry[0] as string;
      const supportedLanguage: SupportedLanguage = {
        id: entry[1] as string,
        rtl: (entry?.length >= 3)
      };
      this.supportedLanguagesMap.set(key, supportedLanguage);
    });

    this.supportedLanguageCodes = Array.from(this.supportedLanguagesMap.keys());

    // this.translate.addLangs(this.supportedLanguageCodes);
    // this.translate.setDefaultLang('en');
    // this.translate.use('en');

    this.translateToLanguageCodeMap = new Map<string, string>();
    this.supportedLanguagesMap.forEach((value, key) => {
      this.translateToLanguageCodeMap.set(value.id, key);
    });

    this.supportedLanguageTranslateIds = Array.from(this.translateToLanguageCodeMap.values());
  }

  get langDir(): string {
    return this.langRtl ? 'rtl' : 'ltr';
  }

  getSupportedLanguagesMap(): Map<string, SupportedLanguage> {
    return this.supportedLanguagesMap;
  }

  getAvailableLanguageCodes(): string[] {
    return [];
    // return this.translate.getLangs();
  }

  getAvailableLanguageTranslateIds(): string[] {
    return this.supportedLanguageTranslateIds;
  }

  onLanguageSelectionChange(event:Event): void {
    const translateId = (event.target as HTMLSelectElement).value;
    //const code = this.translateToLanguageCodeMap.get(translateId) || this.translate.defaultLang;
    const code = 'en';
    this.assignActiveLanguageIdFromCodeWorker(code);
  }

  assignActiveLanguageIdFromCode(code: string): void {
    this.assignActiveLanguageIdFromCodeWorker(code);
  }

  get supportedLanguage_english(): string {
    return $localize`:@@supported.english:English`;
  }

  get supportedLanguage_hebrew(): string {
    return $localize`:@@supported.hebrew:Hebrew`;
  }

  get supportedLanguage_spanish(): string {
    return $localize`:@@supported.spanish:Spanish`;
  }

  private assignActiveLanguageIdFromCodeWorker(code: string): void {
    const supportedLanguage = this.supportedLanguagesMap.get(code);
    this.langRtl = supportedLanguage?.rtl;
    // this.translate.use(code);
  }

}

export interface SupportedLanguage {
  id: string;
  rtl?: boolean;
}
