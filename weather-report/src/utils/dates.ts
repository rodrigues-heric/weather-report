/**
 * @param date - date in the format DD/MM
 * @returns week day in long format
 */
export function getWeekDay(date: string) {
  const [day, month] = date.split('/');
  const currentYear = new Date().getFullYear();

  const fullDate = new Date(currentYear, Number(month) - 1, Number(day));

  return new Intl.DateTimeFormat('en', { weekday: 'long' }).format(fullDate);
}
