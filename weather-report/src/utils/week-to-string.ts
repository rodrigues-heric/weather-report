export type TWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function weekToString(week: TWeek): string {
  const allWeekDays: Record<TWeek, () => string> = {
    1: () => 'sunday',
    2: () => 'monday',
    3: () => 'tuesday',
    4: () => 'wednesday',
    5: () => 'thursday',
    6: () => 'friday',
    7: () => 'saturday',
  };
  return allWeekDays[week]();
}
