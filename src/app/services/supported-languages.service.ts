import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SupportedLanguagesService {

  private readonly supportedLanguagesMap = new Map<string, string>([
    ['en', 'supported.english'] as const,
    ['es', 'supported.spanish'] as const
  ]);

  private readonly translateToLanguageCodeMap: Map<string, string>;
  
  private readonly supportedLanguageCodes = Array.from(this.supportedLanguagesMap.keys());

  private readonly supportedLanguageTranslateIds = Array.from(this.supportedLanguagesMap.values());

  constructor(private translate: TranslateService) {
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
