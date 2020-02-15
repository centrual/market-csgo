import {ParameterList} from "../ParameterList";
import {EnumCurrency} from "../enums/EnumCurrency";

export interface IGetListItemsInfoParameters {
  SECRET_KEY: string,
  CURRENCY_CODE: EnumCurrency,
  MARKET_HASH_NAMES: ParameterList
}
