import {EnumCurrency} from "../enums/EnumCurrency";

export interface IBuyParameters {
  SECRET_KEY: string,
  ITEM_ID: string,
  PRICE: number,
  CURRENCY_CODE: EnumCurrency,
  PARTNER?: string,
  TOKEN?: string,
  CUSTOM_ID?: string
}
