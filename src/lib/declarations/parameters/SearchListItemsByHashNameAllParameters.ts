import {ParameterList} from "../ParameterList";
import {EnumCurrency} from "../enums/EnumCurrency";

export interface ISearchListItemsByHashNameAllParameters {
  SECRET_KEY: string,
  CURRENCY_CODE: EnumCurrency,
  MARKET_HASH_NAMES: ParameterList
}
