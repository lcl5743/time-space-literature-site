'use strict';
for(const [id,title,,,secondary] of filterFields){
 const control=document.getElementById(id),label=document.createElement('label'),caption=document.createElement('span');
 label.className='filter-field'+(secondary?' filter-more':'');label.htmlFor=id;caption.textContent=title;control.before(label);label.append(caption,control);
}

// The dataset summary opens by default on wide screens; a viewer's own open/close choice is remembered in this browser.
const dataSummary=document.getElementById('datasetSummary');document.getElementById('summaryCandidates').textContent=db.papers.length.toLocaleString('en-US');const mobileSummary=matchMedia('(max-width:760px)'),summaryKey='time-space-summary-open';
function setSummary(e){let saved=null;try{saved=localStorage.getItem(summaryKey)}catch{}dataSummary.open=saved?saved==='1':!e.matches}setSummary(mobileSummary);mobileSummary.addEventListener('change',setSummary);
dataSummary.querySelector('summary').addEventListener('click',()=>{try{localStorage.setItem(summaryKey,dataSummary.open?'0':'1')}catch{}});
