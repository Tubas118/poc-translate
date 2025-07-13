import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { XlfReaderTranslateLoader } from './loaders/xlf-reader-translate-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { LinksComponent } from './components/links/links.component';
import { TranslatePanelComponent } from './components/translate-panel/translate-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  //   console.log(`HttpLoaderFactory before load`);
  return new XlfReaderTranslateLoader(http, './assets/i18n/messages', '.xlf');
  // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectorComponent,
    AngularLogoComponent,
    LinksComponent,
    TranslatePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      // defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    // provideHttpClient(),
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
