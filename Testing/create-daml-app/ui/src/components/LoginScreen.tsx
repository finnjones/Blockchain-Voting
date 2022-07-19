// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from "react";
import { Button, TextField, Paper, Typography, Grid } from "@mui/material";
import Credentials from "../Credentials";
import Ledger from "@daml/ledger";
import { Voting } from "@daml.js/create-daml-app";
import { authConfig, httpBaseUrl } from "../config";
import { createHash } from "crypto";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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
          color="primary"
          textAlign="center"
          // sx={{ pt: 2 }}#0d47a1
        >
          Votencrypt
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h6"
          fontWeight="600"
          color="primary"
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
);

export const LandingScreen: React.FC<Props> = ({ onLogin }) => {
  const { loginWithPopup } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [buttonPress, setButtonPress] = React.useState(false);
  const navigate = useNavigate();

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

          const userCreds = {
            username: credentials.party,
          };
          userContract = await ledger.create(Voting.User, userCreds);
        }
        navigate("/CreateVote");

        onLogin(credentials);
      } catch (error) {
        alert(`Unknown error:\n${JSON.stringify(error)}`);
      }
    },
    [onLogin]
  );
  const [username, setUsername] = React.useState("");

  const handleLogin = async () => {
    // if user is not undefined then run

    if (user !== undefined) {
      const { name, picture, email } = user || {
        name: "",
        picture: "",
        email: "",
      };

      // event.preventDefault();
      usernameExport = name;
      const hashedUsername = hash(email);
      await login({
        party: hashedUsername,
        token: authConfig.makeToken(hashedUsername),
      });
    }
  };
  const handleLoginButton = async () => {
    setButtonPress(true);
    if (isAuthenticated === false) {
      loginWithPopup({
        screen_hint: "signup",
      });
    }
  };
  console.log(isAuthenticated);
  if (isAuthenticated === true && buttonPress === true) {
    handleLogin();
    return <></>;
  } else {
    return wrap(
      <>
        <Grid
          container
          direction="column"
          style={{ width: "400px" }}
          spacing={2}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className="test-select-login-button"
              onClick={handleLoginButton}
              style={{ width: "100%" }}
            >
              Create A Vote
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className="test-select-login-button"
              component={Link}
              to="/VoteLogin"
              style={{ width: "100%" }}
            >
              Vote
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
};

export const LoginScreenVote: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();

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
        navigate("/Vote");

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
            color="primary"
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
  const navigate = useNavigate();

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
        navigate("/CreateVote");

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
