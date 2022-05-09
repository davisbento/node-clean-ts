import { Document } from 'mongoose';

import { EnCurrency } from './ICurrency';

export interface IStrategyWithoutRevenues extends Omit<IStrategy, 'revenueGoupedByMonth'> {}
export interface IStrategy extends ICreateStrategy, Document {
  deleted: boolean;
  showOnMarketplace: boolean;
  operationsActivated: boolean;
  order: number;
  totalInvestedAmount: number;
  totalUsersUsingThisStrategy: number;
  minUsdInvestment: number;
  commissionPercent: number;
  commissionFrequency: EnChargeFrequency;
  membershipPrice: number;
  membershipFrequency: EnChargeFrequency;
  currency: EnCurrency;
  usdMarginLimit: number;
}

export interface ICreateStrategy {
  name: string;
  totalInvestedAmount: number;
  totalUsersUsingThisStrategy: number;
  strategyStatus: 'ACTIVE' | 'INACTIVE';
  minUsdInvestment: number;
  totalProfit: number;
  strategyId: string;
  revenueGoupedByMonth: IRevenueGoupedByMonthDTO[];
}

export interface IStrategyList {
  name: string;
  totalInvestedAmount: number;
  totalUsersUsingThisStrategy: number;
  minUsdInvestment: number;
  commissionPercent: number;
  commissionFrequency: string;
  membershipPrice: number;
  membershipFrequency: string;
  usdMarginLimit: number;
  totalProfit: number;
  currency: EnCurrency;
  id: string;
  strategyStatus: 'ACTIVE' | 'INACTIVE';
  revenueGoupedByMonth: IRevenueGoupedByMonthDTO[];
}

export interface IStrategyProcess {
  strategy: {
    id: string;
    name: string;
    strategyStatus: 'ACTIVE' | 'INACTIVE';
    minUsdInvestment: number;
    tags: string[];
  };
  totalUsersUsingThisStrategy: number;
  totalAbsoluteRevenue: number;
  totalPercentageRevenue: number;
  totalInvestedAmount: number;
  revenueGoupedByMonthDTOS: IRevenueGoupedByMonthDTO[];
}

export interface IRevenueGoupedByMonthDTO {
  timestamp: Date;
  absoluteRevenue: number;
  percentageRevenue: number;
}

export enum EnChargeFrequency {
  unique = 0,
  weekly = 7,
  monthly = 30,
  quarterly = 90,
  biannual = 180,
  annual = 360
}
