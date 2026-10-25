(function(root){
 'use strict';
 const cache=new WeakMap();
 function classify(p){
  if(cache.has(p))return cache.get(p);
  const fields=['title','keywords','abstract','data_types'],evidence=[];
  const ts=/\btime[\s-]*series\b|\bmultivariate temporal\b|\birregular(?:ly)? sampled (?:data|sequence)\b|时间序列|多变量时序|不规则时序/i;
  const st=/\bspatio[\s-]*temporal\b|\bspatial[\s-]*temporal\b|\bspace[\s-]*time\b|时空/i;
  let temporal=false,spatial=false;
  for(const field of fields){const s=String(p[field]||'');if(ts.test(s)){temporal=true;evidence.push({category:'time-series',field,rule:'explicit_time_series'})}if(st.test(s)){spatial=true;evidence.push({category:'spatio-temporal',field,rule:'explicit_spatiotemporal'})}}
  const title=String(p.title||'');
  const trajectory=/\btrajector(?:y|ies)\b|轨迹/i.test(title),nonSpatial=/gflownet|trajectory balance|training trajector|optimization trajector|optimisation trajector|parameter trajector|gradient (?:flow|descent)|hamiltonian|langevin|训练轨迹|优化轨迹/i.test(title);
  if((trajectory&&!nonSpatial)||/\btraffic (?:flow |speed |demand )?(?:forecast|predict)|\b(?:forecast|predict)\w*.*\btraffic\b|\bweather forecast|\bprecipitation nowcast|\bvideo (?:predict|forecast)|\baction recognition\b|交通预测|天气预报/i.test(title)){spatial=true;evidence.push({category:'spatio-temporal',field:'title',rule:trajectory?'trajectory_task_signal':'spatial_dynamic_task'})}
  const categories=[...(temporal?['time-series']:[]),...(spatial?['spatio-temporal']:[])];const result={categories,evidence};cache.set(p,result);return result;
 }
 function matches(p,value){const a=classify(p).categories;if(!value)return true;if(value==='both')return a.length===2;if(value==='unclassified')return a.length===0;return a.includes(value)}
 const api={classify,matches};root.PaperTopics=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
