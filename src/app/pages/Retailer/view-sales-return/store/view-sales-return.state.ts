export interface SalesReturnState {
  salesReturnTypesArray: [];
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
