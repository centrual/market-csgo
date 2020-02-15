import {EnumEventType} from "../enums/EnumEventType";
import {EnumTradeStage} from "../enums/EnumTradeStage";
import {EnumCurrency} from "../enums/EnumCurrency";

interface IItemData {
  "event": EnumEventType,
  "stage": EnumTradeStage,
  "currency": EnumCurrency,
  "for": null | string,
  "custom_id": null | string,
  "item_id": string,
  "market_hash_name": string,
  "class": string,
  "instance": string,
  "time": string,
  "app": string,
  "paid": string,
}

interface IHistorySuccessResponse {
  "success": true,
  "data": IItemData[]
}

interface IHistoryErrorResponse {
  "success": false,
  "error": string
}

export type HistoryResponse = IHistorySuccessResponse | IHistoryErrorResponse;
