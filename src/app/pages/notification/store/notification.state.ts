export interface NotificationState {
  notificationList: [];
  errorMessage: string | null;
}

export interface NotificationTypeResponse {
  statusCode: number;
  success: boolean;
  data: NotificationList[];
  requestId: string;
  message: string;
}

export interface NotificationList {
  StoreId: string;
  StoreName: string;
  Title: string;
  Message: string;
  Picture: string;
  TypeId: string;
  Type: string;
  UserId: string;
  SentDate: string;
  URL: string;
}
