import {MarketCsgoOptions} from './declarations/MarketCsgoOptions';
import {EnumCurrency} from "./declarations/enums/EnumCurrency";

export const DefaultOptions: MarketCsgoOptions = {
  ApiKey: '',
  ApiBase: 'https://market.csgo.com/api/v2/',
  RateLimitPerSecond: 5,
  Currency: EnumCurrency.USD,
  AutoPing: true
};
