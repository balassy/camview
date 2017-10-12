export enum ProgressStatus {
  Idle,
  Working
}

export interface ProgressState {
  status: ProgressStatus;
  message?: string;
}
