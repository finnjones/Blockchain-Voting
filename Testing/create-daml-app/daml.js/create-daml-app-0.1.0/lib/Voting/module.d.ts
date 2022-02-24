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
  accept: boolean;
};

export declare const Vote:
  damlTypes.Serializable<Vote> & {
  }
;


export declare type CreateVote = {
  creator: damlTypes.Party;
  subject: string;
  voted: damlTypes.Party[];
  voters: damlTypes.Party[];
  votes: boolean[];
};

export declare interface CreateVoteInterface {
  Archive: damlTypes.Choice<CreateVote, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  Vote: damlTypes.Choice<CreateVote, Vote, {}, undefined>;
}
export declare const CreateVote:
  damlTypes.Template<CreateVote, undefined, '5350a1f31dd5e698343097315e8159d3368ec9230d9ff3dad2d9feb6224035ab:Voting:CreateVote'> & CreateVoteInterface;

export declare namespace CreateVote {
  export type CreateEvent = damlLedger.CreateEvent<CreateVote, undefined, typeof CreateVote.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CreateVote, typeof CreateVote.templateId>
  export type Event = damlLedger.Event<CreateVote, undefined, typeof CreateVote.templateId>
  export type QueryResult = damlLedger.QueryResult<CreateVote, undefined, typeof CreateVote.templateId>
}


