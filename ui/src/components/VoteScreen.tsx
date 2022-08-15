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
import { Close, HowToVote, Logout } from "@mui/icons-material";
import { Voting } from "@daml.js/votencrypt";
import { useParty, useLedger, useStreamQueries } from "@daml/react";
import { Link } from "react-router-dom";

type Props = {
  onLogout: () => void;
};

const VoteScreen: React.FC<Props> = ({ onLogout }) => {
  const hashUsername = useParty();
  const ledger = useLedger();

  const [Popup, setPopup] = React.useState(false);
  const [popupText, setPopupText] = React.useState("");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setPopup(false);
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
  // get current unix time stamp
  const now = new Date().getTime();

  const buttonHandler = async () => {
    if (assets.contracts[0]?.payload.voted.includes(hashUsername)) {
      setPopupText("You have already voted");

      setPopup(true);
    } else {
      await ledger
        .exerciseByKey(
          Voting.Voting.Vote,
          assets.contracts[0]?.signatories[0],
          { voter: hashUsername, vote: radioStatus, unixTime: now.toString() }
        )
        .catch(console.error);
      setPopupText(
        "Your vote has been cast. Please logout or close the browser tab"
      );

      setPopup(true);
    }
  };

  return (
    <>
      <Box textAlign={"right"} sx={{ p: 1 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Logout />}
          onClick={onLogout}
          component={Link}
          to="/"
        >
          Log Out
        </Button>
      </Box>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ height: "75vh" }}
        >
          <Paper
            sx={{ p: 3, borderRadius: "16px", width: "90%" }}
            elevation={2}
          >
            <Grid container spacing={0}>
              <Grid item>
                <HowToVote sx={{ fontSize: 50 }} color="primary" />
              </Grid>

              <Grid item>
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
            {assets.contracts[0]?.payload?.subject ?? "Invalid Vote Key"}

            <Divider sx={{ pb: 2 }} />
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
                    {assets.contracts[0]?.payload?.options.map((item) => (
                      <ListItem key={item}>
                        <FormControlLabel
                          value={item}
                          control={<Radio />}
                          label={item}
                          onChange={(event) => {
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
              open={Popup}
              autoHideDuration={4000}
              onClose={handleClose}
              message={popupText}
              action={action}
            />
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default VoteScreen;
