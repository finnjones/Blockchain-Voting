// Generated from User.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type CreateVote = {
  inputSubject: string;
};

export declare const CreateVote:
  damlTypes.Serializable<CreateVote> & {
  }
;


export declare type Vote = {
  vote: boolean;
};

export declare const Vote:
  damlTypes.Serializable<Vote> & {
  }
;


export declare type Follow = {
  userToFollow: damlTypes.Party;
};

export declare const Follow:
  damlTypes.Serializable<Follow> & {
  }
;


export declare type User = {
  username: damlTypes.Party;
  following: damlTypes.Party[];
  votes: boolean[];
  subject: string;
};

export declare interface UserInterface {
  Follow: damlTypes.Choice<User, Follow, damlTypes.ContractId<User>, User.Key>;
  Vote: damlTypes.Choice<User, Vote, damlTypes.ContractId<User>, User.Key>;
  Archive: damlTypes.Choice<User, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, User.Key>;
  CreateVote: damlTypes.Choice<User, CreateVote, damlTypes.ContractId<User>, User.Key>;
}
export declare const User:
  damlTypes.Template<User, User.Key, 'c49f8dc6f8b550d45b85fb235a0273f1288ca45e9ba4c9e7facf32c0e0f7a680:User:User'> & UserInterface;

export declare namespace User {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<User, User.Key, typeof User.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<User, typeof User.templateId>
  export type Event = damlLedger.Event<User, User.Key, typeof User.templateId>
  export type QueryResult = damlLedger.QueryResult<User, User.Key, typeof User.templateId>
}


