// Generated from Voting.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657 from '@daml.js/97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657';
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
  voted: pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657.DA.Set.Types.Set<damlTypes.Party>;
  voters: damlTypes.Party[];
  votes: boolean[];
};

export declare interface CreateVoteInterface {
  Archive: damlTypes.Choice<CreateVote, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  Vote: damlTypes.Choice<CreateVote, Vote, {}, undefined>;
}
export declare const CreateVote:
  damlTypes.Template<CreateVote, undefined, '398dc4d171b4e77876a6a3ce7d99fecb5f4fe0436d17146df0779fbc593e8481:Voting:CreateVote'> & CreateVoteInterface;

export declare namespace CreateVote {
  export type CreateEvent = damlLedger.CreateEvent<CreateVote, undefined, typeof CreateVote.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CreateVote, typeof CreateVote.templateId>
  export type Event = damlLedger.Event<CreateVote, undefined, typeof CreateVote.templateId>
  export type QueryResult = damlLedger.QueryResult<CreateVote, undefined, typeof CreateVote.templateId>
}


