(function(root){
 'use strict';
 const known=m=>m?.status==='matched'&&Number.isInteger(m.cited_by_count)&&m.cited_by_count>=0;
 // Records without a venue/year form one group; this sentinel lets that group be selected and drilled into.
 const MISSING='__missing__',groupMatches=(value,want)=>want===MISSING?!value:String(value)===want;
 const median=a=>{if(!a.length)return null;const s=[...a].sort((x,y)=>x-y),i=Math.floor(s.length/2);return s.length%2?s[i]:(s[i-1]+s[i])/2};
 function aggregate(papers,records,field){
  const groups=new Map();
  for(const p of papers){const key=p[field]?String(p[field]):MISSING;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p)}
  return [...groups].map(([name,ps])=>{const values=ps.filter(p=>known(records[p.id])).map(p=>records[p.id].cited_by_count),sum=values.reduce((a,b)=>a+b,0);return {name,papers:ps.length,matched:values.length,unknown:ps.length-values.length,total:values.length?sum:null,mean:values.length?sum/values.length:null,median:median(values),coverage:values.length/ps.length}});
 }
 function rank(rows,value,tie=x=>String(x.name||x.title||'')){
  const sorted=[...rows].sort((a,b)=>{const x=value(a),y=value(b);return x==null?y==null?tie(a).localeCompare(tie(b)):1:y==null?-1:y-x||tie(a).localeCompare(tie(b))});let last,position=0;
  return sorted.map((row,i)=>{const v=value(row);if(v!=null&&(i===0||v!==last))position=i+1;last=v;return {...row,rank:v==null?null:position}});
 }
 const api={known,aggregate,rank,median,MISSING,groupMatches};root.RankingCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
