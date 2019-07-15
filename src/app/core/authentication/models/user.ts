export interface User {
  userData: UserData;
  token: string;
}

export interface LoginResponse {
  statusCode: number;
  success: boolean;
  data: User;
  requestId: string;
  message: string;
}

export interface UserData {
  userSummary: UserSummary;
  retailerSummary: RetailerSummary;
  resourcePermissions: ResourcePermissions;
}

export interface UserSummary {
  UserId: number;
  Username: string;
  Roles: string;
}

export interface RetailerSummary {
  retailerStatus: string;
  retailerInfo: RetailerInfo;
  retailerStoreParties: RetailerStoreParties[];
}

export interface ResourcePermissions {
  Order: Order;
  Product: Product;
}

export interface Order {
  View: number;
  Edit: number;
  Delete: number;
  Add: number;
}

export interface Product {
  View: number;
  Edit: number;
  Delete: number;
  Add: number;
}

export interface RetailerInfo {
  RetailerId: number;
  RetailerName: string;
  MobileNumber: string;
  RetailerStatus: number;
}

export interface RetailerStoreParties {
  PartyCode: string;
  DisplayPartyCode: string;
  StoreId: number;
  StoreName: string;
}
