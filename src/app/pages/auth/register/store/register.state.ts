export interface RegisterState {
  businessTypes: BussinessType[];
  regions: Region[];
  errorMessage: string | null;
}

export interface Region {
  RegionId: number;
  RegionName: string;
}

export interface RegionResponse {
  statusCode: number;
  success: boolean;
  data: Region[];
  requestId: string;
  message: string;
}

export interface BussinessType {
  BusinessTypeId: number;
  BusinessTypeName: string;
}

export interface BussinessTypeResponse {
  statusCode: number;
  success: boolean;
  data: BussinessType[];
  requestId: string;
  message: string;
}
