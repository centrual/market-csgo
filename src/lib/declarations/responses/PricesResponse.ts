import {EnumCurrency} from "../enums/EnumCurrency";

interface IPricesItem {
  "market_hash_name": string,
  "volume": string,
  "price": string
}

interface IPricesSuccessResponse {
  "success": true,
  "time": string,
  "currency": EnumCurrency,
  "items": IPricesItem[]
}

interface IPricesErrorResponse {
  "success": false,
  "error": string
}

export type PricesResponse = IPricesSuccessResponse | IPricesErrorResponse;
