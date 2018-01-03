import { Response } from '@angular/http';
import { Chance } from 'chance';
import { instance, mock, when } from 'ts-mockito';

import { ApiError, ErrorBody } from './api-error';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('ApiError', () => {
  let mockResponse: Response;
  let mockResponseInstance: Response;
  let testError: ErrorBody;
  let apiError: ApiError;

  beforeEach(() => {
    mockResponse = mock(Response);
    mockResponseInstance = instance(mockResponse);

    testError = {
      error: {
        code: chance.word(),
        description: chance.sentence()
      }
    };
    when(mockResponse.json()).thenReturn(testError);

    apiError = new ApiError(mockResponseInstance);
  });

  describe('ctor', () => {
    it('should require a Response parameter', () => {
      const noResponse: Response = <any> undefined;  // Bypass the TypeScript Compiler warning for required parameter.
      expect(() => new ApiError(noResponse)).toThrowError('Please specify the HTTP error response!');
    });

    it('should create an Error instance', () => {
      expect(apiError instanceof Error);
    });

    it('should create an ApiError instance', () => {
      expect(apiError instanceof ApiError);
    });

    it('should set the code from the response', () => {
      expect(apiError.code).toEqual(testError.error.code);
    });

    it('should set the description from the response', () => {
      expect(apiError.description).toEqual(testError.error.description);
    });

  });

  describe('toString', () => {
    it('should serialize code', () => {
      const stringified: string = apiError.toString();
      expect(stringified).toContain(`"code":"${testError.error.code}"`);
    });

    it('should serialize description', () => {
      const stringified: string = apiError.toString();
      expect(stringified).toContain(`"description":"${testError.error.description}"`);
    });
  });
});
