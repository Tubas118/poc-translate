import { Component } from '@angular/core';
import { SupportedLanguagesService } from './services/supported-languages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'poc-translate';
  subtitle = '(i18n)';

  constructor(private supportedLanguagesService: SupportedLanguagesService) {
  }

  get langDir(): string {
    return this.supportedLanguagesService?.langDir;
  }

}
