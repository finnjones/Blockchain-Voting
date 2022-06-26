import React, { useMemo, useCallback, useState } from "react";
import { Header, Segment, Form, Icon } from "semantic-ui-react";
import {
  Button,
  List,
  Divider,
  ListItem,
  Grid,
  Container,
  Paper,
  FormLabel,
  FormControlLabel,
  ListItemText,
  Typography,
  RadioGroup,
  FormControl,
  Radio,
  Box,
} from "@mui/material";
import { Key, Ballot, Poll } from "@mui/icons-material";
import { Party } from "@daml/types";
import { User, Voting } from "@daml.js/create-daml-app";
import Credentials from "../Credentials";
import Ledger from "@daml/ledger";
import { httpBaseUrl } from "../config";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries,
} from "@daml/react";

// import { PieChart } from "react-minimal-pie-chart";
import { Pie, PieChart, Tooltip, Bar, BarChart, Cell } from "recharts";

const VoteAnalitics: React.FC = () => {
  const username = useParty();
  const ledger = useLedger();

  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [
    username,
  ]);
  const assets = useStreamQueries(Voting.Voting);
  const myUser = myUserResult.contracts[0]?.payload;
  const [radioStatus, setRadioStatus] = useState("");
  const data01 = [
    {
      name: "Person A",
      value: 400,
    },
    {
      name: "Person B",
      value: 300,
    },
    {
      name: "Person C",
      value: 300,
    },
    {
      name: "Person D",
      value: 200,
    },
    {
      name: "Person E",
      value: 278,
    },
    {
      name: "Person F",
      value: 189,
    },
  ];
  // generate list of colours based on length of data01
  const colours = useMemo(() => {
    const colours = [];
    for (let i = 0; i < data01.length; i++) {
      colours.push(
        `rgb(${Math.floor(52)}, ${Math.floor(
          Math.random() * 200
        )}, ${Math.floor(255)})`
      );
    }
    return colours;
  }, [data01]);

  // console.log(colours);

  const votes = assets.contracts[0]?.payload?.votes || [];
  // const votes = ["steve", "steve", "john"]

  // convert votes list to frequency with format of {name: "", value: 0}
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
  // console.log(data);
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
  //   const handleRadioButton = (event: any) => {
  //     console.log(event);
  //   };
  // for (const [key, value] of map) {
  //     console.log(key, value)
  // }
  return (
    <Container>
      <Box sx={{ p: 1 }}>
        <Paper sx={{ p: 3, borderRadius: "16px" }} elevation={2}>
          <Grid container spacing={0}>
            <Grid item>
              <Poll sx={{ fontSize: 50 }} color="primary" />
            </Grid>
            <Grid direction="column">
              <Grid item>
                <Typography variant="h5" display="block">
                  Vote Analitics
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

          {/* <Chart data={data}>
                  <PieSeries valueField="key" argumentField="value" />
                  <Title text="Studies per day" />
                </Chart> */}
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <BarChart width={400} height={100} data={data01}>
            <Bar dataKey="value" fill="#8884d8" />
            <Tooltip />
          </BarChart>

          <PieChart width={400} height={400}>
            <Pie
              data={data01}
              dataKey="value"
              cx={200}
              cy={200}
              // outerRadius={60}
              isAnimationActive={false}
              fill="#8884d8"
              label
            ></Pie>
          </PieChart>
          {/* {data01.map((entry, index) => (
                <Cell fill={colours[index % colours.length]} />
              ))} */}
          {/* </ResponsiveContainer> */}
          {/* <PieChart width={400} height={400}>
            <Pie
              data={data01}
              dataKey="value"
              cx={200}
              cy={200}
              outerRadius={60}
              fill="#8884d8"
              label
            />
          </PieChart> */}
        </Paper>
      </Box>
    </Container>
  );
};

export default VoteAnalitics;
