import Holidays from 'date-holidays';

export type Holiday = {
  date: string;
  name: string;
  type: string;
};

const hd = new Holidays('CO');

export const getColombianHolidays = (year: number): Holiday[] => {
  const holidays = hd.getHolidays(year);
  return holidays.map((h) => {
    // we just want the YYYY-MM-DD part
    const dateStr = h.date.split(' ')[0];
    
    return {
      date: dateStr,
      name: h.name,
      type: h.type,
    };
  });
};

export const getHolidaysForYears = (years: number[]): Holiday[] => {
  return years.flatMap((year) => getColombianHolidays(year));
};
