import { AxiosRequestConfig } from "axios";

export type ID = string | number;

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiError {
  response?: any;
  message?: string;
  status?: number;
  data?: any;
}
export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

export interface ApiOptions extends Omit<AxiosRequestConfig, "url" | "method"> {
  url: string;
  method: HttpMethod;
}
export interface AuthUser {
  fullname?: string;
  email: string;
  password: string;
}

export type GeoDataItem = {
  code: string;
  name: string;
  country: string;
  parentId: ID;
  stateOrLgaOrCountry: string;
};
export interface GeoArea {
  parentId: ID;
  code: string;
  name: string;
  stateOrLgaOrCountry: string;
  data: GeoDataItem[];
}

export type ConfigDataItem = {
  modulePath: string;
  moduleName: string;
  isConfigured: boolean;
  configId: ID;
};
export interface Config {
  configId: ID;
  modulePath: string;
  moduleName: string;
  isConfigured: boolean;
  data: ConfigDataItem[];
}

export type SectorDataItem = {
  sectorName: string;
  category: string;
  sectorDescription: string;
  code: string;
  id: ID;
};
export interface Sector {
  id: ID;
  sectorName: string;
  sectorDescription: string;
  code: string;
  category: string;
  data: SectorDataItem[];
}

export type ManagerOption = {
  value: string;
  label: string;
  email: string;
  phone: string;
};

export type Userdata = {
  id: ID;
  name: string;
  email: string;
  mobile: string;
  manager: string;
};

export interface User {
  id: ID;
  name: string;
  email: string;
  mobile: string;
  manager: string;
  data: Userdata[];
}

export interface Country {
  id: ID;
}

export interface ListForm {
  id: ID;
  name: string;
  ledgerName: string;
  ledgerClass: string;
  ledgerParent: string;
}
