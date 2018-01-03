export interface GetHealthCheckResult {
  success: boolean;
}

export interface GetHealthCheckDetailedResult {
  config: ConfigHealthResult;
  requestId: string;
  success: boolean;
}

export interface ConfigHealthResult {
  isHostSet: boolean;
  isPasswordSet: boolean;
  isPortSet: boolean;
  isUserSet: boolean;
}
