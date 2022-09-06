import React from "react";
import { LoginScreenVote, LandingScreen } from "./LoginScreen";
import { LogoutConfirm, PageNotFound } from "./CatchNotFound";
import MainScreen from "./MainScreen";
import VoteScreen from "./VoteScreen";
import DamlLedger from "@daml/react";
import Credentials from "../Credentials";
import { httpBaseUrl, wsBaseUrl } from "../config";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
// import Loadable from "react-loadable";
import MainView from "./MainView";

import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";

import VoteAnalytics from "./VoteAnalytics";
import VoteManagement from "./VoteManagement";

const App: React.FC = () => {
  const [credentials, setCredentials] = React.useState<
    Credentials | undefined
  >();
  // create a dark theme light theme switcher
  const preferedScheme = useMediaQuery("(prefers-color-scheme: dark)");

  /* Creating a theme for the app. */
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
          fontFamily: "'Inter', sans-serif",
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

  return credentials ? (
    <DamlLedger
      token={credentials.token}
      party={credentials.party}
      httpBaseUrl={httpBaseUrl}
      wsBaseUrl={wsBaseUrl}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <div>
          {/* React router handles the browser url routing */}
          <Routes>
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
                  {" "}
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
      <CssBaseline enableColorScheme />

      <div>
        <Routes>
          <Route
            path="/VoteLogin/*"
            element={<LoginScreenVote onLogin={setCredentials} />}
          ></Route>
          <Route
            path="/VoteLogin"
            element={<LoginScreenVote onLogin={setCredentials} />}
          ></Route>
          <Route
            path="*"
            element={<LandingScreen onLogin={setCredentials} />}
          ></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
