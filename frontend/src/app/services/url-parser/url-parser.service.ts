import { Injectable } from '@angular/core';
import * as urlParse from 'url-parse';
import { ParsedUrl } from './url-parser.types';

export * from './url-parser.types';

@Injectable()
export class UrlParserService {
  public parse(url: string): ParsedUrl {
    if (!url) {
      throw new Error('Please specify the URL to parse!');
    }

    const baseUrl = {};                              // Ensures that the parsing is independent from the current location of the browser.
    const parseQueryString: boolean = true;
    return urlParse(url, baseUrl, parseQueryString);
  }
}
