import {EnumCurrency} from "../enums/EnumCurrency";

export interface IGetMoneyParameters {
  SECRET_KEY: string,
  CURRENCY_CODE: EnumCurrency
}
