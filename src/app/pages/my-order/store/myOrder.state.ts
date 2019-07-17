export interface MyOrderState {
  myOrderTypes: MyOrderTypes[];
  myOrderSubmitData: object;
  errorMessage: string | null;
}

export interface MyOrderResponse {
  statusCode: number;
  success: boolean;
  data: MyOrderTypes[];
  requestId: string;
  message: string;
}

export interface MyOrderDetailsResponse {
  statusCode: number;
  success: boolean;
  data: MyOrderDetails[];
  requestId: string;
  message: string;
}

export interface MyOrderDetails {
  OrderNo: string;
  StoreId: 151;
  RetailerId: 3;
  OrderId: 7584262;
  OrderDetailId: 82013967;
  ProductCode: string;
  DisplayProductCode: string;
  ProductName: string;
  Quantity: 15;
  Free: null;
  Scheme: null;
  PTR: 0.94;
  ActualQuantityReceived: null;
  ActualFreeReceived: null;
  ProductRemarks: null;
  SchemeType: null;
  CreatedBy: 70;
  CreatedDate: string;
  RoundOffDisplayHalfScheme: null;
}

export interface MyOrderTypes {
  StoreId: number;
  OrderId: number;
  OrderNo: string;
  OrderDate: string;
  OrderAmount: number;
  Remarks: string;
  DeliveryOption: string;
  IsUploaded: string;
  UploadDate: string;
  IsProcessed: string;
  ProcessedDate: string;
  CreatedBy: number;
  CreatedDate: string;
  Priority: string;
  OrderSource: string;
  StoreName: string;
  PartyCode: string;
  PartyName: string;
  DisplayPartyCode: string;
  PartyAddress: string;
  CreatedByName: string;
  DeliveryPersonName: string;
  mobilenumber: string;
}
