import { Action } from '@ngrx/store';

export enum ProductSearchAction {
  PRODUCTSEARCH = '[ProductSearch] Product Search',
  PRODUCTSEARCH_SUCCESS = '[ProductSearch] Product Search Success',
  PRODUCTSEARCH_FAILURE = '[ProductSearch] Product Search Failure',
  GENERICSEARCH = '[ProductSearch] Generic Search',
  GENERICSEARCH_SUCCESS = '[ProductSearch] Generic Search Success',
  GENERICSEARCH_FAILURE = '[ProductSearch] Generic Search Failure',
  GENERICDETAIL = '[ProductSearch] Generic Detail',
  GENERICDETAIL_SUCCESS = '[ProductSearch] Generic Detail Success',
  GENERICDETAIL_FAILURE = '[ProductSearch] Generic Detail Failure',
  GENERICSTORES = '[ProductSearch] Generic Stores',
  GENERICSTORES_SUCCESS = '[ProductSearch] Generic Stores Success',
  GENERICSTORES_FAILURE = '[ProductSearch] Generic Stores Failure',
  COMPANYSEARCH = '[ProductSearch] Company Search',
  COMPANYSEARCH_SUCCESS = '[ProductSearch] Company Search Success',
  COMPANYSEARCH_FAILURE = '[ProductSearch] Company Search Failure',
  COMPANYSTORES = '[ProductSearch] Company Stores',
  COMPANYSTORES_SUCCESS = '[ProductSearch] Company Stores Success',
  COMPANYSTORES_FAILURE = '[ProductSearch] Company Stores Failure',
  COMPANYPRODUCTS = '[ProductSearch] Company Products',
  COMPANYPRODUCTS_SUCCESS = '[ProductSearch] Company Products Success',
  COMPANYPRODUCTS_FAILURE = '[ProductSearch] Company Products Failure',
  DISTRIBUTORSEARCH = '[ProductSearch] Distributor Search',
  DISTRIBUTORSEARCH_SUCCESS = '[ProductSearch] Distributor Search Success',
  DISTRIBUTORSEARCH_FAILURE = '[ProductSearch] Distributor Search Failure',
  DISTRIBUTORCOMPANIES = '[ProductSearch] Distributor Companies',
  DISTRIBUTORCOMPANIES_SUCCESS = '[ProductSearch] Distributor Companies Success',
  DISTRIBUTORCOMPANIES_FAILURE = '[ProductSearch] Distributor Companies Failure',
}

export class ProductSearch implements Action {
  readonly type = ProductSearchAction.PRODUCTSEARCH;
  constructor(public payload: any) {}
}

export class ProductSearchSuccess implements Action {
  readonly type = ProductSearchAction.PRODUCTSEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class ProductSearchFailure implements Action {
  readonly type = ProductSearchAction.PRODUCTSEARCH_FAILURE;
  constructor(public payload: any) {}
}

export class GenericSearch implements Action {
  readonly type = ProductSearchAction.GENERICSEARCH;
  constructor(public payload: any) {}
}

export class GenericSearchSuccess implements Action {
  readonly type = ProductSearchAction.GENERICSEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class GenericSearchFailure implements Action {
  readonly type = ProductSearchAction.GENERICSEARCH_FAILURE;
  constructor(public payload: any) {}
}

export class GenericDetail implements Action {
  readonly type = ProductSearchAction.GENERICDETAIL;
  constructor(public payload: any) {}
}

export class GenericDetailSuccess implements Action {
  readonly type = ProductSearchAction.GENERICDETAIL_SUCCESS;
  constructor(public payload: any) {}
}

export class GenericDetailFailure implements Action {
  readonly type = ProductSearchAction.GENERICDETAIL_FAILURE;
  constructor(public payload: any) {}
}

export class GenericStores implements Action {
  readonly type = ProductSearchAction.GENERICSTORES;
  constructor(public payload: any) {}
}

export class GenericStoresSuccess implements Action {
  readonly type = ProductSearchAction.GENERICSTORES_SUCCESS;
  constructor(public payload: any) {}
}

export class GenericStoresFailure implements Action {
  readonly type = ProductSearchAction.GENERICSTORES_FAILURE;
  constructor(public payload: any) {}
}

export class CompanySearch implements Action {
  readonly type = ProductSearchAction.COMPANYSEARCH;
  constructor(public payload: any) {}
}

export class CompanySearchSuccess implements Action {
  readonly type = ProductSearchAction.COMPANYSEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class CompanySearchFailure implements Action {
  readonly type = ProductSearchAction.COMPANYSEARCH_FAILURE;
  constructor(public payload: any) {}
}

export class CompanyStores implements Action {
  readonly type = ProductSearchAction.COMPANYSTORES;
  constructor(public payload: any) {}
}

export class CompanyStoresSuccess implements Action {
  readonly type = ProductSearchAction.COMPANYSTORES_SUCCESS;
  constructor(public payload: any) {}
}

export class CompanyStoresFailure implements Action {
  readonly type = ProductSearchAction.COMPANYSTORES_FAILURE;
  constructor(public payload: any) {}
}

export class CompanyProducts implements Action {
  readonly type = ProductSearchAction.COMPANYPRODUCTS;
  constructor(public payload: any) {}
}

export class CompanyProductsSuccess implements Action {
  readonly type = ProductSearchAction.COMPANYPRODUCTS_SUCCESS;
  constructor(public payload: any) {}
}

export class CompanyProductsFailure implements Action {
  readonly type = ProductSearchAction.COMPANYPRODUCTS_FAILURE;
  constructor(public payload: any) {}
}

export class DistributorSearch implements Action {
  readonly type = ProductSearchAction.DISTRIBUTORSEARCH;
  constructor(public payload: any) {}
}

export class DistributorSearchSuccess implements Action {
  readonly type = ProductSearchAction.DISTRIBUTORSEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class DistributorSearchFailure implements Action {
  readonly type = ProductSearchAction.DISTRIBUTORSEARCH_FAILURE;
  constructor(public payload: any) {}
}

export class DistributorCompanies implements Action {
  readonly type = ProductSearchAction.DISTRIBUTORCOMPANIES;
  constructor(public payload: any) {}
}

export class DistributorCompaniesSuccess implements Action {
  readonly type = ProductSearchAction.DISTRIBUTORCOMPANIES_SUCCESS;
  constructor(public payload: any) {}
}

export class DistributorCompaniesFailure implements Action {
  readonly type = ProductSearchAction.DISTRIBUTORCOMPANIES_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | ProductSearch
  | ProductSearchSuccess
  | ProductSearchFailure
  | GenericSearch
  | GenericSearchSuccess
  | GenericSearchFailure
  | GenericDetail
  | GenericDetailSuccess
  | GenericDetailFailure
  | GenericStores
  | GenericStoresSuccess
  | GenericStoresFailure
  | CompanySearch
  | CompanySearchSuccess
  | CompanySearchFailure
  | CompanyStores
  | CompanyStoresSuccess
  | CompanyStoresFailure
  | CompanyProducts
  | CompanyProductsSuccess
  | CompanyProductsFailure
  | DistributorSearch
  | DistributorSearchSuccess
  | DistributorSearchFailure
  | DistributorCompanies
  | DistributorCompaniesSuccess
  | DistributorCompaniesFailure;
