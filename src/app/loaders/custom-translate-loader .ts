// src/app/custom-translate.loader.ts
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // In a real application, you would fetch translations from a service or API here
    // For this example, we'll use a hardcoded object
    const translations: { [key: string]: { [key: string]: string } } = {
      en: {
        'main-title': 'poc-translate in English',
        'supported.english': 'English',
        'supported.spanish': 'English (Spanish)'
      },
      es: {
        'main-title': 'poc-translate in Spanish',
        'supported.english': 'English (Spanish)',
        'supported.spanish': 'Spanish (Spanish)'
      }
    };

    return of(translations[lang]);
  }
}