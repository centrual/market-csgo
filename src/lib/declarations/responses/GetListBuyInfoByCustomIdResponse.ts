import {EnumTradeStage} from "../enums/EnumTradeStage";
import {EnumCurrency} from "../enums/EnumCurrency";

interface IBuyInfo {
  "stage": EnumTradeStage,
  "currency": EnumCurrency,
  "item_id": string,
  "market_hash_name": string,
  "classid": string,
  "instance": string,
  "time": string,
  "paid": number,
  "for": string,
  "send_until": null | number,
  "causer": null | string,
  "trade_id": null | string
}

interface IGetListBuyInfoByCustomIdSuccessResponse {
  "success": true,
  "data": {
    [CustomId:string]: IBuyInfo
  }
}

interface IGetListBuyInfoByCustomIdErrorResponse {
  "success": false,
  "error": string
}

export type GetListBuyInfoByCustomIdResponse = IGetListBuyInfoByCustomIdSuccessResponse | IGetListBuyInfoByCustomIdErrorResponse;
