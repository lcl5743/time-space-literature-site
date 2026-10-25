'use strict';
window.siteLanguage=new URLSearchParams(location.search).get('lang')||'zh';try{if(!new URLSearchParams(location.search).has('lang'))window.siteLanguage=localStorage.getItem('time-space-language')||'zh'}catch{}
if(!['en','zh'].includes(window.siteLanguage))window.siteLanguage='zh';
const translations={
'统计期刊':'Statistics journals',
'Causal / 因果分类':'Causal category',
'阅读清单':'Reading list','数据概况与采集说明':'Dataset status & collection notes','条候选':'candidates',
'DBLP批量题名检索已执行；摘要语义筛选未穷尽':'DBLP title screening completed; abstract-level screening is not exhaustive',
'默认隐藏疑似题名提取片段，可在“更多筛选 → 题名质量”中查看。':'Potential title extraction fragments are hidden by default. Review them under More filters → Title quality.',
'主题范围内论文':'In-scope papers','时间序列':'Time series','时空':'Spatio-temporal','Causal 相关':'Causal-related','可与时空方向重叠':'May overlap with spatio-temporal','可与时间序列方向重叠':'May overlap with time series','因果发现、推断、反事实与干预等':'Discovery, inference, counterfactuals, interventions','更多筛选':'More filters','收起筛选':'Fewer filters','当前筛选':'Active filters','页码':'Page number',
'题名质量':'Title quality','论文题名记录':'Paper title records','全部原始候选':'All raw candidates','题名待核对':'Titles to review',
'主题范围内候选':'In-scope candidates',
'研究方向':'Research direction','全部研究方向':'All research directions','Time Series · 时间序列':'Time Series','Spatio-temporal · 时空':'Spatio-temporal','同时涉及两者':'Both directions','方向待确认':'Direction unconfirmed',
'引用排行榜':'Citation rankings',
'Causal · 全部 / All':'Causal · any category','全部因果相关':'All causal signals','因果发现':'Causal discovery','因果推断与效应':'Causal inference & effects','反事实':'Counterfactuals','干预':'Interventions','Granger 因果':'Granger causality','因果表示':'Causal representation','其他因果相关':'Other causal signals',
'时序与时空':'Time × Space','工作空间':'WORKSPACE','论文文献库':'Paper library','覆盖进度':'Coverage','来源索引':'Sources','我的阅读清单':'Reading list','持续采集中的研究资料库':'A growing research collection','先收集与核验，再做相关度排名。保留待核验记录与覆盖缺口。':'Collect and verify first. Unverified records and coverage gaps remain visible.','文献工作台':'Research workspace','把分散的研究，连接起来。':'Connect the research.','时间序列与时空研究的可追溯文献入口。按问题、会议与年份，找到下一篇值得读的论文。':'A traceable library for time series and spatiotemporal research. Explore papers by question, conference and year.',
'已收集候选':'Candidate papers','包含待核验与主题边界条目':'Includes unverified and boundary cases','有英文摘要':'English abstracts','可从详情追溯证据':'Source evidence in paper details','博主原文已读取':'Blogger articles captured','文章提取仍在逐篇核对':'Extraction reconciliation in progress','正式归属已核验':'Publication venue verified','会议展示状态单独保留':'Presentation status kept separate','↓ 导出筛选结果':'↓ Export results','时间序列 / 时空主题':'Time series / spatiotemporal','全部候选（含边界）':'All candidates (incl. boundaries)','主题边界待核对':'Topic boundary to review','全部年份':'All years','全部会议 / 期刊':'All conferences / journals','全部研究任务':'All research tasks','全部核验状态':'All verification states','仅官方会议展示':'Conference presentation only','其他 / 待核验':'Other / pending verification','全部来源':'All sources','博主清单':'Blogger collections','Paper-Notes 补查':'Paper-Notes discovery','清除筛选':'Reset filters','全部论文':'All papers','筛选结果':'Search results','年份由新到旧':'Newest first','年份由旧到新':'Oldest first','英文题名 A—Z':'Title A–Z','← 上一页':'← Previous','下一页 →':'Next →','归属待核验':'Venue unverified','会议展示已核验':'Presentation verified','书目信息待核验':'Bibliography unverified','作者待核验':'Authors unverified','论文':'Paper','代码':'Code','没有匹配的论文。试试其他关键词，或清除筛选条件。':'No matching papers. Try another keyword or reset the filters.',
'中文概括与英文摘要尚待补全，可由论文及原始来源入口继续查阅。':'Summary and abstract unavailable. Follow the paper or source links.','正式页面':'Official page','论文入口':'Paper page','PDF全文入口':'Full-text PDF','项目':'Project','中文概括 · AI依据已取得材料生成':'AI summary · Chinese · based on retrieved material','英文摘要':'English abstract','尚未取得可核验英文摘要。':'A verifiable English abstract has not yet been retrieved.','分类标签':'Research tags','待分类':'Unclassified','书目与核验':'Bibliography & verification','冲突与待核对项':'Conflicts & review items · original notes','原始来源':'Original sources','原始表格记录；正式证据见下方':'Original spreadsheet record; see evidence below','字段证据':'Field evidence','我的阅读状态':'My reading status','未进行':'Not started','摘要浏览':'Abstract reviewed','全文阅读中':'Reading full text','已精读':'Read in full','仅保存在当前浏览器，不会改变原始文献数据。':'Saved in this browser only. Bibliographic records remain unchanged.','会议 × 年份':'Conference × year','逐年、逐会议记录检索状态。收集到某会议论文，不等于该会议目录已系统查全。':'Search status by conference and year. Finding papers does not establish exhaustive coverage.','会议 / 年份':'Conference / year','已批检':'Title screened','已核查':'Directory checked','待检索':'Pending','从论文回到来源':'Trace each paper to its source.','原文、第三方发现线索和正式论文证据分别保留。点击来源可查看原始页面。':'Original material, discovery leads and publication evidence remain separate. Source titles retain their original language.','Paper-Notes · 补充发现来源':'Paper-Notes · discovery source','查看项目':'View repository','仅导入书目与来源指针，不以第三方解读作为正式发表或方法结论证据。':'Bibliographic leads only. Third-party notes do not verify publication or methodological claims.','↓ 下载主题边界候选 JSON':'↓ Download boundary candidates (JSON)','博主原文':'Original article','用于前期文献采集与研究导航。AI概括与原始摘要分别标记；未取得证据的内容保留为空。':'For literature discovery and research navigation. AI summaries and source abstracts are labeled separately. Unsupported fields remain empty.',
'让覆盖范围，有据可查。':'See the scope. Track the gaps.','每一条记录，都能回到原文。':'Every record has a starting point.','为下一次阅读，留一份清单。':'Make room for your next read.',
'预测':'Forecasting','分类':'Classification','异常检测':'Anomaly detection','填补与恢复':'Imputation & reconstruction','表示学习':'Representation learning','生成与模拟':'Generation & simulation','因果发现与推断':'Causal discovery & inference','推荐':'Recommendation','压缩与存储':'Compression & storage','聚类与模式发现':'Clustering & pattern discovery','不确定性量化':'Uncertainty quantification','优化与控制':'Optimization & control','交通与移动':'Traffic & mobility','天气与气候':'Weather & climate','医疗与生理信号':'Health & physiological signals','能源与电力':'Energy & electricity','金融与经济':'Finance & economics','城市科学':'Urban science','遥感与地球科学':'Remote sensing & earth science','视频与动作':'Video & motion','工业与运维':'Industry & operations','图学习':'Graph learning','基础模型':'Foundation models','扩散模型':'Diffusion models','Mamba/状态空间模型':'Mamba / state-space models','贝叶斯方法':'Bayesian methods','对比学习':'Contrastive learning','自监督/预训练':'Self-supervision / pretraining','强化学习':'Reinforcement learning','因果方法':'Causal methods','多变量时序':'Multivariate time series','不规则时序':'Irregular time series','层次时序':'Hierarchical time series','时空图':'Spatiotemporal graphs','轨迹':'Trajectories','栅格与空间场':'Grids & spatial fields','视频':'Video','多模态':'Multimodal','大模型':'Large language models',
'搜索题名、作者、任务、方法或摘要…':'Search titles, authors, tasks, methods or abstracts…','检索论文':'Search papers','主题边界':'Topic scope','年份':'Year','会议或期刊':'Conference or journal','任务':'Task','核验状态':'Verification status','来源类型':'Source type','排序':'Sort order','关闭论文详情':'Close paper details','尚未系统检索':'Not yet systematically searched','加入阅读清单':'Add to reading list','移出阅读清单':'Remove from reading list'
};
function english(s){
 const trim=s.trim();if(translations[trim])return s.replace(trim,translations[trim]);
 if(trim.endsWith(' ↗'))return english(trim.slice(0,-2))+' ↗';
 if(/^更新于 /.test(trim))return 'Updated '+trim.slice(4);
 if(/^数据版本 /.test(trim))return 'Dataset '+trim.slice(5);
 if(/^\d[\d,]* 篇$/.test(trim))return trim.replace(' 篇',' papers');
 if(/^共 [\d,]+ 条候选 · \d{4}–\d{4}$/.test(trim))return trim.replace(/^共 ([\d,]+) 条候选 · /,'$1 candidates · ');
 if(/^来源 \d+$/.test(trim))return trim.replace('来源','Source');
 if(trim.includes('尚未标记全文精读'))return 'Publication status: '+(/正式会议与年份已核验|会议伴随论文集发表已核验/.test(trim)?'venue verified. ':trim.includes('官方会议展示')?'conference presentation only. ':'pending verification. ')+'List order is not an RP relevance ranking. Collection does not mean a paper has been read in full.';
 if(trim.includes('提取 ')&&trim.includes(' 条'))return (/待核对/.test(trim)?'Captured article · extraction pending · ':'Captured article · ')+(trim.match(/提取 (\d+)/)?.[1]||'Pending')+' extracted records · '+(trim.match(/\d{4}-\d{2}-\d{2}/)?.[0]||'');
 if(trim.startsWith('核验日期：'))return 'Verified: '+trim.slice(5);
 if(trim.startsWith('来源状态：'))return 'Source status: original record retained';
 if(trim.startsWith('arXiv：'))return trim.replace('arXiv：','arXiv: ').replace('未取得','Unavailable');
 if(trim.startsWith('DOI：'))return trim.replace('DOI：','DOI: ').replace('未取得','Unavailable');
 return s;
}
const originals=new WeakMap(),attributes=new WeakMap();
function translateUI(){
 const en=window.siteLanguage==='en';document.documentElement.lang=en?'en':'zh-CN';document.title=en?'Time × Space · Research Library':'时序与时空 · 研究文献库';
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){
  if(node.parentElement.closest('script,style,.paper-title,.authors,.summary,#detailBody>h2,.detail-meta:not(.detail-note),#detailBody>p:not(.detail-note),.source h3,.source-links')&&!translations[node.nodeValue.trim()])continue;
  const previous=originals.get(node);const original=previous&&node.nodeValue===previous.translated?previous.original:node.nodeValue;
  const translated=en?english(original):original;if(node.nodeValue!==translated)node.nodeValue=translated;originals.set(node,{original,translated});
 }
 document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{
  let saved=attributes.get(el)||{};for(const key of ['placeholder','aria-label','title'])if(el.hasAttribute(key)){const current=el.getAttribute(key),old=saved[key];const original=old&&current===old.translated?old.original:current;const translated=en?english(original):original;if(current!==translated)el.setAttribute(key,translated);saved[key]={original,translated}}attributes.set(el,saved);
 });
 const notice=document.querySelector('#notice');if(en&&notice&&!notice.dataset.english){notice.dataset.original=notice.textContent;notice.dataset.english='1';notice.textContent='Title screening spans 15 conferences, 2010–2026. Candidates include topic boundary cases. This does not establish exhaustive abstract-level coverage or verified publication for every record.'}else if(!en&&notice?.dataset.english){notice.textContent=notice.dataset.original;delete notice.dataset.english}
 const source=document.querySelector('.source>p');if(source&&en&&!source.dataset.english){source.dataset.original=source.textContent;source.dataset.english='1';source.textContent='Conference and topic indexes were scanned at a pinned repository version. Discovery leads remain separate from publication verification.'}else if(source&&!en&&source.dataset.english){source.textContent=source.dataset.original;delete source.dataset.english}
 document.querySelectorAll('.paper .summary').forEach(el=>{const chinese=/[\u3400-\u9fff]/.test(el.textContent),missing=/Summary and abstract unavailable|中文概括与英文摘要尚待补全/.test(el.textContent);el.dataset.caption=missing?(en?'Summary pending':'内容待补充'):en?(chinese?'AI summary · Chinese':'English abstract excerpt'):(chinese?'AI 中文概括':'英文摘要摘录')});
}
window.uiText=(zh,en)=>window.siteLanguage==='en'?(en||english(zh)):zh;
window.translateTag=s=>window.siteLanguage==='en'?(translations[s]||s):s;
// Extend task searches with English task names without changing canonical bibliographic fields. app.js calls this when it builds the index, before the first render.
window.extendSearchIndex=papers=>papers.forEach(p=>{p.search+=' '+String(p.tasks||'').split(/;\s*|；/).map(x=>translations[x]||x).join(' ').toLowerCase()});
document.addEventListener('DOMContentLoaded',()=>{
 const picker=document.querySelector('#language');picker.value=window.siteLanguage;
 picker.onchange=()=>{window.siteLanguage=picker.value;try{localStorage.setItem('time-space-language',picker.value)}catch{}const url=new URL(location.href);url.searchParams.set('lang',picker.value);history.replaceState(null,'',url);window.refreshLanguageContent?.();translateUI()};
 translateUI();let scheduled=false;new MutationObserver(records=>{if(records.every(r=>r.target.nodeType===1&&r.target.id==='notesStatus'))return;if(!scheduled){scheduled=true;queueMicrotask(()=>{scheduled=false;translateUI()})}}).observe(document.body,{childList:true,subtree:true,characterData:true});
});
