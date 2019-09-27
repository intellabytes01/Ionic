import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface NewOrderState {
  productSearchArray: [];
  newOrderArray: [];
  storeConfigArray: [];
  errorMessage: string | null;
  orderHistory: [];
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
  BoxPacking: string;
  CasePacking: string;
  Company: string;
  CompanyCode: string;
  DisplayProductCode: string;
  PTR: number;
  ProductCode: string;
  ProductFullName: string;
  Scheme: string;
  Stock: number;
  StoreId: number;
  StoreName: string;
  StoreSchemeId: number;
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


export interface InewOrderModel {
  'StoreId': number;
  'StoreName': number;
  'Partycode': string;
  'DeliveryOption': string;
  'PriorityOption': string;
  'Remarks': string;
  'OrderTimestamp': string;
  'UserId': number;
  'Total': number;
  'Key': string;
  'DeliveryPerson': {
    'Name': string,
    'Code': string
  };
  'Products': [
    {
      'StoreId': number,
      'StoreName': string,
      'ProductCode': string,
      'DisplayProductCode': string,
      'ProductName': string,
      'Packing': string,
      'BoxPacking': string,
      'CasePacking': string,
      'MRP': number,
      'PTR': number,
      'Company': string,
      'CompanyCode': string,
      'Scheme': string,
      'Stock': number,
      'ProductFullName': string,
      'StoreSchemeId': number,
      'Quantity': string,
      'Free': string
    }
  ];
}

const newOrderState = createFeatureSelector<NewOrderState>('newOrder');

export const productSearchData = createSelector(
  newOrderState,
  coursesState => coursesState.productSearchArray
);

export const newOrderSubmitData = createSelector(
  newOrderState,
  coursesState => coursesState.newOrderArray
);

export const newOrderGetStoreConfigData = createSelector(
  newOrderState,
  coursesState => coursesState.storeConfigArray
);

export const newOrderHistory = createSelector(
  newOrderState,
  coursesState => coursesState.orderHistory
);
