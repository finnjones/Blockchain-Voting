import React, { useMemo, useState } from "react";
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

import { Voting } from "@daml.js/create-daml-app";

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
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

import moment from "moment";
import HelpPopup from "./HelpPopup";

const VoteAnalytics: React.FC = () => {
  const assets = useStreamQueries(Voting.Voting);
  const votes = assets.contracts[0]?.payload?.votes || [];
  const voters = assets.contracts[0]?.payload?.voters || [];
  const voteTimes = assets.contracts[0]?.payload?.voteTimes || [];
  const voteProgress = (votes.length / voters.length) * 100 || "Loading...";
  const votesFrequency = useMemo(() => {
    if (votes.length !== 0) {
      const map = new Map<string, number>();
      votes.forEach((vote) => {
        if (map.has(vote)) {
          map.set(vote, (map.get(vote) || 1) + 1);
        } else {
          map.set(vote, 1);
        }
      });
      return [...map].map(([name, value]) => ({ name, value }));
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
          <Typography variant="h5">Vote Progress: {voteProgress}%</Typography>
          <LinearProgress variant="determinate" value={voteProgress} />

          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <BarChart width={400} height={100} data={votesFrequency}>
                <XAxis dataKey="name" />
                <Bar dataKey="value" fill="#8884d8">
                  {votesFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colours[index]} />
                  ))}
                </Bar>

                <Tooltip />
              </BarChart>
            </Grid>
            <Grid item>
              <PieChart width={400} height={400}>
                <Pie
                  data={votesFrequency}
                  dataKey="value"
                  nameKey="name"
                  // cx={200}
                  // cy={200}
                >
                  {votesFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colours[index]} />
                  ))}

                  <LabelList dataKey="name" fill="white" />
                </Pie>
                <Tooltip />
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
                    moment(unixTime).format("HH:mm Do")
                  }
                >
                  <Label value="Time" fill="#8884d8" position="bottom" />
                </XAxis>
                <YAxis allowDecimals={false}>
                  <Label value="Votes" fill="#8884d8" angle={-90} />
                </YAxis>
                <Tooltip />
                <Line
                  type="monotone"
                  name="Votes"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>
      <HelpPopup
        heading="Vote Analytics Help"
        content="
          - This page shows the current vote results and the vote progress. \n
          - The vote progress is the percentage of votes casted out of the total number of voters. \n
          - The votes over time chart shows the number of votes that have been cast in relationship to time \n
        "
      ></HelpPopup>
    </Container>
  );
};

export default VoteAnalytics;
