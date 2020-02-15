import {EnumCurrency} from "../enums/EnumCurrency";

interface ISearchListItemExtraData {
  "float": string,
  "phase": string,
  "percent_success": string,
  "average_time": string
}

interface ISearchListItem {
  "id": number,
  "price": string,
  "class": number,
  "instance": number,
  "extra": ISearchListItemExtraData
}

interface ISearchListItemsByHashNameAllSuccessResponse {
  "success": true,
  "currency": EnumCurrency,
  "list": ISearchListItem[]
}

interface ISearchListItemsByHashNameAllErrorResponse {
  "success": false,
  "error": string
}

export type SearchListItemsByHashNameAllResponse = ISearchListItemsByHashNameAllSuccessResponse | ISearchListItemsByHashNameAllErrorResponse;
