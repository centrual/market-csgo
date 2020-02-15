import MarketCsgo from '../index';
import {EnumCurrency} from "../lib/declarations/enums/EnumCurrency";

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
    const prices = await MarketCsgoInstance.Prices(EnumCurrency.EUR);

    let isCurrencyValid = false;

    if( prices.success && prices.currency === EnumCurrency.EUR ) {
      isCurrencyValid = true;
    }

    expect(isCurrencyValid).toBe(true);
  });
});

describe('Trade Request Take', () => {

});
