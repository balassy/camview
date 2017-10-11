import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs } from '@angular/http';
import * as aws4 from 'aws-v4-sign-small';

import { AwsCredentialsService } from './../aws-credentials/aws-credentials.service';
import { ConfigService } from './../config/config.service';
import { SignerCredentials, SignOptions } from './aws-request-signer.types';
import { UrlParserService, ParsedUrl } from './../url-parser/url-parser.service';

@Injectable()
export class AwsRequestSignerService {
  public constructor( private _awsCredentialsService: AwsCredentialsService,
                      private _configService: ConfigService,
                      private _urlParserService: UrlParserService) {
  }

  public sign(requestOptions: RequestOptionsArgs): void {
    const credentials: SignerCredentials = this._awsCredentialsService.currentCredentials;
    const parsedUrl: ParsedUrl = this._urlParserService.parse(requestOptions.url as string);

    const defaultSignOptions: SignOptions = {
      region: this._configService.aws.region,
      service: 'execute-api',
      method: 'GET',
      host: parsedUrl.hostname,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      path: parsedUrl.pathname,
      port: '' + parsedUrl.port,
      query: parsedUrl.query,
      body: requestOptions.body
    };

    const signedOptions: SignOptions = Object.assign({}, defaultSignOptions, requestOptions);
    aws4.sign(signedOptions, credentials);

    // Copy the signature headers to the original request object.
    requestOptions.headers = requestOptions.headers || new Headers();
    Object.keys(signedOptions.headers).forEach((headerName) => {
      (requestOptions.headers as Headers).set(headerName, signedOptions.headers[headerName]);
    });

    // Setting a "host" header is refused because it's unsafe.
    (requestOptions.headers as Headers).delete('host');
  }
}
