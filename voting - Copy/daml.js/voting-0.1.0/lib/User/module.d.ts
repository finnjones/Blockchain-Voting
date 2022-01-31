// Generated from User.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type Ballot = {
  creator: damlTypes.Party;
  proposal: string;
};

export declare const Ballot:
  damlTypes.Template<Ballot, undefined, 'ade0d4dc42b4399d06323fc80112a0e3d84a6e9e80273950dd994cdd96e65349:User:Ballot'> & {
  Archive: damlTypes.Choice<Ballot, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace Ballot {
  export type CreateEvent = damlLedger.CreateEvent<Ballot, undefined, typeof Ballot.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Ballot, typeof Ballot.templateId>
  export type Event = damlLedger.Event<Ballot, undefined, typeof Ballot.templateId>
  export type QueryResult = damlLedger.QueryResult<Ballot, undefined, typeof Ballot.templateId>
}



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
  candidates: damlTypes.Party[];
};

export declare const User:
  damlTypes.Template<User, User.Key, 'ade0d4dc42b4399d06323fc80112a0e3d84a6e9e80273950dd994cdd96e65349:User:User'> & {
  Archive: damlTypes.Choice<User, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, User.Key>;
  Follow: damlTypes.Choice<User, Follow, damlTypes.ContractId<User>, User.Key>;
};

export declare namespace User {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<User, User.Key, typeof User.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<User, typeof User.templateId>
  export type Event = damlLedger.Event<User, User.Key, typeof User.templateId>
  export type QueryResult = damlLedger.QueryResult<User, User.Key, typeof User.templateId>
}


