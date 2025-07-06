import { Component } from '@angular/core';
import { SupportedLanguagesService } from './services/supported-languages.service';
import { LanguageItem } from './components/language-selector/language-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'poc-translate';

  readonly languageSelectorList: LanguageItem[]

  constructor(private supportedLanguagesService: SupportedLanguagesService) {
    this.languageSelectorList = [];
    this.supportedLanguagesService.getSupportedLanguagesMap().forEach((value, key) => {
      this.languageSelectorList.push({ value: key, translateId: value })
    });
  }

  getAvailableLanguageCodes(): string[] {
    return this.supportedLanguagesService.getAvailableLanguageCodes();
  }

  getAvailableLanguageTranslateIds(): string[] {
    return this.supportedLanguagesService.getAvailableLanguageTranslateIds();
  }

  onLanguageSelectionChange(code: string) {
    this.supportedLanguagesService.assignActiveLanguageIdFromCode(code);
  }

}
