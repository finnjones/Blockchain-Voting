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
import { PieChart } from "react-minimal-pie-chart";

const VoteAnalitics: React.FC = () => {
  const username = useParty();
  const ledger = useLedger();

  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [
    username,
  ]);
  const assets = useStreamQueries(Voting.Voting);
  const myUser = myUserResult.contracts[0]?.payload;
  const [radioStatus, setRadioStatus] = useState("");
  const data = [
    { title: "One", value: 10, color: "#E38627" },
    { title: "Two", value: 15, color: "#C13C37" },
    { title: "Three", value: 40, color: "#6A2135" },
  ];

  const map = assets.contracts[0]?.payload?.votes.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  );
  console.log(map);
  console.log(data);
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
                <Chart data={data}>
                  <PieSeries valueField="key" argumentField="value" />
                  <Title text="Studies per day" />
                </Chart>
              </Paper>
              <PieChart data={data} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default VoteAnalitics;
