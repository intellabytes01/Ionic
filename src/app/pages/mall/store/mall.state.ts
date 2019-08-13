export interface MallState {
  mallProducts: [];
  errorMessage: string | null;
}

export interface MallTypeResponse {
  statusCode: number;
  success: boolean;
  data: PharmaProducts[];
  requestId: string;
  message: string;
}

export interface PharmaProducts {
  ProductId: number;
  ProductName: string;
  CompanyName: string;
  ProductType: string;
  StrengthText: string;
  Packing: string;
  BrandName: string;
  Composition: string;
  MRP: number;
  PTR: number;
  Margin: string;
  StoreId: number;
  ProductCode: string;
  StoreName: string;
  Scheme: string;
  SchFrom: string;
  SchUpto: string;
  Description: string;
  ImagePath: string;
}
