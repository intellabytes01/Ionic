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
