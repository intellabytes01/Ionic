export interface NewOrderState {
  productSearchArray: [];
  newOrderArray: [];
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

export interface NewOrderBody {
  Partycode: string;
  DeliveryOption: string;
  PriorityOption: string;
  Remarks: string;
  OrderTimestamp: string;
  UserId: string;
  DeliveryPerson: DeliveryPerson;
  Products: Products[];
}

export interface Products {
  StoreId: number;
  StoreName: string;
  ProductCode: string;
  DisplayProductCode: string;
  ProductName: string;
  Packing: string;
  BoxPacking: string;
  CasePacking: string;
  MRP: number;
  PTR: number;
  Company: string;
  CompanyCode: string;
  Scheme: string;
  Stock: number;
  ProductFullName: string;
  StoreSchemeId: number;
  Quantity: number;
  Free: number;
}

export interface DeliveryPerson {
  Name: string;
  Code: string;
}

export interface NewOrderResponse {
  statusCode: number;
  success: true;
  data: NewOrderResponseData[];
  requestId: string;
  message: string;
}

export interface NewOrderResponseData {
  OrderId: number;
  PartyCode: string;
  OrderDate: string;
  DeliveryOption: string;
  Priority: string;
  Remarks: string;
  OrderTimeStamp: string;
  CreatedBy: string;
  CreatedDate: string;
  ModifiedBy: string;
  OrderSource: string;
  DeliveryPersonName: string;
  DeliveryPersonCode: string;
  ModifiedDate: string;
  OrderDetails: OrderDetails[];
  OrderAmount: number;
  HiddenOrderAmount: number;
}

export interface OrderDetails {
  OrderId: number;
  ProductCode: string;
  Quantity: number;
  Free: number;
  Scheme: string;
  PTR: number;
  CreatedDate: string;
  ModifiedDate: string;
}
