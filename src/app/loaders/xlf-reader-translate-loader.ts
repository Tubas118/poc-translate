import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export class XlfReaderTranslateLoader implements TranslateLoader {

  private readonly supportedLanguagesMap = new Map<string, { [key: string]: string }>();

  constructor(private http: HttpClient,
              prefix: string = 'i18n/messages',
              suffix: string = '.xlf') {

    console.log(`XlfReaderTranslateLoader (start)`);
    environment.supportedLanguages.forEach(entry => {
      const usePrefix = (prefix?.length > 0) ? prefix : 'i18n/messages';
      const useSuffix = (suffix?.length > 0) ? suffix : '.xlf';
      const langId = entry[0] as string;
      const xlfSegment = `.${langId}`;
      const loadLangFilename = `${usePrefix}${xlfSegment}${useSuffix}`;
      console.log(`loadLangFile: ${loadLangFilename}`)
      this.getXlfData(`${loadLangFilename}`)
        .subscribe(responseMap => {
          //console.log(`langId: ${langId}, main-title: ${responseMap.get('main-title')}`);
          console.log(`storing langId: ${langId}`);
          this.supportedLanguagesMap.set(langId, responseMap);
        });
    });
  }

  getTranslation(lang: string): Observable<any> {
    // const activeMap: Map<string, string> = (this.supportedLanguagesMap?.has(lang))
    //   ? this.supportedLanguagesMap?.get(lang) as (Map<string, string>)
    //   : {} as Map<string, string>;
    // if (activeMap?.size > 0) {
    //   console.log(`++ lang: ${lang} - main-title: ${activeMap?.get('main-title.label')}`);
    // }
    // else {
    //   console.log(`++ lang: ${lang} missing`);
    // }
    // return of(activeMap);
    return of(this.supportedLanguagesMap.get(lang));
  }

  getXlfData(filePath: string): Observable<any> {
    const responseMap = {}; // new Map<string, string>();
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map(response => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, 'text/xml');
        console.log('Parsed XML Document:', xmlDoc);
        const elements: HTMLCollectionOf<Element> = xmlDoc.getElementsByTagName('trans-unit');

        // for (let element of elements) {
        for (let idx = 0; idx < elements?.length; idx++) {
          const element = elements[idx];
          // console.log(`id: ${element?.attributes?.getNamedItem('id')?.textContent}`);
          // const source = this.getTextContentForTagName(element, 'source');
          const key: string = element?.attributes?.getNamedItem('id')?.textContent || '';
          if (key?.length > 0) {
            const target = this.getTextContentForTagName(element, 'target');
            console.log(`key: ${key}, target: ${target}`);
            const entry = JSON.parse(`{ "${key}": "${target}" }`);
            Object.assign(responseMap, entry);
          }
        }
        return responseMap;
      })
    )
  }

  private getTextContentForTagName(element: Element, tagName: string): string {
    const childElements = element.getElementsByTagName(tagName);
    const value = (childElements[0] as HTMLElement)?.textContent;
    return value || 'NOT PROVIDED';
  }

}
