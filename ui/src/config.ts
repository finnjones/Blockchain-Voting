import { encode } from 'jwt-simple';

export type Insecure = {
  provider: "none",
  makeToken: (party: string) => string,
  ledgerId: string
};


export const isLocalDev = process.env.NODE_ENV === 'development';
export type Authentication = Insecure;

export const authConfig: Authentication = (() => {
    const ledgerId: string = process.env.REACT_APP_LEDGER_ID ?? "votencrypt-sandbox"
    const auth: Insecure = {
      provider: "none",
      ledgerId: ledgerId,
      makeToken: (party) => {
        const payload = {
          "https://daml.com/ledger-api": {
            "ledgerId": ledgerId,
            "applicationId": 'votencrypt',
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
export const wsBaseUrl = isLocalDev ? 'ws://localhost:7575/' : undefined;
