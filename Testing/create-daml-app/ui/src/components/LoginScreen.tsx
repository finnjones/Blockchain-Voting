// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from "react";
import { Button, TextField, Paper, Typography, Grid } from "@mui/material";
import Credentials from "../Credentials";
import Ledger from "@daml/ledger";
import { Voting } from "@daml.js/create-daml-app";
import { authConfig, httpBaseUrl } from "../config";
import { createHash } from "crypto";

type Props = {
  onLogin: (credentials: Credentials) => void;
};

function hash(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

export let usernameExport: any;
const wrap: (c: JSX.Element) => JSX.Element = (component) => (
  // display VoteLogo.png
  <>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Typography
          variant="h3"
          color="#0d47a1"
          textAlign="center"
          // sx={{ pt: 2 }}
        >
          Votencrypt
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h6"
          fontWeight="600"
          color="#0d47a1"
          textAlign="center"
          // sx={{ pt: 2 }}
        >
          Secure Voting On The Blockchain
        </Typography>
      </Grid>
      <Grid item>
        <Paper sx={{ p: 2, borderRadius: "16px" }} elevation={2}>
          {component}
        </Paper>
      </Grid>
    </Grid>
  </>

  // <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
  //   <Grid.Column style={{ maxWidth: 450 }}>

  //     <Form size="huge" className="test-select-login-screen">
  //       <Paper sx={{ p: 2, borderRadius: "16px" }} elevation={2}>
  //         {component}
  //       </Paper>
  //     </Form>
  //   </Grid.Column>
  // </Grid>
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
    usernameExport = username;

    const hashedUsername = hash(username);

    await login({
      party: hashedUsername,
      token: authConfig.makeToken(hashedUsername),
    });
  };

  return wrap(
    <>
      <Grid container direction="column" style={{ width: "400px" }}>
        <Grid item>
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
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            className="test-select-login-button"
            onClick={handleLogin}
            style={{ width: "100%" }}
          >
            Vote
          </Button>
        </Grid>
      </Grid>
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
    usernameExport = username;
    const hashedUsername = hash(username);

    await login({
      party: hashedUsername,
      token: authConfig.makeToken(hashedUsername),
    });
  };
  return wrap(
    <>
      {/* FORM_BEGIN */}
      <Grid container direction="column" style={{ width: "400px" }}>
        <Grid item>
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
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className="test-select-login-button"
            onClick={handleLogin}
            style={{ width: "100%" }}
          >
            Create A Vote
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
