// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  LoginScreenVote,
  LoginScreenCreateVote,
  LandingScreen,
} from "./LoginScreen";
import { LogoutConfirm, PageNotFound } from "./CatchNotFound";
import MainScreen from "./MainScreen";
import VoteManagement from "./VoteManagement";
import VoteScreen from "./VoteScreen";
import DamlLedger from "@daml/react";
import Credentials from "../Credentials";
import { httpBaseUrl } from "../config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import VoteAnalytics from "./VoteAnalytics";
import MainView from "./MainView";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";

export function themeSwitcher() {}

const App: React.FC = () => {
  const [credentials, setCredentials] = React.useState<
    Credentials | undefined
  >();
  // create a dark theme light theme switcher
  const preferedScheme = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: preferedScheme ? "dark" : "light",
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
      }),
    [preferedScheme]
  );
  // app.use((req: any, res: any, next: any) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   next();
  // });

  return credentials ? (
    <DamlLedger
      token={credentials.token}
      party={credentials.party}
      httpBaseUrl={httpBaseUrl}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          {/* <MainScreen onLogout={() => setCredentials(undefined)} /> */}

          <Routes>
            {/* <Route path="/" component={Home} /> */}
            <Route
              path="/Vote"
              element={
                <>
                  <VoteScreen onLogout={() => setCredentials(undefined)} />
                </>
              }
            ></Route>
            <Route
              path="/CreateVote"
              element={
                <>
                  <MainScreen onLogout={() => setCredentials(undefined)} />
                  <MainView />
                </>
              }
            ></Route>
            <Route
              path="/VoteAnalytics"
              element={
                <>
                  <MainScreen onLogout={() => setCredentials(undefined)} />
                  <VoteAnalytics />
                </>
              }
            ></Route>
            <Route
              path="/VoteManagement"
              element={
                <>
                  <MainScreen onLogout={() => setCredentials(undefined)} />
                  <VoteManagement />
                </>
              }
            ></Route>

            <Route
              path="*"
              element={
                <LogoutConfirm onLogout={() => setCredentials(undefined)} />
              }
            ></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </DamlLedger>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Routes>
          {/* <Route path="/" component={Home} /> */}

          <Route
            path="/"
            element={<LandingScreen onLogin={setCredentials} />}
          ></Route>
          <Route
            path="/VoteLogin"
            element={<LoginScreenVote onLogin={setCredentials} />}
          ></Route>
          <Route
            path="/CreateVoteLogin"
            element={<LoginScreenCreateVote onLogin={setCredentials} />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </ThemeProvider>

    //
  );
};
// APP_END

export default App;
