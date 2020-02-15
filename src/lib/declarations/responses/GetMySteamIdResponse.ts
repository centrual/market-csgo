interface IGetMySteamIdSuccessResponse {
  "success": true,
  "steamid32": number,
  "steamid64": string
}

interface IGetMySteamIdErrorResponse {
  "success": false,
  "error": string
}

export type GetMySteamIdResponse = IGetMySteamIdSuccessResponse | IGetMySteamIdErrorResponse;
