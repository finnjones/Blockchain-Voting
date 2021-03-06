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
  decoder: damlTypes.lazyMemo(function () { return jtv.object({voter: damlTypes.Party.decoder, accept: damlTypes.Bool.decoder, }); }),
  encode: function (__typed__) {
  return {
    voter: damlTypes.Party.encode(__typed__.voter),
    accept: damlTypes.Bool.encode(__typed__.accept),
  };
}
,
};



exports.CreateVote = {
  templateId: '9a5f860eb725edd58868ca66e747dd3774cc7f99c3d2e4e5c2237754719c4cf1:Voting:CreateVote',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({creator: damlTypes.Party.decoder, subject: damlTypes.Text.decoder, voted: damlTypes.List(damlTypes.Party).decoder, voters: damlTypes.List(damlTypes.Party).decoder, votes: damlTypes.List(damlTypes.Bool).decoder, }); }),
  encode: function (__typed__) {
  return {
    creator: damlTypes.Party.encode(__typed__.creator),
    subject: damlTypes.Text.encode(__typed__.subject),
    voted: damlTypes.List(damlTypes.Party).encode(__typed__.voted),
    voters: damlTypes.List(damlTypes.Party).encode(__typed__.voters),
    votes: damlTypes.List(damlTypes.Bool).encode(__typed__.votes),
  };
}
,
  Archive: {
    template: function () { return exports.CreateVote; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Vote: {
    template: function () { return exports.CreateVote; },
    choiceName: 'Vote',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Vote.decoder; }),
    argumentEncode: function (__typed__) { return exports.Vote.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.CreateVote);

