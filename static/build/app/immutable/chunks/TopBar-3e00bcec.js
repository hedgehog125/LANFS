import{O as y,S as E,i as I,s as S,e as u,c as h,a as b,d,P as A,b as n,g as w,J as c,n as j,k as x,t as N,m as k,h as T,Q as $}from"./index-4db9d871.js";var q="/app/immutable/assets/back-a78e1fd6.svg";const C=()=>{const s=y("__svelte__");return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:s.navigating.subscribe}},session:s.session,updated:s.updated}},D={subscribe(s){return C().page.subscribe(s)}};function F(s){let e,t,l;return{c(){e=u("a"),t=u("img"),this.h()},l(a){e=h(a,"A",{href:!0,class:!0});var i=b(e);t=h(i,"IMG",{src:!0,alt:!0,width:!0,height:!0,class:!0}),i.forEach(d),this.h()},h(){A(t.src,l=q)||n(t,"src",l),n(t,"alt","Back icon"),n(t,"width","24"),n(t,"height","24"),n(t,"class","svelte-lxnj2k"),n(e,"href","/"),n(e,"class","svelte-lxnj2k")},m(a,i){w(a,e,i),c(e,t)},p:j,d(a){a&&d(e)}}}function L(s){let e,t,l,a,i,v,g,f,_,o=s[0]&&F();return{c(){e=u("main"),t=u("div"),o&&o.c(),l=x(),a=u("h1"),i=N("LANFS"),v=x(),g=u("div"),f=x(),_=u("br"),this.h()},l(p){e=h(p,"MAIN",{});var r=b(e);t=h(r,"DIV",{class:!0});var m=b(t);o&&o.l(m),l=k(m),a=h(m,"H1",{class:!0});var B=b(a);i=T(B,"LANFS"),B.forEach(d),m.forEach(d),v=k(r),g=h(r,"DIV",{class:!0}),b(g).forEach(d),f=k(r),_=h(r,"BR",{}),r.forEach(d),this.h()},h(){n(a,"class","svelte-lxnj2k"),n(t,"class","main svelte-lxnj2k"),n(g,"class","space svelte-lxnj2k")},m(p,r){w(p,e,r),c(e,t),o&&o.m(t,null),c(t,l),c(t,a),c(a,i),c(e,v),c(e,g),c(e,f),c(e,_)},p(p,[r]){p[0]&&o.p(p,r)},i:j,o:j,d(p){p&&d(e),o&&o.d()}}}function M(s,e,t){let l;return $(s,D,i=>t(1,l=i)),[l.url.pathname!="/"]}class G extends E{constructor(e){super(),I(this,e,M,L,S,{})}}export{G as T};
