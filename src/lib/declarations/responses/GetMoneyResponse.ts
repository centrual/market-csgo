import {EnumCurrency} from "../enums/EnumCurrency";

interface IGetMoneySuccessResponse {
  "success": true,
  "money": number,
  "currency": EnumCurrency
}

interface IGetMoneyErrorResponse {
  "success": false,
  "error": string
}

export type GetMoneyResponse = IGetMoneySuccessResponse | IGetMoneyErrorResponse;
