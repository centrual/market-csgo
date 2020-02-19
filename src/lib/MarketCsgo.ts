import {MarketCsgoOptions} from "./declarations/MarketCsgoOptions";
import {DefaultOptions} from "./DefaultOptions";
import Axios, {AxiosInstance, AxiosResponse} from "axios";
import LimitRate from 'axios-rate-limit';
import {ApiBaseCanNotBeEmptyError} from "./errors/ApiBaseCanNotBeEmptyError";
import {ApiKeyCanNotBeEmptyError} from "./errors/ApiKeyCanNotBeEmptyError";
import {PricesResponse} from "./declarations/responses/PricesResponse";
import {Endpoints} from "./declarations/Endpoints";
import {EnumCurrency} from "./declarations/enums/EnumCurrency";
import {IPricesParameters} from "./declarations/parameters/PricesParameters";
import {UnexceptedError} from "./errors/UnexceptedError";
import {ITradeRequestTakeParameters} from "./declarations/parameters/TradeRequestTakeParameters";
import {TradeRequestTakeResponse} from "./declarations/responses/TradeRequestTakeResponse";
import {TradeRequestGiveResponse} from "./declarations/responses/TradeRequestGiveResponse";
import {ITradeRequestGiveParameters} from "./declarations/parameters/TradeRequestGiveParameters";
import {TradeRequestGiveP2PResponse} from "./declarations/responses/TradeRequestGiveP2PResponse";
import {ITradeRequestGiveP2PParameters} from "./declarations/parameters/TradeRequestGiveP2PParameters";
import {TradeRequestGiveP2PAllResponse} from "./declarations/responses/TradeRequestGiveP2PAllResponse";
import {ITradeRequestGiveP2PAllParameters} from "./declarations/parameters/TradeRequestGiveP2PAllParameters";
import {PingResponse} from "./declarations/responses/PingResponse";
import {IPingParameters} from "./declarations/parameters/PingParameters";
import {MyInventoryResponse} from "./declarations/responses/MyInventoryResponse";
import {IMyInventoryParameters} from "./declarations/parameters/MyInventoryParameters";
import {AddToSaleResponse} from "./declarations/responses/AddToSaleResponse";
import {IAddToSaleParameters} from "./declarations/parameters/AddToSaleParameters";
import {SetPriceResponse} from "./declarations/responses/SetPriceResponse";
import {IRemoveAllFromSaleParameters} from "./declarations/parameters/RemoveAllFromSaleParameters";
import {ISetPriceParameters} from "./declarations/parameters/SetPriceParameters";
import {RemoveAllFromSaleResponse} from "./declarations/responses/RemoveAllFromSaleResponse";
import {ItemsResponse} from "./declarations/responses/ItemsResponse";
import {IItemsParameters} from "./declarations/parameters/ItemsParameters";
import {TradesResponse} from "./declarations/responses/TradesResponse";
import {ITradesParameters} from "./declarations/parameters/TradesParameters";
import {TradesExtendedResponse} from "./declarations/responses/TradesExtendedResponse";
import {BuyResponse} from "./declarations/responses/BuyResponse";
import {IBuyParameters} from "./declarations/parameters/BuyParameters";
import {ITradeLink} from "./declarations/TradeLink";
import {Utils} from "./Utils";
import {GetBuyInfoByCustomIdResponse} from "./declarations/responses/GetBuyInfoByCustomIdResponse";
import {IGetBuyInfoByCustomIdParameters} from "./declarations/parameters/GetBuyInfoByCustomIdParameters";
import {GetListBuyInfoByCustomIdResponse} from "./declarations/responses/GetListBuyInfoByCustomIdResponse";
import {IGetListBuyInfoByCustomIdParameters} from "./declarations/parameters/GetListBuyInfoByCustomIdParameters";
import {HistoryResponse} from "./declarations/responses/HistoryResponse";
import {IHistoryParameters} from "./declarations/parameters/HistoryParameters";
import {GetMoneyResponse} from "./declarations/responses/GetMoneyResponse";
import {IGetMoneyParameters} from "./declarations/parameters/GetMoneyParameters";
import {GoOfflineResponse} from "./declarations/responses/GoOfflineResponse";
import {IGoOfflineParameters} from "./declarations/parameters/GoOfflineParameters";
import {UpdateInventoryResponse} from "./declarations/responses/UpdateInventoryResponse";
import {IUpdateInventoryParameters} from "./declarations/parameters/UpdateInventoryParameters";
import {TransferDiscountsResponse} from "./declarations/responses/TransferDiscountsResponse";
import {ITransferDiscountsParameters} from "./declarations/parameters/TransferDiscountsParameters";
import {GetMySteamIdResponse} from "./declarations/responses/GetMySteamIdResponse";
import {IGetMySteamIdParameters} from "./declarations/parameters/GetMySteamIdParameters";
import {ISearchItemByHashNameParameters} from "./declarations/parameters/SearchItemByHashNameParameters";
import {SearchItemByHashNameResponse} from "./declarations/responses/SearchItemByHashNameResponse";
import {SearchItemByHashNameSpesificResponse} from "./declarations/responses/SearchItemByHashNameSpesificResponse";
import {ISearchItemByHashNameSpesificParameters} from "./declarations/parameters/SearchItemByHashNameSpesificParameters";
import {SearchListItemsByHashNameAllResponse} from "./declarations/responses/SearchListItemsByHashNameAllResponse";
import {ISearchListItemsByHashNameAllParameters} from "./declarations/parameters/SearchListItemsByHashNameAllParameters";
import {GetListItemsInfoResponse} from "./declarations/responses/GetListItemsInfoResponse";
import {IGetListItemsInfoParameters} from "./declarations/parameters/GetListItemsInfoParameters";
import {TestResponse} from "./declarations/responses/TestResponse";
import {ITestParameters} from "./declarations/parameters/TestParameters";
import {PricesWithClassAndInstancesResponse} from "./declarations/responses/PricesWithClassAndInstancesResponse";

export class MarketCsgo {
  private Options: MarketCsgoOptions;
  private RateLimitedAxios: AxiosInstance;
  private UnlimitedAxios: AxiosInstance;

  constructor(options: Partial<MarketCsgoOptions>) {
    this.Options = DefaultOptions;
    this.RateLimitedAxios = Axios.create();
    this.UnlimitedAxios = Axios.create();

    this.SetOptionsAndReinitialize(options);
  }

  /**
   * Allows dynamically change options.
   * @param options Options to overwrite
   */
  public SetOptionsAndReinitialize(options: Partial<MarketCsgoOptions>) {
    this.Options = Object.assign({}, DefaultOptions, options);
    this.RateLimitedAxios = this.CreateRateLimitedAxios();
    this.UnlimitedAxios = this.CreateUnlimitedAxios();
  }

  private CreateRateLimitedAxios() {
    const axiosInstance = Axios.create({
      baseURL: this.Options.ApiBase,
      timeout: 10000
    });

    return LimitRate(axiosInstance, {
      maxRequests: this.Options.RateLimitPerSecond,
      perMilliseconds: 1000
    });
  }

  private CreateUnlimitedAxios() {
    return Axios.create({
      baseURL: this.Options.ApiBase,
      timeout: 120000
    });
  }

  private async CallAxios<T>(endpointUrl: string, params: object, rateLimited = true): Promise<T> {
    this.CheckErrors();
    const endpoint = this.ConfigureEndpoint(endpointUrl, params);
    const selectedAxios = rateLimited ? this.RateLimitedAxios : this.UnlimitedAxios;

    try {
      const response = await selectedAxios.get<undefined, AxiosResponse<T>>(endpoint);
      return response.data;
    } catch (e) {
      throw new UnexceptedError(e.message);
    }
  }

  private CheckErrors() {
    if (this.Options.ApiBase === '') {
      throw new ApiBaseCanNotBeEmptyError();
    } else if (this.Options.ApiKey === '') {
      throw new ApiKeyCanNotBeEmptyError();
    }
  }

  private ConfigureEndpoint(endpoint: string, params: object): string {
    for (let [key, value] of Object.entries(params)) {
      if (typeof value !== 'undefined') {
        if (typeof value.parameterName === 'string' && Array.isArray(value.values)) {
          const joinKeyword = `&${value.parameterName}[]=`;
          const values = value.values.map((val: any) => encodeURIComponent(val)).join(joinKeyword);
          const result = `${joinKeyword}${values}`;

          endpoint = endpoint.replace(`{${key}}`, result);
        } else {
          endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(value));
        }
      }
    }

    return endpoint;
  }

  // region Parameter Configurators

  private PricesParameters(forCurrency?: EnumCurrency): IPricesParameters {
    let selectedCurrency = forCurrency;

    if (typeof selectedCurrency === 'undefined') {
      selectedCurrency = this.Options.Currency;
    }

    return {
      CURRENCY_CODE: selectedCurrency
    };
  }

  private TradeRequestTakeParameters(apiKey?: string, botId?: string): ITradeRequestTakeParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey,
      BOT_ID: botId
    }
  }

  private TradeRequestGiveParameters(apiKey?: string): ITradeRequestGiveParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private TradeRequestGiveP2PParameters(apiKey?: string): ITradeRequestGiveP2PParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private TradeRequestGiveP2PAllParameters(apiKey?: string): ITradeRequestGiveP2PAllParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private PingParameters(apiKey?: string): IPingParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private MyInventoryParameters(apiKey?: string): IMyInventoryParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private AddToSaleParameters(itemId: string, price: number, currency?: EnumCurrency, apiKey?: string): IAddToSaleParameters {
    return {
      ITEM_ID: itemId,
      PRICE: price,
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey,
      CURRENCY_CODE: typeof currency === 'undefined' ? this.Options.Currency : currency
    }
  }

  private SetPriceParameters(itemId: string, price: number, currency?: EnumCurrency, apiKey?: string): ISetPriceParameters {
    return {
      ITEM_ID: itemId,
      PRICE: price,
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey,
      CURRENCY_CODE: typeof currency === 'undefined' ? this.Options.Currency : currency
    }
  }

  private RemoveAllFromSaleParameters(apiKey?: string): IRemoveAllFromSaleParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private ItemsParameters(apiKey?: string): IItemsParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private TradesParameters(apiKey?: string): ITradesParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private BuyParameters(
    hashNameOrId: string,
    price: number,
    sendTo: ITradeLink,
    customId?: string,
    currency?: EnumCurrency,
    apiKey?: string
  ): IBuyParameters {
    return {
      ITEM_ID: hashNameOrId,
      PRICE: price,
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey,
      CURRENCY_CODE: typeof currency === 'undefined' ? this.Options.Currency : currency,
      PARTNER: sendTo.Partner,
      TOKEN: sendTo.Token,
      CUSTOM_ID: customId
    }
  }

  private GetBuyInfoByCustomIdParameters(customId: string, apiKey?: string): IGetBuyInfoByCustomIdParameters {
    return {
      CUSTOM_ID: customId,
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private GetListBuyInfoByCustomIdParameters(customIds: string[], apiKey?: string): IGetListBuyInfoByCustomIdParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey,
      CUSTOM_IDS: {
        parameterName: 'custom_id',
        values: customIds
      }
    }
  }

  private HistoryParameters(startDate: Date | number, endDate?: Date | number, apiKey?: string): IHistoryParameters {
    const start = startDate instanceof Date ? startDate.getTime() : startDate;

    let end = new Date().getTime();

    if (typeof endDate !== 'undefined') {
      end = endDate instanceof Date ? endDate.getTime() : endDate;
    }

    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey,
      START_DATE: start,
      END_DATE: end
    }
  }

  private GetMoneyParameters(currency?: EnumCurrency, apiKey?: string): IGetMoneyParameters {
    let selectedCurrency = currency;

    if (typeof selectedCurrency === 'undefined') {
      selectedCurrency = this.Options.Currency;
    }

    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey,
      CURRENCY_CODE: selectedCurrency
    }
  }

  private GoOfflineParameters(apiKey?: string): IGoOfflineParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private UpdateInventoryParameters(apiKey?: string): IUpdateInventoryParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private TransferDiscountsParameters(toSecret: string, apiKey?: string): ITransferDiscountsParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey,
      TO_SECRET_KEY: toSecret
    }
  }

  private GetMySteamIdParameters(apiKey?: string): IGetMySteamIdParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private SearchItemByHashNameParameters( hashName: string, currency?: EnumCurrency, apiKey?: string ): ISearchItemByHashNameParameters {
    let selectedCurrency = currency;

    if (typeof selectedCurrency === 'undefined') {
      selectedCurrency = this.Options.Currency;
    }

    return {
      MARKET_HASH_NAME: hashName,
      CURRENCY_CODE: selectedCurrency,
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private SearchItemByHashNameSpesificParameters( hashName: string, currency?: EnumCurrency, apiKey?: string ): ISearchItemByHashNameSpesificParameters {
    let selectedCurrency = currency;

    if (typeof selectedCurrency === 'undefined') {
      selectedCurrency = this.Options.Currency;
    }

    return {
      MARKET_HASH_NAME: hashName,
      CURRENCY_CODE: selectedCurrency,
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private SearchListItemsByHashNameAllParameters( hashNames: string[], currency?: EnumCurrency, apiKey?: string ): ISearchListItemsByHashNameAllParameters {
    let selectedCurrency = currency;

    if (typeof selectedCurrency === 'undefined') {
      selectedCurrency = this.Options.Currency;
    }

    return {
      MARKET_HASH_NAMES: {
        parameterName: 'list_hash_name',
        values: hashNames
      },
      CURRENCY_CODE: selectedCurrency,
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private GetListItemsInfoParameters( hashNames: string[], currency?: EnumCurrency, apiKey?: string ): IGetListItemsInfoParameters {
    let selectedCurrency = currency;

    if (typeof selectedCurrency === 'undefined') {
      selectedCurrency = this.Options.Currency;
    }

    return {
      MARKET_HASH_NAMES: {
        parameterName: 'list_hash_name',
        values: hashNames
      },
      CURRENCY_CODE: selectedCurrency,
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  private TestParameters(apiKey?: string): ITestParameters {
    return {
      SECRET_KEY: typeof apiKey === 'undefined' ? this.Options.ApiKey : apiKey
    }
  }

  // endregion

  // region Api Methods

  /***
   * Fetches the price list according to the selected currency.
   * @param forCurrency The currency unit
   * @param withClassAndInstance Fetches all items in the market with extended item data like class id and instance id when it sets to true
   */
  public async Prices(withClassAndInstance: true, forCurrency?: EnumCurrency): Promise<PricesWithClassAndInstancesResponse>;
  public async Prices(withClassAndInstance: false, forCurrency?: EnumCurrency): Promise<PricesResponse>;
  public async Prices(withClassAndInstance: boolean = false, forCurrency?: EnumCurrency): Promise<PricesResponse|PricesWithClassAndInstancesResponse>  {
    const endpointUrl = withClassAndInstance ? Endpoints.PricesWithClassAndInstances : Endpoints.Prices;
    const params = this.PricesParameters(forCurrency);
    return await this.CallAxios(endpointUrl, params, false);
  }

  public async TradeRequestTake(botId?: string, apiKey?: string): Promise<TradeRequestTakeResponse> {
    const endpointUrl = typeof botId === 'undefined' ? Endpoints.TradeRequestTake : Endpoints.TradeRequestTakeWithBotId;
    const params = this.TradeRequestTakeParameters(botId, apiKey);
    return await this.CallAxios(endpointUrl, params);
  }

  public async TradeRequestGive(apiKey?: string): Promise<TradeRequestGiveResponse> {
    const params = this.TradeRequestGiveParameters(apiKey);
    return await this.CallAxios(Endpoints.TradeRequestGive, params);
  }

  public async TradeRequestGiveP2P(apiKey?: string): Promise<TradeRequestGiveP2PResponse> {
    const params = this.TradeRequestGiveP2PParameters(apiKey);
    return await this.CallAxios(Endpoints.TradeRequestGiveP2P, params);
  }

  public async TradeRequestGiveP2PAll(apiKey?: string): Promise<TradeRequestGiveP2PAllResponse> {
    const params = this.TradeRequestGiveP2PAllParameters(apiKey);
    return await this.CallAxios(Endpoints.TradeRequestGiveP2PAll, params);
  }

  public async Ping(apiKey?: string): Promise<PingResponse> {
    const params = this.PingParameters(apiKey);
    return await this.CallAxios(Endpoints.Ping, params);
  }

  public async MyInventory(apiKey?: string): Promise<MyInventoryResponse> {
    const params = this.MyInventoryParameters(apiKey);
    return await this.CallAxios(Endpoints.MyInventory, params);
  }

  public async AddToSale(itemId: string, price: number, currency?: EnumCurrency, apiKey?: string): Promise<AddToSaleResponse> {
    const params = this.AddToSaleParameters(itemId, price, currency, apiKey);
    return await this.CallAxios(Endpoints.AddToSale, params);
  }

  public async SetPrice(itemId: string, price: number, currency?: EnumCurrency, apiKey?: string): Promise<SetPriceResponse> {
    const params = this.SetPriceParameters(itemId, price, currency, apiKey);
    return await this.CallAxios(Endpoints.SetPrice, params);
  }

  public async RemoveAllFromSale(apiKey?: string): Promise<RemoveAllFromSaleResponse> {
    const params = this.RemoveAllFromSaleParameters(apiKey);
    return await this.CallAxios(Endpoints.RemoveAllFromSale, params);
  }

  public async Items(apiKey?: string): Promise<ItemsResponse> {
    const params = this.ItemsParameters(apiKey);
    return await this.CallAxios(Endpoints.Items, params);
  }

  public async Trades(apiKey?: string): Promise<TradesResponse> {
    const params = this.TradesParameters(apiKey);
    return await this.CallAxios(Endpoints.Trades, params);
  }

  public async TradesExtended(apiKey?: string): Promise<TradesExtendedResponse> {
    const params = this.TradesParameters(apiKey);
    return await this.CallAxios(Endpoints.TradesExtended, params);
  }

  public async Buy(
    hashNameOrId: string,
    price: number,
    sendTo: null | string | ITradeLink,
    customId?: string,
    currency?: EnumCurrency,
    apiKey?: string
  ): Promise<BuyResponse> {
    const tradeObj = Utils.GetTradeObject(sendTo);

    let hasHashName = Utils.IsStringMarketHashName(hashNameOrId);
    let hasCustomId = typeof customId !== 'undefined';
    const sendToOther = typeof tradeObj.Token !== 'undefined';

    let endpointUrl;

    if (hasHashName) {
      if (hasCustomId) {
        if (sendToOther) {
          endpointUrl = Endpoints.BuyForWithMarketHashNameAndCustomId;
        } else {
          endpointUrl = Endpoints.BuyWithMarketHashNameAndCustomId;
        }
      } else {
        if (sendToOther) {
          endpointUrl = Endpoints.BuyForWithMarketHashName;
        } else {
          endpointUrl = Endpoints.BuyWithMarketHashName;
        }
      }
    } else {
      if (hasCustomId) {
        if (sendToOther) {
          endpointUrl = Endpoints.BuyForWithItemIdAndCustomId;
        } else {
          endpointUrl = Endpoints.BuyWithItemIdAndCustomId;
        }
      } else {
        if (sendToOther) {
          endpointUrl = Endpoints.BuyForWithItemId;
        } else {
          endpointUrl = Endpoints.BuyWithItemId;
        }
      }
    }

    const params = this.BuyParameters(hashNameOrId, price, tradeObj, customId, currency, apiKey);
    return await this.CallAxios(endpointUrl, params);
  }

  public async GetBuyInfoByCustomId(customId: string, apiKey?: string): Promise<GetBuyInfoByCustomIdResponse> {
    const params = this.GetBuyInfoByCustomIdParameters(customId, apiKey);
    return await this.CallAxios(Endpoints.GetBuyInfoByCustomId, params);
  }

  public async GetListBuyInfoByCustomId(customIds: string[], apiKey?: string): Promise<GetListBuyInfoByCustomIdResponse> {
    const params = this.GetListBuyInfoByCustomIdParameters(customIds, apiKey);
    return await this.CallAxios(Endpoints.GetListBuyInfoByCustomId, params);
  }

  public async History(startDate: Date | number, endDate?: Date | number, apiKey?: string): Promise<HistoryResponse> {
    const endpointUrl = typeof endDate === 'undefined' ? Endpoints.History : Endpoints.HistoryWithEndDate;
    const params = this.HistoryParameters(startDate, endDate, apiKey);
    return await this.CallAxios(endpointUrl, params);
  }

  public async GetMoney(currency?: EnumCurrency, apiKey?: string): Promise<GetMoneyResponse> {
    const params = this.GetMoneyParameters(currency, apiKey);
    return await this.CallAxios(Endpoints.GetMoney, params);
  }

  public async GoOffline(apiKey?: string): Promise<GoOfflineResponse> {
    const params = this.GoOfflineParameters(apiKey);
    return await this.CallAxios(Endpoints.GoOffline, params);
  }

  public async UpdateInventory(apiKey?: string): Promise<UpdateInventoryResponse> {
    const params = this.UpdateInventoryParameters(apiKey);
    return await this.CallAxios(Endpoints.UpdateInventory, params);
  }

  public async TransferDiscounts( toSecret: string, apiKey?: string ): Promise<TransferDiscountsResponse> {
    const params = this.TransferDiscountsParameters(toSecret, apiKey);
    return await this.CallAxios(Endpoints.TransferDiscounts, params);
  }

  public async GetMySteamId( apiKey?: string ): Promise<GetMySteamIdResponse> {
    const params = this.GetMySteamIdParameters(apiKey);
    return await this.CallAxios(Endpoints.GetMySteamId, params);
  }

  public async SearchItemByHashName( hashName: string, currency?: EnumCurrency, apiKey?: string ): Promise<SearchItemByHashNameResponse> {
    const params = this.SearchItemByHashNameParameters(hashName, currency, apiKey);
    return await this.CallAxios(Endpoints.SearchItemByHashName, params);
  }

  public async SearchItemByHashNameSpesific( hashName: string, currency?: EnumCurrency, apiKey?: string ): Promise<SearchItemByHashNameSpesificResponse> {
    const params = this.SearchItemByHashNameSpesificParameters(hashName, currency, apiKey);
    return await this.CallAxios(Endpoints.SearchItemByHashNameSpesific, params);
  }

  public async SearchListItemsByHashNameAll( hashNames: string[], currency?: EnumCurrency, apiKey?: string ): Promise<SearchListItemsByHashNameAllResponse> {
    const params = this.SearchListItemsByHashNameAllParameters(hashNames, currency, apiKey);
    return await this.CallAxios(Endpoints.SearchListItemsByHashNameAll, params);
  }

  public async GetListItemsInfo( hashNames: string[], currency?: EnumCurrency, apiKey?: string ): Promise<GetListItemsInfoResponse> {
    const params = this.GetListItemsInfoParameters(hashNames, currency, apiKey);
    return await this.CallAxios(Endpoints.GetListItemsInfo, params);
  }

  public async Test( apiKey?: string ): Promise<TestResponse> {
    const params = this.TestParameters(apiKey);
    return await this.CallAxios(Endpoints.Test, params);
  }

  // endregion
}
