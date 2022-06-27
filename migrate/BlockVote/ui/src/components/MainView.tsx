// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  Segment,
  Divider,
} from "semantic-ui-react";
import { Party } from "@daml/types";
import { User, Voting } from "@daml.js/BlockVote";
import { publicContext, userContext } from "./App";
import UserList from "./UserList";
import PartyListEdit from "./PartyListEdit";
import { Button } from "@mui/material";
import { Insecure } from "../config";

import {
  useParty,
  useLedger,
  useStreamFetchByKeys,
  useStreamQueries,
} from "@daml/react";
// USERS_BEGIN

let voteKeys: string[] = [];

const MainView: React.FC<{ auth: Insecure }> = ({ auth }) => {
  // const assets = useStreamQueries(Voting.Voting);
  console.log(auth);
  console.log(auth.makeToken("username"));
  const username = userContext.useParty();
  const assets = userContext.useStreamFetchByKeys(
    Voting.Voting,
    () => [username],
    [username]
  );

  const myUserResult = userContext.useStreamFetchByKeys(
    User.User,
    () => [username],
    [username]
  );
  const aliases = publicContext.useStreamQueries(User.Alias, () => [], []);
  const myUser = myUserResult.contracts[0]?.payload;
  const allUsers = userContext.useStreamQueries(User.User).contracts;
  // USERS_END

  // Sorted list of users that are following the current user
  const followers = useMemo(
    () =>
      allUsers
        .map((user) => user.payload)
        .filter((user) => user.username !== username)
        .sort((x, y) => x.username.localeCompare(y.username)),
    [allUsers, username]
  );

  // Map to translate party identifiers to aliases.
  const partyToAlias = useMemo(
    () =>
      new Map<Party, string>(
        aliases.contracts.map(({ payload }) => [
          payload.username,
          payload.alias,
        ])
      ),
    [aliases]
  );
  const myUserName = aliases.loading
    ? "loading ..."
    : partyToAlias.get(username) ?? username;

  // FOLLOW_BEGIN
  const ledger = userContext.useLedger();

  const follow = async (userToFollow: Party): Promise<boolean> => {
    try {
      await ledger.exerciseByKey(User.User.Follow, username, { userToFollow });
      return true;
    } catch (error) {
      alert(`Unknown error:\n${JSON.stringify(error)}`);
      return false;
    }
  };

  const generateVoteKeys = (voterCount: any) => {
    for (let i = 0; i < voterCount; i++) {
      var crypto = require("crypto");
      var key = crypto.randomBytes(20).toString("hex");
      voteKeys.push(`${"VoteKey"}${auth.makeToken(key)}`);
    }
    return voteKeys;
  };

  // generate list with x number of random strings that are 20 characters long
  const generateRandomStrings = (x: number) => {
    const randomStrings = [];
    for (let i = 0; i < x; i++) {
      randomStrings.push(Math.random().toString(36).substring(2, 12));
    }
    return randomStrings;
  };

  const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    console.log(button.name);
    if (button.name == "Create Vote") {
      const VoteKeys = generateRandomStrings(10);
      const voteDetails = {
        username: username,
        following: generateRandomStrings(10),
        votes: [],
        voted: [],
        candidates: ["fdsa", "asdf"],
        subject: "subjectText",
      };
      const createVote = ledger.create(Voting.Voting, voteDetails);
    }
  };
  // console.log(aliases);
  // console.log(assets);

  // FOLLOW_END

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
              {myUserName ? `Welcome, ${myUserName}!` : "Loading..."}
            </Header>

            <Segment>
              <Header as="h2">
                <Icon name="user" />
                <Header.Content>
                  {myUserName ?? "Loading..."}
                  <Header.Subheader>Users I'm following</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <PartyListEdit
                parties={myUser?.following ?? []}
                partyToAlias={partyToAlias}
                onAddParty={follow}
              />
              <Button
                variant="contained"
                onClick={buttonHandler}
                className="button"
                name="Create Vote"
                sx={{ m: 2, alignItems: "center" }}
              >
                Create Vote
              </Button>
            </Segment>
            <Segment>
              <Header as="h2">
                <Icon name="globe" />
                <Header.Content>
                  The Network
                  <Header.Subheader>
                    My followers and users they are following
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              {/* USERLIST_BEGIN */}
              <UserList
                users={followers}
                partyToAlias={partyToAlias}
                onFollow={follow}
              />
              {/* USERLIST_END */}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default MainView;
