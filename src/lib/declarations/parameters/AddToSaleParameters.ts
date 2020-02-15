import {EnumCurrency} from "../enums/EnumCurrency";

export interface IAddToSaleParameters {
  SECRET_KEY: string,
  ITEM_ID: string,
  PRICE: number,
  CURRENCY_CODE: EnumCurrency
}
