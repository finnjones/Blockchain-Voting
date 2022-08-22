import React from "react";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Voting } from "@daml.js/votencrypt";
import { useStreamQueries } from "@daml/react";
import dayjs from "dayjs";

const defaultRemainingTime = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};
/**
 * It takes a timestamp in milliseconds and returns an object with the remaining time until that
 * timestamp in days, hours, minutes, and seconds
 * @param {any} timestampMs - The timestamp in milliseconds that you want to get the remaining time
 * until.
 * @returns An object with the remaining time until the timestampMs.
 */
function getRemainingTimeUntilMs(timestampMs: any) {
  const timestampDayjs = dayjs(timestampMs);
  const nowDayjs = dayjs();
  if (timestampDayjs.isBefore(nowDayjs)) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs).toString(),
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs).toString(),
    hours: getRemainingHours(nowDayjs, timestampDayjs).toString(),
    days: getRemainingDays(nowDayjs, timestampDayjs).toString(),
  };
}
/**
 * Get the difference between two dates in a specific unit of time.
 * @param {any} nowDayjs - The current time
 * @param {any} timestampDayjs - The timestamp that we want to count down to.
 * @returns The remaining time in seconds, minutes, hours, and days.
 */
function getRemainingSeconds(nowDayjs: any, timestampDayjs: any) {
  const seconds = timestampDayjs.diff(nowDayjs, "seconds") % 60;
  return seconds;
}
function getRemainingMinutes(nowDayjs: any, timestampDayjs: any) {
  const minutes = timestampDayjs.diff(nowDayjs, "minutes") % 60;
  return minutes;
}
function getRemainingHours(nowDayjs: any, timestampDayjs: any) {
  const hours = timestampDayjs.diff(nowDayjs, "hours") % 24;
  return hours;
}
function getRemainingDays(nowDayjs: any, timestampDayjs: any) {
  const days = timestampDayjs.diff(nowDayjs, "days");
  return days;
}
/**
 * This function is a React component that uses the useStreamQueries hook to get the voteDeadlineUnix
 * value from the Voting contract. It then uses the useState hook to set the remainingTime state
 * variable to the defaultRemainingTime object. It then uses the useEffect hook to set an interval that
 * calls the updateRemainingTime function every second. The updateRemainingTime function uses the
 * getRemainingTimeUntilMs function to get the remaining time until the voteDeadlineUnix value. The
 * function then returns a Typography component that displays the remaining time
 * @returns A component that displays the remaining time until the vote deadline.
 */
const DeadLineCountDown: React.FC = () => {
  const assets = useStreamQueries(Voting.Voting);
  const voteDeadlineUnix = assets.contracts[0]?.payload?.deadLine || "0";
  const voteDeadLineTimeMs = parseInt(voteDeadlineUnix) * 1000;
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(voteDeadLineTimeMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [voteDeadLineTimeMs]);

  function updateRemainingTime(countdown: any) {
    setRemainingTime(getRemainingTimeUntilMs(countdown));
  }

  if (voteDeadlineUnix === "0") {
    return <Typography> </Typography>;
  } else {
    return (
      <>
        <Typography variant="h5">
          Vote Ends In: {remainingTime.days} Days {remainingTime.hours} Hours{" "}
          {remainingTime.minutes} Minutes {remainingTime.seconds} Seconds
        </Typography>
      </>
    );
  }
};

export default DeadLineCountDown;
