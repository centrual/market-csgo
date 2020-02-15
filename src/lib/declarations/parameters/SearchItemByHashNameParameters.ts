import {EnumCurrency} from "../enums/EnumCurrency";

export interface ISearchItemByHashNameParameters {
  SECRET_KEY: string,
  MARKET_HASH_NAME: string,
  CURRENCY_CODE: EnumCurrency
}
