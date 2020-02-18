import {EnumCurrency} from "../enums/EnumCurrency";

export interface ISearchItem {
  "market_hash_name": string,
  "price": number,
  "class": number,
  "instance": number,
  "count": number
}

interface ISearchItemByHashNameSuccessResponse {
  "success": true,
  "currency": EnumCurrency,
  "list": ISearchItem[]
}

interface ISearchItemByHashNameErrorResponse {
  "success": false,
  "error": string
}

export type SearchItemByHashNameResponse = ISearchItemByHashNameSuccessResponse | ISearchItemByHashNameErrorResponse;
