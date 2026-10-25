(function(root){
 'use strict';
 // Fragments: keyword/abstract labels, or affiliation lists that still carry an Excel line-break code (_x000D_).
 const validTitle=p=>!!String(p.title||'').trim()&&!/^(?:关键词|keywords?|abstract|摘要)\s*[:：]|_x000D_/i.test(String(p.title).trim());
 const qualityMatches=(p,value)=>value==='all'||(value==='review'?!validTitle(p):validTitle(p));
 function rankingState(saved,defaults){
  const next={...defaults};if(!saved||typeof saved!=='object'||Array.isArray(saved))return next;
  for(const key of ['year','venue','task','topic','scope','verified','metric','mode','query','quality'])if(typeof saved[key]==='string')next[key]=saved[key];
  for(const [key,values] of Object.entries({mode:['papers','venues','years'],topic:['','time-series','spatio-temporal','both','unclassified'],scope:['direct','all'],verified:['all','formal'],metric:['total','mean','median','papers'],quality:['valid','all','review']}))if(!values.includes(next[key]))next[key]=defaults[key];
  next.page=Number.isFinite(Number(saved.page))?Math.max(1,Math.floor(Number(saved.page))):1;
  if(next.mode==='papers')next.metric='total';return next;
 }
 // Display-only rendering of the LaTeX-style (and, in abstracts, Markdown) markup that official titles and abstracts carry ($S^2$IP-LLM, \textbf{H}^2SCAN, \textit{...}). Text is escaped first, so only the tags produced here can appear; stored text, exports and copied references are unchanged. Unknown author macros (\sysname) stay as written.
 const SYMBOLS={alpha:'α',beta:'β',gamma:'γ',delta:'δ',epsilon:'ε',varepsilon:'ε',zeta:'ζ',eta:'η',theta:'θ',vartheta:'ϑ',iota:'ι',kappa:'κ',lambda:'λ',mu:'μ',nu:'ν',xi:'ξ',pi:'π',rho:'ρ',sigma:'σ',tau:'τ',upsilon:'υ',phi:'φ',varphi:'φ',chi:'χ',psi:'ψ',omega:'ω',Gamma:'Γ',Delta:'Δ',Theta:'Θ',Lambda:'Λ',Xi:'Ξ',Pi:'Π',Sigma:'Σ',Upsilon:'Υ',Phi:'Φ',Psi:'Ψ',Omega:'Ω',
  ell:'ℓ',infty:'∞',times:'×',cdot:'·',cdots:'⋯',ldots:'…',dots:'…',pm:'±',mp:'∓',leq:'≤',le:'≤',geq:'≥',ge:'≥',neq:'≠',ne:'≠',approx:'≈',sim:'~',simeq:'≃',propto:'∝',ll:'≪',gg:'≫',in:'∈',notin:'∉',subset:'⊂',subseteq:'⊆',cup:'∪',cap:'∩',forall:'∀',exists:'∃',partial:'∂',nabla:'∇',sum:'∑',prod:'∏',int:'∫',circ:'∘',ast:'∗',star:'⋆',top:'⊤',perp:'⊥',mid:'|',vert:'|',Vert:'‖',
  to:'→',rightarrow:'→',Rightarrow:'⇒',leftarrow:'←',leftrightarrow:'↔',uparrow:'↑',downarrow:'↓',mapsto:'↦',textdegree:'°',checkmark:'✓',textasciitilde:'~',log:' log',exp:' exp',min:' min',max:' max',arg:' arg',lim:' lim',sin:' sin',cos:' cos',det:' det',left:'',right:'',quad:' ',qquad:' '};
 const STYLE={text:'',textrm:'',textup:'',textnormal:'',textsf:'',mathrm:'',mathsf:'',operatorname:'',url:'',mathbf:'b',textbf:'b',boldsymbol:'b',bm:'b',mathit:'i',textit:'i',mathcal:'i',emph:'i',textsl:'i',underline:'u',texttt:'code',mathtt:'code',textsc:'sc'};
 const ACCENT={tilde:'̃',hat:'̂',widehat:'̂',bar:'̄',overline:'̅',dot:'̇',ddot:'̈',vec:'⃗'},BB={R:'ℝ',N:'ℕ',Z:'ℤ',Q:'ℚ',C:'ℂ',E:'𝔼',P:'ℙ'};
 const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const wrap=(tag,x)=>tag==='sc'?`<span class="sc">${x}</span>`:tag?`<${tag}>${x}</${tag}>`:x;
 function markup(s,math){
  let prev;do{prev=s;s=s.replace(/\{\{([^{}]*)\}\}/g,'{$1}').replace(/\{\\(em|it|bf)\s+([^{}]*)\}/g,(m,c,x)=>wrap(c==='bf'?'b':'i',x)).replace(/\\href\{[^{}]*\}\{([^{}]*)\}/g,'$1')
   .replace(/\\mathbb\{([A-Z])\}/g,(m,x)=>BB[x]||x).replace(/\\sqrt\{([^{}]*)\}/g,'√($1)').replace(/\\([A-Za-z]+)\{([^{}]*)\}/g,(m,c,x)=>c in STYLE?wrap(STYLE[c],x):c in ACCENT?x+ACCENT[c]:m)}while(s!==prev);
  s=s.replace(/\\([%_#$])/g,'$1').replace(/\\&amp;/g,'&amp;').replace(/\\([A-Za-z]+)(?![A-Za-z])/g,(m,c)=>c in SYMBOLS?SYMBOLS[c]:m).replace(/\^\{([^{}]*)\}/g,'<sup>$1</sup>').replace(/_\{([^{}]*)\}/g,'<sub>$1</sub>');
  return math?s.replace(/\^\\?circ\b|\^∘/g,'°').replace(/\^([A-Za-z0-9*+−-])/g,'<sup>$1</sup>').replace(/_([A-Za-z0-9])/g,'<sub>$1</sub>').replace(/\\[,;:! ]|~/g,' ').replace(/[{}]/g,'').replace(/([(\[]) +/g,'$1').replace(/^ +| {2,}/g,m=>m.length>1?' ':''):s.replace(/\^(\d+)/g,'<sup>$1</sup>').replace(/ℓ_(\d)/g,'ℓ<sub>$1</sub>');
 }
 const maths=s=>s.replace(/\\\$/g,'\u0000').replace(/\$\$([^$]+)\$\$|\$([^$]+)\$|\\\(([\s\S]+?)\\\)/g,(m,a,b,c)=>{const x=a||b||c;return /^[A-Za-z]$/.test(x)?`<i>${x}</i>`:markup(x,true)}).replace(/\u0000/g,'$');
 function titleHTML(title){
  const safe=escapeHTML(title);if(!/[$\\^]/.test(safe))return safe;
  return markup(maths(safe),false);
 }
 function richHTML(text){
  const safe=escapeHTML(text);if(!/[$\\^*`]/.test(safe))return safe;
  return markup(maths(safe),false).replace(/\*\*([^*\n]+?)\*\*/g,'<b>$1</b>').replace(/`([^`\n]+?)`/g,'<code>$1</code>');
 }
 const plain=html=>html.replace(/<[^>]+>/g,'').replace(/&(amp|lt|gt|quot|#39);/g,(m,e)=>({amp:'&',lt:'<',gt:'>',quot:'"','#39':"'"}[e]));
 const titleText=title=>plain(titleHTML(title)),richText=text=>plain(richHTML(text));
 const api={validTitle,qualityMatches,rankingState,titleHTML,titleText,richHTML,richText};root.RecordUtils=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
