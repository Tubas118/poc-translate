import { Component, Input } from '@angular/core';
import { LanguageItem } from '../language-selector/language-selector.component';
import { SupportedLanguagesService } from '../../services/supported-languages.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(private supportedLanguagesService: SupportedLanguagesService) {
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
    // console.log(`form: ${JSON.stringify(this.profileForm?.value)}`);
    const submitted = this.profileForm.value;
    this.displayName = `${submitted.firstName} ${submitted.lastName}`.trim();
  }

}
