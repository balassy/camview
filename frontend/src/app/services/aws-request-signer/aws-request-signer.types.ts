export interface SignerCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}

export interface SignOptions {
  region: string;
  service: string;
  method: string,
  host: string;
  path: string;
  port: string;
  query: {
    [key: string]: string;
  };
  body: string;
  headers: {
    [key: string]: string;
  }
}
