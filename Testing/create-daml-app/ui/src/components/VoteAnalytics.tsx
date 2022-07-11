import React, { useMemo, useState } from "react";
import {
  Divider,
  Grid,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Poll } from "@mui/icons-material";

import { Voting } from "@daml.js/create-daml-app";

import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries,
} from "@daml/react";

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

const VoteAnalytics: React.FC = () => {
  const username = useParty();
  const ledger = useLedger();

  const myUserResult = useStreamFetchByKeys(Voting.User, () => [username], [
    username,
  ]);
  const assets = useStreamQueries(Voting.Voting);
  const [radioStatus, setRadioStatus] = useState("");

  const votes = assets.contracts[0]?.payload?.votes || [];
  const voteTimes = assets.contracts[0]?.payload?.voteTimes || [];

  const votesFrequency = useMemo(() => {
    const map = new Map<string, number>();
    votes.forEach((vote) => {
      if (map.has(vote)) {
        map.set(vote, (map.get(vote) || 1) + 1);
      } else {
        map.set(vote, 1);
      }
    });
    return [...map].map(([name, value]) => ({ name, value }));
  }, [votes]);

  console.log(votesFrequency);
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
    const map = new Map<number, number>();
    voteTimes.forEach((voteTime) => {
      var ajustedTime = voteTime.slice(0, -5) + "00000";
      console.log(voteTime.slice(0, -5));
      if (map.has(parseInt(ajustedTime))) {
        map.set(
          parseInt(ajustedTime),
          (map.get(parseInt(ajustedTime)) || 1) + 1
        );
      } else {
        map.set(parseInt(ajustedTime), 1);
      }
    });
    return [...map].map(([time, value]) => ({ time, value }));
  }, [voteTimes]);
  console.log(votesFrequencyByTime, "here");

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
          <Typography variant="h5">Vote Progress</Typography>
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
                  cx={200}
                  cy={200}
                  isAnimationActive={false}
                >
                  {votesFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colours[index]} />
                  ))}
                  <LabelList dataKey="name" />
                </Pie>
                <Tooltip />
              </PieChart>
            </Grid>
          </Grid>
          <Typography variant="h5" textAlign="center">
            Votes Over Time
          </Typography>
          <Box style={{ width: "100%" }} textAlign="center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={votesFrequencyByTime}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(unixTime) =>
                    moment(unixTime).format("HH:mm Do")
                  }
                >
                  <Label value="Time" fill="#8884d8" position="insideBottom" />
                </XAxis>
                <YAxis allowDecimals={false}>
                  <Label value="Votes" fill="#8884d8" angle="-90" />
                </YAxis>
                <Tooltip />
                <Legend position="bottom" />
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
    </Container>
  );
};

export default VoteAnalytics;
