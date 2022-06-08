import React, { useMemo, useCallback, useState } from "react";
import { Grid, Header, Segment, Divider, Form, Icon } from "semantic-ui-react";
import {
  Button,
  List,
  ListItem,
  Container,
  Paper,
  FormLabel,
  FormControlLabel,
  ListItemText,
  RadioGroup,
  FormControl,
  Radio,
  Box,
} from "@mui/material";
import { Key, Ballot } from "@mui/icons-material";
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
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
// import { PieChart } from "react-minimal-pie-chart";
import { Pie, PieChart } from "recharts";

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
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];

  const map = assets.contracts[0]?.payload?.votes.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  );
  
  
  const target = Object.entries(map).map(v => ({
    name: v[0],
    value: v[1]
  }));
  console.log(target);

  console.log(data01);
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
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Header
              as="h1"
              size="huge"
              color="blue"
              textAlign="center"
              style={{ padding: "1ex 0em 0ex 0em" }}
            >
              {myUser ? `Welcome, ${myUser.username}!` : "Loading..."}
            </Header>
            <Segment>
              <Header as="h2">
                <Ballot sx={{ fontSize: 45 }} color="primary" />
                <Header.Content>
                  Vote
                  <Header.Subheader>
                    Read the vote description carefully and choose an option
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <Header as="h3">Vote Description</Header>
              {assets.contracts[0]?.payload?.subject ?? "Loading..."}
              <Divider />
              <Paper>
                {/* <Chart data={data}>
                  <PieSeries valueField="key" argumentField="value" />
                  <Title text="Studies per day" />
                </Chart> */}
              </Paper>
              {/* <PieChart width={730} height={250}>
                <Pie data={target} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" /> */}
                {/* <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
              {/* </PieChart> */}
              {/* <PieChart data={data} /> */}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default VoteAnalitics;
