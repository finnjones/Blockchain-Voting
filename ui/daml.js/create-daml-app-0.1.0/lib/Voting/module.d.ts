// Generated from Voting.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type Vote = {
  voter: damlTypes.Party;
  vote: string;
  unixTime: damlTypes.Int;
};

export declare const Vote:
  damlTypes.Serializable<Vote> & {
  }
;


export declare type Voting = {
  username: damlTypes.Party;
  voters: damlTypes.Party[];
  votes: string[];
  voted: damlTypes.Party[];
  voteTimes: damlTypes.Int[];
  candidates: string[];
  subject: string;
};

export declare interface VotingInterface {
  Archive: damlTypes.Choice<Voting, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, Voting.Key>;
  Vote: damlTypes.Choice<Voting, Vote, damlTypes.ContractId<Voting>, Voting.Key>;
}
export declare const Voting:
  damlTypes.Template<Voting, Voting.Key, '882924905da2ef1e5c9a7c6b53d0ec1554a7ce58f5ae313b605a0d71a508a643:Voting:Voting'> & VotingInterface;

export declare namespace Voting {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<Voting, Voting.Key, typeof Voting.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Voting, typeof Voting.templateId>
  export type Event = damlLedger.Event<Voting, Voting.Key, typeof Voting.templateId>
  export type QueryResult = damlLedger.QueryResult<Voting, Voting.Key, typeof Voting.templateId>
}



export declare type User = {
  username: damlTypes.Party;
};

export declare interface UserInterface {
  Archive: damlTypes.Choice<User, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, User.Key>;
}
export declare const User:
  damlTypes.Template<User, User.Key, '882924905da2ef1e5c9a7c6b53d0ec1554a7ce58f5ae313b605a0d71a508a643:Voting:User'> & UserInterface;

export declare namespace User {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<User, User.Key, typeof User.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<User, typeof User.templateId>
  export type Event = damlLedger.Event<User, User.Key, typeof User.templateId>
  export type QueryResult = damlLedger.QueryResult<User, User.Key, typeof User.templateId>
}


