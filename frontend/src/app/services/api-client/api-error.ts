import { Response } from '@angular/http';

export interface ErrorBody {
  error: {
    code: string;
    description: string;
  };
}

export class ApiError extends Error {
  private _code: string;
  private _description: string;

  public get code(): string {
    return this._code;
  }

  public get description(): string {
    return this._description;
  }

  public constructor(public response: Response) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);

    if (!response || !response.json) {
      throw new Error('Please specify the HTTP error response!');
    }

    const body: ErrorBody = response.json();
    this._code = body.error.code;
    this._description = body.error.description;
  }

  // Helper function for debugging purposes.
  public toString(): string {
    const content = {
      code: this.code,
      description: this.description,
      response: this.response
    };
    return JSON.stringify(content);
  }
}
