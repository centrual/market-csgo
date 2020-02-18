import {EnumCurrency} from "../enums/EnumCurrency";

export interface IItemWithClassAndInstance {
  "price": string,
  "market_hash_name": string,
  "buy_order": null|string,
  "avg_price": null|string,
  "popularity_7d": null|string
}

interface IPricesWithClassAndInstancesSuccessResponse {
  "success": true,
  "time": string,
  "currency": EnumCurrency,
  "items": {
    [ClassAndInstanceKey: string]: IItemWithClassAndInstance
  }
}

interface IPricesWithClassAndInstancesErrorResponse {
  "success": false,
  "error": string
}

export type PricesWithClassAndInstancesResponse = IPricesWithClassAndInstancesSuccessResponse | IPricesWithClassAndInstancesErrorResponse;
