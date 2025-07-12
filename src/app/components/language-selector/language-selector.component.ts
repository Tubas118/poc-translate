import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface LanguageItem {
  displayValue: string;
  value: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: false,
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  @Input()
  items?: LanguageItem[];

  @Output()
  languageSelectionChangeEvent = new EventEmitter<string>();

  constructor() { }
  
  onLanguageSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.languageSelectionChangeEvent.emit(value);
  }

}
