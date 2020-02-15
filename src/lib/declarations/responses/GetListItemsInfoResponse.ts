import {EnumCurrency} from "../enums/EnumCurrency";

type HistoryItem = [number, number];

interface ItemData {
  "max": string
  "min": number,
  "average": number,
  "history": HistoryItem[]
}

interface IGetListItemsInfoSuccessResponse {
  "success": true,
  "currency": EnumCurrency,
  "data": {
    [ItemName:string]: ItemData
  }
}

interface IGetListItemsInfoErrorResponse {
  "success": false,
  "error": string
}

export type GetListItemsInfoResponse = IGetListItemsInfoSuccessResponse | IGetListItemsInfoErrorResponse;
