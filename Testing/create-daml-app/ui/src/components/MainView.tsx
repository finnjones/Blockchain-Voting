// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import React, { useMemo, useCallback, useState } from 'react';
import { Grid, Header, Segment, Divider, Form, Icon } from 'semantic-ui-react';
import { Button, Container, Slider, List, ListItem, ListItemText, TextField, Typography} from '@mui/material';
// import Icon from '@mui/icons-material';
import {Key, Ballot} from '@mui/icons-material';
// import KeyIcon from '@mui/icons-material/Key';

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
let voteKeys: string[] = [];

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = useParty();
  // const test = insecure.makeToken(username);
  const [value, setValue] = React.useState<number>(10);
  const [subjectText, setSubjectText] = useState("");
  // const [test, tests] = React.useState<number>(10);


  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [username]);

  const assets = useStreamQueries(Voting.Voting);




  const myUser = myUserResult.contracts[0]?.payload;

  const allUsers = useStreamQueries(User.User).contracts;
  let sliderPosition = 2

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
      const VoteKeys = generateVoteKeys(value);
      console.log(subjectText)

      const voteDetails = {username: username, following: VoteKeys, votes: [], voted: [], subject: subjectText};
      const createVote = ledger.create(Voting.Voting, voteDetails);
      console.log(assets)
    }
    
    if (button.name == "Vote Yes"){
      if (assets.contracts[0]?.payload.voted.includes(username)){
        alert("You have already voted")
      }
      else{
        await ledger.exerciseByKey(Voting.Voting.Vote, assets.contracts[0]?.signatories[0], {voter: username, vote: true}).catch(console.error)
      }
      console.log(assets.contracts[0]?.payload.voted)
    }
  }
  
  
  const generateVoteKeys = (voterCount: any) => {
    
    for (let i = 0; i < voterCount; i++) {
      var crypto = require("crypto");
      var key = crypto.randomBytes(20).toString('hex');
      voteKeys.push(`${"VoteKey"}-${key}`);
    }
    return voteKeys;
  }
  
  // const handleChange = (event: Event, newValue: number | number[]) => {
  //   if (typeof newValue === 'number') {
  //     // setValue(newValue);
      
  // };
  // const handleChange = (event: any, value: any) => {
  //   // sliderPosition = newValue;
  //   console.log(test)
  //   setValue(value);
  //   // test = event.target.value
  // };
  

  const follow = async (userToFollow: Party): Promise<boolean> => {
    try {

      
      generateVoteKeys(sliderPosition);
      
      return true;
    } catch (error) {
      alert(`Unknown error:\n${JSON.stringify(error)}`);
      return false;
    }
  }

  // const test = (event: any) => {  
  //   subjectText = event;
  //   console.log(value)
  // }

  const handleInput = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(value)
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
                <Ballot sx={{ fontSize: 45 }} color="primary"/>
                <Header.Content>
                  {myUser?.username ?? 'Loading...'}
                  <Header.Subheader>Create A Vote</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              {/* <SliderExample /> */}
              <Header as='h3'>What is the vote on</Header>

              <TextField id="outlined-basic" 
                         label="Subject" 
                         variant="outlined" 
                         value={subjectText}
                        //  onChange={handleChange}
                         onChange={(event) => {
                          setSubjectText(event.target.value);
                       
                         }}
                         style = {{width: '94%'}} 
                         sx={{ m: 2 }} />

              <Header as='h3'>Voters: {value}</Header>

              <Typography id="non-linear-slider" gutterBottom>
                Storage: {value}
              </Typography>
              <Slider
                value={value}
                // defaultValue={sliderPosition} 
                aria-label="Default" 
                valueLabelDisplay="auto"
                name='slider'
                sx={{ m: 2 }}
                style = {{width: "94%"}}
                // onChange={handleChange}
                onChange={(event: any) => {
                  setValue(event.target.value);
               
                 }}
              />


              <Button variant="contained" onClick={buttonHandler} className='button' name="Create Vote" sx={{ m: 2, alignItems: "center" }}>
                Create Vote
              </Button>
              <Button variant="contained" onClick={buttonHandler} className="button" name="Vote Yes">
                Vote Yes
              </Button>

            </Segment>
            <Segment>
              <Header as='h2'>
                {/* <svg data-testid="DeleteIcon"></svg> */}

                <Key sx={{ fontSize: 45 }} color="primary"/>


                {/* <Icon name='globe' /> */}
                <Header.Content>
                  Vote Keys
                  <Header.Subheader>Distribute vote keys between voters</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
      
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
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


