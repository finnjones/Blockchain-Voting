import React, { useState } from "react";

import {
  Button,
  Container,
  Slider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Box,
  Snackbar,
  Grid,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";

import {
  Key,
  Ballot,
  Delete,
  Close,
  KeyboardReturn,
} from "@mui/icons-material";

import { Voting } from "@daml.js/votencrypt";

import { useParty, useLedger, useStreamQueries } from "@daml/react";

import { createHash } from "crypto";

import HelpPopup from "./HelpPopup";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

let hashedVoteKeys: string[] = [];

/**
 * This function contains the main create vote screen.
 */
const MainView: React.FC = () => {
  const hashUsername = useParty();
  const [optionList, setOptionList] = useState<string[]>([]);
  const [voteKeys, setVoteKeys] = useState<string[]>([]);
  const [value, setValue] = React.useState<number>(10);
  const [subjectText, setSubjectText] = useState("");
  const [optionText, setOptionText] = useState("");
  const [Popup, setPopup] = React.useState(false);
  const [popupText, setPopupText] = React.useState("");
  const [dateTimeVal, setDateTimeVal] = React.useState<Date | null>(new Date());
  const [error, setError] = React.useState({
    Subject: false,
    Option: false,
  });
  const [voteNotCreated, setVoteNotCreated] = React.useState(true);

  const assets = useStreamQueries(Voting.Voting);
  const today = new Date();

  const ledger = useLedger();

  let crypto = require("crypto");

  /**
   * The buttonHandler function is called when the user clicks the "Create Vote" button. It generates a
   * set of vote keys, stores them in local storage, and then creates a new vote contract on the ledger
   */
  const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let updatedObj = {
      Subject: false,
      Option: false,
    };
    /* Checking if the subjectText and optionList are empty. If they are empty, it will set the Subject and
  Option to true. If they are not empty, it will set the Subject and Option to false. */

    if (subjectText.length === 0) {
      updatedObj = { ...updatedObj, Subject: true };
    } else {
      updatedObj = { ...updatedObj, Subject: false };
    }

    if (optionList.length === 0) {
      updatedObj = { ...updatedObj, Option: true };
    } else {
      updatedObj = { ...updatedObj, Option: false };
    }

    setError(updatedObj);

    if (dateTimeVal !== null) {
      if (
        subjectText !== "" &&
        optionList.length !== 0 &&
        dateTimeVal.getTime() > today.getTime()
      ) {
        if (assets.contracts.length === 0) {
          /* The bellow code is creating a vote. */
          const keys = generateVoteKeys(value);
          setVoteKeys(keys[0]);
          if (dateTimeVal !== null) {
            var stringDate = Math.floor(dateTimeVal.getTime() / 1000);
          } else {
            var stringDate = 0;
          }
          console.log(stringDate);

          const voteDetails = {
            username: hashUsername,
            deadLine: stringDate.toString(),
            voters: hashedVoteKeys,
            votes: [],
            voted: [],
            voteTimes: [],
            options: optionList,
            subject: subjectText,
          };
          ledger.create(Voting.Voting, voteDetails);
          setPopupText("Vote Created");
          setPopup(true);
          setVoteNotCreated(false);
        } else {
          setPopupText("Vote In Progress");
          setPopup(true);
        }
      }
    }
  };

  function hash(input: string) {
    return createHash("sha256").update(input).digest("hex");
  }

  /**
   * It takes a number as an argument and returns an array of two arrays, the first of which contains a
   * number of random strings equal to the number passed in, and the second of which contains the SHA256
   * hashes of those strings
   * @param {any} voterCount - The number of voters in the election.
   * @returns An array of voteKeys and hashedVoteKeys
   */
  const generateVoteKeys = (voterCount: number) => {
    for (let i = 0; i < voterCount; i++) {
      let key = crypto.randomBytes(20).toString("hex");
      voteKeys.push(`${key}`);
      hashedVoteKeys.push(hash(key));
    }
    return [voteKeys, hashedVoteKeys];
  };

  /**
   * If the optionText is not in the optionList, then add it to the start of the optionList
   */
  const addOption = () => {
    if (optionList.includes(optionText)) {
      setPopupText("Option already exists");
      setPopup(true);
    } else {
      setOptionText("");
      // append optionText to the start of optionList
      setOptionList([optionText, ...optionList]);
    }
  };

  // copy voteKeys to clipboard
  const copyVoteKeys = () => {
    navigator.clipboard.writeText(voteKeys.join("\n"));
    setPopupText("Keys Copied To Clipboard");
    setPopup(true);
  };

  // export voteKeys to csv
  const exportVoteKeys = () => {
    const csv = voteKeys.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = subjectText + ".csv";
    link.click();
    setPopupText("Keys Exported");
    setPopup(true);
  };

  /**
   * A function that closes the popup.
   * @param {React.SyntheticEvent | Event} event - React.SyntheticEvent | Event
   * @param {string} [reason] - The reason for the close. Can be one of "timeout", "clickaway",
   * "escapeKeyDown", or "offscreen".
   * @returns The return statement is returning the following:
   */
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

  return (
    <Container>
      <Box sx={{ p: 1 }}>
        <Paper sx={{ p: 3, borderRadius: "16px" }} elevation={2}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Ballot sx={{ fontSize: 45 }} color="primary" />
            <Typography variant="h5">Create A Vote</Typography>
          </div>
          <Divider sx={{ p: 0 }} />

          <Typography variant="h6" sx={{ pt: 2 }}>
            What is the vote on?
          </Typography>
          <Box textAlign="center">
            <TextField
              id="outlined-basic"
              label="Subject"
              variant="outlined"
              value={subjectText}
              onClick={() => {
                setError({ ...error, Subject: false });
              }}
              onChange={(event) => {
                setSubjectText(event.target.value);
              }}
              error={error.Subject}
              style={{ width: "94%" }}
              sx={{ m: 2 }}
            />
          </Box>
          <Typography variant="h6">Voters: {value}</Typography>

          <Box textAlign="center">
            <Slider
              value={value}
              aria-label="Default"
              valueLabelDisplay="auto"
              name="slider"
              sx={{ m: 2 }}
              style={{ width: "95%" }}
              onChange={(event: any) => {
                setValue(event.target.value);
              }}
            />
          </Box>
          <Typography variant="h6">Options: {optionList.length}</Typography>
          <Box textAlign="center">
            <TextField
              id="outlined-basic"
              label="Option"
              variant="outlined"
              value={optionText}
              error={error.Option}
              onClick={() => {
                setError({ ...error, Option: false });
              }}
              onChange={(event) => {
                setOptionText(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addOption();
                }
              }}
              style={{ width: "95%" }}
              sx={{ m: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={addOption}>
                    <KeyboardReturn />
                  </IconButton>
                ),
              }}
            />

            <List style={{ width: "95%" }} sx={{ ml: 2 }}>
              {optionList.map((item) => (
                <ListItem
                  key={item}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        setOptionList((optionList) =>
                          optionList.filter((i) => i !== item)
                        );
                      }}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box textAlign="center">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                label="Vote Deadline"
                value={dateTimeVal}
                minDateTime={today}
                onChange={(newValue) => {
                  setDateTimeVal(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={buttonHandler}
              className="button"
              name="Create Vote"
              sx={{ m: 2, alignItems: "center" }}
            >
              Create Vote
            </Button>
          </Box>
          <Snackbar
            open={Popup}
            autoHideDuration={2000}
            onClose={handleClose}
            message={popupText}
            action={action}
          />
        </Paper>
      </Box>
      <Box sx={{ p: 1 }}>
        <Paper sx={{ p: 3, borderRadius: "16px" }} elevation={2}>
          <Grid container>
            <Grid item>
              <Key sx={{ fontSize: 45 }} color="primary" />
            </Grid>

            <Grid item>
              <Grid item>
                <Typography variant="h5" display="block">
                  Vote Keys
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  display="block"
                  style={{ lineHeight: "15px" }}
                >
                  Send each voter a key to vote
                </Typography>
              </Grid>
            </Grid>
            <Box textAlign="right" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                onClick={exportVoteKeys}
                disabled={voteNotCreated}
              >
                Export CSV
              </Button>
              <Button
                variant="contained"
                onClick={copyVoteKeys}
                disabled={voteNotCreated}
              >
                Copy To Clipboard
              </Button>
            </Box>
          </Grid>

          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: "16px",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
              padding: 1,

              "&::-webkit-scrollbar": {
                width: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "black",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#808080",
                borderRadius: 2,
              },
              overflowX: "hidden",
            }}
            subheader={<li />}
          >
            {[0].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  {voteKeys.map((item) => (
                    <ListItem key={`item-${sectionId}-${item}`}>
                      <ListItemText primary={`${item}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
        </Paper>
      </Box>
      <HelpPopup
        heading="How To Create A Vote"
        content="
          1. Enter the subject of the vote.\n
          2. Enter the number of voters.\n
          3. Enter the options.\n
          4. Click on the create vote button.\n
          5. The vote will be created.\n
          Vote keys allow voters to authenticate themselves when they vote. Make sure you send one vote key to each voter. A vote key can be used only once.
        "
      ></HelpPopup>
    </Container>
  );
};

export default MainView;
