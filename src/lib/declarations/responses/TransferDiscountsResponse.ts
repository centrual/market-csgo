interface ITransferDiscountsSuccessResponse {
  "success": true
}

interface ITransferDiscountsErrorResponse {
  "success": false,
  "error": string
}

export type TransferDiscountsResponse = ITransferDiscountsSuccessResponse | ITransferDiscountsErrorResponse;
