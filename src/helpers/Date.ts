import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import subDays from 'date-fns/subDays';

export const dateFormat = (date: Date, df: string = 'dd/MM/yyyy') => {
  return format(date, df);
};

export const subtractDays = (days: number) => {
  return startOfDay(subDays(new Date(), days));
};

export const addMoreDays = (days: number, baseDate: Date = new Date()) => {
  return startOfDay(addDays(baseDate, days));
};

export const addMoreHours = (hours: number) => {
  return addHours(new Date(), hours);
};
