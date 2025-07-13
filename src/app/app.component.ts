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
  subtitle = '(convert i18n to ngx-translate)';

  constructor(private supportedLanguagesService: SupportedLanguagesService) {
  }

  get langDir(): string {
    return this.supportedLanguagesService?.langDir;
  }

}
