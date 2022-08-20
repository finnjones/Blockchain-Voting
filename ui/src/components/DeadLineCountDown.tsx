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
  //   if (
  //     remainingTime !==
  //     {
  //       days: "00",
  //       hours: "00",
  //       minutes: "00",
  //       seconds: "00",
  //     }
  //   ) {
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
  //   }
  //   else {
  //     <Typography variant="h5" textAlign={"center"}>
  //       Voting period has ended.
  //     </Typography>;
  //   }
};

export default DeadLineCountDown;
