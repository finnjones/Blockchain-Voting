// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { LoginScreenVote, LoginScreenCreateVote } from "./LoginScreen";
import MainScreen from "./MainScreen";
import VoteScreen from "./VoteScreen";
import DamlLedger from "@daml/react";
import Credentials from "../Credentials";
import { httpBaseUrl } from "../config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./Home";
// import { Home, Foo, Bar } from "./Topics";
import VoteAnalytics from "./VoteAnalytics";
import MainView from "./MainView";
import { createTheme, ThemeProvider } from "@mui/material";
/**
 * React component for the entry point into the application.
 */
// APP_BEGIN

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2",
    },
    primary: {
      main: "#387DF6",
    },
    secondary: {
      main: "#666666",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    subtitle1: {
      fontSize: 16,
    },
    h5: {
      fontWeight: 700,
      fontSize: 24,
    },
    h6: {
      fontWeight: 500,
    },
  },
});
const themeDark = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
    primary: {
      main: "#387DF6",
    },
    secondary: {
      main: "#666666",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    subtitle1: {
      fontSize: 16,
    },
    h5: {
      fontWeight: 700,
      fontSize: 24,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const App: React.FC = () => {
  const [credentials, setCredentials] = React.useState<
    Credentials | undefined
  >();

  return credentials ? (
    <DamlLedger
      token={credentials.token}
      party={credentials.party}
      httpBaseUrl={httpBaseUrl}
    >
      <Router>
        <ThemeProvider theme={themeLight}>
          <div>
            <MainScreen onLogout={() => setCredentials(undefined)} />

            <Routes>
              {/* <Route path="/" component={Home} /> */}
              <Route path="/" element={<VoteScreen />}></Route>
              <Route path="/CreateVote" element={<MainView />}></Route>
              <Route path="/VoteAnalytics" element={<VoteAnalytics />}></Route>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </DamlLedger>
  ) : (
    <Router>
      <ThemeProvider theme={themeLight}>
        <div>
          <Routes>
            {/* <Route path="/" component={Home} /> */}
            <Route
              path="/"
              element={<LoginScreenVote onLogin={setCredentials} />}
            ></Route>
            <Route
              path="/CreateVote"
              element={<LoginScreenCreateVote onLogin={setCredentials} />}
            ></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </Router>

    //
  );
};
// APP_END

export default App;
