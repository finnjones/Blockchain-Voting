// Generated from VotingExample.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657 from '@daml.js/97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type Decision = {
  issuer: damlTypes.Party;
  proposal: Proposal;
  voters: pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657.DA.Set.Types.Set<damlTypes.Party>;
  accept: boolean;
};

export declare interface DecisionInterface {
  Archive: damlTypes.Choice<Decision, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
}
export declare const Decision:
  damlTypes.Template<Decision, undefined, '8d553aff487fd71f85c9c6698dcf96555185da2beded887460a7962bd8cfab73:VotingExample:Decision'> & DecisionInterface;

export declare namespace Decision {
  export type CreateEvent = damlLedger.CreateEvent<Decision, undefined, typeof Decision.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Decision, typeof Decision.templateId>
  export type Event = damlLedger.Event<Decision, undefined, typeof Decision.templateId>
  export type QueryResult = damlLedger.QueryResult<Decision, undefined, typeof Decision.templateId>
}



export declare type Vote = {
  voter: damlTypes.Party;
  accept: boolean;
};

export declare const Vote:
  damlTypes.Serializable<Vote> & {
  }
;


export declare type Decide = {
};

export declare const Decide:
  damlTypes.Serializable<Decide> & {
  }
;


export declare type Add = {
  voter: damlTypes.Party;
};

export declare const Add:
  damlTypes.Serializable<Add> & {
  }
;


export declare type Ballot = {
  issuer: damlTypes.Party;
  proposal: Proposal;
  voters: pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657.DA.Set.Types.Set<damlTypes.Party>;
  voted: pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657.DA.Set.Types.Set<damlTypes.Party>;
  votes: boolean[];
};

export declare interface BallotInterface {
  Archive: damlTypes.Choice<Ballot, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, Ballot.Key>;
  Add: damlTypes.Choice<Ballot, Add, {}, Ballot.Key>;
  Vote: damlTypes.Choice<Ballot, Vote, {}, Ballot.Key>;
  Decide: damlTypes.Choice<Ballot, Decide, damlTypes.ContractId<Decision>, Ballot.Key>;
}
export declare const Ballot:
  damlTypes.Template<Ballot, Ballot.Key, '8d553aff487fd71f85c9c6698dcf96555185da2beded887460a7962bd8cfab73:VotingExample:Ballot'> & BallotInterface;

export declare namespace Ballot {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Party, Proposal>
  export type CreateEvent = damlLedger.CreateEvent<Ballot, Ballot.Key, typeof Ballot.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Ballot, typeof Ballot.templateId>
  export type Event = damlLedger.Event<Ballot, Ballot.Key, typeof Ballot.templateId>
  export type QueryResult = damlLedger.QueryResult<Ballot, Ballot.Key, typeof Ballot.templateId>
}



export declare type Proposal = {
  proposer: damlTypes.Party;
  text: string;
};

export declare const Proposal:
  damlTypes.Serializable<Proposal> & {
  }
;

