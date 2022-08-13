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


exports.CreateVote = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({inputSubject: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    inputSubject: damlTypes.Text.encode(__typed__.inputSubject),
  };
}
,
};



exports.Vote = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({vote: damlTypes.Bool.decoder, }); }),
  encode: function (__typed__) {
  return {
    vote: damlTypes.Bool.encode(__typed__.vote),
  };
}
,
};



exports.Follow = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({userToFollow: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    userToFollow: damlTypes.Party.encode(__typed__.userToFollow),
  };
}
,
};



exports.User = {
  templateId: 'c49f8dc6f8b550d45b85fb235a0273f1288ca45e9ba4c9e7facf32c0e0f7a680:User:User',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return damlTypes.Party.decoder; }); }),
  keyEncode: function (__typed__) { return damlTypes.Party.encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({username: damlTypes.Party.decoder, following: damlTypes.List(damlTypes.Party).decoder, votes: damlTypes.List(damlTypes.Bool).decoder, subject: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    username: damlTypes.Party.encode(__typed__.username),
    following: damlTypes.List(damlTypes.Party).encode(__typed__.following),
    votes: damlTypes.List(damlTypes.Bool).encode(__typed__.votes),
    subject: damlTypes.Text.encode(__typed__.subject),
  };
}
,
  Follow: {
    template: function () { return exports.User; },
    choiceName: 'Follow',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Follow.decoder; }),
    argumentEncode: function (__typed__) { return exports.Follow.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.User).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.User).encode(__typed__); },
  },
  Vote: {
    template: function () { return exports.User; },
    choiceName: 'Vote',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Vote.decoder; }),
    argumentEncode: function (__typed__) { return exports.Vote.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.User).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.User).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.User; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  CreateVote: {
    template: function () { return exports.User; },
    choiceName: 'CreateVote',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CreateVote.decoder; }),
    argumentEncode: function (__typed__) { return exports.CreateVote.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.User).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.User).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.User);

