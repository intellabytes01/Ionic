export interface SalesReturnState {
  salesReturnTypesArray: [];
  salesReturnStoresArray: [];
  salesReturnListArray: [];
  salesReturnDetailsObject: {};
  errorMessage: string | null;
}

export interface SalesReturnTypeResponse {
  statusCode: number;
  success: boolean;
  data: SalesReturnTypes[];
  requestId: string;
  message: string;
}

export interface SalesReturnTypes {
  CreditNoteTypeId: number;
  Type: string;
}

export interface SalesReturnStoreResponse {
  statusCode: number;
  success: boolean;
  data: SalesReturnStore[];
  requestId: string;
  message: string;
}

export interface SalesReturnStore {
  StoreId: number;
  StoreName: string;
}

export interface SalesReturnListResponse {
  statusCode: number;
  success: boolean;
  data: SalesReturnList[];
  requestId: string;
  message: string;
}

export interface SalesReturnList {
  RetailerCreditNoteId: number;
  storename: string;
  creditnoteno: string;
  totalAmount: number;
  createddate: string;
  type: string;
  creditnotestatustypeid: number;
}

export interface SalesReturnDetailsResponse {
  statusCode: number;
  success: boolean;
  data: SalesReturnDetails;
  requestId: string;
  message: string;
}

export interface SalesReturnDetails {
  DisplayCreditNote: DisplayCreditNote;
  DisplayCreditNoteDetails: DisplayCreditNoteDetails;
}

export interface DisplayCreditNote {
  StoreName: string;
  CreditNoteReturnType: string;
  DeliveryOption: string;
  RetailerRemark: string;
  CreditNoteNo: string;
  CreditNoteStatus: string;
  CreditNoteStatusUpdateDate: string;
  CreatedDate: string;
  ModifiedDate: string;
}

export interface DisplayCreditNoteDetails {
  ProductName: string;
  RetailerQuantity: number;
  RetailerMRP: number;
  RetailerBatchNo: string;
  RetailerExpiryDate: string;
}
