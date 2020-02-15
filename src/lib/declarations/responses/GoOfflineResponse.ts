interface IGoOfflineSuccessResponse {
  "success": true
}

interface IGoOfflineErrorResponse {
  "success": false,
  "error": string
}

export type GoOfflineResponse = IGoOfflineSuccessResponse | IGoOfflineErrorResponse;
