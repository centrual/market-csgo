import {ITradeLink} from "./declarations/TradeLink";
import BigNumber from "bignumber.js";
import {EnumCurrency} from "./declarations/enums/EnumCurrency";


export class Utils {
  public static IsStringMarketHashName( name: string ): boolean {
    return name.indexOf('_') < 1;
  }

  public static GetTradeObject( tradeUrl: null|string|ITradeLink ): ITradeLink {
    const tradeUrlRegex = /^https:\/\/steamcommunity.com\/tradeoffer\/new\/\?partner=([0-9]{6,32})&token=([a-zA-Z0-9]{3,12})$/i;

    if( typeof tradeUrl === 'string' && tradeUrlRegex.test(tradeUrl) ) {
      const executed = tradeUrlRegex.exec(tradeUrl);

      if( executed !== null ) {
        return {
          Partner: executed[1],
          Token: executed[2]
        }
      }
    } else if( tradeUrl !== null && typeof tradeUrl === 'object' ) {
      return tradeUrl;
    }

    return {
      Token: undefined,
      Partner: undefined
    };
  }

  public static ConvertPriceToCoins( price: number, currency: EnumCurrency ): number {
    if( currency === EnumCurrency.RUB ) {
      return Math.ceil(new BigNumber(price).multipliedBy(100).toNumber());
    }

    return Math.ceil(new BigNumber(price).multipliedBy(1000).toNumber());
  }
}
