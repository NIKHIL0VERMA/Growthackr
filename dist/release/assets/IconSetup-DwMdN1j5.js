import{M as Ae,c as Gn,L as Bn}from"./messages-CQ8BvmkL.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const Xn=!1,qn=(t,e)=>t===e,Ht=Symbol("solid-proxy"),Kn=typeof Proxy=="function",Zn=Symbol("solid-track"),wt={equals:qn};let tn=rn;const j=1,St=2,en={owned:null,cleanups:null,context:null,owner:null},zt={};var v=null;let Dt=null,Qn=null,w=null,N=null,z=null,Nt=0;function vt(t,e){const n=w,a=v,r=t.length===0,s=e===void 0?a:e,i=r?en:{owned:null,cleanups:null,context:s?s.context:null,owner:s},o=r?t:()=>t(()=>L(()=>ft(i)));v=i,w=null;try{return Z(o,!0)}finally{w=n,v=a}}function q(t,e){e=e?Object.assign({},wt,e):wt;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},a=r=>(typeof r=="function"&&(r=r(n.value)),an(n,r));return[nn.bind(n),a]}function Jn(t,e,n){const a=Tt(t,e,!0,j);st(a)}function Y(t,e,n){const a=Tt(t,e,!1,j);st(a)}function ta(t,e,n){tn=fa;const a=Tt(t,e,!1,j);a.user=!0,z?z.push(a):st(a)}function V(t,e,n){n=n?Object.assign({},wt,n):wt;const a=Tt(t,e,!0,0);return a.observers=null,a.observerSlots=null,a.comparator=n.equals||void 0,st(a),nn.bind(a)}function ea(t){return t&&typeof t=="object"&&"then"in t}function li(t,e,n){let a,r,s;a=!0,r=t,s={};let i=null,o=zt,l=!1,c="initialValue"in s,d=typeof a=="function"&&V(a);const u=new Set,[m,g]=(s.storage||q)(s.initialValue),[A,C]=q(void 0),[E,O]=q(void 0,{equals:!1}),[p,y]=q(c?"ready":"unresolved");function x(P,S,k,tt){return i===P&&(i=null,tt!==void 0&&(c=!0),(P===o||S===o)&&s.onHydrated&&queueMicrotask(()=>s.onHydrated(tt,{value:S})),o=zt,I(S,k)),S}function I(P,S){Z(()=>{S===void 0&&g(()=>P),y(S!==void 0?"errored":c?"ready":"unresolved"),C(S);for(const k of u.keys())k.decrement();u.clear()},!1)}function B(){const P=oa,S=m(),k=A();if(k!==void 0&&!i)throw k;return w&&w.user,S}function X(P=!0){if(P!==!1&&l)return;l=!1;const S=d?d():a;if(S==null||S===!1){x(i,L(m));return}const k=o!==zt?o:L(()=>r(S,{value:m(),refetching:P}));return ea(k)?(i=k,"value"in k?(k.status==="success"?x(i,k.value,void 0,S):x(i,void 0,Wt(k.value),S),k):(l=!0,queueMicrotask(()=>l=!1),Z(()=>{y(c?"refreshing":"pending"),O()},!1),k.then(tt=>x(k,tt,void 0,S),tt=>x(k,void 0,Wt(tt),S)))):(x(i,k,void 0,S),k)}return Object.defineProperties(B,{state:{get:()=>p()},error:{get:()=>A()},loading:{get(){const P=p();return P==="pending"||P==="refreshing"}},latest:{get(){if(!c)return B();const P=A();if(P&&!i)throw P;return m()}}}),d?Jn(()=>X(!1)):X(!1),[B,{refetch:X,mutate:g}]}function L(t){if(w===null)return t();const e=w;w=null;try{return t()}finally{w=e}}function na(t){ta(()=>L(t))}function aa(t){return v===null||(v.cleanups===null?v.cleanups=[t]:v.cleanups.push(t)),t}const[ci,fi]=q(!1);function ra(t,e){const n=Symbol("context");return{id:n,Provider:ua(n),defaultValue:t}}function sa(t){let e;return v&&v.context&&(e=v.context[t.id])!==void 0?e:t.defaultValue}function ia(t){const e=V(t),n=V(()=>Gt(e()));return n.toArray=()=>{const a=n();return Array.isArray(a)?a:a!=null?[a]:[]},n}let oa;function nn(){if(this.sources&&this.state)if(this.state===j)st(this);else{const t=N;N=null,Z(()=>Ct(this),!1),N=t}if(w){const t=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(t)):(w.sources=[this],w.sourceSlots=[t]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return this.value}function an(t,e,n){let a=t.value;return(!t.comparator||!t.comparator(a,e))&&(t.value=e,t.observers&&t.observers.length&&Z(()=>{for(let r=0;r<t.observers.length;r+=1){const s=t.observers[r],i=Dt&&Dt.running;i&&Dt.disposed.has(s),(i?!s.tState:!s.state)&&(s.pure?N.push(s):z.push(s),s.observers&&sn(s)),i||(s.state=j)}if(N.length>1e6)throw N=[],new Error},!1)),e}function st(t){if(!t.fn)return;ft(t);const e=Nt;la(t,t.value,e)}function la(t,e,n){let a;const r=v,s=w;w=v=t;try{a=t.fn(e)}catch(i){return t.pure&&(t.state=j,t.owned&&t.owned.forEach(ft),t.owned=null),t.updatedAt=n+1,on(i)}finally{w=s,v=r}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?an(t,a):t.value=a,t.updatedAt=n)}function Tt(t,e,n,a=j,r){const s={fn:t,state:a,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:v,context:v?v.context:null,pure:n};return v===null||v!==en&&(v.owned?v.owned.push(s):v.owned=[s]),s}function kt(t){if(t.state===0)return;if(t.state===St)return Ct(t);if(t.suspense&&L(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<Nt);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===j)st(t);else if(t.state===St){const a=N;N=null,Z(()=>Ct(t,e[0]),!1),N=a}}function Z(t,e){if(N)return t();let n=!1;e||(N=[]),z?n=!0:z=[],Nt++;try{const a=t();return ca(n),a}catch(a){n||(z=null),N=null,on(a)}}function ca(t){if(N&&(rn(N),N=null),t)return;const e=z;z=null,e.length&&Z(()=>tn(e),!1)}function rn(t){for(let e=0;e<t.length;e++)kt(t[e])}function fa(t){let e,n=0;for(e=0;e<t.length;e++){const a=t[e];a.user?t[n++]=a:kt(a)}for(e=0;e<n;e++)kt(t[e])}function Ct(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const a=t.sources[n];if(a.sources){const r=a.state;r===j?a!==e&&(!a.updatedAt||a.updatedAt<Nt)&&kt(a):r===St&&Ct(a,e)}}}function sn(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=St,n.pure?N.push(n):z.push(n),n.observers&&sn(n))}}function ft(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),a=t.sourceSlots.pop(),r=n.observers;if(r&&r.length){const s=r.pop(),i=n.observerSlots.pop();a<r.length&&(s.sourceSlots[i]=a,r[a]=s,n.observerSlots[a]=i)}}if(t.tOwned){for(e=t.tOwned.length-1;e>=0;e--)ft(t.tOwned[e]);delete t.tOwned}if(t.owned){for(e=t.owned.length-1;e>=0;e--)ft(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0}function Wt(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function on(t,e=v){throw Wt(t)}function Gt(t){if(typeof t=="function"&&!t.length)return Gt(t());if(Array.isArray(t)){const e=[];for(let n=0;n<t.length;n++){const a=Gt(t[n]);Array.isArray(a)?e.push.apply(e,a):e.push(a)}return e}return t}function ua(t,e){return function(a){let r;return Y(()=>r=L(()=>(v.context={...v.context,[t]:a.value},ia(()=>a.children))),void 0),r}}const da=Symbol("fallback");function we(t){for(let e=0;e<t.length;e++)t[e]()}function ma(t,e,n={}){let a=[],r=[],s=[],i=0,o=e.length>1?[]:null;return aa(()=>we(s)),()=>{let l=t()||[],c=l.length,d,u;return l[Zn],L(()=>{let g,A,C,E,O,p,y,x,I;if(c===0)i!==0&&(we(s),s=[],a=[],r=[],i=0,o&&(o=[])),n.fallback&&(a=[da],r[0]=vt(B=>(s[0]=B,n.fallback())),i=1);else if(i===0){for(r=new Array(c),u=0;u<c;u++)a[u]=l[u],r[u]=vt(m);i=c}else{for(C=new Array(c),E=new Array(c),o&&(O=new Array(c)),p=0,y=Math.min(i,c);p<y&&a[p]===l[p];p++);for(y=i-1,x=c-1;y>=p&&x>=p&&a[y]===l[x];y--,x--)C[x]=r[y],E[x]=s[y],o&&(O[x]=o[y]);for(g=new Map,A=new Array(x+1),u=x;u>=p;u--)I=l[u],d=g.get(I),A[u]=d===void 0?-1:d,g.set(I,u);for(d=p;d<=y;d++)I=a[d],u=g.get(I),u!==void 0&&u!==-1?(C[u]=r[d],E[u]=s[d],o&&(O[u]=o[d]),u=A[u],g.set(I,u)):s[d]();for(u=p;u<c;u++)u in C?(r[u]=C[u],s[u]=E[u],o&&(o[u]=O[u],o[u](u))):r[u]=vt(m);r=r.slice(0,i=c),a=l.slice(0)}return r});function m(g){if(s[u]=g,o){const[A,C]=q(u);return o[u]=C,e(l[u],A)}return e(l[u])}}}function ha(t,e){return L(()=>t(e||{}))}function pt(){return!0}const ga={get(t,e,n){return e===Ht?n:t.get(e)},has(t,e){return e===Ht?!0:t.has(e)},set:pt,deleteProperty:pt,getOwnPropertyDescriptor(t,e){return{configurable:!0,enumerable:!0,get(){return t.get(e)},set:pt,deleteProperty:pt}},ownKeys(t){return t.keys()}};function Rt(t){return(t=typeof t=="function"?t():t)?t:{}}function pa(){for(let t=0,e=this.length;t<e;++t){const n=this[t]();if(n!==void 0)return n}}function ya(...t){let e=!1;for(let i=0;i<t.length;i++){const o=t[i];e=e||!!o&&Ht in o,t[i]=typeof o=="function"?(e=!0,V(o)):o}if(Kn&&e)return new Proxy({get(i){for(let o=t.length-1;o>=0;o--){const l=Rt(t[o])[i];if(l!==void 0)return l}},has(i){for(let o=t.length-1;o>=0;o--)if(i in Rt(t[o]))return!0;return!1},keys(){const i=[];for(let o=0;o<t.length;o++)i.push(...Object.keys(Rt(t[o])));return[...new Set(i)]}},ga);const n={},a=Object.create(null);for(let i=t.length-1;i>=0;i--){const o=t[i];if(!o)continue;const l=Object.getOwnPropertyNames(o);for(let c=l.length-1;c>=0;c--){const d=l[c];if(d==="__proto__"||d==="constructor")continue;const u=Object.getOwnPropertyDescriptor(o,d);if(!a[d])a[d]=u.get?{enumerable:!0,configurable:!0,get:pa.bind(n[d]=[u.get.bind(o)])}:u.value!==void 0?u:void 0;else{const m=n[d];m&&(u.get?m.push(u.get.bind(o)):u.value!==void 0&&m.push(()=>u.value))}}}const r={},s=Object.keys(a);for(let i=s.length-1;i>=0;i--){const o=s[i],l=a[o];l&&l.get?Object.defineProperty(r,o,l):r[o]=l?l.value:void 0}return r}const ba=t=>`Stale read from <${t}>.`;function ui(t){const e="fallback"in t&&{fallback:()=>t.fallback};return V(ma(()=>t.each,t.children,e||void 0))}function di(t){const e=t.keyed,n=V(()=>t.when,void 0,void 0),a=e?n:V(n,void 0,{equals:(r,s)=>!r==!s});return V(()=>{const r=a();if(r){const s=t.children;return typeof s=="function"&&s.length>0?L(()=>s(e?r:()=>{if(!L(a))throw ba("Show");return n()})):s}return t.fallback},void 0,void 0)}const va=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],xa=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...va]),Aa=new Set(["innerHTML","textContent","innerText","children"]),wa=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Sa=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function ka(t,e){const n=Sa[t];return typeof n=="object"?n[e]?n.$:void 0:n}const Ca=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]);function Ea(t,e,n){let a=n.length,r=e.length,s=a,i=0,o=0,l=e[r-1].nextSibling,c=null;for(;i<r||o<s;){if(e[i]===n[o]){i++,o++;continue}for(;e[r-1]===n[s-1];)r--,s--;if(r===i){const d=s<a?o?n[o-1].nextSibling:n[s-o]:l;for(;o<s;)t.insertBefore(n[o++],d)}else if(s===o)for(;i<r;)(!c||!c.has(e[i]))&&e[i].remove(),i++;else if(e[i]===n[s-1]&&n[o]===e[r-1]){const d=e[--r].nextSibling;t.insertBefore(n[o++],e[i++].nextSibling),t.insertBefore(n[--s],d),e[r]=n[s]}else{if(!c){c=new Map;let u=o;for(;u<s;)c.set(n[u],u++)}const d=c.get(e[i]);if(d!=null)if(o<d&&d<s){let u=i,m=1,g;for(;++u<r&&u<s&&!((g=c.get(e[u]))==null||g!==d+m);)m++;if(m>d-o){const A=e[i];for(;o<d;)t.insertBefore(n[o++],A)}else t.replaceChild(n[o++],e[i++])}else i++;else e[i++].remove()}}}const Se="_$DX_DELEGATE";function mi(t,e,n,a={}){let r;return vt(s=>{r=s,e===document?t():un(e,t(),e.firstChild?null:void 0,n)},a.owner),()=>{r(),e.textContent=""}}function ln(t,e,n,a){let r;const s=()=>{const o=document.createElement("template");return o.innerHTML=t,o.content.firstChild},i=()=>(r||(r=s())).cloneNode(!0);return i.cloneNode=i,i}function cn(t,e=window.document){const n=e[Se]||(e[Se]=new Set);for(let a=0,r=t.length;a<r;a++){const s=t[a];n.has(s)||(n.add(s),e.addEventListener(s,Fa))}}function Et(t,e,n){n==null?t.removeAttribute(e):t.setAttribute(e,n)}function Pa(t,e,n){n?t.setAttribute(e,""):t.removeAttribute(e)}function Oa(t,e){e==null?t.removeAttribute("class"):t.className=e}function fn(t,e,n,a){if(a)Array.isArray(n)?(t[`$$${e}`]=n[0],t[`$$${e}Data`]=n[1]):t[`$$${e}`]=n;else if(Array.isArray(n)){const r=n[0];t.addEventListener(e,n[0]=s=>r.call(t,n[1],s))}else t.addEventListener(e,n,typeof n!="function"&&n)}function Na(t,e,n={}){const a=Object.keys(e||{}),r=Object.keys(n);let s,i;for(s=0,i=r.length;s<i;s++){const o=r[s];!o||o==="undefined"||e[o]||(ke(t,o,!1),delete n[o])}for(s=0,i=a.length;s<i;s++){const o=a[s],l=!!e[o];!o||o==="undefined"||n[o]===l||!l||(ke(t,o,!0),n[o]=l)}return n}function Ta(t,e,n){if(!e)return n?Et(t,"style"):e;const a=t.style;if(typeof e=="string")return a.cssText=e;typeof n=="string"&&(a.cssText=n=void 0),n||(n={}),e||(e={});let r,s;for(s in n)e[s]==null&&a.removeProperty(s),delete n[s];for(s in e)r=e[s],r!==n[s]&&(a.setProperty(s,r),n[s]=r);return n}function Ia(t,e={},n,a){const r={};return Y(()=>r.children=ut(t,e.children,r.children)),Y(()=>typeof e.ref=="function"&&Ma(e.ref,t)),Y(()=>La(t,e,n,!0,r,!0)),r}function Ma(t,e,n){return L(()=>t(e,n))}function un(t,e,n,a){if(n!==void 0&&!a&&(a=[]),typeof e!="function")return ut(t,e,a,n);Y(r=>ut(t,e(),r,n),a)}function La(t,e,n,a,r={},s=!1){e||(e={});for(const i in r)if(!(i in e)){if(i==="children")continue;r[i]=Ce(t,i,null,r[i],n,s,e)}for(const i in e){if(i==="children")continue;const o=e[i];r[i]=Ce(t,i,o,r[i],n,s,e)}}function _a(t){return t.toLowerCase().replace(/-([a-z])/g,(e,n)=>n.toUpperCase())}function ke(t,e,n){const a=e.trim().split(/\s+/);for(let r=0,s=a.length;r<s;r++)t.classList.toggle(a[r],n)}function Ce(t,e,n,a,r,s,i){let o,l,c,d,u;if(e==="style")return Ta(t,n,a);if(e==="classList")return Na(t,n,a);if(n===a)return a;if(e==="ref")s||n(t);else if(e.slice(0,3)==="on:"){const m=e.slice(3);a&&t.removeEventListener(m,a,typeof a!="function"&&a),n&&t.addEventListener(m,n,typeof n!="function"&&n)}else if(e.slice(0,10)==="oncapture:"){const m=e.slice(10);a&&t.removeEventListener(m,a,!0),n&&t.addEventListener(m,n,!0)}else if(e.slice(0,2)==="on"){const m=e.slice(2).toLowerCase(),g=Ca.has(m);if(!g&&a){const A=Array.isArray(a)?a[0]:a;t.removeEventListener(m,A)}(g||n)&&(fn(t,m,n,g),g&&cn([m]))}else e.slice(0,5)==="attr:"?Et(t,e.slice(5),n):e.slice(0,5)==="bool:"?Pa(t,e.slice(5),n):(u=e.slice(0,5)==="prop:")||(c=Aa.has(e))||(d=ka(e,t.tagName))||(l=xa.has(e))||(o=t.nodeName.includes("-")||"is"in i)?(u&&(e=e.slice(5),l=!0),e==="class"||e==="className"?Oa(t,n):o&&!l&&!c?t[_a(e)]=n:t[d||e]=n):Et(t,wa[e]||e,n);return n}function Fa(t){let e=t.target;const n=`$$${t.type}`,a=t.target,r=t.currentTarget,s=l=>Object.defineProperty(t,"target",{configurable:!0,value:l}),i=()=>{const l=e[n];if(l&&!e.disabled){const c=e[`${n}Data`];if(c!==void 0?l.call(e,c,t):l.call(e,t),t.cancelBubble)return}return e.host&&typeof e.host!="string"&&!e.host._$host&&e.contains(t.target)&&s(e.host),!0},o=()=>{for(;i()&&(e=e._$host||e.parentNode||e.host););};if(Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return e||document}}),t.composedPath){const l=t.composedPath();s(l[0]);for(let c=0;c<l.length-2&&(e=l[c],!!i());c++){if(e._$host){e=e._$host,o();break}if(e.parentNode===r)break}}else o();s(a)}function ut(t,e,n,a,r){for(;typeof n=="function";)n=n();if(e===n)return n;const s=typeof e,i=a!==void 0;if(t=i&&n[0]&&n[0].parentNode||t,s==="string"||s==="number"){if(s==="number"&&(e=e.toString(),e===n))return n;if(i){let o=n[0];o&&o.nodeType===3?o.data!==e&&(o.data=e):o=document.createTextNode(e),n=et(t,n,a,o)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e}else if(e==null||s==="boolean")n=et(t,n,a);else{if(s==="function")return Y(()=>{let o=e();for(;typeof o=="function";)o=o();n=ut(t,o,n,a)}),()=>n;if(Array.isArray(e)){const o=[],l=n&&Array.isArray(n);if(Bt(o,e,n,r))return Y(()=>n=ut(t,o,n,a,!0)),()=>n;if(o.length===0){if(n=et(t,n,a),i)return n}else l?n.length===0?Ee(t,o,a):Ea(t,n,o):(n&&et(t),Ee(t,o));n=o}else if(e.nodeType){if(Array.isArray(n)){if(i)return n=et(t,n,a,e);et(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}}return n}function Bt(t,e,n,a){let r=!1;for(let s=0,i=e.length;s<i;s++){let o=e[s],l=n&&n[t.length],c;if(!(o==null||o===!0||o===!1))if((c=typeof o)=="object"&&o.nodeType)t.push(o);else if(Array.isArray(o))r=Bt(t,o,l)||r;else if(c==="function")if(a){for(;typeof o=="function";)o=o();r=Bt(t,Array.isArray(o)?o:[o],Array.isArray(l)?l:[l])||r}else t.push(o),r=!0;else{const d=String(o);l&&l.nodeType===3&&l.data===d?t.push(l):t.push(document.createTextNode(d))}}return r}function Ee(t,e,n=null){for(let a=0,r=e.length;a<r;a++)t.insertBefore(e[a],n)}function et(t,e,n,a){if(n===void 0)return t.textContent="";const r=a||document.createTextNode("");if(e.length){let s=!1;for(let i=e.length-1;i>=0;i--){const o=e[i];if(r!==o){const l=o.parentNode===t;!s&&!i?l?t.replaceChild(r,o):t.insertBefore(r,n):l&&o.remove()}else s=!0}}else t.insertBefore(r,n);return[r]}const za=()=>{const t=localStorage.getItem("theme");return t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches},Da=()=>{const[t,e]=q(za()),n=()=>{const r=!t();e(r),document.documentElement.setAttribute("data-theme",r?"dark":"light"),localStorage.setItem("theme",r?"dark":"light"),chrome.runtime.sendMessage({action:Ae.SYNC_THEME,theme:r?"dark":"light"}).catch(s=>{Gn(`Theme sync message failed cause ${s}`,Bn.ERROR)})},a=()=>{chrome.runtime.onMessage.addListener(r=>{if(r.action===Ae.SYNC_THEME){const i=r.theme==="dark";i!==t()&&(e(i),document.documentElement.setAttribute("data-theme",r.theme),localStorage.setItem("theme",r.theme))}return!0})};return na(()=>{document.documentElement.setAttribute("data-theme",t()?"dark":"light"),a()}),{isDarkMode:t,toggleTheme:n}},dn=ra(),hi=t=>{const e=Da();return ha(dn.Provider,{value:e,get children(){return t.children}})},Ra=()=>{const t=sa(dn);if(!t)throw new Error("useTheme must be used within a ThemeProvider");return t};var ja=ln("<button>");function gi(t){const e={primary:"btn-primary",secondary:"btn-secondary",outline:"btn-outline"};return(()=>{var n=ja();return Ia(n,ya(t,{get class(){return`${e[t.variant||"primary"]} ${t.class||""}`}}),!1),n})()}var $a=ln('<button class=theme-switch aria-label="Toggle theme"><span class=theme-switch__icon>');function pi(){const{isDarkMode:t,toggleTheme:e}=Ra();return(()=>{var n=$a(),a=n.firstChild;return fn(n,"click",e,!0),un(a,()=>t()?"🌙":"☀️"),Y(()=>Et(n,"aria-pressed",t())),n})()}cn(["click"]);/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function Ua(t,e,n){return(e=Va(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Pe(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Pe(Object(n),!0).forEach(function(a){Ua(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Pe(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function Ya(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Va(t){var e=Ya(t,"string");return typeof e=="symbol"?e:e+""}const Oe=()=>{};let fe={},mn={},hn=null,gn={mark:Oe,measure:Oe};try{typeof window<"u"&&(fe=window),typeof document<"u"&&(mn=document),typeof MutationObserver<"u"&&(hn=MutationObserver),typeof performance<"u"&&(gn=performance)}catch{}const{userAgent:Ne=""}=fe.navigator||{},H=fe,b=mn,Te=hn,yt=gn;H.document;const $=!!b.documentElement&&!!b.head&&typeof b.addEventListener=="function"&&typeof b.createElement=="function",pn=~Ne.indexOf("MSIE")||~Ne.indexOf("Trident/");var Ha=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Wa=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,yn={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Ga={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},bn=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],T="classic",It="duotone",Ba="sharp",Xa="sharp-duotone",vn=[T,It,Ba,Xa],qa={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},Ka={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},Za=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),Qa={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},Ja=["fak","fa-kit","fakd","fa-kit-duotone"],Ie={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},tr=["kit"],er={kit:{"fa-kit":"fak"}},nr=["fak","fakd"],ar={kit:{fak:"fa-kit"}},Me={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},bt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},rr=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],sr=["fak","fa-kit","fakd","fa-kit-duotone"],ir={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},or={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},lr={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},Xt={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},cr=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],qt=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...rr,...cr],fr=["solid","regular","light","thin","duotone","brands"],xn=[1,2,3,4,5,6,7,8,9,10],ur=xn.concat([11,12,13,14,15,16,17,18,19,20]),dr=[...Object.keys(lr),...fr,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",bt.GROUP,bt.SWAP_OPACITY,bt.PRIMARY,bt.SECONDARY].concat(xn.map(t=>"".concat(t,"x"))).concat(ur.map(t=>"w-".concat(t))),mr={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const D="___FONT_AWESOME___",Kt=16,An="fa",wn="svg-inline--fa",Q="data-fa-i2svg",Zt="data-fa-pseudo-element",hr="data-fa-pseudo-element-pending",ue="data-prefix",de="data-icon",Le="fontawesome-i2svg",gr="async",pr=["HTML","HEAD","STYLE","SCRIPT"],Sn=(()=>{try{return!0}catch{return!1}})();function ht(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[T]}})}const kn=f({},yn);kn[T]=f(f(f(f({},{"fa-duotone":"duotone"}),yn[T]),Ie.kit),Ie["kit-duotone"]);const yr=ht(kn),Qt=f({},Qa);Qt[T]=f(f(f(f({},{duotone:"fad"}),Qt[T]),Me.kit),Me["kit-duotone"]);const _e=ht(Qt),Jt=f({},Xt);Jt[T]=f(f({},Jt[T]),ar.kit);const me=ht(Jt),te=f({},or);te[T]=f(f({},te[T]),er.kit);ht(te);const br=Ha,Cn="fa-layers-text",vr=Wa,xr=f({},qa);ht(xr);const Ar=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],jt=Ga,wr=[...tr,...dr],lt=H.FontAwesomeConfig||{};function Sr(t){var e=b.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function kr(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}b&&typeof b.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=kr(Sr(n));r!=null&&(lt[a]=r)});const En={styleDefault:"solid",familyDefault:T,cssPrefix:An,replacementClass:wn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};lt.familyPrefix&&(lt.cssPrefix=lt.familyPrefix);const rt=f(f({},En),lt);rt.autoReplaceSvg||(rt.observeMutations=!1);const h={};Object.keys(En).forEach(t=>{Object.defineProperty(h,t,{enumerable:!0,set:function(e){rt[t]=e,ct.forEach(n=>n(h))},get:function(){return rt[t]}})});Object.defineProperty(h,"familyPrefix",{enumerable:!0,set:function(t){rt.cssPrefix=t,ct.forEach(e=>e(h))},get:function(){return rt.cssPrefix}});H.FontAwesomeConfig=h;const ct=[];function Cr(t){return ct.push(t),()=>{ct.splice(ct.indexOf(t),1)}}const U=Kt,_={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Er(t){if(!t||!$)return;const e=b.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=b.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const s=n[r],i=(s.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=s)}return b.head.insertBefore(e,a),t}const Pr="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function dt(){let t=12,e="";for(;t-- >0;)e+=Pr[Math.random()*62|0];return e}function it(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function he(t){return t.classList?it(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function Pn(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Or(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(Pn(t[n]),'" '),"").trim()}function Mt(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function ge(t){return t.size!==_.size||t.x!==_.x||t.y!==_.y||t.rotate!==_.rotate||t.flipX||t.flipY}function Nr(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},s="translate(".concat(e.x*32,", ").concat(e.y*32,") "),i="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),o="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(s," ").concat(i," ").concat(o)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function Tr(t){let{transform:e,width:n=Kt,height:a=Kt,startCentered:r=!1}=t,s="";return r&&pn?s+="translate(".concat(e.x/U-n/2,"em, ").concat(e.y/U-a/2,"em) "):r?s+="translate(calc(-50% + ".concat(e.x/U,"em), calc(-50% + ").concat(e.y/U,"em)) "):s+="translate(".concat(e.x/U,"em, ").concat(e.y/U,"em) "),s+="scale(".concat(e.size/U*(e.flipX?-1:1),", ").concat(e.size/U*(e.flipY?-1:1),") "),s+="rotate(".concat(e.rotate,"deg) "),s}var Ir=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function On(){const t=An,e=wn,n=h.cssPrefix,a=h.replacementClass;let r=Ir;if(n!==t||a!==e){const s=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),o=new RegExp("\\.".concat(e),"g");r=r.replace(s,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(o,".".concat(a))}return r}let Fe=!1;function $t(){h.autoAddCss&&!Fe&&(Er(On()),Fe=!0)}var Mr={mixout(){return{dom:{css:On,insertCss:$t}}},hooks(){return{beforeDOMElementCreation(){$t()},beforeI2svg(){$t()}}}};const R=H||{};R[D]||(R[D]={});R[D].styles||(R[D].styles={});R[D].hooks||(R[D].hooks={});R[D].shims||(R[D].shims=[]);var F=R[D];const Nn=[],Tn=function(){b.removeEventListener("DOMContentLoaded",Tn),Pt=1,Nn.map(t=>t())};let Pt=!1;$&&(Pt=(b.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(b.readyState),Pt||b.addEventListener("DOMContentLoaded",Tn));function Lr(t){$&&(Pt?setTimeout(t,0):Nn.push(t))}function gt(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?Pn(t):"<".concat(e," ").concat(Or(n),">").concat(a.map(gt).join(""),"</").concat(e,">")}function ze(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var Ut=function(e,n,a,r){var s=Object.keys(e),i=s.length,o=n,l,c,d;for(a===void 0?(l=1,d=e[s[0]]):(l=0,d=a);l<i;l++)c=s[l],d=o(d,e[c],c,e);return d};function _r(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const s=t.charCodeAt(n++);(s&64512)==56320?e.push(((r&1023)<<10)+(s&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function ee(t){const e=_r(t);return e.length===1?e[0].toString(16):null}function Fr(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function De(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function ne(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=De(e);typeof F.hooks.addPack=="function"&&!a?F.hooks.addPack(t,De(e)):F.styles[t]=f(f({},F.styles[t]||{}),r),t==="fas"&&ne("fa",e)}const{styles:mt,shims:zr}=F,In=Object.keys(me),Dr=In.reduce((t,e)=>(t[e]=Object.keys(me[e]),t),{});let pe=null,Mn={},Ln={},_n={},Fn={},zn={};function Rr(t){return~wr.indexOf(t)}function jr(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!Rr(r)?r:null}const Dn=()=>{const t=a=>Ut(mt,(r,s,i)=>(r[i]=Ut(s,a,{}),r),{});Mn=t((a,r,s)=>(r[3]&&(a[r[3]]=s),r[2]&&r[2].filter(o=>typeof o=="number").forEach(o=>{a[o.toString(16)]=s}),a)),Ln=t((a,r,s)=>(a[s]=s,r[2]&&r[2].filter(o=>typeof o=="string").forEach(o=>{a[o]=s}),a)),zn=t((a,r,s)=>{const i=r[2];return a[s]=s,i.forEach(o=>{a[o]=s}),a});const e="far"in mt||h.autoFetchSvg,n=Ut(zr,(a,r)=>{const s=r[0];let i=r[1];const o=r[2];return i==="far"&&!e&&(i="fas"),typeof s=="string"&&(a.names[s]={prefix:i,iconName:o}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:i,iconName:o}),a},{names:{},unicodes:{}});_n=n.names,Fn=n.unicodes,pe=Lt(h.styleDefault,{family:h.familyDefault})};Cr(t=>{pe=Lt(t.styleDefault,{family:h.familyDefault})});Dn();function ye(t,e){return(Mn[t]||{})[e]}function $r(t,e){return(Ln[t]||{})[e]}function K(t,e){return(zn[t]||{})[e]}function Rn(t){return _n[t]||{prefix:null,iconName:null}}function Ur(t){const e=Fn[t],n=ye("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function W(){return pe}const jn=()=>({prefix:null,iconName:null,rest:[]});function Yr(t){let e=T;const n=In.reduce((a,r)=>(a[r]="".concat(h.cssPrefix,"-").concat(r),a),{});return vn.forEach(a=>{(t.includes(n[a])||t.some(r=>Dr[a].includes(r)))&&(e=a)}),e}function Lt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=T}=e,a=yr[n][t];if(n===It&&!t)return"fad";const r=_e[n][t]||_e[n][a],s=t in F.styles?t:null;return r||s||null}function Vr(t){let e=[],n=null;return t.forEach(a=>{const r=jr(h.cssPrefix,a);r?n=r:a&&e.push(a)}),{iconName:n,rest:e}}function Re(t){return t.sort().filter((e,n,a)=>a.indexOf(e)===n)}function _t(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e;let a=null;const r=qt.concat(sr),s=Re(t.filter(u=>r.includes(u))),i=Re(t.filter(u=>!qt.includes(u))),o=s.filter(u=>(a=u,!bn.includes(u))),[l=null]=o,c=Yr(s),d=f(f({},Vr(i)),{},{prefix:Lt(l,{family:c})});return f(f(f({},d),Br({values:t,family:c,styles:mt,config:h,canonical:d,givenPrefix:a})),Hr(n,a,d))}function Hr(t,e,n){let{prefix:a,iconName:r}=n;if(t||!a||!r)return{prefix:a,iconName:r};const s=e==="fa"?Rn(r):{},i=K(a,r);return r=s.iconName||i||r,a=s.prefix||a,a==="far"&&!mt.far&&mt.fas&&!h.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}const Wr=vn.filter(t=>t!==T||t!==It),Gr=Object.keys(Xt).filter(t=>t!==T).map(t=>Object.keys(Xt[t])).flat();function Br(t){const{values:e,family:n,canonical:a,givenPrefix:r="",styles:s={},config:i={}}=t,o=n===It,l=e.includes("fa-duotone")||e.includes("fad"),c=i.familyDefault==="duotone",d=a.prefix==="fad"||a.prefix==="fa-duotone";if(!o&&(l||c||d)&&(a.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(a.prefix="fab"),!a.prefix&&Wr.includes(n)&&(Object.keys(s).find(m=>Gr.includes(m))||i.autoFetchSvg)){const m=Za.get(n).defaultShortPrefixId;a.prefix=m,a.iconName=K(a.prefix,a.iconName)||a.iconName}return(a.prefix==="fa"||r==="fa")&&(a.prefix=W()||"fas"),a}class Xr{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(s=>{this.definitions[s]=f(f({},this.definitions[s]||{}),r[s]),ne(s,r[s]);const i=me[T][s];i&&ne(i,r[s]),Dn()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:s,iconName:i,icon:o}=a[r],l=o[2];e[s]||(e[s]={}),l.length>0&&l.forEach(c=>{typeof c=="string"&&(e[s][c]=o)}),e[s][i]=o}),e}}let je=[],nt={};const at={},qr=Object.keys(at);function Kr(t,e){let{mixoutsTo:n}=e;return je=t,nt={},Object.keys(at).forEach(a=>{qr.indexOf(a)===-1&&delete at[a]}),je.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(s=>{typeof r[s]=="function"&&(n[s]=r[s]),typeof r[s]=="object"&&Object.keys(r[s]).forEach(i=>{n[s]||(n[s]={}),n[s][i]=r[s][i]})}),a.hooks){const s=a.hooks();Object.keys(s).forEach(i=>{nt[i]||(nt[i]=[]),nt[i].push(s[i])})}a.provides&&a.provides(at)}),n}function ae(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(nt[t]||[]).forEach(i=>{e=i.apply(null,[e,...a])}),e}function J(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(nt[t]||[]).forEach(s=>{s.apply(null,n)})}function G(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return at[t]?at[t].apply(null,e):void 0}function re(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||W();if(e)return e=K(n,e)||e,ze($n.definitions,n,e)||ze(F.styles,n,e)}const $n=new Xr,Zr=()=>{h.autoReplaceSvg=!1,h.observeMutations=!1,J("noAuto")},Qr={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return $?(J("beforeI2svg",t),G("pseudoElements2svg",t),G("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;h.autoReplaceSvg===!1&&(h.autoReplaceSvg=!0),h.observeMutations=!0,Lr(()=>{ts({autoReplaceSvgRoot:e}),J("watch",t)})}},Jr={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:K(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=Lt(t[0]);return{prefix:n,iconName:K(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(h.cssPrefix,"-"))>-1||t.match(br))){const e=_t(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||W(),iconName:K(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=W();return{prefix:e,iconName:K(e,t)||t}}}},M={noAuto:Zr,config:h,dom:Qr,parse:Jr,library:$n,findIconDefinition:re,toHtml:gt},ts=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=b}=t;(Object.keys(F.styles).length>0||h.autoFetchSvg)&&$&&h.autoReplaceSvg&&M.dom.i2svg({node:e})};function Ft(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>gt(n))}}),Object.defineProperty(t,"node",{get:function(){if(!$)return;const n=b.createElement("div");return n.innerHTML=t.html,n.children}}),t}function es(t){let{children:e,main:n,mask:a,attributes:r,styles:s,transform:i}=t;if(ge(i)&&n.found&&!a.found){const{width:o,height:l}=n,c={x:o/l/2,y:.5};r.style=Mt(f(f({},s),{},{"transform-origin":"".concat(c.x+i.x/16,"em ").concat(c.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function ns(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:s}=t;const i=s===!0?"".concat(e,"-").concat(h.cssPrefix,"-").concat(n):s;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},r),{},{id:i}),children:a}]}]}function be(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:s,symbol:i,title:o,maskId:l,titleId:c,extra:d,watchable:u=!1}=t,{width:m,height:g}=n.found?n:e,A=nr.includes(a),C=[h.replacementClass,r?"".concat(h.cssPrefix,"-").concat(r):""].filter(I=>d.classes.indexOf(I)===-1).filter(I=>I!==""||!!I).concat(d.classes).join(" ");let E={children:[],attributes:f(f({},d.attributes),{},{"data-prefix":a,"data-icon":r,class:C,role:d.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(m," ").concat(g)})};const O=A&&!~d.classes.indexOf("fa-fw")?{width:"".concat(m/g*16*.0625,"em")}:{};u&&(E.attributes[Q]=""),o&&(E.children.push({tag:"title",attributes:{id:E.attributes["aria-labelledby"]||"title-".concat(c||dt())},children:[o]}),delete E.attributes.title);const p=f(f({},E),{},{prefix:a,iconName:r,main:e,mask:n,maskId:l,transform:s,symbol:i,styles:f(f({},O),d.styles)}),{children:y,attributes:x}=n.found&&e.found?G("generateAbstractMask",p)||{children:[],attributes:{}}:G("generateAbstractIcon",p)||{children:[],attributes:{}};return p.children=y,p.attributes=x,i?ns(p):es(p)}function $e(t){const{content:e,width:n,height:a,transform:r,title:s,extra:i,watchable:o=!1}=t,l=f(f(f({},i.attributes),s?{title:s}:{}),{},{class:i.classes.join(" ")});o&&(l[Q]="");const c=f({},i.styles);ge(r)&&(c.transform=Tr({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const d=Mt(c);d.length>0&&(l.style=d);const u=[];return u.push({tag:"span",attributes:l,children:[e]}),s&&u.push({tag:"span",attributes:{class:"sr-only"},children:[s]}),u}function as(t){const{content:e,title:n,extra:a}=t,r=f(f(f({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),s=Mt(a.styles);s.length>0&&(r.style=s);const i=[];return i.push({tag:"span",attributes:r,children:[e]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}const{styles:Yt}=F;function se(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(h.cssPrefix,"-").concat(jt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(h.cssPrefix,"-").concat(jt.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(h.cssPrefix,"-").concat(jt.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const rs={found:!1,width:512,height:512};function ss(t,e){!Sn&&!h.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function ie(t,e){let n=e;return e==="fa"&&h.styleDefault!==null&&(e=W()),new Promise((a,r)=>{if(n==="fa"){const s=Rn(t)||{};t=s.iconName||t,e=s.prefix||e}if(t&&e&&Yt[e]&&Yt[e][t]){const s=Yt[e][t];return a(se(s))}ss(t,e),a(f(f({},rs),{},{icon:h.showMissingIcons&&t?G("missingIconAbstract")||{}:{}}))})}const Ue=()=>{},oe=h.measurePerformance&&yt&&yt.mark&&yt.measure?yt:{mark:Ue,measure:Ue},ot='FA "6.7.2"',is=t=>(oe.mark("".concat(ot," ").concat(t," begins")),()=>Un(t)),Un=t=>{oe.mark("".concat(ot," ").concat(t," ends")),oe.measure("".concat(ot," ").concat(t),"".concat(ot," ").concat(t," begins"),"".concat(ot," ").concat(t," ends"))};var ve={begin:is,end:Un};const xt=()=>{};function Ye(t){return typeof(t.getAttribute?t.getAttribute(Q):null)=="string"}function os(t){const e=t.getAttribute?t.getAttribute(ue):null,n=t.getAttribute?t.getAttribute(de):null;return e&&n}function ls(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(h.replacementClass)}function cs(){return h.autoReplaceSvg===!0?At.replace:At[h.autoReplaceSvg]||At.replace}function fs(t){return b.createElementNS("http://www.w3.org/2000/svg",t)}function us(t){return b.createElement(t)}function Yn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?fs:us}=e;if(typeof t=="string")return b.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(s){a.setAttribute(s,t.attributes[s])}),(t.children||[]).forEach(function(s){a.appendChild(Yn(s,{ceFn:n}))}),a}function ds(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const At={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(Yn(n),e)}),e.getAttribute(Q)===null&&h.keepOriginalSource){let n=b.createComment(ds(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~he(e).indexOf(h.replacementClass))return At.replace(t);const a=new RegExp("".concat(h.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const s=n[0].attributes.class.split(" ").reduce((i,o)=>(o===h.replacementClass||o.match(a)?i.toSvg.push(o):i.toNode.push(o),i),{toNode:[],toSvg:[]});n[0].attributes.class=s.toSvg.join(" "),s.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",s.toNode.join(" "))}const r=n.map(s=>gt(s)).join(`
`);e.setAttribute(Q,""),e.innerHTML=r}};function Ve(t){t()}function Vn(t,e){const n=typeof e=="function"?e:xt;if(t.length===0)n();else{let a=Ve;h.mutateApproach===gr&&(a=H.requestAnimationFrame||Ve),a(()=>{const r=cs(),s=ve.begin("mutate");t.map(r),s(),n()})}}let xe=!1;function Hn(){xe=!0}function le(){xe=!1}let Ot=null;function He(t){if(!Te||!h.observeMutations)return;const{treeCallback:e=xt,nodeCallback:n=xt,pseudoElementsCallback:a=xt,observeMutationsRoot:r=b}=t;Ot=new Te(s=>{if(xe)return;const i=W();it(s).forEach(o=>{if(o.type==="childList"&&o.addedNodes.length>0&&!Ye(o.addedNodes[0])&&(h.searchPseudoElements&&a(o.target),e(o.target)),o.type==="attributes"&&o.target.parentNode&&h.searchPseudoElements&&a(o.target.parentNode),o.type==="attributes"&&Ye(o.target)&&~Ar.indexOf(o.attributeName))if(o.attributeName==="class"&&os(o.target)){const{prefix:l,iconName:c}=_t(he(o.target));o.target.setAttribute(ue,l||i),c&&o.target.setAttribute(de,c)}else ls(o.target)&&n(o.target)})}),$&&Ot.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function ms(){Ot&&Ot.disconnect()}function hs(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const s=r.split(":"),i=s[0],o=s.slice(1);return i&&o.length>0&&(a[i]=o.join(":").trim()),a},{})),n}function gs(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=_t(he(t));return r.prefix||(r.prefix=W()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=$r(r.prefix,t.innerText)||ye(r.prefix,ee(t.innerText))),!r.iconName&&h.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function ps(t){const e=it(t.attributes).reduce((r,s)=>(r.name!=="class"&&r.name!=="style"&&(r[s.name]=s.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return h.autoA11y&&(n?e["aria-labelledby"]="".concat(h.replacementClass,"-title-").concat(a||dt()):(e["aria-hidden"]="true",e.focusable="false")),e}function ys(){return{iconName:null,title:null,titleId:null,prefix:null,transform:_,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function We(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=gs(t),s=ps(t),i=ae("parseNodeAttributes",{},t);let o=e.styleParser?hs(t):[];return f({iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:_,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:o,attributes:s}},i)}const{styles:bs}=F;function Wn(t){const e=h.autoReplaceSvg==="nest"?We(t,{styleParser:!1}):We(t);return~e.extra.classes.indexOf(Cn)?G("generateLayersText",t,e):G("generateSvgReplacementMutation",t,e)}function vs(){return[...Ja,...qt]}function Ge(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!$)return Promise.resolve();const n=b.documentElement.classList,a=d=>n.add("".concat(Le,"-").concat(d)),r=d=>n.remove("".concat(Le,"-").concat(d)),s=h.autoFetchSvg?vs():bn.concat(Object.keys(bs));s.includes("fa")||s.push("fa");const i=[".".concat(Cn,":not([").concat(Q,"])")].concat(s.map(d=>".".concat(d,":not([").concat(Q,"])"))).join(", ");if(i.length===0)return Promise.resolve();let o=[];try{o=it(t.querySelectorAll(i))}catch{}if(o.length>0)a("pending"),r("complete");else return Promise.resolve();const l=ve.begin("onTree"),c=o.reduce((d,u)=>{try{const m=Wn(u);m&&d.push(m)}catch(m){Sn||m.name==="MissingIcon"&&console.error(m)}return d},[]);return new Promise((d,u)=>{Promise.all(c).then(m=>{Vn(m,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),l(),d()})}).catch(m=>{l(),u(m)})})}function xs(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Wn(t).then(n=>{n&&Vn([n],e)})}function As(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:re(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:re(r||{})),t(a,f(f({},n),{},{mask:r}))}}const ws=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=_,symbol:a=!1,mask:r=null,maskId:s=null,title:i=null,titleId:o=null,classes:l=[],attributes:c={},styles:d={}}=e;if(!t)return;const{prefix:u,iconName:m,icon:g}=t;return Ft(f({type:"icon"},t),()=>(J("beforeDOMElementCreation",{iconDefinition:t,params:e}),h.autoA11y&&(i?c["aria-labelledby"]="".concat(h.replacementClass,"-title-").concat(o||dt()):(c["aria-hidden"]="true",c.focusable="false")),be({icons:{main:se(g),mask:r?se(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:u,iconName:m,transform:f(f({},_),n),symbol:a,title:i,maskId:s,titleId:o,extra:{attributes:c,styles:d,classes:l}})))};var Ss={mixout(){return{icon:As(ws)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=Ge,t.nodeCallback=xs,t}}},provides(t){t.i2svg=function(e){const{node:n=b,callback:a=()=>{}}=e;return Ge(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:s,prefix:i,transform:o,symbol:l,mask:c,maskId:d,extra:u}=n;return new Promise((m,g)=>{Promise.all([ie(a,i),c.iconName?ie(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(A=>{let[C,E]=A;m([e,be({icons:{main:C,mask:E},prefix:i,iconName:a,transform:o,symbol:l,maskId:d,title:r,titleId:s,extra:u,watchable:!0})])}).catch(g)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:s,styles:i}=e;const o=Mt(i);o.length>0&&(a.style=o);let l;return ge(s)&&(l=G("generateAbstractTransformGrouping",{main:r,transform:s,containerWidth:r.width,iconWidth:r.width})),n.push(l||r.icon),{children:n,attributes:a}}}},ks={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return Ft({type:"layer"},()=>{J("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(s=>{a=a.concat(s.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(h.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},Cs={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:s={}}=e;return Ft({type:"counter",content:t},()=>(J("beforeDOMElementCreation",{content:t,params:e}),as({content:t.toString(),title:n,extra:{attributes:r,styles:s,classes:["".concat(h.cssPrefix,"-layers-counter"),...a]}})))}}}},Es={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=_,title:a=null,classes:r=[],attributes:s={},styles:i={}}=e;return Ft({type:"text",content:t},()=>(J("beforeDOMElementCreation",{content:t,params:e}),$e({content:t,transform:f(f({},_),n),title:a,extra:{attributes:s,styles:i,classes:["".concat(h.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:s}=n;let i=null,o=null;if(pn){const l=parseInt(getComputedStyle(e).fontSize,10),c=e.getBoundingClientRect();i=c.width/l,o=c.height/l}return h.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([e,$e({content:e.innerHTML,width:i,height:o,transform:r,title:a,extra:s,watchable:!0})])}}};const Ps=new RegExp('"',"ug"),Be=[1105920,1112319],Xe=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),Ka),mr),ir),ce=Object.keys(Xe).reduce((t,e)=>(t[e.toLowerCase()]=Xe[e],t),{}),Os=Object.keys(ce).reduce((t,e)=>{const n=ce[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function Ns(t){const e=t.replace(Ps,""),n=Fr(e,0),a=n>=Be[0]&&n<=Be[1],r=e.length===2?e[0]===e[1]:!1;return{value:ee(r?e[0]:e),isSecondary:a||r}}function Ts(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(ce[n]||{})[r]||Os[n]}function qe(t,e){const n="".concat(hr).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const i=it(t.children).filter(m=>m.getAttribute(Zt)===e)[0],o=H.getComputedStyle(t,e),l=o.getPropertyValue("font-family"),c=l.match(vr),d=o.getPropertyValue("font-weight"),u=o.getPropertyValue("content");if(i&&!c)return t.removeChild(i),a();if(c&&u!=="none"&&u!==""){const m=o.getPropertyValue("content");let g=Ts(l,d);const{value:A,isSecondary:C}=Ns(m),E=c[0].startsWith("FontAwesome");let O=ye(g,A),p=O;if(E){const y=Ur(A);y.iconName&&y.prefix&&(O=y.iconName,g=y.prefix)}if(O&&!C&&(!i||i.getAttribute(ue)!==g||i.getAttribute(de)!==p)){t.setAttribute(n,p),i&&t.removeChild(i);const y=ys(),{extra:x}=y;x.attributes[Zt]=e,ie(O,g).then(I=>{const B=be(f(f({},y),{},{icons:{main:I,mask:jn()},prefix:g,iconName:p,extra:x,watchable:!0})),X=b.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(X,t.firstChild):t.appendChild(X),X.outerHTML=B.map(P=>gt(P)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Is(t){return Promise.all([qe(t,"::before"),qe(t,"::after")])}function Ms(t){return t.parentNode!==document.head&&!~pr.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Zt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Ke(t){if($)return new Promise((e,n)=>{const a=it(t.querySelectorAll("*")).filter(Ms).map(Is),r=ve.begin("searchPseudoElements");Hn(),Promise.all(a).then(()=>{r(),le(),e()}).catch(()=>{r(),le(),n()})})}var Ls={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=Ke,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=b}=e;h.searchPseudoElements&&Ke(n)}}};let Ze=!1;var _s={mixout(){return{dom:{unwatch(){Hn(),Ze=!0}}}},hooks(){return{bootstrap(){He(ae("mutationObserverCallbacks",{}))},noAuto(){ms()},watch(t){const{observeMutationsRoot:e}=t;Ze?le():He(ae("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const Qe=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),s=r[0];let i=r.slice(1).join("-");if(s&&i==="h")return n.flipX=!0,n;if(s&&i==="v")return n.flipY=!0,n;if(i=parseFloat(i),isNaN(i))return n;switch(s){case"grow":n.size=n.size+i;break;case"shrink":n.size=n.size-i;break;case"left":n.x=n.x-i;break;case"right":n.x=n.x+i;break;case"up":n.y=n.y-i;break;case"down":n.y=n.y+i;break;case"rotate":n.rotate=n.rotate+i;break}return n},e)};var Fs={mixout(){return{parse:{transform:t=>Qe(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=Qe(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:s}=e;const i={transform:"translate(".concat(r/2," 256)")},o="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),d={transform:"".concat(o," ").concat(l," ").concat(c)},u={transform:"translate(".concat(s/2*-1," -256)")},m={outer:i,inner:d,path:u};return{tag:"g",attributes:f({},m.outer),children:[{tag:"g",attributes:f({},m.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:f(f({},n.icon.attributes),m.path)}]}]}}}};const Vt={x:0,y:0,width:"100%",height:"100%"};function Je(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function zs(t){return t.tag==="g"?t.children:[t]}var Ds={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?_t(n.split(" ").map(r=>r.trim())):jn();return a.prefix||(a.prefix=W()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:s,maskId:i,transform:o}=e;const{width:l,icon:c}=r,{width:d,icon:u}=s,m=Nr({transform:o,containerWidth:d,iconWidth:l}),g={tag:"rect",attributes:f(f({},Vt),{},{fill:"white"})},A=c.children?{children:c.children.map(Je)}:{},C={tag:"g",attributes:f({},m.inner),children:[Je(f({tag:c.tag,attributes:f(f({},c.attributes),m.path)},A))]},E={tag:"g",attributes:f({},m.outer),children:[C]},O="mask-".concat(i||dt()),p="clip-".concat(i||dt()),y={tag:"mask",attributes:f(f({},Vt),{},{id:O,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[g,E]},x={tag:"defs",children:[{tag:"clipPath",attributes:{id:p},children:zs(u)},y]};return n.push(x,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(p,")"),mask:"url(#".concat(O,")")},Vt)}),{children:n,attributes:a}}}},Rs={provides(t){let e=!1;H.matchMedia&&(e=H.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:f(f({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const s=f(f({},r),{},{attributeName:"opacity"}),i={tag:"circle",attributes:f(f({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||i.children.push({tag:"animate",attributes:f(f({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},s),{},{values:"1;0;1;1;0;1;"})}),n.push(i),n.push({tag:"path",attributes:f(f({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:f(f({},s),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:f(f({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},js={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},$s=[Mr,Ss,ks,Cs,Es,Ls,_s,Fs,Ds,Rs,js];Kr($s,{mixoutsTo:M});M.noAuto;M.config;const Us=M.library,Ys=M.dom;M.parse;M.findIconDefinition;M.toHtml;M.icon;M.layer;M.text;M.counter;/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const Vs={prefix:"fas",iconName:"pen-to-square",icon:[512,512,["edit"],"f044","M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"]},Hs=Vs,Ws={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"]},Gs={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},Bs=Gs,Xs={prefix:"fas",iconName:"chart-pie",icon:[576,512,["pie-chart"],"f200","M304 240l0-223.4c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16L304 240zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4L256 288 412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288l238.4 0z"]},qs={prefix:"fas",iconName:"arrow-right",icon:[448,512,[8594],"f061","M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},Ks={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"]},Zs={prefix:"fas",iconName:"arrow-left",icon:[448,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},Qs={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"]},Js=Qs,ti={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"]};/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const ei={prefix:"fab",iconName:"tiktok",icon:[448,512,[],"e07b","M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"]},ni={prefix:"fab",iconName:"instagram",icon:[448,512,[],"f16d","M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"]},ai={prefix:"fab",iconName:"facebook",icon:[512,512,[62e3],"f09a","M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"]},ri={prefix:"fab",iconName:"snapchat",icon:[512,512,[62124,"snapchat-ghost"],"f2ab","M496.926,366.6c-3.373-9.176-9.8-14.086-17.112-18.153-1.376-.806-2.641-1.451-3.72-1.947-2.182-1.128-4.414-2.22-6.634-3.373-22.8-12.09-40.609-27.341-52.959-45.42a102.889,102.889,0,0,1-9.089-16.12c-1.054-3.013-1-4.724-.248-6.287a10.221,10.221,0,0,1,2.914-3.038c3.918-2.591,7.96-5.22,10.7-6.993,4.885-3.162,8.754-5.667,11.246-7.44,9.362-6.547,15.909-13.5,20-21.278a42.371,42.371,0,0,0,2.1-35.191c-6.2-16.318-21.613-26.449-40.287-26.449a55.543,55.543,0,0,0-11.718,1.24c-1.029.224-2.059.459-3.063.72.174-11.16-.074-22.94-1.066-34.534-3.522-40.758-17.794-62.123-32.674-79.16A130.167,130.167,0,0,0,332.1,36.443C309.515,23.547,283.91,17,256,17S202.6,23.547,180,36.443a129.735,129.735,0,0,0-33.281,26.783c-14.88,17.038-29.152,38.44-32.673,79.161-.992,11.594-1.24,23.435-1.079,34.533-1-.26-2.021-.5-3.051-.719a55.461,55.461,0,0,0-11.717-1.24c-18.687,0-34.125,10.131-40.3,26.449a42.423,42.423,0,0,0,2.046,35.228c4.105,7.774,10.652,14.731,20.014,21.278,2.48,1.736,6.361,4.24,11.246,7.44,2.641,1.711,6.5,4.216,10.28,6.72a11.054,11.054,0,0,1,3.3,3.311c.794,1.624.818,3.373-.36,6.6a102.02,102.02,0,0,1-8.94,15.785c-12.077,17.669-29.363,32.648-51.434,44.639C32.355,348.608,20.2,352.75,15.069,366.7c-3.868,10.528-1.339,22.506,8.494,32.6a49.137,49.137,0,0,0,12.4,9.387,134.337,134.337,0,0,0,30.342,12.139,20.024,20.024,0,0,1,6.126,2.741c3.583,3.137,3.075,7.861,7.849,14.78a34.468,34.468,0,0,0,8.977,9.127c10.019,6.919,21.278,7.353,33.207,7.811,10.776.41,22.989.881,36.939,5.481,5.778,1.91,11.78,5.605,18.736,9.92C194.842,480.951,217.707,495,255.973,495s61.292-14.123,78.118-24.428c6.907-4.24,12.872-7.9,18.489-9.758,13.949-4.613,26.163-5.072,36.939-5.481,11.928-.459,23.187-.893,33.206-7.812a34.584,34.584,0,0,0,10.218-11.16c3.434-5.84,3.348-9.919,6.572-12.771a18.971,18.971,0,0,1,5.753-2.629A134.893,134.893,0,0,0,476.02,408.71a48.344,48.344,0,0,0,13.019-10.193l.124-.149C498.389,388.5,500.708,376.867,496.926,366.6Zm-34.013,18.277c-20.745,11.458-34.533,10.23-45.259,17.137-9.114,5.865-3.72,18.513-10.342,23.076-8.134,5.617-32.177-.4-63.239,9.858-25.618,8.469-41.961,32.822-88.038,32.822s-62.036-24.3-88.076-32.884c-31-10.255-55.092-4.241-63.239-9.858-6.609-4.563-1.24-17.211-10.341-23.076-10.739-6.907-24.527-5.679-45.26-17.075-13.206-7.291-5.716-11.8-1.314-13.937,75.143-36.381,87.133-92.552,87.666-96.719.645-5.046,1.364-9.014-4.191-14.148-5.369-4.96-29.189-19.7-35.8-24.316-10.937-7.638-15.748-15.264-12.2-24.638,2.48-6.485,8.531-8.928,14.879-8.928a27.643,27.643,0,0,1,5.965.67c12,2.6,23.659,8.617,30.392,10.242a10.749,10.749,0,0,0,2.48.335c3.6,0,4.86-1.811,4.612-5.927-.768-13.132-2.628-38.725-.558-62.644,2.84-32.909,13.442-49.215,26.04-63.636,6.051-6.932,34.484-36.976,88.857-36.976s82.88,29.92,88.931,36.827c12.611,14.421,23.225,30.727,26.04,63.636,2.071,23.919.285,49.525-.558,62.644-.285,4.327,1.017,5.927,4.613,5.927a10.648,10.648,0,0,0,2.48-.335c6.745-1.624,18.4-7.638,30.4-10.242a27.641,27.641,0,0,1,5.964-.67c6.386,0,12.4,2.48,14.88,8.928,3.546,9.374-1.24,17-12.189,24.639-6.609,4.612-30.429,19.343-35.8,24.315-5.568,5.134-4.836,9.1-4.191,14.149.533,4.228,12.511,60.4,87.666,96.718C468.629,373.011,476.119,377.524,462.913,384.877Z"]},si={prefix:"fab",iconName:"youtube",icon:[576,512,[61802],"f167","M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"]},ii={prefix:"fab",iconName:"square-x-twitter",icon:[448,512,[],"e61a","M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"]};Us.add(qs,Zs,Xs,Js,Bs,ai,si,ni,ii,ei,ri,Ws,ti,Hs,Ks);Ys.watch();export{gi as B,ui as F,di as S,pi as T,Y as a,Ia as b,V as c,cn as d,Oa as e,ha as f,q as g,fn as h,un as i,li as j,hi as k,ta as l,ya as m,na as o,mi as r,Et as s,ln as t,Ra as u};
