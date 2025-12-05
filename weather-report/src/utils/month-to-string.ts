export type TMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export function monthToString(month: TMonth): string {
  const allMonths: Record<TMonth, () => string> = {
    1: () => 'january',
    2: () => 'february',
    3: () => 'march',
    4: () => 'april',
    5: () => 'may',
    6: () => 'june',
    7: () => 'july',
    8: () => 'august',
    9: () => 'september',
    10: () => 'october',
    11: () => 'november',
    12: () => 'december',
  };
  return allMonths[month]();
}
