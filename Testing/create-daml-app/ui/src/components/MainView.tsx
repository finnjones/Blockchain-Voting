// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import React, { useMemo, useCallback, useState } from 'react';
import { Grid, Header, Icon, Segment, Divider, Form } from 'semantic-ui-react';
import { Button, Container, Slider } from '@mui/material';
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
  // console.log(assets.contracts)

  console.log(assets.contracts[0]?.signatories[0])


  const myUser = myUserResult.contracts[0]?.payload;
  // console.log(myUser);
  const allUsers = useStreamQueries(User.User).contracts;
  let sliderPosition = 49
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

  console.log(assets.contracts)
  const [clickedButton] = useState('');

  const voteDetails = {username: username, following: ["Alice", "Steve"], votes: [], subject: "Donald Trump"};
  const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    console.log(button.name)
    if (button.name == "Create Vote"){
      const createVote = ledger.create(Voting.Voting, voteDetails);
      // await ledger.exerciseByKey(User.User.CreateVote, username, {inputSubject: "Donald Trump"});

    }
    if (button.name == "Vote Yes"){
      
      // console.log(Voting.Voting.Vote, "hello");
      await ledger.exerciseByKey(Voting.Voting.Vote, assets.contracts[0]?.signatories[0], {voter: username, vote: true}).catch(console.error)

    }

    const user = {username: username, following: []};
    const test = "test"
    // const userContract = ledger.create(User.User, user);


    
    // ledger.fetch(Voting.CreateVote, )
    // await ledger.exerciseByKey(Voting.CreateVote.Vote, username, {voter: username, accept : true}).catch(console.error);
    // ledger.exercise(Voting.CreateVote.Vote, assets.contracts.contractId, {voter: username, accept : true});


  }
  const generateVoteKeys = (voterCount: any) => {
    const voteKeys = [];
    for (let i = 0; i < voterCount; i++) {
      var crypto = require("crypto");
      var key = crypto.randomBytes(20).toString('hex');
      voteKeys.push(`${"VoteKey"}-${key}`);
    }
    console.log(voteKeys)
  }

  const handleChange = (event: any, newValue: any) => {
    console.log(newValue);
    console.log(sliderPosition)
    sliderPosition = 50
    // export default sliderPosition;
    // console.log(sliderPosition);

  };
  console.log(sliderPosition);
  

  const follow = async (userToFollow: Party): Promise<boolean> => {
    try {

      // ledger.exercise(CreateVote.Vote, newContractc.contractId, "Bob");
      
      generateVoteKeys(sliderPosition);
      
      // await ledger.exerciseByKey(User.User.Follow, username, {userToFollow});
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
              {/* <SliderExample /> */}
              <PartyListEdit
                parties={myUser?.following ?? []}
                onAddParty={follow}
              />
              <Slider
                defaultValue={50} 
                aria-label="Default" 
                valueLabelDisplay="auto"
                name='slider'
                onChange={handleChange}
              />

              <Button variant="contained" onClick={buttonHandler} className='button' name="Create Vote">
                Create Vote
              </Button>

              <Button variant="contained" onClick={buttonHandler} className="button" name="Vote Yes">
                Vote Yes
              </Button>

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


      </Form>
    </Container>
  );
}

export default MainView;
