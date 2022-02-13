// Generated from Main.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type Give = {
  newOwner: damlTypes.Party;
};

export declare const Give:
  damlTypes.Serializable<Give> & {
  }
;


export declare type Asset = {
  issuer: damlTypes.Party;
  owner: damlTypes.Party;
  name: string;
};

export declare interface AssetInterface {
  Archive: damlTypes.Choice<Asset, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  Give: damlTypes.Choice<Asset, Give, damlTypes.ContractId<Asset>, undefined>;
}
export declare const Asset:
  damlTypes.Template<Asset, undefined, 'dd786cdd87c9db6d4acc982651fb6d292f6ac08fb2c8421e3891249ca307815e:Main:Asset'> & AssetInterface;

export declare namespace Asset {
  export type CreateEvent = damlLedger.CreateEvent<Asset, undefined, typeof Asset.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Asset, typeof Asset.templateId>
  export type Event = damlLedger.Event<Asset, undefined, typeof Asset.templateId>
  export type QueryResult = damlLedger.QueryResult<Asset, undefined, typeof Asset.templateId>
}


