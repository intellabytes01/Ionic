export interface DeliveryTrackerState {
  deliveryTrackerArray: [];
  statusUpdate: boolean;
  errorMessage: string | null;
}

export interface DeliveryTrackerResponse {
  statusCode: number;
  success: boolean;
  data: DeliveryTrackerList[];
  requestId: string;
  message: string;
}

export interface DeliveryTrackerList {
  StoreId: number;

  StoreName: string;

  PartyCode: number;

  PartyName: string;

  DisplayPartyCode: string;

  InvoiceNo: string;

  OrderNo: string;

  InvoiceDate: string;

  InvoiceAmt: number;

  DeliveryMan: string;

  DeliveryAssignedDate: string;

  Status: string;

  DeliveryDate: string;

  DeliveryRemarks: string;

  RetailerRemarks: string;

  UserId: number;

  Username: string;

  NAME: string;

  CreatedBy: number;

  CreatedDate: string;

  ModifiedBy: number;

  ModifiedDate: string;

  Latitude: string;

  Longitude: string;
}

export interface StatusUpdateResponse {
  statusCode: number;
  success: boolean;
  data: null;
  requestId: string;
  message: string;
}
