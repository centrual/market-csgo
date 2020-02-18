import {EnumCurrency} from "../enums/EnumCurrency";

export interface ISpesificSearchItemExtraData {
  "float": string,
  "phase": string
}

export interface ISpesificSearchItem {
  "id": number,
  "market_hash_name": string,
  "price": number,
  "class": number,
  "instance": number,
  "extra": ISpesificSearchItemExtraData
}

interface ISearchItemByHashNameSpesificSuccessResponse {
  "success": true,
  "currency": EnumCurrency,
  "list": ISpesificSearchItem[]
}

interface ISearchItemByHashNameSpesificErrorResponse {
  "success": false,
  "error": string
}

export type SearchItemByHashNameSpesificResponse = ISearchItemByHashNameSpesificSuccessResponse | ISearchItemByHashNameSpesificErrorResponse;
