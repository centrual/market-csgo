interface ITradeRequestTakeSuccessResponse {
  "success": true,
  "trade": string,
  "nick": string,
  "botid": string,
  "profile": string,
  "secret": string,
  "items": Array<string>
}

interface ITradeRequestTakeErrorResponse {
  "success": false,
  "error": 3001 | string
}

export type TradeRequestTakeResponse = ITradeRequestTakeSuccessResponse | ITradeRequestTakeErrorResponse;
