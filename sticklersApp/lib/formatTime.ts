export function formatBusinessTime(time: number | null ) {
  if (!time) return "";
  const hours24 = Math.floor(time / 100);
  const minutes = time % 100;

  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;

  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}