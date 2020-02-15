interface IPingSuccessResponse {
  "success": true,
  "ping": string
}

interface IPingErrorResponse {
  "success": false,
  "error": string
}

export type PingResponse = IPingSuccessResponse | IPingErrorResponse;
