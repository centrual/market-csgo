interface IAddToSaleSuccessResponse {
  "success": true,
  "item_id": number
}

interface IAddToSaleErrorResponse {
  "success": false,
  "error": "bad_input" | "inventory_not_loaded" | "item_not_recieved" | "no_description_found" | "item_not_inserted" | "item_not_in_inventory" | "bad_request" | string
}

export type AddToSaleResponse = IAddToSaleSuccessResponse | IAddToSaleErrorResponse;
