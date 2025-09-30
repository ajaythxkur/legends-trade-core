'use client'
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function useCountdown(startTime?: number | null, durationSecs?: number | null) {
  const [status, setStatus] = useState<"Not Started" | "Running" | "Ended">("Not Started");
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    // if invalid values → always "Not Started"
    if (!startTime || !durationSecs || isNaN(startTime) || isNaN(durationSecs)) {
      setStatus("Not Started");
      setTimeLeft("");
      return;
    }

    const interval = setInterval(() => {
      const now = dayjs().unix();

      if (now < startTime) {
        setStatus("Not Started");
        setTimeLeft("");
      } else if (now >= startTime && now < startTime + durationSecs) {
        setStatus("Running");
        const remaining = startTime + durationSecs - now;
        const d = dayjs.duration(remaining, "seconds");
        setTimeLeft(`${d.days()}d ${d.hours()}h ${d.minutes()}m ${d.seconds()}s`);
      } else {
        setStatus("Ended");
        setTimeLeft("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, durationSecs]);

  return { status, timeLeft };
}