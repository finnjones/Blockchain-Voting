import React, { useMemo, useCallback, useState } from 'react';
import { Grid, Header, Segment, Divider, Form, Icon } from 'semantic-ui-react';
import { Button, Container, Slider, List, ListItem, ListItemText, TextField, Typography} from '@mui/material';
import {Key, Ballot} from '@mui/icons-material';
import { Party } from '@daml/types';
import { User, Voting } from '@daml.js/create-daml-app';
import Credentials from '../Credentials';
import Ledger from '@daml/ledger';
import { httpBaseUrl } from '../config';
import { useParty, useLedger, useStreamFetchByKeys, useStreamQueries } from '@daml/react';
import UserList from './UserList';
import PartyListEdit from './PartyListEdit';

const VoteScreen: React.FC = () => {

    const username = useParty();
    const myUserResult = useStreamFetchByKeys(User.User, () => [username], [username]);
    const assets = useStreamQueries(Voting.Voting);
    const myUser = myUserResult.contracts[0]?.payload;

    return (
        <Container>
            <Grid centered columns={2}>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                            {myUser ? `Welcome, ${myUser.username}!` : 'Loading...'}
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}


export default VoteScreen;