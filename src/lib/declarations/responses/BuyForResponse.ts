interface IBuyForSuccessResponse {
  "success": true,
  "id": string
}

interface IBuyForErrorResponse {
  "success": false,
  "error": string
}

export type BuyResponse = IBuyForSuccessResponse | IBuyForErrorResponse;
