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
} from "recharts";

const VoteAnalytics: React.FC = () => {
  const username = useParty();
  const ledger = useLedger();

  const myUserResult = useStreamFetchByKeys(Voting.User, () => [username], [
    username,
  ]);
  const assets = useStreamQueries(Voting.Voting);
  const [radioStatus, setRadioStatus] = useState("");

  const votes = assets.contracts[0]?.payload?.votes || [];

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

  const buttonHandler = async () => {
    if (assets.contracts[0]?.payload.voted.includes(username)) {
      alert("You have already voted");
    } else {
      await ledger
        .exerciseByKey(
          Voting.Voting.Vote,
          assets.contracts[0]?.signatories[0],
          { voter: username, vote: radioStatus }
        )
        .catch(console.error);
    }
    console.log(assets.contracts[0]?.payload.voted);
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
          <Typography variant="h5">Vote Progress</Typography>

          <BarChart width={400} height={100} data={votesFrequency}>
            <XAxis dataKey="name" />
            <Bar dataKey="value" fill="#8884d8">
              {votesFrequency.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colours[index]} />
              ))}
            </Bar>

            <Tooltip />
          </BarChart>

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
        </Paper>
      </Box>
    </Container>
  );
};

export default VoteAnalytics;
