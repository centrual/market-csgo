import MarketCsgo from '../index';
import {EnumCurrency} from "../lib/declarations/enums/EnumCurrency";
import {Utils} from "../lib/Utils";

let MarketCsgoInstance: MarketCsgo;

beforeAll(success => {
  MarketCsgoInstance = new MarketCsgo({
    ApiKey: process.env.ApiKey,
    Currency: EnumCurrency.USD
  });
  success();
});

describe('Prices', () => {
  it('should fetch prices without parameter', async () => {
    const prices = await MarketCsgoInstance.Prices();
    let isCurrencyValid = false;

    if( prices.success && prices.currency === EnumCurrency.USD ) {
      isCurrencyValid = true;
    }

    expect(isCurrencyValid).toBe(true);
  });
  it('should fetch prices with parameter', async () => {
    const prices = await MarketCsgoInstance.Prices(false, EnumCurrency.EUR);

    let isCurrencyValid = false;

    if( prices.success && prices.currency === EnumCurrency.EUR ) {
      isCurrencyValid = true;
    }

    expect(isCurrencyValid).toBe(true);
  });
});

describe('Utils', () => {
  it('should GetTradeObject method make trade object', () => {
    const tradeObject = Utils.GetTradeObject('https://steamcommunity.com/tradeoffer/new/?partner=0123456789&token=abc123ABC');
    expect(tradeObject.Partner).toBe('0123456789');
    expect(tradeObject.Token).toBe('abc123ABC');
  });

  it('should ConvertPriceToCoins convert USD price correctly', () => {
    const result = Utils.ConvertPriceToCoins(5.14, EnumCurrency.USD);
    expect(result).toBe(5140);
  });

  it('should ConvertPriceToCoins convert EUR price correctly', () => {
    const result = Utils.ConvertPriceToCoins(5.14, EnumCurrency.EUR);
    expect(result).toBe(5140);
  });

  it('should ConvertPriceToCoins convert RUB price correctly', () => {
    const result = Utils.ConvertPriceToCoins(5.14, EnumCurrency.RUB);
    expect(result).toBe(514);
  });
});
