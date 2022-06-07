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
import { Home, Foo, Bar } from "./Topics";
/**
 * React component for the entry point into the application.
 */
// APP_BEGIN
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
        <div>
          <Routes>
            {/* <Route path="/" component={Home} /> */}
            <Route path="/" element={<VoteScreen />}></Route>
            <Route
              path="/CreateVote"
              element={
                <MainScreen onLogout={() => setCredentials(undefined)} />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </DamlLedger>
  ) : (
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

    //
  );
};
// APP_END

export default App;
