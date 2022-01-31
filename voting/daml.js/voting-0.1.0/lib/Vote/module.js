"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');
/* eslint-disable-next-line no-unused-vars */
var damlLedger = require('@daml/ledger');

var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');


exports.VoteOffer = {
  templateId: 'ade0d4dc42b4399d06323fc80112a0e3d84a6e9e80273950dd994cdd96e65349:Vote:VoteOffer',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({voter: damlTypes.Party.decoder, votingFor: damlTypes.Text.decoder, vote: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    voter: damlTypes.Party.encode(__typed__.voter),
    votingFor: damlTypes.Text.encode(__typed__.votingFor),
    vote: damlTypes.Party.encode(__typed__.vote),
  };
}
,
  Archive: {
    template: function () { return exports.VoteOffer; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.VoteOffer);



exports.Offer = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({newVoter: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    newVoter: damlTypes.Party.encode(__typed__.newVoter),
  };
}
,
};



exports.Vote = {
  templateId: 'ade0d4dc42b4399d06323fc80112a0e3d84a6e9e80273950dd994cdd96e65349:Vote:Vote',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({voter: damlTypes.Party.decoder, votingFor: damlTypes.Text.decoder, vote: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    voter: damlTypes.Party.encode(__typed__.voter),
    votingFor: damlTypes.Text.encode(__typed__.votingFor),
    vote: damlTypes.Party.encode(__typed__.vote),
  };
}
,
  Archive: {
    template: function () { return exports.Vote; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Offer: {
    template: function () { return exports.Vote; },
    choiceName: 'Offer',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Offer.decoder; }),
    argumentEncode: function (__typed__) { return exports.Offer.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.VoteOffer).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.VoteOffer).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.Vote);

