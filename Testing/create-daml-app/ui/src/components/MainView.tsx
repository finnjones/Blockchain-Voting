// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import React, { useMemo, useCallback, useState } from 'react';
import { Container, Grid, Header, Icon, Segment, Divider, Form } from 'semantic-ui-react';
import { Party } from '@daml/types';
import { User, Voting } from '@daml.js/create-daml-app';
import Credentials from '../Credentials';
import Ledger from '@daml/ledger';
import { httpBaseUrl } from '../config';

import { useParty, useLedger, useStreamFetchByKeys, useStreamQueries } from '@daml/react';
import UserList from './UserList';
import PartyListEdit from './PartyListEdit';
import { CreateVote } from '@daml.js/create-daml-app/lib/Voting';

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = useParty();
  // const test = insecure.makeToken(username);

  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [username]);
  // const votess = useStreamFetchByKeys(Voting.CreateVote, () => [username], [username]);
  // const assets = useStreamQueries(CreateVote);
  // console.log(assets)
  const assets = useStreamQueries(Voting.CreateVote);
  console.log(assets)




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

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    console.log(assets)
    ledger.exerciseByKey(Voting.CreateVote.Vote, username, {voter: username, accept : true});

  }
  const follow = async (userToFollow: Party): Promise<boolean> => {
    try {

      // ledger.exercise(CreateVote.Vote, newContractc.contractId, "Bob");
      

      
      await ledger.exerciseByKey(User.User.Follow, username, {userToFollow});
      console.log(userToFollow);
      const createV = {creator: username, subject: "This is a test", voters: ["Bob", "Steve"], voted: [], votes: []};
      const newContractc = ledger.create(Voting.CreateVote, createV);
      
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
        <button onClick={buttonHandler} className="button" name="button 1">
          Button 1
        </button>        
      </Form>
    </Container>
  );
}

export default MainView;
