import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { LinksComponent } from './components/links/links.component';
import { TranslatePanelComponent } from './components/translate-panel/translate-panel.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
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