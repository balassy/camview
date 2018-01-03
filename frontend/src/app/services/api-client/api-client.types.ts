export interface GetDeviceInfoResult {
  mac: string;
  name: string;
}

export interface GetHealthCheckResult {
  success: boolean;
}

export interface GetHealthCheckDetailedResult {
  requestId: string;
  success: boolean;
}
