// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { encode } from 'jwt-simple';

export type Insecure = {
  provider: "none",
  makeToken: (party: string) => string,
  ledgerId: string
};



export type Authentication = Insecure;

export const authConfig: Authentication = (() => {
    const ledgerId: string = process.env.REACT_APP_LEDGER_ID ?? "create-daml-app-sandbox"
    const auth: Insecure = {
      provider: "none",
      ledgerId: ledgerId,
      makeToken: (party) => {
        const payload = {
          "https://daml.com/ledger-api": {
            "ledgerId": ledgerId,
            "applicationId": 'create-daml-app',
            "actAs": [party]
          }
        }
        return encode(payload, "secret", "HS256");
      }
    };
    return auth;
  }
)();

export const httpBaseUrl = undefined;
export const wsBaseUrl = "ws://localhost:7575/";
