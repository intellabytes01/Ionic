export interface AddDistributorState {
  stores: Store[];
  requestSubmitData: RequestSubmitResponse;
  status: Status[];
  distributorSubmitData: DistributorSubmitResponse;
  errorMessage: string | null;
}

export interface Store {
  StoreId: number;
  DistributorId: number;
  StoreName: string;
  StoreCode: string;
  StockVisibility: number;
}

export interface StoreResponse {
  statusCode: number;
  success: boolean;
  data: Store[];
  requestId: string;
  message: string;
}

export interface RequestSubmitResponse {
  statusCode: number;
  success: boolean;
  data: RequestSubmitData[];
  requestId: string;
  message: string;
}

export interface RequestSubmitData {
  storeId: number;
  Status: string;
  Saved: false;
}

export interface Status {
  StoreId: number;
  StoreName: string;
  Status: string;
  Phone: string;
  Address: string;
}

export interface StatusResponse {
  statusCode: number;
  success: boolean;
  data: Status[];
  requestId: string;
  message: string;
}

export interface DistributorSubmitResponse {
  statusCode: number;
  success: boolean;
  data: DistributorSubmitData[];
  requestId: string;
  message: string;
}

export interface DistributorSubmitData {
  StoreId: number;
  DistributorId: number;
  StoreName: string;
  StoreCode: string;
  StockVisibility: number;
}
