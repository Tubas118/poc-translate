import { Component, Input } from '@angular/core';
import { LanguageItem } from '../language-selector/language-selector.component';
import { SupportedLanguagesService } from '../../services/supported-languages.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-translate-panel',
  standalone: false,
  templateUrl: './translate-panel.component.html',
  styleUrls: ['./translate-panel.component.scss']
})
export class TranslatePanelComponent {

  @Input()
  title?: string;

  @Input()
  subtitle?: string;

  profileForm: FormGroup;

  displayName?: string;
  
  readonly languageSelectorList: LanguageItem[]

  constructor(private supportedLanguagesService: SupportedLanguagesService,
              private translate: TranslateService) {

    this.languageSelectorList = [];
    this.supportedLanguagesService.getSupportedLanguagesMap().forEach((value, key) => {
      this.languageSelectorList.push({ value: key, displayValue: value?.id })
    });

    this.profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }

  getAvailableLanguageCodes(): string[] {
    return this.supportedLanguagesService.getAvailableLanguageCodes();
  }

  onLanguageSelectionChange(code: string) {
    this.supportedLanguagesService.assignActiveLanguageIdFromCode(code);
  }

  onSubmit(): void {
    this.translate.get('hello.label').pipe(take(1)).subscribe(value => console.log(`onSubmit: ${value}`));
    const submitted = this.profileForm.value;
    this.displayName = `${submitted.firstName} ${submitted.lastName}`.trim();
  }

}
