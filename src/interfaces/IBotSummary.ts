export interface IBotSummaryReturn {
  robotBalanceDTOList: IRobotBalanceDTOList[];
  todaysAbsoluteRevenue: number;
  todaysPercentageRevenue: number;
  totalAbsoluteRevenue: number;
  totalPercentageRevenue: number;
}

interface IRobotBalanceDTOList {
  absoluteRevenue: number;
  percentageRevenue: number;
  timestamp: string;
}

export interface ISummaryParams {
  startAt: string;
  endAt: string;
}
