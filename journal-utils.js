(function(root){
 'use strict';
 const target=['time-series','spatio-temporal','spatial','causal'];
 const topicMatches=(p,topic)=>!topic||(topic==='outside-focus'?!target.some(t=>(p.topics||[]).includes(t)):(p.topics||[]).includes(topic));
 const csvCell=v=>'"'+String(v??'').replace(/^[=+\-@\t\r]/,"'$&").replaceAll('"','""')+'"';
 const authorNames=p=>(p.authors||[]).map(a=>a.name||'').filter(Boolean).join('; ');
 function filter(papers,state,saved={}){const q=(state.query||'').trim().toLowerCase();return papers.filter(p=>(!state.year||String(p.year)===state.year)&&topicMatches(p,state.topic)&&(!state.kind||p.article_kind===state.kind)&&(!state.saved||saved[p.id]?.saved)&&(!q||[p.title,authorNames(p),p.abstract,p.doi].join(' ').toLowerCase().includes(q))).sort((a,b)=>state.sort==='title'?a.title.localeCompare(b.title):((state.sort==='old'?1:-1)*((a.year||0)-(b.year||0)))||a.title.localeCompare(b.title))}
 const mergeRecords=groups=>[...new Map(groups.flat().map(p=>[p.doi||p.official_url||p.id,p])).values()];
 async function decodePart(response,part){if(!response.ok)throw Error('HTTP '+response.status);if(part.encoding!=='gzip')return response.json();if(typeof DecompressionStream==='undefined')throw Error('This browser needs gzip-stream support. Please use a current browser.');return new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json()}
 const api={target,topicMatches,csvCell,authorNames,filter,mergeRecords,decodePart};root.JournalUtils=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
