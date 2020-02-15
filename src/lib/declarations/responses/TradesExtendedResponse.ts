import {EnumTradeDirection} from "../enums/EnumTradeDirection";

interface ITradeItem {
  "id": string,
  "assetid": string,
  "classid": string,
  "instanceid": string
}

interface ITradeExtended {
  "dir": EnumTradeDirection,
  "trade_id": string,
  "bot_id": string,
  "timestamp": number,
  "secret": string,
  "nik": string,
  "list_item_id": {
    [ItemId: string]: ITradeItem
  }
}

interface ITradesExtendedSuccessResponse {
  "success": true,
  "trades": ITradeExtended[]
}

interface ITradesExtendedErrorResponse {
  "success": false,
  "error": string
}

export type TradesExtendedResponse = ITradesExtendedSuccessResponse | ITradesExtendedErrorResponse;
