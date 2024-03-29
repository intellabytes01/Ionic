export interface ProductSearchState {
  productSearch: [];
  genericSearch: [];
  genericDetail: [];
  genericStores: [];
  companySearch: [];
  companyStores: [];
  companyProducts: [];
  distributorSearch: [];
  distributorCompanies: [];
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

export interface GenericSearchResponse {
  statusCode: number;
  success: boolean;
  data: GenericDetails[];
  requestId: string;
  message: string;
}

export interface GenericDetails {
  GenericId: number;
  NAME: string;
}

export interface GenericDetailResponse {
  statusCode: number;
  success: boolean;
  data: GenericProductDetails[];
  requestId: string;
  message: string;
}

export interface GenericProductDetails {
  ProductId: number;
  ProductName: string;
  MRP: number;
  Packing: string;
  CompanyName: string;
  qty: number;
}

export interface GenericStoresResponse {
  statusCode: number;
  success: boolean;
  data: GenericStoreDetails[];
  requestId: string;
  message: string;
}

export interface GenericStoreDetails {
  Storeid: number;
  StoreName: string;
  qty: number;
  Scheme: string;
  IsMapped: number;
  TotalStock: number;
}

export interface CompanySearchResponse {
  statusCode: number;
  success: boolean;
  data: CompanyDetails[];
  requestId: string;
  message: string;
}

export interface CompanyDetails {
  CompanyCode: number;
  CompanyName: string;
  RegionId: number;
  RegionName: string;
  NonPRQty: number;
  slot: number;
}

export interface CompanyStoresResponse {
  statusCode: number;
  success: boolean;
  data: CompanyStoreDetails[];
  requestId: string;
  message: string;
}

export interface CompanyStoreDetails {
  StoreId: number;
  StoreName: string;
  NonPRQty: number;
  IsMapped: number;
}

export interface CompanyProductsResponse {
  statusCode: number;
  success: boolean;
  data: CompanyProductDetails[];
  requestId: string;
  message: string;
}

export interface CompanyProductDetails {
  StoreId: number;
  StoreProductCode: string;
  StoreProductName: string;
  StoreProductPacking: string;
  StoreProductScheme: string;
  TotalStock: number;
}

export interface DistributorSearchResponse {
  statusCode: number;
  success: boolean;
  data: DistributorDetails[];
  requestId: string;
  message: string;
}

export interface DistributorDetails {
  StoreId: number;
  StoreName: string;
  NonPRQty: number;
  IsMapped: number;
}

export interface DistributorListResponse {
  statusCode: number;
  success: boolean;
  data: DistributorCompaniesList[];
  requestId: string;
  message: string;
}

export interface DistributorCompaniesList {
  CompanyId: number;
  CompanyName: string;
  NonPRQty: number;
  slot: number;
}
