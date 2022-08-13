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


exports.Vote = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({voter: damlTypes.Party.decoder, vote: damlTypes.Text.decoder, unixTime: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    voter: damlTypes.Party.encode(__typed__.voter),
    vote: damlTypes.Text.encode(__typed__.vote),
    unixTime: damlTypes.Int.encode(__typed__.unixTime),
  };
}
,
};



exports.Voting = {
  templateId: '882924905da2ef1e5c9a7c6b53d0ec1554a7ce58f5ae313b605a0d71a508a643:Voting:Voting',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return damlTypes.Party.decoder; }); }),
  keyEncode: function (__typed__) { return damlTypes.Party.encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({username: damlTypes.Party.decoder, voters: damlTypes.List(damlTypes.Party).decoder, votes: damlTypes.List(damlTypes.Text).decoder, voted: damlTypes.List(damlTypes.Party).decoder, voteTimes: damlTypes.List(damlTypes.Int).decoder, candidates: damlTypes.List(damlTypes.Text).decoder, subject: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    username: damlTypes.Party.encode(__typed__.username),
    voters: damlTypes.List(damlTypes.Party).encode(__typed__.voters),
    votes: damlTypes.List(damlTypes.Text).encode(__typed__.votes),
    voted: damlTypes.List(damlTypes.Party).encode(__typed__.voted),
    voteTimes: damlTypes.List(damlTypes.Int).encode(__typed__.voteTimes),
    candidates: damlTypes.List(damlTypes.Text).encode(__typed__.candidates),
    subject: damlTypes.Text.encode(__typed__.subject),
  };
}
,
  Archive: {
    template: function () { return exports.Voting; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Vote: {
    template: function () { return exports.Voting; },
    choiceName: 'Vote',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Vote.decoder; }),
    argumentEncode: function (__typed__) { return exports.Vote.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Voting).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Voting).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.Voting);



exports.User = {
  templateId: '882924905da2ef1e5c9a7c6b53d0ec1554a7ce58f5ae313b605a0d71a508a643:Voting:User',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return damlTypes.Party.decoder; }); }),
  keyEncode: function (__typed__) { return damlTypes.Party.encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({username: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    username: damlTypes.Party.encode(__typed__.username),
  };
}
,
  Archive: {
    template: function () { return exports.User; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.User);

