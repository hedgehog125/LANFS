import{S as G,i as W,s as J,e as p,k as D,c as h,a as b,d as u,m as I,b as f,g as _,J as d,P as $,L as ne,R as Me,n as M,t as q,l as P,h as L,j as fe,T as Pe,U as Q,V as ee,f as pe,x as O,y as S,W as he,z as j,r as E,p as C,C as V,o as oe,q as ie,X as Te,Y as ze,M as _e,N as Ue,Z as qe,w as Le}from"../chunks/index-bc183bf6.js";import{T as Be}from"../chunks/TopBar-a2cdd3cf.js";let ce,le;const Fe=async s=>{ce=await(await fetch("/info")).json(),le=ce.clientConfig};var Ie="/app/immutable/assets/close-02f49dd1.svg";function be(s,e,t){const l=s.slice();return l[6]=e[t],l[8]=t,l}function ve(s){let e,t,l;function a(n,c){return n[1]?Re:Ae}let i=a(s),o=i(s),r=!s[1]&&ye(s);return{c(){e=p("div"),t=p("p"),o.c(),l=D(),r&&r.c(),this.h()},l(n){e=h(n,"DIV",{class:!0});var c=b(e);t=h(c,"P",{class:!0});var m=b(t);o.l(m),m.forEach(u),l=I(c),r&&r.l(c),c.forEach(u),this.h()},h(){f(t,"class","svelte-11kgd8q"),f(e,"class","svelte-11kgd8q")},m(n,c){_(n,e,c),d(e,t),o.m(t,null),d(e,l),r&&r.m(e,null)},p(n,c){i===(i=a(n))&&o?o.p(n,c):(o.d(1),o=i(n),o&&(o.c(),o.m(t,null))),n[1]?r&&(r.d(1),r=null):r?r.p(n,c):(r=ye(n),r.c(),r.m(e,null))},d(n){n&&u(e),o.d(),r&&r.d()}}}function Ae(s){let e,t=s[4],l=[];for(let a=0;a<t.length;a+=1)l[a]=we(be(s,t,a));return{c(){for(let a=0;a<l.length;a+=1)l[a].c();e=P()},l(a){for(let i=0;i<l.length;i+=1)l[i].l(a);e=P()},m(a,i){for(let o=0;o<l.length;o+=1)l[o].m(a,i);_(a,e,i)},p(a,i){if(i&16){t=a[4];let o;for(o=0;o<t.length;o+=1){const r=be(a,t,o);l[o]?l[o].p(r,i):(l[o]=we(r),l[o].c(),l[o].m(e.parentNode,e))}for(;o<l.length;o+=1)l[o].d(1);l.length=t.length}},d(a){Pe(l,a),a&&u(e)}}}function Re(s){let e;function t(i,o){return i[0]?Se:Oe}let l=t(s),a=l(s);return{c(){a.c(),e=P()},l(i){a.l(i),e=P()},m(i,o){a.m(i,o),_(i,e,o)},p(i,o){l!==(l=t(i))&&(a.d(1),a=l(i),a&&(a.c(),a.m(e.parentNode,e)))},d(i){a.d(i),i&&u(e)}}}function ke(s){let e;return{c(){e=p("br")},l(t){e=h(t,"BR",{})},m(t,l){_(t,e,l)},d(t){t&&u(e)}}}function we(s){let e=s[6]+"",t,l,a,i=s[8]!=s[4].length-1&&ke();return{c(){t=q(e),l=D(),i&&i.c(),a=P()},l(o){t=L(o,e),l=I(o),i&&i.l(o),a=P()},m(o,r){_(o,t,r),_(o,l,r),i&&i.m(o,r),_(o,a,r)},p(o,r){r&16&&e!==(e=o[6]+"")&&fe(t,e),o[8]!=o[4].length-1?i||(i=ke(),i.c(),i.m(a.parentNode,a)):i&&(i.d(1),i=null)},d(o){o&&u(t),o&&u(l),i&&i.d(o),o&&u(a)}}}function Oe(s){let e;return{c(){e=q("Connecting...")},l(t){e=L(t,"Connecting...")},m(t,l){_(t,e,l)},d(t){t&&u(e)}}}function Se(s){let e,t,l;return{c(){e=q("Connection error. "),t=p("br"),l=q(`
						Will continue to retry...`)},l(a){e=L(a,"Connection error. "),t=h(a,"BR",{}),l=L(a,`
						Will continue to retry...`)},m(a,i){_(a,e,i),_(a,t,i),_(a,l,i)},d(a){a&&u(e),a&&u(t),a&&u(l)}}}function ye(s){let e,t,l,a,i;return{c(){e=p("button"),t=p("img"),this.h()},l(o){e=h(o,"BUTTON",{type:!0,title:!0,class:!0});var r=b(e);t=h(r,"IMG",{src:!0,width:!0,height:!0,alt:!0,class:!0}),r.forEach(u),this.h()},h(){$(t.src,l=Ie)||f(t,"src",l),f(t,"width","24"),f(t,"height","24"),f(t,"alt","Close"),f(t,"class","svelte-11kgd8q"),f(e,"type","button"),f(e,"title","Close"),f(e,"class","svelte-11kgd8q")},m(o,r){_(o,e,r),d(e,t),a||(i=ne(e,"click",function(){Me(s[3])&&s[3].apply(this,arguments)}),a=!0)},p(o,r){s=o},d(o){o&&u(e),a=!1,i()}}}function je(s){let e,t=(s[1]||s[2]!=-1)&&ve(s);return{c(){e=p("main"),t&&t.c(),this.h()},l(l){e=h(l,"MAIN",{class:!0});var a=b(e);t&&t.l(a),a.forEach(u),this.h()},h(){f(e,"class","svelte-11kgd8q")},m(l,a){_(l,e,a),t&&t.m(e,null)},p(l,[a]){l[1]||l[2]!=-1?t?t.p(l,a):(t=ve(l),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:M,o:M,d(l){l&&u(e),t&&t.d()}}}function Ve(s,e,t){let l,{isNetworkError:a}=e,{loading:i}=e,{popupMessageCode:o}=e,{handlePopupClose:r}=e;const n=[["Oh no.","Looks like that file's too big."]];return s.$$set=c=>{"isNetworkError"in c&&t(0,a=c.isNetworkError),"loading"in c&&t(1,i=c.loading),"popupMessageCode"in c&&t(2,o=c.popupMessageCode),"handlePopupClose"in c&&t(3,r=c.handlePopupClose)},s.$$.update=()=>{s.$$.dirty&4&&t(4,l=n[o])},[a,i,o,r,l]}class Ge extends G{constructor(e){super(),W(this,e,Ve,je,J,{isNetworkError:0,loading:1,popupMessageCode:2,handlePopupClose:3})}}const te={time:(s,e)=>{let t=Math.floor(s/3600);s-=t*(60*60);let l=Math.floor(s/60);s-=l*60;let i=[t,l,s];return i.splice(0,i.length-e),i.map(o=>o.toString().padStart(2,"0")).join(":")},shorten:(s,e)=>s.length<e?s:s.slice(0,e-3)+"..."};function We(s){let e,t,l,a,i,o;return{c(){e=p("main"),t=Q("svg"),l=Q("circle"),a=Q("circle"),o=Q("circle"),this.h()},l(r){e=h(r,"MAIN",{});var n=b(e);t=ee(n,"svg",{viewBox:!0,class:!0});var c=b(t);l=ee(c,"circle",{id:!0,cx:!0,cy:!0,r:!0,class:!0}),b(l).forEach(u),a=ee(c,"circle",{id:!0,style:!0,"stroke-dasharray":!0,"stroke-width":!0,cx:!0,cy:!0,r:!0,transform:!0,class:!0}),b(a).forEach(u),o=ee(c,"circle",{id:!0,"stroke-width":!0,cx:!0,cy:!0,r:!0,class:!0}),b(o).forEach(u),c.forEach(u),n.forEach(u),this.h()},h(){f(l,"id","background"),f(l,"cx","0.5"),f(l,"cy","0.5"),f(l,"r","0.5"),f(l,"class","svelte-f8zowc"),f(a,"id","slice"),pe(a,"transition-duration",s[1]+"s"),f(a,"stroke-dasharray",i=s[0]*(Math.PI/2)+" 3.141592653589793"),f(a,"stroke-width","0.5"),f(a,"cx","0.5"),f(a,"cy","0.5"),f(a,"r","0.25"),f(a,"transform","rotate(-90) translate(-1)"),f(a,"class","svelte-f8zowc"),f(o,"id","outline"),f(o,"stroke-width",Z),f(o,"cx","0.5"),f(o,"cy","0.5"),f(o,"r","0.5"),f(o,"class","svelte-f8zowc"),f(t,"viewBox",-Z/2+" "+-Z/2+" "+(1+Z)+" "+(1+Z)),f(t,"class","svelte-f8zowc")},m(r,n){_(r,e,n),d(e,t),d(t,l),d(t,a),d(t,o)},p(r,[n]){n&2&&pe(a,"transition-duration",r[1]+"s"),n&1&&i!==(i=r[0]*(Math.PI/2)+" 3.141592653589793")&&f(a,"stroke-dasharray",i)},i:M,o:M,d(r){r&&u(e)}}}const Z=.015;function Je(s,e,t){let{amount:l}=e,{interpolateTime:a}=e;return s.$$set=i=>{"amount"in i&&t(0,l=i.amount),"interpolateTime"in i&&t(1,a=i.interpolateTime)},[l,a]}class Xe extends G{constructor(e){super(),W(this,e,Je,We,J,{amount:0,interpolateTime:1})}}var Ye="/app/immutable/assets/download-ddd256eb.svg",Ze="/app/immutable/assets/timer-plus-0c3cdcef.svg",$e="/app/immutable/assets/file-document-outline-8da5362f.svg";function xe(s){let e,t,l,a,i,o,r,n,c,m;return{c(){e=p("div"),t=p("button"),l=p("img"),i=D(),o=p("a"),r=p("img"),this.h()},l(k){e=h(k,"DIV",{class:!0});var y=b(e);t=h(y,"BUTTON",{title:!0,class:!0});var z=b(t);l=h(z,"IMG",{src:!0,width:!0,height:!0,alt:!0,class:!0}),z.forEach(u),i=I(y),o=h(y,"A",{href:!0,download:!0,title:!0,class:!0});var w=b(o);r=h(w,"IMG",{src:!0,widt:!0,height:!0,alt:!0,class:!0}),w.forEach(u),y.forEach(u),this.h()},h(){$(l.src,a=Ze)||f(l,"src",a),f(l,"width","24"),f(l,"height","24"),f(l,"alt","Extend file time limit"),f(l,"class","svelte-baxtgf"),f(t,"title","Extend the time limit"),f(t,"class","svelte-baxtgf"),$(r.src,n=Ye)||f(r,"src",n),f(r,"widt","24"),f(r,"height","24"),f(r,"alt","Download the file"),f(r,"class","svelte-baxtgf"),f(o,"href",c=`/room/get/${s[0]}/${s[2]}`),f(o,"download",m=s[1].fileName),f(o,"title","Download the file"),f(o,"class","svelte-baxtgf"),f(e,"class","bottom svelte-baxtgf")},m(k,y){_(k,e,y),d(e,t),d(t,l),d(e,i),d(e,o),d(o,r)},p(k,y){y&5&&c!==(c=`/room/get/${k[0]}/${k[2]}`)&&f(o,"href",c),y&2&&m!==(m=k[1].fileName)&&f(o,"download",m)},d(k){k&&u(e)}}}function He(s){let e,t,l,a,i,o,r,n,c,m,k=(s[1].ready?s[1].downloading?"Downloading...":te.time(s[1].timeLeft,2):`${Math.floor(s[1].uploadProgress*100)}% Uploaded`)+"",y,z,w,N,T,B,F,ae,A,X=te.shorten(s[1].fileName,30)+"",H,re,K,se,U;n=new Xe({props:{amount:s[1].ready?s[1].timeLeft/(s[1].quickDownloadDelete?s[3].downloadedFile:s[3].newFile):s[1].uploadProgress,interpolateTime:le.timings.refreshDelay}});let x=s[1].ready&&xe(s);return{c(){e=p("main"),t=p("div"),l=p("img"),i=D(),o=p("div"),r=p("div"),O(n.$$.fragment),c=D(),m=p("span"),y=q(k),z=D(),w=p("button"),N=p("img"),ae=D(),A=p("p"),H=q(X),re=D(),x&&x.c(),K=D(),se=p("br"),this.h()},l(g){e=h(g,"MAIN",{class:!0});var v=b(e);t=h(v,"DIV",{class:!0});var Y=b(t);l=h(Y,"IMG",{src:!0,width:!0,height:!0,alt:!0,class:!0}),Y.forEach(u),i=I(v),o=h(v,"DIV",{class:!0});var R=b(o);r=h(R,"DIV",{class:!0});var ue=b(r);S(n.$$.fragment,ue),ue.forEach(u),c=I(R),m=h(R,"SPAN",{class:!0});var de=b(m);y=L(de,k),de.forEach(u),z=I(R),w=h(R,"BUTTON",{title:!0,class:!0});var ge=b(w);N=h(ge,"IMG",{src:!0,width:!0,height:!0,alt:!0,class:!0}),ge.forEach(u),R.forEach(u),ae=I(v),A=h(v,"P",{class:!0});var me=b(A);H=L(me,X),me.forEach(u),re=I(v),x&&x.l(v),K=I(v),se=h(v,"BR",{}),v.forEach(u),this.h()},h(){$(l.src,a=$e)||f(l,"src",a),f(l,"width","24"),f(l,"height","24"),f(l,"alt","A file icon"),f(l,"class","svelte-baxtgf"),f(t,"class","background svelte-baxtgf"),f(r,"class","piechart svelte-baxtgf"),f(m,"class","svelte-baxtgf"),he(m,"warning",s[1].ready&&!s[1].downloading&&s[1].timeLeft<=15),$(N.src,T=Ie)||f(N,"src",T),f(N,"width","24"),f(N,"height","24"),f(N,"alt",B=s[1].ready?"Delete the file":"Cancel upload"),f(N,"class","svelte-baxtgf"),f(w,"title",F=s[1].ready?"Delete the file":"Cancel upload"),f(w,"class","svelte-baxtgf"),f(o,"class","top svelte-baxtgf"),f(A,"class","title svelte-baxtgf"),f(e,"class","svelte-baxtgf")},m(g,v){_(g,e,v),d(e,t),d(t,l),d(e,i),d(e,o),d(o,r),j(n,r,null),d(o,c),d(o,m),d(m,y),d(o,z),d(o,w),d(w,N),d(e,ae),d(e,A),d(A,H),d(e,re),x&&x.m(e,null),d(e,K),d(e,se),U=!0},p(g,[v]){const Y={};v&2&&(Y.amount=g[1].ready?g[1].timeLeft/(g[1].quickDownloadDelete?g[3].downloadedFile:g[3].newFile):g[1].uploadProgress),n.$set(Y),(!U||v&2)&&k!==(k=(g[1].ready?g[1].downloading?"Downloading...":te.time(g[1].timeLeft,2):`${Math.floor(g[1].uploadProgress*100)}% Uploaded`)+"")&&fe(y,k),v&2&&he(m,"warning",g[1].ready&&!g[1].downloading&&g[1].timeLeft<=15),(!U||v&2&&B!==(B=g[1].ready?"Delete the file":"Cancel upload"))&&f(N,"alt",B),(!U||v&2&&F!==(F=g[1].ready?"Delete the file":"Cancel upload"))&&f(w,"title",F),(!U||v&2)&&X!==(X=te.shorten(g[1].fileName,30)+"")&&fe(H,X),g[1].ready?x?x.p(g,v):(x=xe(g),x.c(),x.m(e,K)):x&&(x.d(1),x=null)},i(g){U||(E(n.$$.fragment,g),U=!0)},o(g){C(n.$$.fragment,g),U=!1},d(g){g&&u(e),V(n),x&&x.d()}}}function Ke(s,e,t){const l=ce.timings.delete;let{roomName:a}=e,{file:i}=e,{index:o}=e;return s.$$set=r=>{"roomName"in r&&t(0,a=r.roomName),"file"in r&&t(1,i=r.file),"index"in r&&t(2,o=r.index)},[a,i,o,l]}class Qe extends G{constructor(e){super(),W(this,e,Ke,He,J,{roomName:0,file:1,index:2})}}function Ne(s,e,t){const l=s.slice();return l[2]=e[t],l[4]=t,l}function et(s){let e=[],t=new Map,l,a,i=s[1].files;const o=r=>r[4];for(let r=0;r<i.length;r+=1){let n=Ne(s,i,r),c=o(n);t.set(c,e[r]=Ce(c,n))}return{c(){for(let r=0;r<e.length;r+=1)e[r].c();l=P()},l(r){for(let n=0;n<e.length;n+=1)e[n].l(r);l=P()},m(r,n){for(let c=0;c<e.length;c+=1)e[c].m(r,n);_(r,l,n),a=!0},p(r,n){n&3&&(i=r[1].files,oe(),e=Te(e,n,o,1,r,i,t,l.parentNode,ze,Ce,l,Ne),ie())},i(r){if(!a){for(let n=0;n<i.length;n+=1)E(e[n]);a=!0}},o(r){for(let n=0;n<e.length;n+=1)C(e[n]);a=!1},d(r){for(let n=0;n<e.length;n+=1)e[n].d(r);r&&u(l)}}}function tt(s){let e,t,l,a;return{c(){e=p("p"),t=q("Looks like there aren't any files here yet. "),l=p("br"),a=q(`
            Try uploading one by dropping it here or by clicking the upload button.`),this.h()},l(i){e=h(i,"P",{class:!0});var o=b(e);t=L(o,"Looks like there aren't any files here yet. "),l=h(o,"BR",{}),a=L(o,`
            Try uploading one by dropping it here or by clicking the upload button.`),o.forEach(u),this.h()},h(){f(e,"class","bold svelte-13gsupi")},m(i,o){_(i,e,o),d(e,t),d(e,l),d(e,a)},p:M,i:M,o:M,d(i){i&&u(e)}}}function Ee(s){let e,t;return e=new Qe({props:{roomName:s[0],file:s[2],index:s[4]}}),{c(){O(e.$$.fragment)},l(l){S(e.$$.fragment,l)},m(l,a){j(e,l,a),t=!0},p(l,a){const i={};a&1&&(i.roomName=l[0]),a&2&&(i.file=l[2]),a&2&&(i.index=l[4]),e.$set(i)},i(l){t||(E(e.$$.fragment,l),t=!0)},o(l){C(e.$$.fragment,l),t=!1},d(l){V(e,l)}}}function Ce(s,e){let t,l,a,i=e[2]!=null&&Ee(e);return{key:s,first:null,c(){t=P(),i&&i.c(),l=P(),this.h()},l(o){t=P(),i&&i.l(o),l=P(),this.h()},h(){this.first=t},m(o,r){_(o,t,r),i&&i.m(o,r),_(o,l,r),a=!0},p(o,r){e=o,e[2]!=null?i?(i.p(e,r),r&2&&E(i,1)):(i=Ee(e),i.c(),E(i,1),i.m(l.parentNode,l)):i&&(oe(),C(i,1,1,()=>{i=null}),ie())},i(o){a||(E(i),a=!0)},o(o){C(i),a=!1},d(o){o&&u(t),i&&i.d(o),o&&u(l)}}}function lt(s){let e,t,l,a;const i=[tt,et],o=[];function r(n,c){return n[1].files.length==0?0:1}return t=r(s),l=o[t]=i[t](s),{c(){e=p("main"),l.c()},l(n){e=h(n,"MAIN",{});var c=b(e);l.l(c),c.forEach(u)},m(n,c){_(n,e,c),o[t].m(e,null),a=!0},p(n,[c]){let m=t;t=r(n),t===m?o[t].p(n,c):(oe(),C(o[m],1,1,()=>{o[m]=null}),ie(),l=o[t],l?l.p(n,c):(l=o[t]=i[t](n),l.c()),E(l,1),l.m(e,null))},i(n){a||(E(l),a=!0)},o(n){C(l),a=!1},d(n){n&&u(e),o[t].d()}}}function ot(s,e,t){let{roomName:l}=e,{roomData:a}=e;return s.$$set=i=>{"roomName"in i&&t(0,l=i.roomName),"roomData"in i&&t(1,a=i.roomData)},[l,a]}class it extends G{constructor(e){super(),W(this,e,ot,lt,J,{roomName:0,roomData:1})}}function at(s){let e,t;return{c:M,l:M,m(l,a){e||(t=[ne(window,"dragover",_e(s[2])),ne(window,"drop",_e(s[0]))],e=!0)},p:M,i:M,o:M,d(l){e=!1,Ue(t)}}}function rt(s,e,t){let{handleUpload:l}=e;const a=o=>{let r=o.dataTransfer.items;if(r){let n=[];for(let c of r)c.kind=="file"&&n.push(c.getAsFile());n.length!=0&&l(n)}};function i(o){qe.call(this,s,o)}return s.$$set=o=>{"handleUpload"in o&&t(1,l=o.handleUpload)},[a,l,i]}class st extends G{constructor(e){super(),W(this,e,rt,at,J,{handleUpload:1})}}function De(s){let e,t,l,a;return e=new it({props:{roomName:s[1],roomData:s[0]}}),l=new st({props:{handleUpload:s[6]}}),{c(){O(e.$$.fragment),t=D(),O(l.$$.fragment)},l(i){S(e.$$.fragment,i),t=I(i),S(l.$$.fragment,i)},m(i,o){j(e,i,o),_(i,t,o),j(l,i,o),a=!0},p(i,o){const r={};o&2&&(r.roomName=i[1]),o&1&&(r.roomData=i[0]),e.$set(r)},i(i){a||(E(e.$$.fragment,i),E(l.$$.fragment,i),a=!0)},o(i){C(e.$$.fragment,i),C(l.$$.fragment,i),a=!1},d(i){V(e,i),i&&u(t),V(l,i)}}}function nt(s){let e,t,l,a,i,o;t=new Be({}),a=new Ge({props:{isNetworkError:s[3],loading:s[2],popupMessageCode:s[4],handlePopupClose:s[5]}});let r=!s[2]&&De(s);return{c(){e=p("main"),O(t.$$.fragment),l=D(),O(a.$$.fragment),i=D(),r&&r.c()},l(n){e=h(n,"MAIN",{});var c=b(e);S(t.$$.fragment,c),l=I(c),S(a.$$.fragment,c),i=I(c),r&&r.l(c),c.forEach(u)},m(n,c){_(n,e,c),j(t,e,null),d(e,l),j(a,e,null),d(e,i),r&&r.m(e,null),o=!0},p(n,[c]){const m={};c&8&&(m.isNetworkError=n[3]),c&4&&(m.loading=n[2]),c&16&&(m.popupMessageCode=n[4]),a.$set(m),n[2]?r&&(oe(),C(r,1,1,()=>{r=null}),ie()):r?(r.p(n,c),c&4&&E(r,1)):(r=De(n),r.c(),E(r,1),r.m(e,null))},i(n){o||(E(t.$$.fragment,n),E(a.$$.fragment,n),E(r),o=!0)},o(n){C(t.$$.fragment,n),C(a.$$.fragment,n),C(r),o=!1},d(n){n&&u(e),V(t),V(a),r&&r.d()}}}function ft(s,e,t){let a,i,o=!0,r,n=!1,c=-1;const m=w=>{t(4,c=-1)},k=async w=>{let N=Date.now();try{let T=await fetch(`/room/get/${i}`);T.ok?t(0,a=await T.json()):(t(0,a=null),t(3,n=!1))}catch{t(0,a=null),t(3,n=!0)}a?o&&(r=setTimeout(T=>{t(2,o=!1)},750-(Date.now()-N))):(t(2,o=!0),r!=null&&clearTimeout(r))},y=w=>{location.href="/"},z=w=>{let N=!1;for(let T of w){if(T.size>le.max.fileSize){N=!0;continue}let B=new FormData;B.set("upload",T),fetch(`room/upload/${i}`,{method:"POST",body:B}).catch(F=>{console.log(F.name)}),t(0,a.files[a.files.length]={fileName:T.name,timeLeft:0,ready:!1,uploadProgress:0,size:T.size},a)}N&&t(4,c=0)};return Le(async w=>{if(t(1,i=location.hash.slice(1)),i==""){y();return}await Promise.all([Fe(),k()]),setInterval(k,le.timings.refreshDelay*1e3)}),[a,i,o,n,c,m,z]}class dt extends G{constructor(e){super(),W(this,e,ft,nt,J,{})}}export{dt as default};
