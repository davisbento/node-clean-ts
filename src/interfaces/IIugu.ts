export interface ICreatePlan {
  name: string;
  identifier: string;
  interval: number;
  interval_type: 'weeks' | 'months';
  value_cents: number;
}
