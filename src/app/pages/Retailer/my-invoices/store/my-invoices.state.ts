export interface InvoiceState {
  invoiceArray: any;
  invoiceDetail: any;
  errorMessage: string | null;
}

export interface InvoiceListResponse {
  statusCode: number;
  success: boolean;
  data: InvoiceList[];
  requestId: string;
  message: string;
}

export interface InvoiceList {
  StoreInvoiceId: number;
  StoreId: number;
  StoreName: string;
  PartyCode: string;
  DisplayPartyCode: string;
  PartyName: string;
  PartyAddress: string;
  PROrderNo: string;
  InvoiceNo: string;
  InvoiceDate: string;
  OverallDiscountPercent: number;
  OverallDiscountAmount: number;
  CreditNoteAmount: number;
  ReceivedAmount: number;
  InvoiceAmount: number;
  OtherAjustmentAmount: number;
  InvoiceTemplateId: number;
}

export interface InvoiceDetailResponse {
  statusCode: number;
  success: boolean;
  data: InvoiceDetails[];
  requestId: string;
  message: string;
}

export interface InvoiceDetails {
  StoreInvoiceLineItemId: number;
  StoreInvoiceId: number;
  StoreId: number;
  StoreName: string;
  StoreGSTINNumber: string;
  StoreAddress: string;
  StoreMobileNumber: string;
  PartyCode: string;
  DisplayPartyCode: string;
  PartyName: string;
  PartyAddress: string;
  PartyLicenseNumber: string;
  PartyGSTINNumber: string;
  PartyMobileNumber: string;
  PROrderNo: string;
  InvoiceNo: string;
  InvoiceDate: string;
  OverallDiscountPercent: number;
  OverallDiscountAmount: number;
  CreditNoteAmount: number;
  ReceivedAmount: number;
  InvoiceAmount: number;
  OtherAjustmentAmount: number;
  ProductCode: string;
  DisplayProductCode: string;
  ProductName: string;
  Packing: string;
  Company: string;
  TotalQuantity: number;
  Free: number;
  Rate: number;
  MRP: number;
  BatchNo: string;
  BatchExpiryDate: string;
  HSNCode: string;
  ProductDiscountPercent: number;
  ProductDiscountAmount: number;
  SGSTPercent: number;
  SGSTAmount: number;
  CGSTPercent: number;
  CGSTAmount: number;
  IGSTPercent: number;
  IGSTAmount: number;
  TotalProductAmount: number;
  TotalDiscountAmount: number;
  TotalSGSTAmount: number;
  TotalCGSTAmount: number;
  TotalIGSTAmount: number;
  RoundOff: number;
  Message: string;
  InvoiceGrossAmount: number;
  NumericInvoiceDate: string;
  NumericBatchExpiryDate: string;
  ProductTaxAmount: number;
}
