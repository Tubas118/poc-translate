import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../environments/environment';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportedLanguagesService implements OnInit {

  private readonly supportedLanguagesMap: Map<string, SupportedLanguage>;

  private readonly translateToLanguageCodeMap: Map<string, string>;

  private readonly supportedLanguageCodes;

  private readonly supportedLanguageTranslateIds;

  private langRtl?: boolean;

  private supportedLang_english?: string;
  private supportedLang_hebrew?: string;
  private supportedLang_spanish?: string;

  constructor(private translate: TranslateService) {
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

    this.translateToLanguageCodeMap = new Map<string, string>();
    this.supportedLanguagesMap.forEach((value, key) => {
      this.translateToLanguageCodeMap.set(value.id, key);
    });

    this.supportedLanguageTranslateIds = Array.from(this.translateToLanguageCodeMap.values());
  }

  ngOnInit(): void {
    this.translate.addLangs(this.supportedLanguageCodes);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.updateSupportedLanguages();
  }

  get langDir(): string {
    return this.langRtl ? 'rtl' : 'ltr';
  }

  getSupportedLanguagesMap(): Map<string, SupportedLanguage> {
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
    this.assignActiveLanguageIdFromCodeWorker(code);
  }

  assignActiveLanguageIdFromCode(code: string): void {
    this.assignActiveLanguageIdFromCodeWorker(code);
  }

  get supportedLanguage_english(): string {
    return this.supportedLang_english || '';
  }

  get supportedLanguage_hebrew(): string {
    return this.supportedLang_hebrew || '';
  }

  get supportedLanguage_spanish(): string {
    return this.supportedLang_spanish || '';
  }

  private assignActiveLanguageIdFromCodeWorker(code: string): void {
    const supportedLanguage = this.supportedLanguagesMap.get(code);
    this.langRtl = supportedLanguage?.rtl;
    this.translate.use(code);
    this.updateSupportedLanguages();
  }

  private updateSupportedLanguages() {
    this.translate.get('supported.english').pipe(take(1))
      .subscribe(value => {
        this.supportedLang_english = value;
      });

    this.translate.get('supported.hebrew').pipe(take(1))
      .subscribe(value => {
        this.supportedLang_hebrew = value;
      });

    this.translate.get('supported.spanish').pipe(take(1))
      .subscribe(value => {
        this.supportedLang_spanish = value;
      });
   }

}

export interface SupportedLanguage {
  id: string;
  rtl?: boolean;
}
