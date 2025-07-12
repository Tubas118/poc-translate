import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { LinksComponent } from './components/links/links.component';
import { TranslatePanelComponent } from './components/translate-panel/translate-panel.component';
import { ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// const TRANSLATE_MODULE = TranslateModule.forRoot({
//       defaultLanguage: 'en',
//       loader: {
//         provide: TranslateLoader,
//         useFactory: (HttpLoaderFactory),
//         deps: [HttpClient]
//       }
//     });

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
      defaultLanguage: 'en',
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
    // provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
    "@ngx-translate/core": "^16.0.4",
    "@ngx-translate/http-loader": "^16.0.1",

*/