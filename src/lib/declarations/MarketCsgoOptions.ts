import {EnumCurrency} from "./enums/EnumCurrency";

export interface MarketCsgoOptions {
  ApiKey: string,
  ApiBase: string,
  RateLimitPerSecond: number,
  Currency: EnumCurrency,
  AutoPing: boolean
}
