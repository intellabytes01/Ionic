export interface SchemesState {
  schemesArray: any;
  schemeCompaniesArray: any;
  schemeProductsArray: any;
  errorMessage: string | null;
}

export interface SchemesResponse {
  statusCode: number;
  success: boolean;
  data: SchemeDetails[];
  requestId: string;
  message: string;
}

export interface SchemeDetails {
  CompanyId: string;
  CompanyName: string;
  RegionId: number;
}

export interface SchemeCompaniesResponse {
  statusCode: number;
  success: boolean;
  data: SchemeCompanyDetails[];
  requestId: string;
  message: string;
}

export interface SchemeCompanyDetails {
  CompanyId: string;
  CompanyName: string;
  PName: string;
  PCode: string;
  Pack: string;
  Scheme: string;
}

export interface SchemeProductsResponse {
  statusCode: number;
  success: boolean;
  data: SchemeProductDetails[];
  requestId: string;
  message: string;
}

export interface SchemeProductDetails {
  CompanyId: string;
  CompanyName: string;
  PName: string;
  PCode: string;
  Pack: string;
  Scheme: string;
}
