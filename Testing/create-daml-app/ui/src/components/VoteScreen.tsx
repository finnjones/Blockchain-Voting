import React, { useState } from "react";
import { Grid, Header, Segment, Divider } from "semantic-ui-react";
import {
  Button,
  List,
  ListItem,
  Container,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
  Box,
} from "@mui/material";
import { Ballot } from "@mui/icons-material";
import { Voting } from "@daml.js/create-daml-app";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries,
} from "@daml/react";

const VoteScreen: React.FC = () => {
  const username = useParty();
  const ledger = useLedger();

  const myUserResult = useStreamFetchByKeys(Voting.User, () => [username], [
    username,
  ]);
  const assets = useStreamQueries(Voting.Voting);
  const myUser = myUserResult.contracts[0]?.payload;
  const [radioStatus, setRadioStatus] = useState("");

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
              <Box textAlign="center">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Options
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <List>
                      {assets.contracts[0]?.payload?.candidates.map((item) => (
                        <ListItem key={item}>
                          <FormControlLabel
                            value={item}
                            control={<Radio />}
                            label={item}
                            onChange={(event) => {
                              console.log(item);
                              setRadioStatus(item);
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  onClick={buttonHandler}
                  className="button"
                  name="Create Vote"
                  sx={{ m: 2, alignItems: "center" }}
                >
                  Vote
                </Button>
              </Box>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default VoteScreen;
