import React, { useEffect, useMemo, useState } from "react";
import {
  Divider,
  Grid,
  Container,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { Poll } from "@mui/icons-material";

import { Voting } from "@daml.js/votencrypt";

import { useStreamQueries } from "@daml/react";

import {
  Pie,
  PieChart,
  Tooltip,
  Bar,
  BarChart,
  Cell,
  XAxis,
  LabelList,
  CartesianGrid,
  YAxis,
  Line,
  LineChart,
  Label,
  ResponsiveContainer,
} from "recharts";

import dayjs from "dayjs";
import HelpPopup from "./HelpPopup";
import DeadLineCountDown from "./DeadLineCountDown";

const VoteAnalytics: React.FC = () => {
  /* This is getting the data from the ledger. */
  const assets = useStreamQueries(Voting.Voting);
  const votes = assets.contracts[0]?.payload?.votes || [];
  const voters = assets.contracts[0]?.payload?.voters || [];
  const voteTimes = assets.contracts[0]?.payload?.voteTimes || [];

  const voteProgress = Math.round((votes.length / voters.length) * 100) || 0;

  /* Creating a map of the votes and the frequency of the votes. */
  const votesFrequency = useMemo(() => {
    if (votes.length !== 0) {
      const voteFrequencyMap = new Map<string, number>();
      votes.forEach((vote) => {
        if (voteFrequencyMap.has(vote)) {
          voteFrequencyMap.set(vote, (voteFrequencyMap.get(vote) || 1) + 1);
        } else {
          voteFrequencyMap.set(vote, 1);
        }
      });
      return [...voteFrequencyMap].map(([name, value]) => ({ name, value }));
    } else {
      return [
        {
          name: "No Data",
          value: 0,
        },
      ];
    }
  }, [votes]);

  // generate list of pastel colours based on length of data01
  const colours = useMemo(() => {
    const colours = [];
    for (let i = 0; i < votesFrequency.length; i++) {
      colours.push(`#${Math.random().toString(16).slice(2, 8)}`);
    }
    return colours;
  }, [votesFrequency]);

  // create a an array of objects with frequency in relationship with time
  const votesFrequencyByTime = useMemo(() => {
    if (votes.length !== 0) {
      const map = new Map<number, number>();
      voteTimes.forEach((voteTime) => {
        var ajustedTime = voteTime.slice(0, -5) + "00000";
        if (map.has(parseInt(ajustedTime))) {
          map.set(
            parseInt(ajustedTime),
            (map.get(parseInt(ajustedTime)) || 1) + 1
          );
        } else {
          map.set(parseInt(ajustedTime), 1);
        }
      });
      return [...map].map(([time, value]) => ({ time, value })).reverse();
    } else {
      return [
        {
          time: 1,
          value: 0,
        },
      ];
    }
  }, [voteTimes]);

  /* This is a custom tooltip for the line chart. */
  const LineTooltip = ({
    active,
    payload,
  }: {
    active: any;
    payload: any;
    label: any;
  }) => {
    if (active) {
      return (
        <Paper sx={{ px: 2, py: 1 }}>
          <div className="custom-tooltip">
            <Typography>Votes: {payload[0].value}</Typography>
          </div>
        </Paper>
      );
    }

    return null;
  };

  return (
    <Container>
      <Box sx={{ p: 1 }}>
        <Paper sx={{ p: 3, borderRadius: "16px" }} elevation={2}>
          <Grid container spacing={0}>
            <Grid item>
              <Poll sx={{ fontSize: 50 }} color="primary" />
            </Grid>
            <Grid item>
              <Grid item>
                <Typography variant="h5" display="block">
                  Vote Analytics
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  display="block"
                  style={{ lineHeight: "15px" }}
                >
                  View current vote results
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Divider />
          <Box sx={{ pt: 3 }}>
            <DeadLineCountDown />
          </Box>
          <Typography variant="h5">Votes Counted: {voteProgress}%</Typography>

          <LinearProgress variant="determinate" value={voteProgress} />

          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <BarChart width={400} height={100} data={votesFrequency}>
                <XAxis dataKey="name" />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={<LineTooltip active="" payload="" label="" />}
                />
                <Bar dataKey="value" fill="#387DF6">
                  {votesFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colours[index]} />
                  ))}
                </Bar>
              </BarChart>
            </Grid>
            <Grid item>
              <PieChart width={400} height={400}>
                <Pie data={votesFrequency} dataKey="value" nameKey="name">
                  {votesFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colours[index]} />
                  ))}

                  <LabelList dataKey="name" />
                </Pie>
                <Tooltip
                  content={<LineTooltip active="" payload="" label="" />}
                />
              </PieChart>
            </Grid>
          </Grid>
          <Typography variant="h5" textAlign="center">
            Votes Over Time
          </Typography>
          <Box style={{ width: "100%", height: "20vh" }} textAlign="center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={votesFrequencyByTime}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(unixTime) =>
                    dayjs(unixTime).format("HH:mm DD/MM/YY")
                  }
                >
                  <Label value="Time" fill="#387DF6" position="bottom" />
                </XAxis>
                <YAxis allowDecimals={false}>
                  <Label value="Votes" fill="#387DF6" angle={-90} />
                </YAxis>
                <Tooltip
                  content={<LineTooltip active="" payload="" label="" />}
                />
                <Line
                  type="monotone"
                  name="Votes"
                  dataKey="value"
                  stroke="#387DF6"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
      <HelpPopup
        heading="Vote Analytics Help"
        content="
          This page shows the current vote results and the vote progress. \n
          The vote progress shows the percentage of votes cast out of the total number of votes. \n
          The votes cast over time chart shows the number of votes that have been cast in relationship to time. \n
        "
      ></HelpPopup>
    </Container>
  );
};

export default VoteAnalytics;
