import { EnBotStatus } from './IBot';

export interface IBotApiReturn {
  assetBase: IAssetBase;
  assetQuote: IAssetBase;
  createdAt: string;
  credentials: ICredentials;
  exchange: IAssetBase;
  id: string;
  robotStatus: EnBotStatus;
  robotStoppedUntil: string;
  serverIpAddress: string;
  serverMachineId: string;
  setupConfig: ISetupConfig;
}

interface ISetupConfig {
  description: string;
  id: string;
  longLanes: ILongLane[];
  longTargetDistance: number;
  pauseTimeAfterStopLoss: number;
  shortLanes: ILongLane[];
  shortTargetDistance: number;
  showInFrontend: boolean;
  useTrendApi: boolean;
}

interface ILongLane {
  absoluteDistance: number;
  orderType: string;
  percentualDistance: number;
  percentualMarginAmount: number;
}

interface ICredentials {
  apiKey: string;
  apiSecret: string;
  passphrase: string;
  username: string;
}

interface IAssetBase {
  code: string;
  id: string;
}
