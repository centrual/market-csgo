interface IUpdateInventorySuccessResponse {
  "success": true
}

interface IUpdateInventoryErrorResponse {
  "success": false,
  "error": string
}

export type UpdateInventoryResponse = IUpdateInventorySuccessResponse | IUpdateInventoryErrorResponse;
