import {EnumCurrency} from "../enums/EnumCurrency";
import {EnumItemStatus} from "../enums/EnumItemStatus";

export interface IItem {
  "item_id": string,
  "assetid": string,
  "classid": string,
  "instanceid": string,
  "real_instance": string,
  "market_hash_name": string,
  "position": number,
  "price": number,
  "currency": EnumCurrency,
  "status": EnumItemStatus,
  "live_time": number,
  "left": null | number,
  "botid": string
}

interface IItemsSuccessResponse {
  "success": true,
  "items": IItem[]
}

interface IItemsErrorResponse {
  "success": false,
  "error": string
}

export type ItemsResponse = IItemsSuccessResponse | IItemsErrorResponse;
