interface ITradeRequestGiveSuccessResponse {
  "success": true,
  "trade": string,
  "nick": string,
  "botid": string,
  "profile": string,
  "secret": string,
  "items": Array<number>
}

interface ITradeRequestGiveErrorResponse {
  "success": false,
  "error": string
}

export type TradeRequestGiveResponse = ITradeRequestGiveSuccessResponse | ITradeRequestGiveErrorResponse;
