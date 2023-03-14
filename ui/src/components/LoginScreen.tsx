import React, { useCallback } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import Credentials from "../Credentials";
import Ledger from "@daml/ledger";
import { Voting } from "@daml.js/votencrypt";
import { authConfig, httpBaseUrl } from "../config";
import { createHash } from "crypto";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  onLogin: (credentials: Credentials) => void;
};

// Hashing function that converts a string to a hash using sha256
function hash(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

export let usernameExport: any;

/* A function that takes in a component and returns a component. It is used to wrap the components in
the landing page and the login page. */
const wrap: (c: JSX.Element) => JSX.Element = (component) => (
  <>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "95vh" }}
    >
      <Grid item>
        <Typography variant="h3" color="primary" textAlign="center">
          Votencrypt
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h6"
          fontWeight="600"
          color="primary"
          textAlign="center"
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
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      // style={{ height: "100vh" }}
    >
      <Typography color="secondary">
        © Votencrypt 2023 Website by{" "}
        <Link
          style={{ color: "secondary" }}
          target="_blank"
          to="https://linktr.ee/finnwjones"
        >
          {"Finn Jones"}
        </Link>
      </Typography>
    </Grid>
  </>
);
/**
 * This function is the landing page for the app. It has two buttons, one to create a vote and one to
 * vote. The create a vote button will take you to the login page if you are not logged in. If you are
 * logged in, it will take you to the create a vote page. The vote button will take you to the vote
 * login page
 * @param  - React.FC<Props> = ({ onLogin }) => {
 * @returns A function that returns a component
 */

export const LandingScreen: React.FC<Props> = ({ onLogin }) => {
  const { loginWithPopup } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = React.useState(false);

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

  const handleLogin = async () => {
    // if user is not undefined then run

    if (user !== undefined) {
      const { name, sub } = user;

      usernameExport = name;
      const hashedStub = hash(sub ? sub : "");
      await login({
        party: hashedStub,
        token: authConfig.makeToken(hashedStub),
      });
    }
  };
  const handleLoginButton = async () => {
    setLoading(true);
    if (isAuthenticated === false) {
      loginWithPopup({
        screen_hint: "signup",
      });
    }
  };
  if (isAuthenticated === true && loading === true) {
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
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleLoginButton}
              style={{ width: "100%" }}
              loading={loading}
            >
              Login
            </LoadingButton>
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

/* This function is the login page for voters. It has a text field to enter the vote key and a button
to vote. The vote button will take you to the vote page. */
export const LoginScreenVote: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

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

  const handleLogin = async () => {
    usernameExport = username;

    const hashedUsername = hash(username);

    await login({
      party: hashedUsername,
      token: authConfig.makeToken(hashedUsername),
    });
  };
  if (window.location.pathname.length <= "/VoteLogin/".length) {
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
                if (e.key === "Enter" && username !== "") {
                  e.preventDefault();
                  handleLogin();
                }
              }}
            />
          </Grid>

          <Grid item>
            <LoadingButton
              color="primary"
              onClick={(e) => {
                if (username !== "") {
                  setLoading(true);
                  e.preventDefault();
                  handleLogin();
                }
              }}
              loading={loading}
              variant="contained"
              style={{ width: "100%" }}
            >
              Vote
            </LoadingButton>
          </Grid>
        </Grid>
      </>
    );
  } else {
    // assign characters in url path after  "/VoteLogin/" to username
    if (username === "") {
      setUsername(
        window.location.pathname.substring(
          "/VoteLogin/".length,
          window.location.pathname.length
        )
      );
      handleLogin();
    }
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ display: "flex", height: "100vh" }}
      >
        <img src="/preLoader.svg" />
      </Box>
    );
  }
};
