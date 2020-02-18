export interface ITradeRequestP2PItem {
  "appid": number,
  "contextid": number,
  "assetid": number,
  "amount": number
}

export interface ITradeRequestP2POffer {
  "partner": number,
  "token": string,
  "tradeoffermessage": string,
  "items": ITradeRequestP2PItem[]
}

interface ITradeRequestGiveP2PSuccessResponse {
  "success": true,
  "hash": string,
  "offer": ITradeRequestP2POffer
}

interface ITradeRequestGiveP2PErrorResponse {
  "success": false,
  "error": string
}

export type TradeRequestGiveP2PResponse = ITradeRequestGiveP2PSuccessResponse | ITradeRequestGiveP2PErrorResponse;
