import React, { useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  Container,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Typography,
  Radio,
  Divider,
  Box,
  Snackbar,
  IconButton,
  Paper,
} from "@mui/material";
import { Ballot, Close, HowToVote } from "@mui/icons-material";
import { Voting } from "@daml.js/create-daml-app";
import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries,
} from "@daml/react";

const VoteScreen: React.FC = () => {
  const hashUsername = useParty();
  const ledger = useLedger();

  const [Popup, setPopup] = React.useState({ text: "", open: false });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setPopup({ text: "Vote Created", open: false });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const assets = useStreamQueries(Voting.Voting);
  const [radioStatus, setRadioStatus] = useState("");

  const buttonHandler = async () => {
    if (assets.contracts[0]?.payload.voted.includes(hashUsername)) {
      setPopup({ text: "You have already voted", open: true });
    } else {
      setPopup({ text: "Vote cast", open: true });

      await ledger
        .exerciseByKey(
          Voting.Voting.Vote,
          assets.contracts[0]?.signatories[0],
          { voter: hashUsername, vote: radioStatus }
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
              <HowToVote sx={{ fontSize: 50 }} color="primary" />
            </Grid>

            <Grid direction="column">
              <Grid item>
                <Typography variant="h5" display="block">
                  Vote
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  display="block"
                  style={{ lineHeight: "15px" }}
                >
                  Read the vote description carefully and choose an option
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="h6" sx={{ pt: 2 }}>
            Vote Description
          </Typography>
          {assets.contracts[0]?.payload?.subject ?? "Loading..."}

          <Divider />
          <Box textAlign="center">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
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
          <Snackbar
            open={Popup.open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={Popup.text}
            action={action}
          />
        </Paper>
      </Box>
      {/* <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Header
              as="h1"
              size="huge"
              color="blue"
              textAlign="center"
              style={{ padding: "1ex 0em 0ex 0em" }}
            >
              Welcome, Voter!
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
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
    </Container>
  );
};

export default VoteScreen;
