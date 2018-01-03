import * as rp from 'request-promise-native';
import * as xml2js from 'xml2js';

import { ConfigService } from '../config/config.service';
import { ForbiddenResult, NotFoundResult } from './../../../shared/errors';
import { Connection, GetDeviceInfoResult } from './cam-client.interfaces';
import { ResultCode } from './result-codes';

interface InsecureRequestOptions extends rp.OptionsWithUri {
  insecure: boolean;
}

export class CamClientService {
  // tslint:disable-next-line no-any (Can return anything the camera returns.)
  private static _parseXmlResponse(xml: string): Promise<any> {
    function parseNumber(str: string): string | number {
      if (str && !isNaN(+str) && str.toUpperCase().indexOf('E') < 0) {
          return +str % 1 === 0
            ? parseInt(str, 10)    // tslint:disable-line no-magic-numbers
            : parseFloat(str);
      }

      return str;
    }

    // tslint:disable-next-line typedef (Well-known constructor.)
    return new Promise((resolve, reject) => {
      const xmlParserOptions: xml2js.OptionsV2 = {
        valueProcessors: [
          parseNumber
        ],
        explicitArray: false
      };

      // tslint:disable-next-line no-any (The parseString API does not define the exact type.)
      xml2js.parseString(xml, xmlParserOptions, (err: any, parsed: any) => {
        if (err) {
          reject(new Error('Response XML parsing error: ' + err));
        }

        // tslint:disable-next-line no-any (The parseString API does not define the exact type.)
        const result: any = parsed && parsed.CGI_Result    // tslint:disable-line no-unsafe-any (The result may have a "CGI_Result" property.)
          ? parsed.CGI_Result                              // tslint:disable-line no-unsafe-any (The result may have a "CGI_Result" property.)
          : parsed;
        resolve(result);
      });
    });
  }

  private _connection: Connection;

  public get connection(): Connection {
    return this._connection;
  }

  public constructor(configService: ConfigService) {
    if (!configService) {
      throw new Error('Please specify the configService!');
    }

    this._connection = configService.getConnection();
    if (!this._connection) {
      throw new Error('The ConfigService has not returned valid connection parameters!');
    }
  }

  public getDeviceInfo(): Promise<GetDeviceInfoResult> {
    return this._sendGetRequest<GetDeviceInfoResult>('getDevInfo');
  }

  private _sendGetRequest<T>(commandName: string): Promise<T> {
    if (!commandName) {
      throw new Error('Please specify the commandName!');
    }

    if (!this._connection) {
      throw new Error('Please specify the connection parameters!');
    }

    const options: InsecureRequestOptions = {
      uri: `https://${this._connection.host}:${this._connection.port}/cgi-bin/CGIProxy.fcgi`,
      qs: {
        usr: this._connection.user,
        pwd: this._connection.password,
        cmd: commandName
      },
      headers: {
        accept: 'application/json'
      },
      json: true,
      insecure: true,
      rejectUnauthorized: false
    };

    return rp(options)
      .then((xmlResponse: string) => CamClientService._parseXmlResponse(xmlResponse))
      .then((parsedResponse: any) => {    // tslint:disable-line no-any (Can return anything the camera returns.)
        // tslint:disable-next-line no-unsafe-any (Checking the existance of optional property.)
        if (parsedResponse && (parsedResponse.result || +parsedResponse.result === 0)) {
          switch (<number> parsedResponse.result) {   // tslint:disable-line no-unsafe-any (Using optional property.)
            case ResultCode.Success:
              return parsedResponse;
            case ResultCode.UserNameOrPasswordError:
              throw new ForbiddenResult('CAM_FORBIDDEN', 'The specified credentials are invalid!');
            default:
              throw new Error('Unknown result code!');
          }
        }
      })
      .catch((err: any) => {      // tslint:disable-line no-any (The request-promise-native package does not specify the exact error.)
        // tslint:disable-next-line no-unsafe-any (Checking the existance of optional property.)
        if (err && err.error && (err.error.code === 'ENOTFOUND' || err.error.code === 'ECONNREFUSED' || err.error.code === 'EHOSTUNREACH')) {
          throw new NotFoundResult('CAM_NOT_FOUND', 'Camera not found at the specified host and port.');
        }
        throw(err);
      });
  }
}
