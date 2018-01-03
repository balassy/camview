export interface Connection {
  host: string;
  password: string;
  port: string;
  user: string;
}

export interface GetDeviceInfoResult {
  devName: string;
  mac: string;
}
