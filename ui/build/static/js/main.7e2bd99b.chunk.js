(this.webpackJsonpvotencrypt=this.webpackJsonpvotencrypt||[]).push([[0],{416:function(e,t,n){},421:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(422))},422:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(173),c=n(211),r=(n(133),n(423));t.Vote={decoder:c.lazyMemo((function(){return a.object({voter:c.Party.decoder,vote:c.Text.decoder,unixTime:c.Int.decoder})})),encode:function(e){return{voter:c.Party.encode(e.voter),vote:c.Text.encode(e.vote),unixTime:c.Int.encode(e.unixTime)}}},t.Voting={templateId:"5ea1b66908dcd5d9a7a2e7417b1c1a22a1ed31a424113939d3478c2e94172e73:Voting:Voting",keyDecoder:c.lazyMemo((function(){return c.lazyMemo((function(){return c.Party.decoder}))})),keyEncode:function(e){return c.Party.encode(e)},decoder:c.lazyMemo((function(){return a.object({username:c.Party.decoder,deadLine:c.Text.decoder,voters:c.List(c.Party).decoder,votes:c.List(c.Text).decoder,voted:c.List(c.Party).decoder,voteTimes:c.List(c.Int).decoder,options:c.List(c.Text).decoder,subject:c.Text.decoder})})),encode:function(e){return{username:c.Party.encode(e.username),deadLine:c.Text.encode(e.deadLine),voters:c.List(c.Party).encode(e.voters),votes:c.List(c.Text).encode(e.votes),voted:c.List(c.Party).encode(e.voted),voteTimes:c.List(c.Int).encode(e.voteTimes),options:c.List(c.Text).encode(e.options),subject:c.Text.encode(e.subject)}},Archive:{template:function(){return t.Voting},choiceName:"Archive",argumentDecoder:c.lazyMemo((function(){return r.DA.Internal.Template.Archive.decoder})),argumentEncode:function(e){return r.DA.Internal.Template.Archive.encode(e)},resultDecoder:c.lazyMemo((function(){return c.Unit.decoder})),resultEncode:function(e){return c.Unit.encode(e)}},Vote:{template:function(){return t.Voting},choiceName:"Vote",argumentDecoder:c.lazyMemo((function(){return t.Vote.decoder})),argumentEncode:function(e){return t.Vote.encode(e)},resultDecoder:c.lazyMemo((function(){return c.ContractId(t.Voting).decoder})),resultEncode:function(e){return c.ContractId(t.Voting).encode(e)}}},c.registerTemplate(t.Voting),t.User={templateId:"5ea1b66908dcd5d9a7a2e7417b1c1a22a1ed31a424113939d3478c2e94172e73:Voting:User",keyDecoder:c.lazyMemo((function(){return c.lazyMemo((function(){return c.Party.decoder}))})),keyEncode:function(e){return c.Party.encode(e)},decoder:c.lazyMemo((function(){return a.object({username:c.Party.decoder})})),encode:function(e){return{username:c.Party.encode(e.username)}},Archive:{template:function(){return t.User},choiceName:"Archive",argumentDecoder:c.lazyMemo((function(){return r.DA.Internal.Template.Archive.decoder})),argumentEncode:function(e){return r.DA.Internal.Template.Archive.encode(e)},resultDecoder:c.lazyMemo((function(){return c.Unit.decoder})),resultEncode:function(e){return c.Unit.encode(e)}}},c.registerTemplate(t.User)},423:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(424);t.DA=a,t.packageId="d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662"},424:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(425);t.Internal=a},425:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(426);t.Template=a},426:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(427))},427:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(173),c=n(211);n(133);t.Archive={decoder:c.lazyMemo((function(){return a.object({})})),encode:function(e){return{}}}},433:function(e,t){},435:function(e,t){},445:function(e,t){},447:function(e,t){},473:function(e,t){},475:function(e,t){},476:function(e,t){},481:function(e,t){},483:function(e,t){},489:function(e,t){},491:function(e,t){},510:function(e,t){},52:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(421);t.Voting=a,t.packageId="5ea1b66908dcd5d9a7a2e7417b1c1a22a1ed31a424113939d3478c2e94172e73"},522:function(e,t){},525:function(e,t){},662:function(e,t,n){"use strict";n.r(t);var a,c=n(0),r=n.n(c),o=n(76),i=n.n(o),s=(n(416),n(8)),l=n(81),j=n(43),d=n.n(j),u=n(763),b=n(768),h=n(769),x=n(764),O=n(752),p=n(773),v=n(133),m=n.n(v),f=n(52),g=n(365),y=function(){var e,t=null!==(e=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_AUTH0_DOMAIN:"votencrypt.au.auth0.com",REACT_APP_AUTH0_CLIENT_ID:"MeM1EPfpL5s7EG7hdki3aBTQa5wuCcYu"}).REACT_APP_LEDGER_ID)&&void 0!==e?e:"votencrypt-sandbox";return{provider:"none",ledgerId:t,makeToken:function(e){var n={"https://daml.com/ledger-api":{ledgerId:t,applicationId:"votencrypt",actAs:[e]}};return Object(g.encode)(n,"secret","HS256")}}}(),k=void 0,V=n(134),w=n(31),C=n(54),S=n(117),T=n(754),A=n(1);function I(e){return Object(V.createHash)("sha256").update(e).digest("hex")}var L=function(e){return Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)(u.a,{container:!0,direction:"column",justifyContent:"center",alignItems:"center",style:{height:"100vh"},children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"h3",color:"primary",textAlign:"center",children:"Votencrypt"})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"h6",fontWeight:"600",color:"primary",textAlign:"center",children:"Secure Voting On The Blockchain"})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(h.a,{sx:{p:2,borderRadius:"16px"},elevation:2,children:e})})]})})},D=function(e){var t=e.onLogin,n=Object(S.b)().loginWithPopup,o=Object(S.b)(),i=o.user,j=o.isAuthenticated,b=r.a.useState(!1),h=Object(s.a)(b,2),O=h[0],p=h[1],v=Object(w.f)(),g=Object(c.useCallback)(function(){var e=Object(l.a)(d.a.mark((function e(n){var a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=new m.a({token:n.token,httpBaseUrl:k}),e.next=4,a.fetchByKey(f.Voting.User,n.party);case 4:if(null!==e.sent){e.next=10;break}return c={username:n.party},e.next=9,a.create(f.Voting.User,c);case 9:e.sent;case 10:v("/CreateVote"),t(n),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),alert("Unknown error:\n".concat(JSON.stringify(e.t0)));case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}(),[t]),V=function(){var e=Object(l.a)(d.a.mark((function e(){var t,n,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===i){e.next=6;break}return t=i.name,n=i.sub,a=t,c=I(n||""),e.next=6,g({party:c,token:y.makeToken(c)});case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(l.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p(!0),!1===j&&n({screen_hint:"signup"});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return!0===j&&!0===O?(V(),Object(A.jsx)(A.Fragment,{})):L(Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)(u.a,{container:!0,direction:"column",style:{width:"400px"},spacing:2,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(T.a,{variant:"contained",color:"primary",onClick:D,style:{width:"100%"},loading:O,children:"Login"})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(x.a,{variant:"contained",color:"primary",className:"test-select-login-button",component:C.b,to:"/VoteLogin",style:{width:"100%"},children:"Vote"})})]})}))},M=function(e){var t=e.onLogin,n=Object(w.f)(),o=r.a.useState(!1),i=Object(s.a)(o,2),j=i[0],b=i[1],h=Object(c.useCallback)(function(){var e=Object(l.a)(d.a.mark((function e(a){var c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,c=new m.a({token:a.token,httpBaseUrl:k}),e.next=4,c.fetchByKey(f.Voting.User,a.party);case 4:if(null!==e.sent){e.next=10;break}return r={username:a.party},e.next=9,c.create(f.Voting.User,r);case 9:e.sent;case 10:n("/Vote"),t(a),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),alert("Unknown error:\n".concat(JSON.stringify(e.t0)));case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}(),[t]),x=r.a.useState(""),v=Object(s.a)(x,2),g=v[0],V=v[1],C=function(){var e=Object(l.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=g,t=I(g),e.next=4,h({party:t,token:y.makeToken(t)});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return window.location.pathname.length<="/VoteLogin/".length?L(Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)(u.a,{container:!0,direction:"column",style:{width:"400px"},children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(O.a,{placeholder:"Enter Vote Key",value:g,className:"test-select-username-field",sx:{paddingBottom:2},style:{width:"100%"},onChange:function(e){return V(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&""!==g&&(e.preventDefault(),C())}})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(T.a,{color:"primary",onClick:function(e){""!==g&&(b(!0),e.preventDefault(),C())},loading:j,variant:"contained",style:{width:"100%"},children:"Vote"})})]})})):(""===g&&(V(window.location.pathname.substring("/VoteLogin/".length,window.location.pathname.length)),C()),Object(A.jsx)(p.a,{display:"flex",justifyContent:"center",alignItems:"center",sx:{display:"flex",height:"100vh"},children:Object(A.jsx)("img",{src:"/preLoader.svg"})}))},P=function(e){var t=e.onLogout,n=Object(w.f)();return Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(p.a,{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",style:{height:"100vh"},children:Object(A.jsxs)(h.a,{sx:{p:3,borderRadius:"16px"},elevation:2,children:[Object(A.jsx)(b.a,{variant:"h5",sx:{flexGrow:1},noWrap:!0,children:"Are you sure you want to logout?"}),Object(A.jsx)(x.a,{variant:"contained",color:"primary",component:C.b,to:"/",onClick:t,sx:{m:2},children:"Log Out"}),Object(A.jsx)(x.a,{variant:"contained",color:"primary",onClick:function(){return n(1)},sx:{m:2},children:"Take me back"})]})})})},E=function(){return Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(p.a,{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",style:{height:"100vh"},children:Object(A.jsxs)(h.a,{sx:{p:3,borderRadius:"16px"},elevation:2,children:[Object(A.jsx)(b.a,{variant:"h5",sx:{flexGrow:1},noWrap:!0,children:"Oops! Page not found."}),Object(A.jsx)(x.a,{variant:"contained",color:"primary",component:C.b,to:"/",sx:{m:2},children:"Go to home page"})]})})})},_=n(774),z=n(775),F=n(776),R=n(765),U=n(772),N=n(759),H=n(777),K=n(778),B=n(368),W=n.n(B),G=n(731),Q=n(732),Y=n(733),J=n(734),X=function(e){e.onLogout;var t=Object(S.b)().logout,n=r.a.useState(!1),c=Object(s.a)(n,2),o=c[0],i=c[1];return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(p.a,{sx:{flexGrow:1,m:2},children:Object(A.jsx)(_.a,{position:"static",sx:{borderRadius:"16px"},children:Object(A.jsxs)(z.a,{children:[Object(A.jsx)(F.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:function(){i(!0)},className:"menu-button",children:Object(A.jsx)(W.a,{})}),Object(A.jsx)(b.a,{variant:"h5",children:"Votencrypt"}),Object(A.jsx)(b.a,{sx:{flexGrow:1},noWrap:!0}),Object(A.jsx)(x.a,{variant:"outlined",color:"inherit",startIcon:Object(A.jsx)(G.a,{}),onClick:function(){t({returnTo:window.location.origin})},children:"Log Out"})]})})}),Object(A.jsxs)(b.a,{variant:"h3",textAlign:"center",color:"primary",sx:{padding:3},children:["Welcome, ",a]}),Object(A.jsx)(R.a,{anchor:"left",open:o,onClose:function(){return i(!1)},children:Object(A.jsxs)(p.a,{p:2,width:"250px",textAlign:"center",role:"presentation",children:[Object(A.jsx)(b.a,{variant:"h6",component:"div",children:"Menu"}),Object(A.jsxs)(U.a,{children:[Object(A.jsxs)(N.a,{button:!0,component:C.b,to:"/CreateVote",className:"test-select-list-item",children:[Object(A.jsx)(H.a,{children:Object(A.jsx)(Q.a,{})}),Object(A.jsx)(K.a,{primary:"Create Vote"})]}),Object(A.jsxs)(N.a,{button:!0,component:C.b,to:"/VoteAnalytics",className:"test-select-list-item",children:[Object(A.jsx)(H.a,{children:Object(A.jsx)(Y.a,{})}),Object(A.jsx)(K.a,{primary:"Analytics"})]}),Object(A.jsxs)(N.a,{button:!0,component:C.b,to:"/VoteManagement",className:"test-select-list-item",children:[Object(A.jsx)(H.a,{children:Object(A.jsx)(J.a,{})}),Object(A.jsx)(K.a,{primary:"Vote Management"})]})]})]})})]})},q=n(780),Z=n(781),$=n(56),ee=n.n($),te=n(779),ne=n(760),ae=n(735),ce=function(e){var t=e.heading,n=e.content,a=c.useState(!1),r=Object(s.a)(a,2),o=r[0],i=r[1];return Object(A.jsxs)("div",{children:[Object(A.jsx)(ne.a,{ariaLabel:"SpeedDial basic example",sx:{position:"fixed",bottom:16,right:16},icon:Object(A.jsx)(ae.a,{}),onClick:function(){i(!0)}}),Object(A.jsxs)(te.a,{open:o,onClose:function(e){i(!1)},children:[Object(A.jsx)(b.a,{variant:"h6",textAlign:"center",sx:{p:1},children:t}),Object(A.jsx)(p.a,{sx:{p:4},children:Object(A.jsx)(b.a,{variant:"h6",style:{whiteSpace:"pre-line"},children:n.split("\\n").map((function(e,t){return Object(A.jsx)("div",{children:e},t)}))})})]})]})},re=function(){var e,t,n,a,c,r,o,i,s,j=Object($.useLedger)(),O=Object($.useStreamQueries)(f.Voting.Voting),v=function(){var e=Object(l.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.archiveByKey(f.Voting.Voting,null===(t=O.contracts[0])||void 0===t?void 0:t.signatories[0]);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(A.jsxs)(q.a,{children:[Object(A.jsx)(p.a,{sx:{p:1},children:Object(A.jsxs)(h.a,{sx:{p:3,borderRadius:"16px"},elevation:2,children:[Object(A.jsxs)(u.a,{container:!0,spacing:0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(J.a,{sx:{fontSize:50},color:"primary"})}),Object(A.jsxs)(u.a,{item:!0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"h5",display:"block",children:"Vote Management"})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"subtitle1",color:"secondary",display:"block",style:{lineHeight:"15px"},children:"Manage active vote"})})]})]}),Object(A.jsxs)(h.a,{sx:{px:5,pb:3,borderRadius:"16px"},variant:"outlined",children:[Object(A.jsx)(b.a,{variant:"h6",sx:{pt:2},children:"Vote Description"}),null!==(e=null===(t=O.contracts[0])||void 0===t||null===(n=t.payload)||void 0===n?void 0:n.subject)&&void 0!==e?e:"No Active Vote",Object(A.jsx)(Z.a,{sx:{pt:2}}),Object(A.jsx)(b.a,{variant:"h6",sx:{pt:2},children:"Vote Options"}),Object(A.jsx)(U.a,{children:null!==(a=null===(c=O.contracts[0])||void 0===c||null===(r=c.payload)||void 0===r?void 0:r.options.map((function(e,t){return Object(A.jsx)(N.a,{children:Object(A.jsx)(K.a,{primary:t+1+". "+e})},e)})))&&void 0!==a?a:"No Active Vote"}),Object(A.jsx)(Z.a,{sx:{pt:2}}),Object(A.jsx)(b.a,{variant:"h6",sx:{pt:2},children:"Number of voters"}),null!==(o=null===(i=O.contracts[0])||void 0===i||null===(s=i.payload)||void 0===s?void 0:s.voters.length)&&void 0!==o?o:"No Active Vote"]}),Object(A.jsx)(p.a,{textAlign:"center",children:Object(A.jsx)(x.a,{variant:"contained",onClick:v,className:"button",name:"Arcive Vote",sx:{m:2,alignItems:"center"},children:"End Vote"})})]})}),Object(A.jsx)(ce,{heading:"Vote Management Help",content:" This page allows you to view the details of the current active vote. \\n You can end the vote by clicking the button at the bottom of the page. \\n By ending a vote, users will no longer be able to cast any more votes. \\n Once vote has been ended you will be able to create a new vote. "})]})},oe=n(761),ie=n(770),se=n(727),le=n(766),je=n(782),de=n(755),ue=n(736),be=n(737),he=n(260),xe=n.n(he),Oe={days:"00",hours:"00",minutes:"00",seconds:"00"};function pe(e,t){return t.diff(e,"seconds")%60}function ve(e,t){return t.diff(e,"minutes")%60}function me(e,t){return t.diff(e,"hours")%24}function fe(e,t){return t.diff(e,"days")}var ge=function(){var e,t,n=(null===(e=Object($.useStreamQueries)(f.Voting.Voting).contracts[0])||void 0===e||null===(t=e.payload)||void 0===t?void 0:t.deadLine)||"0",a=1e3*parseInt(n),r=Object(c.useState)(Oe),o=Object(s.a)(r,2),i=o[0],l=o[1];return Object(c.useEffect)((function(){var e=setInterval((function(){l(function(e){var t=xe()(e),n=xe()();return t.isBefore(n)?{days:"00",hours:"00",minutes:"00",seconds:"00"}:{seconds:pe(n,t).toString(),minutes:ve(n,t).toString(),hours:me(n,t).toString(),days:fe(n,t).toString()}}(a))}),1e3);return function(){return clearInterval(e)}}),[a]),"0"===n?Object(A.jsx)(b.a,{children:" "}):Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)(b.a,{variant:"h5",children:["Vote Ends In: ",i.days," Days ",i.hours," Hours"," ",i.minutes," Minutes ",i.seconds," Seconds"]})})},ye=function(e){var t,n,a,o,i,j,O,v,m=e.onLogout,g=Object($.useParty)(),y=Object($.useLedger)(),k=r.a.useState(!1),V=Object(s.a)(k,2),w=V[0],S=V[1],T=r.a.useState(!1),I=Object(s.a)(T,2),L=I[0],D=I[1],M=r.a.useState(""),P=Object(s.a)(M,2),E=P[0],_=P[1],z=function(e,t){"clickaway"!==t&&D(!1)},R=Object(A.jsx)(r.a.Fragment,{children:Object(A.jsx)(F.a,{size:"small","aria-label":"close",color:"inherit",onClick:z,children:Object(A.jsx)(ue.a,{fontSize:"small"})})}),H=Object($.useStreamQueries)(f.Voting.Voting),K=Object(c.useState)(""),B=Object(s.a)(K,2),W=B[0],Q=B[1],Y=(new Date).getTime(),J=function(){var e=Object(l.a)(d.a.mark((function e(){var t,n,a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===W){e.next=18;break}if(!(Y<1e3*parseInt(null===(t=H.contracts[0])||void 0===t||null===(n=t.payload)||void 0===n?void 0:n.deadLine))){e.next=14;break}if(null===(a=H.contracts[0])||void 0===a||!a.payload.voted.includes(g)){e.next=7;break}_("You have already voted"),D(!0),e.next=12;break;case 7:return e.next=9,y.exerciseByKey(f.Voting.Voting.Vote,null===(c=H.contracts[0])||void 0===c?void 0:c.signatories[0],{voter:g,vote:W,unixTime:Y.toString()}).catch(console.error);case 9:S(!0),_("Your vote has been cast. Please logout or close the browser tab"),D(!0);case 12:e.next=16;break;case 14:_("The voting period has ended"),D(!0);case 16:e.next=20;break;case 18:_("Please select an option"),D(!0);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return w?Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(p.a,{textAlign:"right",sx:{p:1},children:Object(A.jsx)(x.a,{variant:"outlined",color:"inherit",startIcon:Object(A.jsx)(G.a,{}),onClick:m,component:C.b,to:"/",children:"Log Out"})}),Object(A.jsx)(q.a,{children:Object(A.jsx)(u.a,{container:!0,direction:"column",justifyContent:"center",alignItems:"center",style:{height:"75vh"},children:Object(A.jsxs)(h.a,{sx:{p:3,borderRadius:"16px",width:"90%"},elevation:2,children:[Object(A.jsxs)(u.a,{container:!0,spacing:0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(be.a,{sx:{fontSize:50},color:"primary"})}),Object(A.jsxs)(u.a,{item:!0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"h5",display:"block",children:"Thank you for voting"})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"subtitle1",color:"secondary",display:"block",style:{lineHeight:"15px"},children:"Vote has been cast"})})]})]}),Object(A.jsx)(Z.a,{}),Object(A.jsx)(b.a,{variant:"h6",sx:{pt:2},children:"Vote Description"}),null!==(t=null===(n=H.contracts[0])||void 0===n||null===(a=n.payload)||void 0===a?void 0:a.subject)&&void 0!==t?t:"Invalid Vote Key",Object(A.jsx)(b.a,{variant:"h6",sx:{pt:2},children:"You Voted For"}),W,Object(A.jsx)(oe.a,{open:L,autoHideDuration:4e3,onClose:z,message:E,action:R})]})})})]}):Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(p.a,{textAlign:"right",sx:{p:1},children:Object(A.jsx)(x.a,{variant:"outlined",color:"inherit",startIcon:Object(A.jsx)(G.a,{}),onClick:m,component:C.b,to:"/",children:"Log Out"})}),Object(A.jsx)(q.a,{children:Object(A.jsx)(u.a,{container:!0,direction:"column",justifyContent:"center",alignItems:"center",style:{height:"75vh"},children:Object(A.jsxs)(h.a,{sx:{p:3,borderRadius:"16px",width:"90%"},elevation:2,children:[Object(A.jsxs)(u.a,{container:!0,spacing:0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(be.a,{sx:{fontSize:50},color:"primary"})}),Object(A.jsxs)(u.a,{item:!0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"h5",display:"block",children:"Vote"})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"subtitle1",color:"secondary",display:"block",style:{lineHeight:"15px"},children:"Read the vote description carefully and choose an option"})})]})]}),Object(A.jsx)(Z.a,{}),Object(A.jsx)(ge,{}),Object(A.jsx)(b.a,{variant:"h6",sx:{pt:2},children:"Vote Description"}),null!==(o=null===(i=H.contracts[0])||void 0===i||null===(j=i.payload)||void 0===j?void 0:j.subject)&&void 0!==o?o:"Invalid Vote Key",Object(A.jsx)(Z.a,{sx:{pb:2}}),Object(A.jsx)(p.a,{textAlign:"center",children:Object(A.jsxs)(ie.a,{children:[Object(A.jsx)(se.a,{id:"demo-radio-buttons-group-label",children:"Options"}),Object(A.jsx)(le.a,{"aria-labelledby":"demo-radio-buttons-group-label",defaultValue:"female",name:"radio-buttons-group",children:Object(A.jsx)(U.a,{children:null===(O=H.contracts[0])||void 0===O||null===(v=O.payload)||void 0===v?void 0:v.options.map((function(e){return Object(A.jsx)(N.a,{children:Object(A.jsx)(je.a,{value:e,control:Object(A.jsx)(de.a,{}),label:e,onChange:function(t){Q(e)}})},e)}))})})]})}),Object(A.jsx)(p.a,{textAlign:"center",children:Object(A.jsx)(x.a,{variant:"contained",onClick:J,className:"button",name:"Create Vote",sx:{m:2,alignItems:"center"},children:"Vote"})}),Object(A.jsx)(oe.a,{open:L,autoHideDuration:4e3,onClose:z,message:E,action:R})]})})})]})},ke=n(749),Ve=n(29),we=n(783),Ce=n(738),Se=n(199),Te=n(170),Ae=n(380),Ie=n(198),Le=n(762),De=n(382),Me=n(140),Pe=n(742),Ee=n(743),_e=n(744),ze=n(62),Fe=n(200),Re=n(387),Ue=n(369),Ne=n.n(Ue),He=function(){var e,t,n,a,r,o,i=Object($.useStreamQueries)(f.Voting.Voting),l=(null===(e=i.contracts[0])||void 0===e||null===(t=e.payload)||void 0===t?void 0:t.votes)||[],j=(null===(n=i.contracts[0])||void 0===n||null===(a=n.payload)||void 0===a?void 0:a.voters)||[],d=(null===(r=i.contracts[0])||void 0===r||null===(o=r.payload)||void 0===o?void 0:o.voteTimes)||[],x=Math.round(l.length/j.length*100)||0,O=Object(c.useMemo)((function(){if(0!==l.length){var e=new Map;return l.forEach((function(t){e.has(t)?e.set(t,(e.get(t)||1)+1):e.set(t,1)})),Object(Ve.a)(e).map((function(e){var t=Object(s.a)(e,2);return{name:t[0],value:t[1]}}))}return[{name:"No Data",value:0}]}),[l]),v=Object(c.useMemo)((function(){for(var e=[],t=0;t<O.length;t++)e.push("#".concat(Math.random().toString(16).slice(2,8)));return e}),[O]),m=Object(c.useMemo)((function(){if(0!==l.length){var e=new Map;return d.forEach((function(t){var n=t.slice(0,-5)+"00000";e.has(parseInt(n))?e.set(parseInt(n),(e.get(parseInt(n))||1)+1):e.set(parseInt(n),1)})),Object(Ve.a)(e).map((function(e){var t=Object(s.a)(e,2);return{time:t[0],value:t[1]}})).reverse()}return[{time:1,value:0}]}),[d]),g=function(e){var t=e.active,n=e.payload;return t?Object(A.jsx)(h.a,{sx:{px:2,py:1},children:Object(A.jsx)("div",{className:"custom-tooltip",children:Object(A.jsxs)(b.a,{children:["Votes: ",n[0].value]})})}):null};return Object(A.jsxs)(q.a,{children:[Object(A.jsx)(p.a,{sx:{p:1},children:Object(A.jsxs)(h.a,{sx:{p:3,borderRadius:"16px"},elevation:2,children:[Object(A.jsxs)(u.a,{container:!0,spacing:0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(Y.a,{sx:{fontSize:50},color:"primary"})}),Object(A.jsxs)(u.a,{item:!0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"h5",display:"block",children:"Vote Analytics"})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"subtitle1",color:"secondary",display:"block",style:{lineHeight:"15px"},children:"View current vote results"})})]})]}),Object(A.jsx)(Z.a,{}),Object(A.jsx)(p.a,{sx:{pt:3},children:Object(A.jsx)(ge,{})}),Object(A.jsxs)(b.a,{variant:"h5",children:["Votes Counted: ",x,"%"]}),Object(A.jsx)(we.a,{variant:"determinate",value:x}),Object(A.jsxs)(u.a,{container:!0,justifyContent:"center",alignItems:"center",children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsxs)(Ce.a,{width:400,height:100,data:O,children:[Object(A.jsx)(Se.a,{dataKey:"name"}),Object(A.jsx)(Te.a,{cursor:{fill:"transparent"},content:Object(A.jsx)(g,{active:"",payload:"",label:""})}),Object(A.jsx)(Ae.a,{dataKey:"value",fill:"#387DF6",children:O.map((function(e,t){return Object(A.jsx)(Ie.a,{fill:v[t]},"cell-".concat(t))}))})]})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsxs)(Le.a,{width:400,height:400,children:[Object(A.jsxs)(De.a,{data:O,dataKey:"value",nameKey:"name",children:[O.map((function(e,t){return Object(A.jsx)(Ie.a,{fill:v[t]},"cell-".concat(t))})),Object(A.jsx)(Me.a,{dataKey:"name"})]}),Object(A.jsx)(Te.a,{content:Object(A.jsx)(g,{active:"",payload:"",label:""})})]})})]}),Object(A.jsx)(b.a,{variant:"h5",textAlign:"center",children:"Votes Over Time"}),Object(A.jsx)(p.a,{style:{width:"100%",height:"20vh"},textAlign:"center",children:Object(A.jsx)(Pe.a,{width:"100%",height:"100%",children:Object(A.jsxs)(Ee.a,{width:500,height:300,data:m,margin:{top:5,right:30,left:20,bottom:20},children:[Object(A.jsx)(_e.a,{strokeDasharray:"3 3"}),Object(A.jsx)(Se.a,{dataKey:"time",tickFormatter:function(e){return Ne()(e).format("HH:mm Do")},children:Object(A.jsx)(ze.a,{value:"Time",fill:"#387DF6",position:"bottom"})}),Object(A.jsx)(Fe.a,{allowDecimals:!1,children:Object(A.jsx)(ze.a,{value:"Votes",fill:"#387DF6",angle:-90})}),Object(A.jsx)(Te.a,{content:Object(A.jsx)(g,{active:"",payload:"",label:""})}),Object(A.jsx)(Re.a,{type:"monotone",name:"Votes",dataKey:"value",stroke:"#387DF6",activeDot:{r:8}})]})})})]})}),Object(A.jsx)(ce,{heading:"Vote Analytics Help",content:" This page shows the current vote results and the vote progress. \\n The vote progress is the percentage of votes casted out of the total number of voters. \\n The votes over time chart shows the number of votes that have been cast in relationship to time \\n "})]})},Ke=n(69),Be=n(756),We=n(745),Ge=n(746),Qe=n(747),Ye=n(750),Je=n(391),Xe=n(751),qe=[],Ze=function(){var e=Object($.useParty)(),t=Object(c.useState)([]),a=Object(s.a)(t,2),o=a[0],i=a[1],j=Object(c.useState)([]),v=Object(s.a)(j,2),m=v[0],g=v[1],y=r.a.useState(10),k=Object(s.a)(y,2),w=k[0],C=k[1],S=Object(c.useState)(""),T=Object(s.a)(S,2),I=T[0],L=T[1],D=Object(c.useState)(""),M=Object(s.a)(D,2),P=M[0],E=M[1],_=r.a.useState(!1),z=Object(s.a)(_,2),R=z[0],H=z[1],B=r.a.useState(""),W=Object(s.a)(B,2),G=W[0],Y=W[1],J=r.a.useState(new Date),X=Object(s.a)(J,2),ee=X[0],te=X[1],ne=r.a.useState({Subject:!1,Option:!1}),ae=Object(s.a)(ne,2),re=ae[0],ie=ae[1],se=r.a.useState(!0),le=Object(s.a)(se,2),je=le[0],de=le[1],be=Object($.useStreamQueries)(f.Voting.Voting),he=new Date,xe=Object($.useLedger)(),Oe=n(134),pe=function(){var t=Object(l.a)(d.a.mark((function t(n){var a,c,r,i;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),a={Subject:!1,Option:!1},a=0===I.length?Object(Ke.a)(Object(Ke.a)({},a),{},{Subject:!0}):Object(Ke.a)(Object(Ke.a)({},a),{},{Subject:!1}),a=0===o.length?Object(Ke.a)(Object(Ke.a)({},a),{},{Option:!0}):Object(Ke.a)(Object(Ke.a)({},a),{},{Option:!1}),ie(a),null!==ee&&""!==I&&0!==o.length&&ee.getTime()>he.getTime()&&(0===be.contracts.length?(c=ve(w),g(c[0]),r=null!==ee?Math.floor(ee.getTime()/1e3):0,i={username:e,deadLine:r.toString(),voters:qe,votes:[],voted:[],voteTimes:[],options:o,subject:I},xe.create(f.Voting.Voting,i),Y("Vote Created. Save Keys Before Closing App"),H(!0),de(!1)):(Y("Vote In Progress"),H(!0)));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();var ve=function(e){for(var t=0;t<e;t++){var n=Oe.randomBytes(20).toString("hex");m.push("".concat(n)),qe.push((a=n,Object(V.createHash)("sha256").update(a).digest("hex")))}var a;return[m,qe]},me=function(){o.includes(P)?(Y("Option already exists"),H(!0)):(E(""),i([P].concat(Object(Ve.a)(o))))},fe=function(e,t){"clickaway"!==t&&H(!1)},ge=Object(A.jsx)(r.a.Fragment,{children:Object(A.jsx)(F.a,{size:"small","aria-label":"close",color:"inherit",onClick:fe,children:Object(A.jsx)(ue.a,{fontSize:"small"})})});return Object(A.jsxs)(q.a,{children:[Object(A.jsx)(p.a,{sx:{p:1},children:Object(A.jsxs)(h.a,{sx:{p:3,borderRadius:"16px"},elevation:2,children:[Object(A.jsxs)("div",{style:{display:"flex",alignItems:"center",flexWrap:"wrap"},children:[Object(A.jsx)(Q.a,{sx:{fontSize:45},color:"primary"}),Object(A.jsx)(b.a,{variant:"h5",children:"Create A Vote"})]}),Object(A.jsx)(Z.a,{sx:{p:0}}),Object(A.jsx)(b.a,{variant:"h6",sx:{pt:2},children:"What is the vote on?"}),Object(A.jsx)(p.a,{textAlign:"center",children:Object(A.jsx)(O.a,{id:"outlined-basic",label:"Subject",variant:"outlined",value:I,onClick:function(){ie(Object(Ke.a)(Object(Ke.a)({},re),{},{Subject:!1}))},onChange:function(e){L(e.target.value)},error:re.Subject,style:{width:"94%"},sx:{m:2}})}),Object(A.jsxs)(b.a,{variant:"h6",children:["Voters: ",w]}),Object(A.jsx)(p.a,{textAlign:"center",children:Object(A.jsx)(Be.a,{value:w,"aria-label":"Default",valueLabelDisplay:"auto",name:"slider",sx:{m:2},style:{width:"95%"},onChange:function(e){C(e.target.value)}})}),Object(A.jsxs)(b.a,{variant:"h6",children:["Options: ",o.length]}),Object(A.jsxs)(p.a,{textAlign:"center",children:[Object(A.jsx)(O.a,{id:"outlined-basic",label:"Option",variant:"outlined",value:P,error:re.Option,onClick:function(){ie(Object(Ke.a)(Object(Ke.a)({},re),{},{Option:!1}))},onChange:function(e){E(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&(e.preventDefault(),me())},style:{width:"95%"},sx:{m:2},InputProps:{endAdornment:Object(A.jsx)(F.a,{onClick:me,children:Object(A.jsx)(We.a,{})})}}),Object(A.jsx)(U.a,{style:{width:"95%"},sx:{ml:2},children:o.map((function(e){return Object(A.jsx)(N.a,{secondaryAction:Object(A.jsx)(F.a,{edge:"end","aria-label":"delete",onClick:function(t){i((function(t){return t.filter((function(t){return t!==e}))}))},children:Object(A.jsx)(Ge.a,{})}),children:Object(A.jsx)(K.a,{primary:e})},e)}))})]}),Object(A.jsx)(p.a,{textAlign:"center",children:Object(A.jsx)(Je.a,{dateAdapter:Ye.a,children:Object(A.jsx)(Xe.a,{label:"Vote Deadline",value:ee,minDateTime:he,onChange:function(e){te(e)},renderInput:function(e){return Object(A.jsx)(O.a,Object(Ke.a)({},e))}})})}),Object(A.jsx)(p.a,{textAlign:"center",children:Object(A.jsx)(x.a,{variant:"contained",onClick:pe,className:"button",name:"Create Vote",sx:{m:2,alignItems:"center"},children:"Create Vote"})}),Object(A.jsx)(oe.a,{open:R,autoHideDuration:2e3,onClose:fe,message:G,action:ge})]})}),Object(A.jsx)(p.a,{sx:{p:1},children:Object(A.jsxs)(h.a,{sx:{p:3,borderRadius:"16px"},elevation:2,children:[Object(A.jsxs)(u.a,{container:!0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(Qe.a,{sx:{fontSize:45},color:"primary"})}),Object(A.jsxs)(u.a,{item:!0,children:[Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"h5",display:"block",children:"Vote Keys"})}),Object(A.jsx)(u.a,{item:!0,children:Object(A.jsx)(b.a,{variant:"subtitle1",color:"secondary",display:"block",style:{lineHeight:"15px"},children:"Send each voter a key to vote"})})]}),Object(A.jsxs)(p.a,{textAlign:"right",sx:{flexGrow:1},children:[Object(A.jsx)(x.a,{sx:{margin:1},variant:"contained",onClick:function(){var e=m.join("\n"),t=new Blob([e],{type:"text/csv"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=I+".csv",a.click(),Y("Keys Exported"),H(!0)},disabled:je,children:"Export CSV"}),Object(A.jsx)(x.a,{variant:"contained",onClick:function(){navigator.clipboard.writeText(m.join("\n")),Y("Keys Copied To Clipboard"),H(!0)},disabled:je,children:"Copy To Clipboard"})]})]}),Object(A.jsx)(U.a,{sx:{width:"100%",bgcolor:"background.paper",borderRadius:"16px",position:"relative",overflow:"auto",maxHeight:300,"& ul":{padding:0},padding:1,"&::-webkit-scrollbar":{width:10},"&::-webkit-scrollbar-track":{backgroundColor:"black"},"&::-webkit-scrollbar-thumb":{backgroundColor:"#808080",borderRadius:2},overflowX:"hidden"},subheader:Object(A.jsx)("li",{}),children:[0].map((function(e){return Object(A.jsx)("li",{children:Object(A.jsx)("ul",{children:m.map((function(t){return Object(A.jsx)(N.a,{children:Object(A.jsx)(K.a,{primary:"".concat(t)})},"item-".concat(e,"-").concat(t))}))})},"section-".concat(e))}))})]})}),Object(A.jsx)(ce,{heading:"How To Create A Vote",content:" 1. Enter the subject of the vote.\\n 2. Enter the number of voters.\\n 3. Enter the options.\\n 4. Click on the create vote button.\\n 5. The vote will be created.\\n Vote keys allow voters to authenticate themselves when they vote. Make sure you send one vote key to each voter. A vote key can be used only once. "})]})},$e=n(748),et=n(389),tt=n(767),nt=function(){var e=r.a.useState(),t=Object(s.a)(e,2),n=t[0],a=t[1],c=Object($e.a)("(prefers-color-scheme: dark)"),o=r.a.useMemo((function(){return Object(et.a)({palette:{mode:c?"dark":"light",primary:{main:"#387DF6"},secondary:{main:"#666666"}},typography:{fontFamily:"'Inter', sans-serif",subtitle1:{fontSize:16},h5:{fontWeight:700,fontSize:24},h6:{fontWeight:500}}})}),[c]);return n?Object(A.jsx)(ee.a,{token:n.token,party:n.party,httpBaseUrl:k,wsBaseUrl:undefined,children:Object(A.jsxs)(tt.a,{theme:o,children:[Object(A.jsx)(ke.a,{enableColorScheme:!0}),Object(A.jsx)("div",{children:Object(A.jsxs)(w.c,{children:[Object(A.jsx)(w.a,{path:"/Vote",element:Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(ye,{onLogout:function(){return a(void 0)}})})}),Object(A.jsx)(w.a,{path:"/CreateVote",element:Object(A.jsxs)(A.Fragment,{children:[" ",Object(A.jsx)(X,{onLogout:function(){return a(void 0)}}),Object(A.jsx)(Ze,{})]})}),Object(A.jsx)(w.a,{path:"/VoteAnalytics",element:Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(X,{onLogout:function(){return a(void 0)}}),Object(A.jsx)(He,{})]})}),Object(A.jsx)(w.a,{path:"/VoteManagement",element:Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(X,{onLogout:function(){return a(void 0)}}),Object(A.jsx)(re,{})]})}),Object(A.jsx)(w.a,{path:"*",element:Object(A.jsx)(P,{onLogout:function(){return a(void 0)}})})]})})]})}):Object(A.jsxs)(tt.a,{theme:o,children:[Object(A.jsx)(ke.a,{enableColorScheme:!0}),Object(A.jsx)("div",{children:Object(A.jsxs)(w.c,{children:[Object(A.jsx)(w.a,{path:"/",element:Object(A.jsx)(D,{onLogin:a})}),Object(A.jsx)(w.a,{path:"/VoteLogin/*",element:Object(A.jsx)(M,{onLogin:a})}),Object(A.jsx)(w.a,{path:"/VoteLogin",element:Object(A.jsx)(M,{onLogin:a})}),Object(A.jsx)(w.a,{path:"*",element:Object(A.jsx)(E,{})})]})})]})},at=function(e){var t=e.children,n=Object(w.f)();return Object(A.jsx)(S.a,{domain:"votencrypt.au.auth0.com",clientId:"MeM1EPfpL5s7EG7hdki3aBTQa5wuCcYu",redirectUri:window.location.origin,onRedirectCallback:function(e){n((null===e||void 0===e?void 0:e.returnTo)||window.location.pathname)},children:t})};i.a.render(Object(A.jsx)(C.a,{children:Object(A.jsx)(at,{children:Object(A.jsx)(nt,{})})}),document.getElementById("root"))}},[[662,1,2]]]);
//# sourceMappingURL=main.7e2bd99b.chunk.js.map