export enum Endpoints {
  Prices = 'prices/{CURRENCY_CODE}.json',
  PricesWithClassAndInstances = 'prices/class_instance/{CURRENCY_CODE}.json',

  TradeRequestTake = 'trade-request-take?key={SECRET_KEY}',
  TradeRequestTakeWithBotId = 'trade-request-take?key={SECRET_KEY}&bot={BOT_ID}',

  TradeRequestGive = 'trade-request-give?key={SECRET_KEY}',

  TradeRequestGiveP2P = 'trade-request-give-p2p?key={SECRET_KEY}',

  TradeRequestGiveP2PAll = 'trade-request-give-p2p-all?key={SECRET_KEY}',

  Ping = 'ping?key={SECRET_KEY}',

  MyInventory = 'my-inventory?key={SECRET_KEY}',

  AddToSale = 'add-to-sale?key={SECRET_KEY}&id={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}',

  SetPrice = 'set-price?key={SECRET_KEY}&item_id={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}',

  RemoveAllFromSale = 'remove-all-from-sale?key={SECRET_KEY}',

  Items = 'items?key={SECRET_KEY}',

  Trades = 'trades?key={SECRET_KEY}',

  TradesExtended = 'trades?key={SECRET_KEY}&extended=1',

  BuyWithMarketHashName = 'buy?key={SECRET_KEY}&hash_name={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}',
  BuyWithItemId = 'buy?key={SECRET_KEY}&id={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}',
  BuyWithMarketHashNameAndCustomId = 'buy?key={SECRET_KEY}&hash_name={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}&custom_id={CUSTOM_ID}',
  BuyWithItemIdAndCustomId = 'buy?key={SECRET_KEY}&id={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}&custom_id={CUSTOM_ID}',

  BuyForWithMarketHashName = 'buy-for?key={SECRET_KEY}&hash_name={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}&partner={PARTNER}&token={TOKEN}',
  BuyForWithItemId = 'buy-for?key={SECRET_KEY}&id={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}&partner={PARTNER}&token={TOKEN}',
  BuyForWithMarketHashNameAndCustomId = 'buy-for?key={SECRET_KEY}&hash_name={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}&partner={PARTNER}&token={TOKEN}&custom_id={CUSTOM_ID}',
  BuyForWithItemIdAndCustomId = 'buy-for?key={SECRET_KEY}&id={ITEM_ID}&price={PRICE}&cur={CURRENCY_CODE}&partner={PARTNER}&token={TOKEN}&custom_id={CUSTOM_ID}',

  GetBuyInfoByCustomId = 'get-buy-info-by-custom-id?key={SECRET_KEY}&custom_id={CUSTOM_ID}',

  GetListBuyInfoByCustomId = 'get-list-buy-info-by-custom-id?key={SECRET_KEY}{CUSTOM_IDS}',

  History = 'history?key={SECRET_KEY}&date={START_DATE}',
  HistoryWithEndDate = 'history?key={SECRET_KEY}&date={START_DATE}&date_end={END_DATE}',

  GetMoney = 'get-money?key={SECRET_KEY}&cur={CURRENCY_CODE}',

  GoOffline = 'go-offline?key={SECRET_KEY}',

  UpdateInventory = 'update-inventory?key={SECRET_KEY}',

  TransferDiscounts = 'transfer-discounts?key={SECRET_KEY}&to={TO_SECRET_KEY}',

  GetMySteamId = 'get-my-steam-id?key={SECRET_KEY}',

  SearchItemByHashName = 'search-item-by-hash-name?key={SECRET_KEY}&hash_name={MARKET_HASH_NAME}&cur={CURRENCY_CODE}',

  SearchItemByHashNameSpesific = 'search-item-by-hash-name-specific?key={SECRET_KEY}&hash_name={MARKET_HASH_NAME}&cur={CURRENCY_CODE}',

  SearchListItemsByHashNameAll = 'search-list-items-by-hash-name-all?key={SECRET_KEY}&cur={CURRENCY_CODE}{MARKET_HASH_NAMES}',

  GetListItemsInfo = 'get-list-items-info?key={SECRET_KEY}&cur={CURRENCY_CODE}{MARKET_HASH_NAMES}',

  Test = 'test?key={SECRET_KEY}'
}
