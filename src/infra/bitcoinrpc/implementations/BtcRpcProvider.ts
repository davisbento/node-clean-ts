import { BTC_RPC_HOST, BTC_RPC_PASS, BTC_RPC_PORT, BTC_RPC_USER } from '@/config/settings';
import { IValidAddress } from '@/interfaces/IBtc';

import { IBtcRpcProvider } from '../IBtcRpcProvider';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Client = require('bitcoind-rpc');

export class BtcRpcProvider implements IBtcRpcProvider {
  private client: any;

  constructor() {
    this.client = new Client({
      protocol: 'http',
      host: BTC_RPC_HOST,
      port: BTC_RPC_PORT,
      user: BTC_RPC_USER,
      pass: BTC_RPC_PASS
    });
  }

  public getNewAddress(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.getNewAddress('', 'p2sh-segwit', (err: any, res: any) => {
        if (err) {
          console.log(err, 'getNewAddress');
          reject(err);
        } else {
          resolve(res.result);
        }
      });
    });
  }

  public getReceivedByAddress(address: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.getReceivedByAddress(address, 1, (err: any, res: any) => {
        if (err) {
          console.log(err, 'getReceivedByAddress');
          reject(err);
        } else {
          resolve(res?.result || 0);
        }
      });
    });
  }

  public validateAddress(address: string): Promise<IValidAddress> {
    return new Promise((resolve, reject) => {
      this.client.validateAddress(address, (err: any, res: any) => {
        if (err) {
          console.log(err, 'validateAddress');
          reject(err);
        } else {
          resolve(res.result);
        }
      });
    });
  }
}
