interface ITestStatus {
  "user_token": boolean,
  "trade_check": boolean,
  "site_online": boolean,
  "site_notmpban": boolean
}

interface ITestSuccessResponse {
  "success": true,
  "status": ITestStatus
}

interface ITestErrorResponse {
  "success": false,
  "error": string
}

export type TestResponse = ITestSuccessResponse | ITestErrorResponse;
