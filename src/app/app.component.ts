import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'poc-translate';

  private readonly supportedLanguagesMap = new Map<string, string>([
    ['en', 'supported.english'],
    ['es', 'supported.spanish']
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
      console.log(`key: ${value}, value: ${key}`);
      this.translateToLanguageCodeMap.set(value, key);
    });
  }

  getAvailableLanguageCodes(): string[] {
    return this.translate.getLangs();
  }

  getAvailableLanguageTranslateIds(): string[] {
    return this.supportedLanguageTranslateIds;
  }

  onLanguageSelectionChange(event:Event) {
    const translateId = (event.target as HTMLSelectElement).value;
    const code = this.translateToLanguageCodeMap.get(translateId) || this.translate.defaultLang;
    this.translate.use(code);
  }

}
