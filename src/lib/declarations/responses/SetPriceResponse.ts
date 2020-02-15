interface ISetPriceSuccessResponse {
  "success": true
}

interface ISetPriceErrorResponse {
  "success": false,
  "error": "bad_item" | string
}

export type SetPriceResponse = ISetPriceSuccessResponse | ISetPriceErrorResponse;
