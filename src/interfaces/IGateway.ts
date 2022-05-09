export interface IBtcPriceReturn {
  btcAssetPrice: number;
  btcPriceOnCurrency: number;
}

export enum CryptoSymbolEnum {
  BTCUSDT = 'BTCUSDT',
  BTCBRL = 'BTCBRL'
}

export interface IGatewayReturn {
  price: number;
}

export interface IBinanceReturn {
  symbol: CryptoSymbolEnum;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
}

export interface IMercadoBitcoinReturn {
  buy: string;
  sell: string;
  high: string;
  low: string;
}
