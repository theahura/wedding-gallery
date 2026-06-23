import{n as e,r as t,t as n}from"./paths-DCuipvxR.js";var r=`cluster_id,name,reviewer,photo_count,sample_photo`;function i(e,t={},{minPhotos:n=1}={}){return!e||!e.clusters?[]:e.clusters.map(e=>{let n=new Set(t[e.id]||[]);return{...e,photos:e.photos.filter(e=>!n.has(e))}}).filter(e=>e.photos.length>=n).sort((e,t)=>t.photos.length-e.photos.length)}function a(e,t=null){let n=null,r=-1;for(let i of e&&e.photoFaces||[]){if(t&&!t.has(i.photo))continue;let e=i.boundingBox,a=e?e.Width*e.Height:0;a>r&&(r=a,n=i.photo)}if(n)return n;let i=e&&e.photos||[];return(t?i.filter(e=>t.has(e)):i)[0]||null}function o(e,t){if(e.length<=t)return[...e];let n=[];for(let r=0;r<t;r++)n.push(e[Math.round(r*(e.length-1)/(t-1))]);return n}function s(e){let t=new Map;for(let n of e.events)for(let e of n.photos)t.set(e.filename,e);return t}function c(e){let t=new Map;for(let n of e.photoFaces||[])t.has(n.photo)||t.set(n.photo,n.boundingBox);return t}function l(e){let t=String(e??``);return/[",\n\r]/.test(t)?`"`+t.replace(/"/g,`""`)+`"`:t}function u(e,t,n){let i=[r];for(let r of e){let e=(t[r.id]||``).trim();if(!e)continue;let a=[r.id,e,n||``,r.photos.length,r.photos[0]||``];i.push(a.map(l).join(`,`))}return i.join(`
`)+`
`}var d=`identify-names-v1`,f=`identify-reviewer-v1`;function p(){try{return JSON.parse(localStorage.getItem(d))||{}}catch{return{}}}function m(e){try{localStorage.setItem(d,JSON.stringify(e))}catch{}}async function h(e,t){try{let t=await fetch(e);if(t.ok)return await t.json()}catch{}return t}function g(e){if(!e)return null;let t=document.createElement(`div`);return t.className=`face-box`,t.style.left=e.Left*100+`%`,t.style.top=e.Top*100+`%`,t.style.width=e.Width*100+`%`,t.style.height=e.Height*100+`%`,t}function _(e,t){let n=document.createElement(`button`);n.type=`button`,n.className=t,n.setAttribute(`aria-label`,`Enlarge photo`);let r=document.createElement(`img`);r.src=e.thumb,r.alt=``,r.loading=`lazy`,r.decoding=`async`,n.appendChild(r);let i=g(e.box);return i&&n.appendChild(i),n}function v(e,t){let n=t,r=document.createElement(`div`);r.className=`lightbox`,r.innerHTML=`
    <figure class="lightbox-inner"></figure>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous photo">&lsaquo;</button>
    <button class="lightbox-nav lightbox-next" aria-label="Next photo">&rsaquo;</button>
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <p class="lightbox-hint">The box marks the person we&rsquo;re asking about</p>
  `;let i=r.querySelector(`.lightbox-inner`);function a(t){n=(t+e.length)%e.length;let r=e[n];i.innerHTML=``;let a=document.createElement(`img`);a.src=r.full,a.alt=``,i.appendChild(a);let o=g(r.box);o&&i.appendChild(o)}function o(){r.remove(),document.removeEventListener(`keydown`,s)}function s(e){e.key===`Escape`&&o(),e.key===`ArrowLeft`&&a(n-1),e.key===`ArrowRight`&&a(n+1)}r.querySelector(`.lightbox-prev`).addEventListener(`click`,e=>{e.stopPropagation(),a(n-1)}),r.querySelector(`.lightbox-next`).addEventListener(`click`,e=>{e.stopPropagation(),a(n+1)}),r.querySelector(`.lightbox-close`).addEventListener(`click`,o),r.addEventListener(`click`,e=>{e.target===r&&o()}),document.addEventListener(`keydown`,s),a(n),document.body.appendChild(r)}function y(e,t,n){let r=u(e,t,n);if(r.trim().split(`
`).length<2){alert(`No names filled in yet — type at least one name first.`);return}let i=(n||`reviewer`).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``)||`reviewer`,a=new Date().toISOString().slice(0,10),o=new Blob([r],{type:`text/csv;charset=utf-8`}),s=URL.createObjectURL(o),c=document.createElement(`a`);c.href=s,c.download=`face-names-${i}-${a}.csv`,document.body.appendChild(c),c.click(),c.remove(),URL.revokeObjectURL(s)}async function b(){let r=document.getElementById(`app`);if(!t(r)){window.addEventListener(`gallery-authenticated`,()=>b(),{once:!0});return}r.innerHTML=``;let[l,u,d,g]=await Promise.all([h(`./data/manifest.json`,null),h(`./data/faces.json`,null),h(`./data/face-names.json`,{}),h(`./data/face-exclusions.json`,{})]),x=e(l),S=n(u);if(!x||!S){r.innerHTML=`<p class="load-error">Unable to load photo data. Please try refreshing the page.</p>`;return}let C=s(x),w=i(S,g),T=p(),E={};for(let e of w)E[e.id]=T[e.id]===void 0?d[e.id]||``:T[e.id];let D=document.createElement(`header`);D.className=`page-header`,D.innerHTML=`
    <p class="header-eyebrow">Amol &amp; Mia&rsquo;s Wedding</p>
    <h1>Who&rsquo;s Who?</h1>
    <p class="intro">
      Help us name everyone! Each person below has one <strong>big photo</strong> — the red box marks
      who we mean — plus a few smaller shots to help you place them. Type their name in the box, and
      please <strong>fix any spelling</strong> that looks off. Names we already have are filled in.
    </p>
    <p class="intro">
      Click any photo to see it bigger. Your answers are saved in this browser as you type — when
      you&rsquo;re done (or done for now), press <strong>Download names</strong> and send the file to Amol.
    </p>
  `,r.appendChild(D);let O=document.createElement(`div`);O.className=`toolbar`,O.innerHTML=`
    <label class="reviewer-field">Your name
      <input id="reviewer-input" type="text" placeholder="e.g. Kamni" autocomplete="off">
    </label>
    <span class="progress-text" id="progress-text"></span>
    <button class="download-btn" id="download-btn">Download names (CSV)</button>
  `,r.appendChild(O);let k=O.querySelector(`#reviewer-input`);k.value=localStorage.getItem(f)||``,k.addEventListener(`input`,()=>{localStorage.setItem(f,k.value)});let A=O.querySelector(`#progress-text`);function j(){A.textContent=`${w.filter(e=>(E[e.id]||``).trim()).length} of ${w.length} named`}O.querySelector(`#download-btn`).addEventListener(`click`,()=>{y(w,E,k.value.trim())});let M=document.createElement(`main`);M.className=`cluster-list`,r.appendChild(M),w.forEach((e,t)=>{let n=c(e),r=e.photos.filter(e=>C.has(e));if(r.length===0)return;let i=a(e,new Set(r))||r[0],s=[i,...o(r.filter(e=>e!==i),9)].map(e=>{let t=C.get(e);return{filename:e,thumb:t.thumb,full:t.full,box:n.get(e)||null}}),l=document.createElement(`section`);l.className=`cluster-card`,l.innerHTML=`
      <div class="cluster-head">
        <span class="cluster-num">Person ${t+1} of ${w.length}</span>
        <span class="cluster-count">${e.photos.length} photos &middot; ${e.id}</span>
      </div>
      <div class="cluster-body">
        <div class="cluster-hero"></div>
        <div class="sample-grid"></div>
      </div>
      <label class="name-field">Who is this?
        <input type="text" placeholder="Type or correct their name (leave blank if not sure)" autocomplete="off">
      </label>
    `;let u=_(s[0],`sample-cell hero-cell`);u.addEventListener(`click`,()=>v(s,0)),l.querySelector(`.cluster-hero`).appendChild(u);let d=l.querySelector(`.sample-grid`);s.slice(1).forEach((e,t)=>{let n=_(e,`sample-cell`);n.addEventListener(`click`,()=>v(s,t+1)),d.appendChild(n)}),s.length<=1&&(d.remove(),l.querySelector(`.cluster-body`).classList.add(`hero-only`));let f=l.querySelector(`.name-field input`);f.value=E[e.id]||``,l.classList.toggle(`named`,!!(E[e.id]||``).trim()),f.addEventListener(`input`,()=>{E[e.id]=f.value,m(E),l.classList.toggle(`named`,!!f.value.trim()),j()}),M.appendChild(l)}),w.length===0&&(M.innerHTML=`<p class="all-done">No faces to review yet.</p>`),j()}b();