import{listen as t}from"svelte/internal";let e=[],o=!1;function c(c,n={active:!0}){var u,l;let{wrap:r=c,active:a}=n;const s=[...r.querySelectorAll("*")].filter(t=>t.tabIndex>=0),i=null!=(u=s.at(0))?u:r,f=null!=(l=s.at(-1))?l:r,d=document.activeElement;e.push(r),i.focus();const m=(t=r)=>e.at(-1).contains(t),v=t(i,"blur",()=>{a&&m()&&o&&f.focus()}),p=t(f,"blur",()=>{a&&m()&&!o&&i.focus()}),y=t(document,"focusin",t=>{a&&!m(t.target)&&(o?f:i).focus()});return{update(t){a=t.active},destroy(){y(),v(),p(),e=e.filter(t=>t!==r),d.focus()}}}t(document,"keydown",t=>{o=t.shiftKey&&"Tab"===t.key});export{c as trapFocus};