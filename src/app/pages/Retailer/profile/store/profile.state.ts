export interface ProfileState {
  imageUploadData: {};
  errorMessage: string | null;
}

export interface ImageUploadResponse {
  statusCode: number;
  success: boolean;
  data: string;
  requestId: string;
  message: string;
}
