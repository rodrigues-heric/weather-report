export function updateClock() {
  const now = new Date();
  let hours: string | number = now.getHours();
  let minutes: string | number = now.getMinutes();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes}`;
}
