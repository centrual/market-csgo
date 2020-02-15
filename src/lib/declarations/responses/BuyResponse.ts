interface IBuySuccessResponse {
  "success": true,
  "id": string
}

interface IBuyErrorResponse {
  "success": false,
  "error": string
}

export type BuyResponse = IBuySuccessResponse | IBuyErrorResponse;
