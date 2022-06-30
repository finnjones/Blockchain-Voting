// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from "react";
import { Form, Grid, Header, Segment } from "semantic-ui-react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import Credentials from "../Credentials";
import Ledger from "@daml/ledger";
import { Voting } from "@daml.js/create-daml-app";
import { authConfig, httpBaseUrl } from "../config";

type Props = {
  onLogin: (credentials: Credentials) => void;
};

const wrap: (c: JSX.Element) => JSX.Element = (component) => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Typography
        variant="h3"
        color="#0d47a1"
        textAlign="center"
        sx={{ pt: 2 }}
      >
        Votencrypt
      </Typography>
      <Typography
        variant="h6"
        fontWeight="600"
        color="#0d47a1"
        textAlign="center"
        sx={{ pt: 2 }}
      >
        Secure Voting On The Blockchain
      </Typography>

      <Form size="huge" className="test-select-login-screen">
        <Paper sx={{ p: 2, borderRadius: "16px" }} elevation={2}>
          {component}
        </Paper>
      </Form>
    </Grid.Column>
  </Grid>
);

export const LoginScreenVote: React.FC<Props> = ({ onLogin }) => {
  const login = useCallback(
    async (credentials: Credentials) => {
      try {
        const ledger = new Ledger({ token: credentials.token, httpBaseUrl });
        let userContract = await ledger.fetchByKey(
          Voting.User,
          credentials.party
        );

        if (userContract === null) {
          const user = {
            username: credentials.party,
          };
          userContract = await ledger.create(Voting.User, user);
        }
        onLogin(credentials);
      } catch (error) {
        alert(`Unknown error:\n${JSON.stringify(error)}`);
      }
    },
    [onLogin]
  );
  const [username, setUsername] = React.useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await login({ party: username, token: authConfig.makeToken(username) });
  };

  return wrap(
    <>
      <TextField
        placeholder="Enter Vote Key"
        value={username}
        className="test-select-username-field"
        sx={{ paddingBottom: 2 }}
        style={{ width: "100%" }}
        onChange={(e) => setUsername(e.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleLogin(e);
          }
        }}
      />

      <Button
        variant="contained"
        className="test-select-login-button"
        onClick={handleLogin}
        style={{ width: "100%" }}
      >
        Vote
      </Button>
    </>
  );
};

export const LoginScreenCreateVote: React.FC<Props> = ({ onLogin }) => {
  const login = useCallback(
    async (credentials: Credentials) => {
      try {
        const ledger = new Ledger({ token: credentials.token, httpBaseUrl });
        let userContract = await ledger.fetchByKey(
          Voting.User,
          credentials.party
        );

        if (userContract === null) {
          // const voteBob = useQuery()

          const user = {
            username: credentials.party,
          };
          userContract = await ledger.create(Voting.User, user);
        }
        onLogin(credentials);
      } catch (error) {
        alert(`Unknown error:\n${JSON.stringify(error)}`);
      }
    },
    [onLogin]
  );
  const [username, setUsername] = React.useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await login({ party: username, token: authConfig.makeToken(username) });
  };

  return wrap(
    <>
      {/* FORM_BEGIN */}
      <TextField
        placeholder="Username"
        value={username}
        className="test-select-username-field"
        sx={{ paddingBottom: 2 }}
        style={{ width: "100%" }}
        onChange={(e) => setUsername(e.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleLogin(e);
          }
        }}
      />

      <Button
        variant="contained"
        className="test-select-login-button"
        onClick={handleLogin}
        style={{ width: "100%" }}
      >
        Create A Vote
      </Button>
    </>
  );
};
