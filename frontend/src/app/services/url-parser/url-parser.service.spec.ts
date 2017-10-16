import { TestBed } from '@angular/core/testing';

import { UrlParserService } from './url-parser.service';
import { ParsedUrl } from './url-parser.types';

describe('UrlParserService', () => {
  let service: UrlParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlParserService]
    });
    service = TestBed.get(UrlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully parse a URL', () => {
    const testUrl: string = 'https://myuser:mypassword@www.example.com:4433/path1/path2/file.ext?key1=val1&key2=val2#bookmark';
    const parsedUrl: ParsedUrl = service.parse(testUrl);
    const expectedParsedUrl: ParsedUrl = {
      slashes: true,
      protocol: 'https:',
      hash: '#bookmark',
      query: {
        key1: 'val1',
        key2: 'val2'
      },
      pathname: '/path1/path2/file.ext',
      auth: 'myuser:mypassword',
      host: 'www.example.com:4433',
      port: '4433',
      hostname: 'www.example.com',
      password: 'mypassword',
      username: 'myuser',
      origin: 'https://www.example.com:4433',
      href: 'https://myuser:mypassword@www.example.com:4433/path1/path2/file.ext?key1=val1&key2=val2#bookmark'
    };
    expect(parsedUrl).toEqual(expectedParsedUrl);
  });
});
