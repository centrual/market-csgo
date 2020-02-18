export interface IMyInventoryItem {
  "id": string,
  "classid": string,
  "instanceid": string,
  "market_hash_name": string,
  "market_price": number,
  "tradable": number
}

interface IMyInventorySuccessResponse {
  "success": true,
  "items": IMyInventoryItem[]
}

interface IMyInventoryErrorResponse {
  "success": false,
  "error": string
}

export type MyInventoryResponse = IMyInventorySuccessResponse | IMyInventoryErrorResponse;
