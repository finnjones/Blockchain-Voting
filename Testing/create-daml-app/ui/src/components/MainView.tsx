// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

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

import { Voting } from "@daml.js/create-daml-app";

import { useParty, useLedger, useStreamQueries } from "@daml/react";

import { createHash } from "crypto";

let voteKeys: string[] = [];
let hashedVoteKeys: string[] = [];
const MainView: React.FC = () => {
  const hashUsername = useParty();
  const [candidateList, setCandidateList] = useState<string[]>([]);

  const [value, setValue] = React.useState<number>(10);
  const [subjectText, setSubjectText] = useState("");
  const [candidateText, setCandidateText] = useState("");
  const [Popup, setPopup] = React.useState({ text: "", open: false });

  const assets = useStreamQueries(Voting.Voting);

  const ledger = useLedger();
  const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    console.log(button.name);
    if ((button.name === "Create Vote", assets.contracts.length === 0)) {
      setPopup({ text: "Vote Created", open: true });
      const [voteKeys, hashedVoteKeys] = generateVoteKeys(value);

      console.log(candidateText);
      const voteDetails = {
        username: hashUsername,
        following: hashedVoteKeys,
        votes: [],
        voted: [],
        candidates: candidateList,
        subject: subjectText,
      };
      const createVote = ledger.create(Voting.Voting, voteDetails);
      console.log(assets);
    } else {
      setPopup({ text: "Vote In Progress", open: true });
    }
  };

  function hash(input: string) {
    return createHash("sha256").update(input).digest("hex");
  }

  const generateVoteKeys = (voterCount: any) => {
    for (let i = 0; i < voterCount; i++) {
      var crypto = require("crypto");
      var key = crypto.randomBytes(20).toString("hex");
      voteKeys.push(`${key}`);
      hashedVoteKeys.push(hash(key));
    }
    return [voteKeys, hashedVoteKeys];
  };

  const addCandidate = () => {
    setCandidateText("");
    // append candidateText to the start of candidateList
    setCandidateList([candidateText, ...candidateList]);
  };

  // copy voteKeys to clipboard
  const copyVoteKeys = () => {
    navigator.clipboard.writeText(voteKeys.join("\n"));
    setPopup({ text: "Keys Copied To Clipboard", open: true });
  };

  // export voteKeys to csv
  const exportVoteKeys = () => {
    const csv = voteKeys.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "voteKeys.csv";
    link.click();
    setPopup({ text: "Keys Exported", open: true });
  };

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
              onChange={(event) => {
                setSubjectText(event.target.value);
              }}
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
          <Typography variant="h6">
            Candidates: {candidateList.length}
          </Typography>

          <Box textAlign="center">
            <TextField
              id="outlined-basic"
              label="Candidate"
              variant="outlined"
              value={candidateText}
              //  onChange={handleChange}
              onChange={(event) => {
                setCandidateText(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addCandidate();
                }
              }}
              style={{ width: "95%" }}
              sx={{ m: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={addCandidate}>
                    <KeyboardReturn />
                  </IconButton>
                ),
              }}
            />

            <List style={{ width: "95%" }} sx={{ ml: 2 }}>
              {candidateList.map((item) => (
                <ListItem
                  key={item}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        setCandidateList((candidateList) =>
                          candidateList.filter((i) => i !== item)
                        );
                        console.log(candidateList);
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
            open={Popup.open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={Popup.text}
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
                  Distribute vote keys between voters
                </Typography>
              </Grid>
            </Grid>
            <Box textAlign="right" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                onClick={exportVoteKeys}
              >
                Export CSV
              </Button>
              <Button variant="contained" onClick={copyVoteKeys}>
                Copy To Clipboard
              </Button>
            </Box>
          </Grid>

          <Divider />
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
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
    </Container>
  );
};

export default MainView;
