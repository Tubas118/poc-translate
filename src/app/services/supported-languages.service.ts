import { Injectable } from '@angular/core';

const DEFAULT_LANGUAGE_ID = 'en';

@Injectable({
  providedIn: 'root'
})
export class SupportedLanguagesService {

  private readonly supportedLanguagesMap = new Map<string, string>([
    ['en', this.languageEnglish ] as const,
    ['es', this.languageSpanish ] as const
  ]);

  private readonly translateToLanguageCodeMap: Map<string, string>;
  
  private readonly supportedLanguageCodes = Array.from(this.supportedLanguagesMap.keys());

  private readonly supportedLanguageTranslateIds = Array.from(this.supportedLanguagesMap.values());

  private activeLanguageId = DEFAULT_LANGUAGE_ID;

  constructor() {
    this.translateToLanguageCodeMap = new Map<string, string>();
    this.supportedLanguagesMap.forEach((value, key) => {
      this.translateToLanguageCodeMap.set(value, key);
    });
  }

  get languageEnglish(): string {
    return $localize`:@@supported.english:English`;
  }

  get languageSpanish(): string {
    return $localize`:@@supported.spanish:Spanish`;
  }

  getSupportedLanguagesMap(): Map<string, string> {
    return this.supportedLanguagesMap;
  }

  getAvailableLanguageCodes(): string[] {
    return this.supportedLanguageCodes;
  }

  getAvailableLanguageTranslateIds(): string[] {
    return this.supportedLanguageTranslateIds;
  }

  onLanguageSelectionChange(event:Event): void {
    const translateId = (event.target as HTMLSelectElement).value;
    const code = this.translateToLanguageCodeMap.get(translateId) || DEFAULT_LANGUAGE_ID;
    this.assignActiveLanguageIdFromCode(code);
  }

  assignActiveLanguageIdFromCode(code: string): void {
    if (this.supportedLanguagesMap.has(code)) {
      this.activeLanguageId = code;
    }
  }

  getActiveLanguageId(): string {
    return this.activeLanguageId || DEFAULT_LANGUAGE_ID;
  }

}
