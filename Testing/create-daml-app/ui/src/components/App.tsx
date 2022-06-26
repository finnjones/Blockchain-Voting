// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { LoginScreen, LoginScreenCreateVote } from "./LoginScreen";
import MainScreen from "./MainScreen";
import VoteScreen from "./VoteScreen";
import DamlLedger from "@daml/react";
import Credentials from "../Credentials";
import { httpBaseUrl } from "../config";
import { HashRouter as Router, Route, Link, Routes } from "react-router-dom";
// import Home from "./Home";
// import { Home, Foo, Bar } from "./Topics";
import VoteAnalitics from "./VoteAnalitics";
import MainView from "./MainView";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, purple } from "@mui/material/colors";
/**
 * React component for the entry point into the application.
 */
// APP_BEGIN

const theme = createTheme({
  palette: {
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
        <ThemeProvider theme={theme}>
          <div>
            <MainScreen onLogout={() => setCredentials(undefined)} />

            <Routes>
              {/* <Route path="/" component={Home} /> */}
              <Route path="/" element={<VoteScreen />}></Route>
              <Route path="/CreateVote" element={<MainView />}></Route>
              <Route path="/VoteAnalitics" element={<VoteAnalitics />}></Route>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </DamlLedger>
  ) : (
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <div>
            <Routes>
              {/* <Route path="/" component={Home} /> */}
              <Route
                path="/"
                element={<LoginScreen onLogin={setCredentials} />}
              ></Route>
              <Route
                path="/CreateVote"
                element={<LoginScreenCreateVote onLogin={setCredentials} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </>
    </ThemeProvider>

    //
  );
};
// APP_END

export default App;
