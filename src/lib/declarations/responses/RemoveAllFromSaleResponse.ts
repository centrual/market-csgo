interface IRemoveAllFromSaleSuccessResponse {
  "success": true,
  "count": number
}

interface IRemoveAllFromSaleErrorResponse {
  "success": false,
  "error": string
}

export type RemoveAllFromSaleResponse = IRemoveAllFromSaleSuccessResponse | IRemoveAllFromSaleErrorResponse;
