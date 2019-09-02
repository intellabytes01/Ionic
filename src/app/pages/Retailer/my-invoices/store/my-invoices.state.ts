export interface InvoiceState {
  invoiceArray: any;
  errorMessage: string | null;
}

export interface InvoiceTypeResponse {
  statusCode: number;
  success: boolean;
  data: InvoiceList[];
  requestId: string;
  message: string;
}

export interface InvoiceList {
  StoreId: number;
  StoreName: string;
  PartyCode: string;
  DisplayPartyCode: string;
  PartyName: string;
  InvoiceNo: string;
  OrderNo: string;
  InvoiceDate: string;
  InvoiceType: string;
  InvoiceAmt: number;
  CreditNoteAmt: number;
  ReceivedAmt: number;
  Balance: number;
  Salesman: string;
  MappedSalesman: string;
  Area: string;
  IsPaymentRequest: number;
}
