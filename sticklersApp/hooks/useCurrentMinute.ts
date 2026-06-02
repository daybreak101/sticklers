import { useEffect, useState } from "react";

export default function useCurrentMinute() {
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinute(new Date().getMinutes());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return currentMinute;
}
