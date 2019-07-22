export interface ProductSearchState {
  productSearch: [];
  errorMessage: string | null;
}

export interface ProductSearchResponse {
  statusCode: number;
  success: boolean;
  data: ProductDetails[];
  requestId: string;
  message: string;
}

export interface ProductDetails {
  id: number;
  ProductName: string;
  Qty: number;
  Slot: number;
  CompanyName: string;
  Packing: string;
  MRP: number;
  GenericName: string;
}
