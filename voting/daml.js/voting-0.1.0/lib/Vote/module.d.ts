// Generated from Vote.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type VoteOffer = {
  voter: damlTypes.Party;
  votingFor: string;
  vote: damlTypes.Party;
};

export declare const VoteOffer:
  damlTypes.Template<VoteOffer, undefined, 'ade0d4dc42b4399d06323fc80112a0e3d84a6e9e80273950dd994cdd96e65349:Vote:VoteOffer'> & {
  Archive: damlTypes.Choice<VoteOffer, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace VoteOffer {
  export type CreateEvent = damlLedger.CreateEvent<VoteOffer, undefined, typeof VoteOffer.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<VoteOffer, typeof VoteOffer.templateId>
  export type Event = damlLedger.Event<VoteOffer, undefined, typeof VoteOffer.templateId>
  export type QueryResult = damlLedger.QueryResult<VoteOffer, undefined, typeof VoteOffer.templateId>
}



export declare type Offer = {
  newVoter: damlTypes.Party;
};

export declare const Offer:
  damlTypes.Serializable<Offer> & {
  }
;


export declare type Vote = {
  voter: damlTypes.Party;
  votingFor: string;
  vote: damlTypes.Party;
};

export declare const Vote:
  damlTypes.Template<Vote, undefined, 'ade0d4dc42b4399d06323fc80112a0e3d84a6e9e80273950dd994cdd96e65349:Vote:Vote'> & {
  Archive: damlTypes.Choice<Vote, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  Offer: damlTypes.Choice<Vote, Offer, damlTypes.ContractId<VoteOffer>, undefined>;
};

export declare namespace Vote {
  export type CreateEvent = damlLedger.CreateEvent<Vote, undefined, typeof Vote.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Vote, typeof Vote.templateId>
  export type Event = damlLedger.Event<Vote, undefined, typeof Vote.templateId>
  export type QueryResult = damlLedger.QueryResult<Vote, undefined, typeof Vote.templateId>
}


