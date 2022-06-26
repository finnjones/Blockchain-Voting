// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useCallback, useState } from "react";
import { Header, Segment, Form, Icon } from "semantic-ui-react";
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
  ButtonGroup,
  IconButton,
  Paper,
} from "@mui/material";
// import Icon from '@mui/icons-material';
import { Key, Ballot, Delete, Close } from "@mui/icons-material";
// import KeyIcon from '@mui/icons-material/Key';

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
import UserList from "./UserList";
import PartyListEdit from "./PartyListEdit";

let voteKeys: string[] = [];
// var candidateList: string[] = [];

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = useParty();
  // const test = insecure.makeToken(username);
  const initialList = [""];
  const [candidateList, setCandidateList] = useState<string[]>([]);

  const [value, setValue] = React.useState<number>(10);
  const [subjectText, setSubjectText] = useState("");
  const [candidateText, setCandidateText] = useState("");
  const [open, setOpen] = React.useState(false);

  // const [test, tests] = React.useState<number>(10);

  // const myUserResult = useStreamFetchByKeys(User.User, () => [username], [
  //   username,
  // ]);

  const assets = useStreamQueries(Voting.Voting);

  // const myUser = myUserResult.contracts[0]?.payload;

  const allUsers = useStreamQueries(User.User).contracts;
  let sliderPosition = 2;

  const followers = useMemo(
    () =>
      allUsers
        .map((user) => user.payload)
        .filter((user) => user.username !== username)
        .sort((x, y) => x.username.localeCompare(y.username)),
    [allUsers, username]
  );

  // FOLLOW_BEGIN
  const ledger = useLedger();

  const [clickedButton] = useState("");

  const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    console.log(button.name);
    if (button.name == "Create Vote") {
      setOpen(true);
      const VoteKeys = generateVoteKeys(value);
      console.log(candidateText);
      const voteDetails = {
        username: username,
        following: VoteKeys,
        votes: [],
        voted: [],
        candidates: candidateList,
        subject: subjectText,
      };
      const createVote = ledger.create(Voting.Voting, voteDetails);
      console.log(assets);
    }

    // if (button.name == "Vote Yes") {
    //   if (assets.contracts[0]?.payload.voted.includes(username)) {
    //     alert("You have already voted");
    //   } else {
    //     await ledger
    //       .exerciseByKey(
    //         Voting.Voting.Vote,
    //         assets.contracts[0]?.signatories[0],
    //         { voter: username, vote: true }
    //       )
    //       .catch(console.error);
    //   }
    //   console.log(assets.contracts[0]?.payload.voted);
    // }
  };

  const generateVoteKeys = (voterCount: any) => {
    for (let i = 0; i < voterCount; i++) {
      var crypto = require("crypto");
      var key = crypto.randomBytes(20).toString("hex");
      voteKeys.push(`${"VoteKey"}-${key}`);
    }
    return voteKeys;
  };

  const follow = async (userToFollow: Party): Promise<boolean> => {
    try {
      generateVoteKeys(sliderPosition);

      return true;
    } catch (error) {
      alert(`Unknown error:\n${JSON.stringify(error)}`);
      return false;
    }
  };

  const addCandidate = () => {
    console.log(candidateText);
    setCandidateList([...candidateList, candidateText]);
    console.log(candidateList);
  };

  // >>>>>>>>>>>>Was working here before<<<<<<<<<

  // candidateList.splice(
  //   candidateList.indexOf(item),
  //   1
  // );
  // setCandidateList(candidateList);

  // console.log(item);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          {/* <Header as="h3">Who are the candidates?</Header> */}

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
                  // console.log(ev.target.value);
                }
              }}
              style={{ width: "95%" }}
              sx={{ m: 2 }}
            />

            <List>
              {candidateList.map((item) => (
                <ListItem
                  key={item}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        // const found = candidateList.find(element => element > item);
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

            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              {/* <Button onClick={removeCandidate}>-</Button> */}
              <Button onClick={addCandidate}>+</Button>
            </ButtonGroup>
          </Box>

          {/* {candidateList} */}
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
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Vote Created"
            action={action}
          />

          {/* <Button variant="contained" onClick={buttonHandler} className="button" name="Vote Yes">
                Vote Yes
              </Button> */}
          {/* </Segment> */}
        </Paper>
      </Box>
      {/* <Segment> */}
      <Box sx={{ p: 1 }}>
        <Paper sx={{ p: 3, borderRadius: "16px" }} elevation={2}>
          <Grid container spacing={0}>
            <Grid item>
              <Key sx={{ fontSize: 45 }} color="primary" />
            </Grid>
            <Grid direction="column">
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
                  {assets.contracts[0]?.observers.map((item) => (
                    <ListItem key={`item-${sectionId}-${item}`}>
                      <ListItemText primary={`${item}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
          {/* USERLIST_BEGIN */}
          <UserList users={followers} onFollow={follow} />
          {/* USERLIST_END */}
        </Paper>
      </Box>
      {/* </Segment> */}
      {/* </Grid.Column>
          </Grid.Row>
        </Grid> */}

      {/* <Form></Form> */}
    </Container>
  );
};

export default MainView;
