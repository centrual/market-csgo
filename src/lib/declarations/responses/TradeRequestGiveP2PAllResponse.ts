interface ITradeRequestP2PItem {
  "appid": number,
  "contextid": number,
  "assetid": number,
  "amount": number
}

interface ITradeRequestP2POffer {
  "partner": number,
  "token": string,
  "tradeoffermessage": string,
  "items": ITradeRequestP2PItem[]
}

interface ITradeRequestGiveP2PAllSuccessResponse {
  "success": true,
  "hash": string,
  "offers": ITradeRequestP2POffer[]
}

interface ITradeRequestGiveP2PAllErrorResponse {
  "success": false,
  "error": string
}

export type TradeRequestGiveP2PAllResponse = ITradeRequestGiveP2PAllSuccessResponse | ITradeRequestGiveP2PAllErrorResponse;
