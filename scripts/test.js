//combine pickup date and time
let timeSlot = new Date();
const now = new Date();
timeSlot?.setHours(now.getHours());
timeSlot?.setMinutes(now.getMinutes() + 15);

console.log(
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(timeSlot),
);
