// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import React, { useMemo, useCallback, useState } from 'react';
import { Grid, Header, Icon, Segment, Divider, Form } from 'semantic-ui-react';
import { Button, Container } from '@mui/material';
import { Party } from '@daml/types';
import { User, Voting } from '@daml.js/create-daml-app';
import Credentials from '../Credentials';
import Ledger from '@daml/ledger';
import { httpBaseUrl } from '../config';

import { useParty, useLedger, useStreamFetchByKeys, useStreamQueries } from '@daml/react';
import UserList from './UserList';
import PartyListEdit from './PartyListEdit';
// import { UT } from '@daml.js/create-daml-app/lib/User';
// import { UT } from '@daml.js/create-daml-app/lib/Voting';

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = useParty();
  // const test = insecure.makeToken(username);

  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [username]);
  // const votess = useStreamFetchByKeys(Voting.CreateVote, () => [username], [username]);
  // const assets = useStreamQueries(CreateVote);
  // console.log(assets)
  const assets = useStreamQueries(Voting.Voting);
  console.log(assets.contracts)




  const myUser = myUserResult.contracts[0]?.payload;
  // console.log(myUser);
  const allUsers = useStreamQueries(User.User).contracts;
// USERS_END

  // Sorted list of users that are following the current user
  const followers = useMemo(() =>
    allUsers
    .map(user => user.payload)
    .filter(user => user.username !== username)
    .sort((x, y) => x.username.localeCompare(y.username)),
    [allUsers, username]);

  // FOLLOW_BEGIN
  const ledger = useLedger();


  const [clickedButton] = useState('');

  const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    console.log(button.name)
    if (button.name == "Create Vote"){
      const user = {username: username, following: ["Bob", "Steve"], votes: [], subject: "Donald Trump"};
      const userContract = ledger.create(Voting.Voting, user);
      // await ledger.exerciseByKey(User.User.CreateVote, username, {inputSubject: "Donald Trump"});

    }
    if (button.name == "Vote Yes"){
      console.log(assets.contracts)
      console.log(Voting.Voting.Vote, "hello");
      await ledger.exerciseByKey(Voting.Voting.Vote, "Alice", {voter: username, vote: true}).catch(console.error)
      console.log(assets.contracts, "after")
    }

    const user = {username: username, following: []};
    const test = "test"
    // const userContract = ledger.create(User.User, user);

    console.log(assets)

    
    // ledger.fetch(Voting.CreateVote, )
    // await ledger.exerciseByKey(Voting.CreateVote.Vote, username, {voter: username, accept : true}).catch(console.error);
    // ledger.exercise(Voting.CreateVote.Vote, assets.contracts.contractId, {voter: username, accept : true});


  }
  const follow = async (userToFollow: Party): Promise<boolean> => {
    try {

      // ledger.exercise(CreateVote.Vote, newContractc.contractId, "Bob");
      

      
      await ledger.exerciseByKey(User.User.Follow, username, {userToFollow});
      // console.log(userToFollow);
      // const createV = {creator: username, subject: "This is a test", voters: ["Bob", "Steve"], voted: [], votes: []};
      // const newContractc = ledger.create(Voting.CreateVote, createV);

      return true;
    } catch (error) {
      alert(`Unknown error:\n${JSON.stringify(error)}`);
      return false;
    }
  }
  // FOLLOW_END

  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                {myUser ? `Welcome, ${myUser.username}!` : 'Loading...'}
            </Header>

            <Segment>
              <Header as='h2'>
                <Icon name='user' />
                <Header.Content>
                  {myUser?.username ?? 'Loading...'}
                  <Header.Subheader>Users I'm following</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <PartyListEdit
                parties={myUser?.following ?? []}
                onAddParty={follow}
              />
            </Segment>
            <Segment>
              <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                  The Network
                  <Header.Subheader>My followers and users they are following</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              {/* USERLIST_BEGIN */}
              <UserList
                users={followers}
                onFollow={follow}
              />
              {/* USERLIST_END */}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Form>
        <Button variant="contained" onClick={buttonHandler} className='button' name="Create Vote">
          Create Vote
        </Button>
        <Button onClick={buttonHandler} className="button" name="Vote Yes">
          Vote Yes
        </Button>

      </Form>
    </Container>
  );
}

export default MainView;
