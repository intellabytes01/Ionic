export interface FeedbackState {
  feedbackTypes: [];
  feedbackSubmitData: object;
  errorMessage: string | null;
}

export interface FeedbackTypeResponse {
  statusCode: number;
  success: boolean;
  data: FeedbackTypes[];
  requestId: string;
  message: string;
}

export interface FeedbackTypes {
  Fid: number;
  Types: string;
  Role: string;
  ShowNextOption: number;
}

export interface FeedbackSubmitResponse {
  statusCode: number;
  success: boolean;
  data: FeedbackTypes[];
  requestId: string;
  message: string;
}
