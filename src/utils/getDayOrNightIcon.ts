export function getDayOrNightIcon(
  iconName: string,
  dateTimeString: string
): string {
  const hours = new Date(dateTimeString).getHours();
  console.log(hours);
  const isDayTime = hours >= 6 && hours <= 18;
  console.log(isDayTime);
  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
