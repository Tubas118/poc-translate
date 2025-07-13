import { Component, OnInit } from '@angular/core';
import { SupportedLanguagesService } from './services/supported-languages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'poc-translate';
  subtitle = '(convert i18n to ngx-translate)';

  constructor(private supportedLanguagesService: SupportedLanguagesService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {
      console.log('Language changed to:', event.lang); 
      // Perform actions after translations are loaded (e.g., render content)
    });

  }

  get langDir(): string {
    return this.supportedLanguagesService?.langDir;
  }

}
