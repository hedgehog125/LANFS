import{S as x,i as P,s as D,e as w,c as y,a as k,d as m,b as f,g as p,J as b,n as C,t as O,h as S,R as F,T as R,f as J,k as A,m as B,j as Z,o as W,p as E,q as G,r as N,x as I,y as T,P as X,z as $,C as M,L,l as j,U as ee,V as te,M as Y,N as re,W as le,w as ne}from"../chunks/index-c080b2ec.js";import{T as oe}from"../chunks/TopBar-684afaae.js";function ae(s){let e;return{c(){e=O("Connecting...")},l(t){e=S(t,"Connecting...")},m(t,l){p(t,e,l)},d(t){t&&m(e)}}}function ie(s){let e,t,l;return{c(){e=O("Connection error. "),t=w("br"),l=O(`
				Will continue to retry...`)},l(n){e=S(n,"Connection error. "),t=y(n,"BR",{}),l=S(n,`
				Will continue to retry...`)},m(n,r){p(n,e,r),p(n,t,r),p(n,l,r)},d(n){n&&m(e),n&&m(t),n&&m(l)}}}function se(s){let e,t,l;function n(o,i){return o[0]?ie:ae}let r=n(s),a=r(s);return{c(){e=w("main"),t=w("div"),l=w("p"),a.c(),this.h()},l(o){e=y(o,"MAIN",{});var i=k(e);t=y(i,"DIV",{class:!0});var c=k(t);l=y(c,"P",{class:!0});var u=k(l);a.l(u),u.forEach(m),c.forEach(m),i.forEach(m),this.h()},h(){f(l,"class","svelte-ma1ccf"),f(t,"class","svelte-ma1ccf")},m(o,i){p(o,e,i),b(e,t),b(t,l),a.m(l,null)},p(o,[i]){r!==(r=n(o))&&(a.d(1),a=r(o),a&&(a.c(),a.m(l,null)))},i:C,o:C,d(o){o&&m(e),a.d()}}}function ce(s,e,t){let{isNetworkError:l}=e;return s.$$set=n=>{"isNetworkError"in n&&t(0,l=n.isNetworkError)},[l]}class fe extends x{constructor(e){super(),P(this,e,ce,se,D,{isNetworkError:0})}}function ue(s){let e,t,l,n,r,a;return{c(){e=w("main"),t=F("svg"),l=F("circle"),n=F("circle"),a=F("circle"),this.h()},l(o){e=y(o,"MAIN",{});var i=k(e);t=R(i,"svg",{viewBox:!0,class:!0});var c=k(t);l=R(c,"circle",{id:!0,cx:!0,cy:!0,r:!0,class:!0}),k(l).forEach(m),n=R(c,"circle",{id:!0,style:!0,"stroke-dasharray":!0,"stroke-width":!0,cx:!0,cy:!0,r:!0,transform:!0,class:!0}),k(n).forEach(m),a=R(c,"circle",{id:!0,"stroke-width":!0,cx:!0,cy:!0,r:!0,class:!0}),k(a).forEach(m),c.forEach(m),i.forEach(m),this.h()},h(){f(l,"id","background"),f(l,"cx","0.5"),f(l,"cy","0.5"),f(l,"r","0.5"),f(l,"class","svelte-q73s4a"),f(n,"id","slice"),J(n,"transition-duration",s[1]+"s"),f(n,"stroke-dasharray",r=s[0]*(Math.PI/2)+" 3.141592653589793"),f(n,"stroke-width","0.5"),f(n,"cx","0.5"),f(n,"cy","0.5"),f(n,"r","0.25"),f(n,"transform","rotate(-90) translate(-1)"),f(n,"class","svelte-q73s4a"),f(a,"id","outline"),f(a,"stroke-width",q),f(a,"cx","0.5"),f(a,"cy","0.5"),f(a,"r","0.5"),f(a,"class","svelte-q73s4a"),f(t,"viewBox",-q/2+" "+-q/2+" "+(1+q)+" "+(1+q)),f(t,"class","svelte-q73s4a")},m(o,i){p(o,e,i),b(e,t),b(t,l),b(t,n),b(t,a)},p(o,[i]){i&2&&J(n,"transition-duration",o[1]+"s"),i&1&&r!==(r=o[0]*(Math.PI/2)+" 3.141592653589793")&&f(n,"stroke-dasharray",r)},i:C,o:C,d(o){o&&m(e)}}}const q=.015;function me(s,e,t){let{amount:l}=e,{interpolateTime:n}=e;return s.$$set=r=>{"amount"in r&&t(0,l=r.amount),"interpolateTime"in r&&t(1,n=r.interpolateTime)},[l,n]}class de extends x{constructor(e){super(),P(this,e,me,ue,D,{amount:0,interpolateTime:1})}}var _e="/app/immutable/assets/download-ddd256eb.svg",he="/app/immutable/assets/close-02f49dd1.svg";function pe(s){let e,t,l,n,r,a;return r=new de({props:{amount:s[1].uploadProgress,interpolateTime:"1"}}),{c(){e=w("button"),t=w("img"),n=A(),I(r.$$.fragment),this.h()},l(o){e=y(o,"BUTTON",{class:!0});var i=k(e);t=y(i,"IMG",{src:!0,alt:!0,class:!0}),i.forEach(m),n=B(o),T(r.$$.fragment,o),this.h()},h(){X(t.src,l=he)||f(t,"src",l),f(t,"alt","Cancel icon"),f(t,"class","svelte-148n3fw"),f(e,"class","svelte-148n3fw")},m(o,i){p(o,e,i),b(e,t),p(o,n,i),$(r,o,i),a=!0},p(o,i){const c={};i&2&&(c.amount=o[1].uploadProgress),r.$set(c)},i(o){a||(N(r.$$.fragment,o),a=!0)},o(o){E(r.$$.fragment,o),a=!1},d(o){o&&m(e),o&&m(n),M(r,o)}}}function ge(s){let e,t,l,n,r,a,o;return{c(){e=w("a"),t=w("img"),this.h()},l(i){e=y(i,"A",{href:!0,download:!0});var c=k(e);t=y(c,"IMG",{src:!0,alt:!0,class:!0}),c.forEach(m),this.h()},h(){X(t.src,l=_e)||f(t,"src",l),f(t,"alt","Download icon"),f(t,"class","svelte-148n3fw"),f(e,"href",n=`/room/get/${s[0]}/${s[2]}`),f(e,"download",r=s[1].fileName)},m(i,c){p(i,e,c),b(e,t),a||(o=L(e,"click",s[4]),a=!0)},p(i,c){c&5&&n!==(n=`/room/get/${i[0]}/${i[2]}`)&&f(e,"href",n),c&2&&r!==(r=i[1].fileName)&&f(e,"download",r)},i:C,o:C,d(i){i&&m(e),a=!1,o()}}}function ve(s){let e,t,l=s[1].fileName+"",n,r,a,o,i,c,u;const h=[ge,pe],g=[];function z(_,d){return _[1].ready?0:1}return a=z(s),o=g[a]=h[a](s),{c(){e=w("main"),t=w("p"),n=O(l),r=A(),o.c(),i=A(),c=w("br"),this.h()},l(_){e=y(_,"MAIN",{class:!0});var d=k(e);t=y(d,"P",{class:!0});var v=k(t);n=S(v,l),v.forEach(m),r=B(d),o.l(d),i=B(d),c=y(d,"BR",{}),d.forEach(m),this.h()},h(){f(t,"class","svelte-148n3fw"),f(e,"class","svelte-148n3fw")},m(_,d){p(_,e,d),b(e,t),b(t,n),b(e,r),g[a].m(e,null),b(e,i),b(e,c),u=!0},p(_,[d]){(!u||d&2)&&l!==(l=_[1].fileName+"")&&Z(n,l);let v=a;a=z(_),a===v?g[a].p(_,d):(W(),E(g[v],1,1,()=>{g[v]=null}),G(),o=g[a],o?o.p(_,d):(o=g[a]=h[a](_),o.c()),N(o,1),o.m(e,i))},i(_){u||(N(o),u=!0)},o(_){E(o),u=!1},d(_){_&&m(e),g[a].d()}}}function ke(s,e,t){let{roomName:l}=e,{file:n}=e,{index:r}=e,{handleClick:a}=e;const o=i=>a(i,n);return s.$$set=i=>{"roomName"in i&&t(0,l=i.roomName),"file"in i&&t(1,n=i.file),"index"in i&&t(2,r=i.index),"handleClick"in i&&t(3,a=i.handleClick)},[l,n,r,a,o]}class be extends x{constructor(e){super(),P(this,e,ke,ve,D,{roomName:0,file:1,index:2,handleClick:3})}}function H(s,e,t){const l=s.slice();return l[3]=e[t],l[5]=t,l}function K(s){let e,t;return e=new be({props:{roomName:s[0],file:s[3],index:s[5],handleClick:s[2]}}),{c(){I(e.$$.fragment)},l(l){T(e.$$.fragment,l)},m(l,n){$(e,l,n),t=!0},p(l,n){const r={};n&1&&(r.roomName=l[0]),n&2&&(r.file=l[3]),n&2&&(r.index=l[5]),e.$set(r)},i(l){t||(N(e.$$.fragment,l),t=!0)},o(l){E(e.$$.fragment,l),t=!1},d(l){M(e,l)}}}function Q(s,e){let t,l,n,r=e[3]!=null&&K(e);return{key:s,first:null,c(){t=j(),r&&r.c(),l=j(),this.h()},l(a){t=j(),r&&r.l(a),l=j(),this.h()},h(){this.first=t},m(a,o){p(a,t,o),r&&r.m(a,o),p(a,l,o),n=!0},p(a,o){e=a,e[3]!=null?r?(r.p(e,o),o&2&&N(r,1)):(r=K(e),r.c(),N(r,1),r.m(l.parentNode,l)):r&&(W(),E(r,1,1,()=>{r=null}),G())},i(a){n||(N(r),n=!0)},o(a){E(r),n=!1},d(a){a&&m(t),r&&r.d(a),a&&m(l)}}}function we(s){let e,t=[],l=new Map,n,r=s[1].files;const a=o=>o[5];for(let o=0;o<r.length;o+=1){let i=H(s,r,o),c=a(i);l.set(c,t[o]=Q(c,i))}return{c(){e=w("main");for(let o=0;o<t.length;o+=1)t[o].c()},l(o){e=y(o,"MAIN",{});var i=k(e);for(let c=0;c<t.length;c+=1)t[c].l(i);i.forEach(m)},m(o,i){p(o,e,i);for(let c=0;c<t.length;c+=1)t[c].m(e,null);n=!0},p(o,[i]){i&7&&(r=o[1].files,W(),t=ee(t,i,a,1,o,r,l,e,te,Q,null,H),G())},i(o){if(!n){for(let i=0;i<r.length;i+=1)N(t[i]);n=!0}},o(o){for(let i=0;i<t.length;i+=1)E(t[i]);n=!1},d(o){o&&m(e);for(let i=0;i<t.length;i+=1)t[i].d()}}}function ye(s,e,t){let{roomName:l}=e,{roomData:n}=e;const r=(a,o)=>{o.ready||a.preventDefault()};return s.$$set=a=>{"roomName"in a&&t(0,l=a.roomName),"roomData"in a&&t(1,n=a.roomData)},[l,n,r]}class Ne extends x{constructor(e){super(),P(this,e,ye,we,D,{roomName:0,roomData:1})}}function Ee(s){let e,t;return{c:C,l:C,m(l,n){e||(t=[L(window,"dragover",Y(s[2])),L(window,"drop",Y(s[0]))],e=!0)},p:C,i:C,o:C,d(l){e=!1,re(t)}}}function Ce(s,e,t){let{onUpload:l}=e;const n=a=>{let o=a.dataTransfer.items;if(o){let i=[];for(let c of o)c.kind=="file"&&i.push(c.getAsFile());i.length!=0&&l(i)}};function r(a){le.call(this,s,a)}return s.$$set=a=>{"onUpload"in a&&t(1,l=a.onUpload)},[n,l,r]}class Ie extends x{constructor(e){super(),P(this,e,Ce,Ee,D,{onUpload:1})}}function Te(s){let e,t,l,n;return e=new Ne({props:{roomName:s[1],roomData:s[0]}}),l=new Ie({props:{onUpload:s[4]}}),{c(){I(e.$$.fragment),t=A(),I(l.$$.fragment)},l(r){T(e.$$.fragment,r),t=B(r),T(l.$$.fragment,r)},m(r,a){$(e,r,a),p(r,t,a),$(l,r,a),n=!0},p(r,a){const o={};a&2&&(o.roomName=r[1]),a&1&&(o.roomData=r[0]),e.$set(o)},i(r){n||(N(e.$$.fragment,r),N(l.$$.fragment,r),n=!0)},o(r){E(e.$$.fragment,r),E(l.$$.fragment,r),n=!1},d(r){M(e,r),r&&m(t),M(l,r)}}}function $e(s){let e,t;return e=new fe({props:{isNetworkError:s[3]}}),{c(){I(e.$$.fragment)},l(l){T(e.$$.fragment,l)},m(l,n){$(e,l,n),t=!0},p(l,n){const r={};n&8&&(r.isNetworkError=l[3]),e.$set(r)},i(l){t||(N(e.$$.fragment,l),t=!0)},o(l){E(e.$$.fragment,l),t=!1},d(l){M(e,l)}}}function Me(s){let e,t,l,n,r,a;t=new oe({});const o=[$e,Te],i=[];function c(u,h){return u[2]?0:1}return n=c(s),r=i[n]=o[n](s),{c(){e=w("main"),I(t.$$.fragment),l=A(),r.c()},l(u){e=y(u,"MAIN",{});var h=k(e);T(t.$$.fragment,h),l=B(h),r.l(h),h.forEach(m)},m(u,h){p(u,e,h),$(t,e,null),b(e,l),i[n].m(e,null),a=!0},p(u,[h]){let g=n;n=c(u),n===g?i[n].p(u,h):(W(),E(i[g],1,1,()=>{i[g]=null}),G(),r=i[n],r?r.p(u,h):(r=i[n]=o[n](u),r.c()),N(r,1),r.m(e,null))},i(u){a||(N(t.$$.fragment,u),N(r),a=!0)},o(u){E(t.$$.fragment,u),E(r),a=!1},d(u){u&&m(e),M(t),i[n].d()}}}function xe(s,e,t){let n,r,a,o,i=!0,c,u=!1;const h=async d=>{let v;try{v=await fetch(`/room/get/${o}`),v.ok?t(0,a=await v.json()):(t(0,a=null),t(3,u=!1))}catch{t(0,a=null),t(3,u=!0)}a?c=setTimeout(U=>{t(2,i=!1)},750):(t(2,i=!0),c!=null&&clearTimeout(c))},g=async d=>{r=await(await fetch("/info")).json(),n=r.clientConfig},z=d=>{location.href="/"},_=d=>{let v=!1;for(let U of d){if(U.size>n.max.fileSize){v=!0;continue}let V=new FormData;V.set("upload",U),fetch(`room/upload/${o}`,{method:"POST",body:V}),t(0,a.files[a.files.length]={fileName:U.name,timeLeft:0,ready:!1,uploadProgress:0,size:U.size},a)}if(v)debugger};return ne(async d=>{if(t(1,o=location.hash.slice(1)),o==""){z();return}h(),await g(),setInterval(h,n.timings.refreshDelay*1e3)}),[a,o,i,u,_]}class Ue extends x{constructor(e){super(),P(this,e,xe,Me,D,{})}}export{Ue as default};
