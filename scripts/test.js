const slots = [];

const formatTimeRange = (start, end) => {
  const startTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    // hour12: false,
  });

  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    // hour12: false,
  });

  return `${startTime} - ${endTime}`;
};

const refreshTimeSlots = () => {
  const now = new Date();
  const hours = now.getMinutes() > 45 ? now.getHours() + 1 : now.getHours();

  for (let hour = hours; hour < 15; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const start = new Date();
      start.setHours(hour, minute, 0, 0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 15);

      if (start.getTime() > now.getTime()) {
        slots.push({
          id: start.toISOString(),
          label: formatTimeRange(start, end),
          start,
          end,
        });
      }
    }
  }
};

refreshTimeSlots();
console.log("Current Time: ", new Date().toLocaleTimeString());
console.log(slots);
