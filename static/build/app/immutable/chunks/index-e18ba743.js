function D(){}function Z(t,e){for(const n in e)t[n]=e[n];return t}function J(t){return t()}function I(){return Object.create(null)}function $(t){t.forEach(J)}function tt(t){return typeof t=="function"}function bt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let E;function xt(t,e){return E||(E=document.createElement("a")),E.href=e,t===E.href}function et(t){return Object.keys(t).length===0}function nt(t,...e){if(t==null)return D;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function wt(t,e,n){t.$$.on_destroy.push(nt(e,n))}function $t(t,e,n,i){if(t){const l=K(t,e,n,i);return t[0](l)}}function K(t,e,n,i){return t[1]&&i?Z(n.ctx.slice(),t[1](i(e))):n.ctx}function kt(t,e,n,i){if(t[2]&&i){const l=t[2](i(n));if(e.dirty===void 0)return l;if(typeof l=="object"){const u=[],c=Math.max(e.dirty.length,l.length);for(let s=0;s<c;s+=1)u[s]=e.dirty[s]|l[s];return u}return e.dirty|l}return e.dirty}function vt(t,e,n,i,l,u){if(l){const c=K(e,n,i,u);t.p(c,l)}}function Et(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let j=!1;function it(){j=!0}function rt(){j=!1}function ct(t,e,n,i){for(;t<e;){const l=t+(e-t>>1);n(l)<=i?t=l+1:e=l}return t}function lt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&r.push(f)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let l=0;for(let r=0;r<e.length;r++){const o=e[r].claim_order,f=(l>0&&e[n[l]].claim_order<=o?l+1:ct(1,l,_=>e[n[_]].claim_order,o))-1;i[r]=n[f]+1;const d=f+1;n[d]=r,l=Math.max(d,l)}const u=[],c=[];let s=e.length-1;for(let r=n[l]+1;r!=0;r=i[r-1]){for(u.push(e[r-1]);s>=r;s--)c.push(e[s]);s--}for(;s>=0;s--)c.push(e[s]);u.reverse(),c.sort((r,o)=>r.claim_order-o.claim_order);for(let r=0,o=0;r<c.length;r++){for(;o<u.length&&c[r].claim_order>=u[o].claim_order;)o++;const f=o<u.length?u[o]:null;t.insertBefore(c[r],f)}}function st(t,e){if(j){for(lt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function St(t,e,n){j&&!n?st(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ot(t){t.parentNode.removeChild(t)}function At(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ut(t){return document.createElement(t)}function at(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function z(t){return document.createTextNode(t)}function Nt(){return z(" ")}function jt(){return z("")}function Mt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Ct(t){return function(e){return e.preventDefault(),t.call(this,e)}}function qt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ft(t){return Array.from(t.childNodes)}function _t(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Q(t,e,n,i,l=!1){_t(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(e(s)){const r=n(s);return r===void 0?t.splice(c,1):t[c]=r,l||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(e(s)){const r=n(s);return r===void 0?t.splice(c,1):t[c]=r,l?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function R(t,e,n,i){return Q(t,l=>l.nodeName===e,l=>{const u=[];for(let c=0;c<l.attributes.length;c++){const s=l.attributes[c];n[s.name]||u.push(s.name)}u.forEach(c=>l.removeAttribute(c))},()=>i(e))}function Lt(t,e,n){return R(t,e,n,ut)}function Tt(t,e,n){return R(t,e,n,at)}function dt(t,e){return Q(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>z(e),!0)}function Bt(t){return dt(t," ")}function Ot(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Pt(t,e){t.value=e==null?"":e}function Dt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function zt(t,e,n){t.classList[n?"add":"remove"](e)}function Ft(t,e=document.body){return Array.from(e.querySelectorAll(t))}let w;function x(t){w=t}function M(){if(!w)throw new Error("Function called outside component initialization");return w}function Ht(t){M().$$.on_mount.push(t)}function It(t){M().$$.after_update.push(t)}function Wt(t,e){return M().$$.context.set(t,e),e}function Gt(t){return M().$$.context.get(t)}function Jt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const b=[],W=[],A=[],G=[],U=Promise.resolve();let O=!1;function V(){O||(O=!0,U.then(X))}function Kt(){return V(),U}function P(t){A.push(t)}const B=new Set;let S=0;function X(){const t=w;do{for(;S<b.length;){const e=b[S];S++,x(e),ht(e.$$)}for(x(null),b.length=0,S=0;W.length;)W.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];B.has(n)||(B.add(n),n())}A.length=0}while(b.length);for(;G.length;)G.pop()();O=!1,B.clear(),x(t)}function ht(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const N=new Set;let g;function Qt(){g={r:0,c:[],p:g}}function Rt(){g.r||$(g.c),g=g.p}function Y(t,e){t&&t.i&&(N.delete(t),t.i(e))}function mt(t,e,n,i){if(t&&t.o){if(N.has(t))return;N.add(t),g.c.push(()=>{N.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}function Ut(t,e){mt(t,1,1,()=>{e.delete(t.key)})}function Vt(t,e,n,i,l,u,c,s,r,o,f,d){let _=t.length,m=u.length,h=_;const C={};for(;h--;)C[t[h].key]=h;const k=[],q=new Map,L=new Map;for(h=m;h--;){const a=d(l,u,h),y=n(a);let p=c.get(y);p?i&&p.p(a,e):(p=o(y,a),p.c()),q.set(y,k[h]=p),y in C&&L.set(y,Math.abs(h-C[y]))}const F=new Set,H=new Set;function T(a){Y(a,1),a.m(s,f),c.set(a.key,a),f=a.first,m--}for(;_&&m;){const a=k[m-1],y=t[_-1],p=a.key,v=y.key;a===y?(f=a.first,_--,m--):q.has(v)?!c.has(p)||F.has(p)?T(a):H.has(v)?_--:L.get(p)>L.get(v)?(H.add(p),T(a)):(F.add(v),_--):(r(y,c),_--)}for(;_--;){const a=t[_];q.has(a.key)||r(a,c)}for(;m;)T(k[m-1]);return k}function Xt(t,e){const n={},i={},l={$$scope:1};let u=t.length;for(;u--;){const c=t[u],s=e[u];if(s){for(const r in c)r in s||(i[r]=1);for(const r in s)l[r]||(n[r]=s[r],l[r]=1);t[u]=s}else for(const r in c)l[r]=1}for(const c in i)c in n||(n[c]=void 0);return n}function Yt(t){return typeof t=="object"&&t!==null?t:{}}function Zt(t){t&&t.c()}function te(t,e){t&&t.l(e)}function yt(t,e,n,i){const{fragment:l,on_mount:u,on_destroy:c,after_update:s}=t.$$;l&&l.m(e,n),i||P(()=>{const r=u.map(J).filter(tt);c?c.push(...r):$(r),t.$$.on_mount=[]}),s.forEach(P)}function pt(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function gt(t,e){t.$$.dirty[0]===-1&&(b.push(t),V(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ee(t,e,n,i,l,u,c,s=[-1]){const r=w;x(t);const o=t.$$={fragment:null,ctx:null,props:u,update:D,not_equal:l,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:I(),dirty:s,skip_bound:!1,root:e.target||r.$$.root};c&&c(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(d,_,...m)=>{const h=m.length?m[0]:_;return o.ctx&&l(o.ctx[d],o.ctx[d]=h)&&(!o.skip_bound&&o.bound[d]&&o.bound[d](h),f&&gt(t,d)),_}):[],o.update(),f=!0,$(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){it();const d=ft(e.target);o.fragment&&o.fragment.l(d),d.forEach(ot)}else o.fragment&&o.fragment.c();e.intro&&Y(t.$$.fragment),yt(t,e.target,e.anchor,e.customElement),rt(),X()}x(r)}class ne{$destroy(){pt(this,1),this.$destroy=D}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const l=i.indexOf(n);l!==-1&&i.splice(l,1)}}$set(e){this.$$set&&!et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Ft as $,Xt as A,Yt as B,pt as C,Z as D,Kt as E,$t as F,vt as G,Et as H,kt as I,st as J,Pt as K,Mt as L,Ct as M,$ as N,Gt as O,xt as P,wt as Q,W as R,ne as S,At as T,tt as U,at as V,Tt as W,zt as X,Vt as Y,Ut as Z,Jt as _,ft as a,qt as b,Lt as c,ot as d,ut as e,Dt as f,St as g,dt as h,ee as i,Ot as j,Nt as k,jt as l,Bt as m,D as n,Qt as o,mt as p,Rt as q,Y as r,bt as s,z as t,Wt as u,It as v,Ht as w,Zt as x,te as y,yt as z};
