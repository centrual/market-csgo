import {EnumTradeDirection} from "../enums/EnumTradeDirection";

export interface ITrade {
  "dir": EnumTradeDirection,
  "trade_id": string,
  "bot_id": string,
  "timestamp": number
}

interface ITradesSuccessResponse {
  "success": true,
  "trades": ITrade[]
}

interface ITradesErrorResponse {
  "success": false,
  "error": string
}

export type TradesResponse = ITradesSuccessResponse | ITradesErrorResponse;
