/* Only an opaque expiring token is persisted; never the author key. */
(()=>{'use strict';
const cfg=window.SITE_CONFIG,LEGACY='mother-index-local-v1',SESSION='mother-index-author-v2',OUTBOX='mother-index-outbox-v2';
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
let session=read(SESSION,null),cloud=[],drafts=read(OUTBOX,[]),legacy=read(LEGACY,[]);
const configured=()=>/^https:\/\//.test(cfg.memoApi||''),canWrite=()=>configured()&&!!session&&session.expiresAt>Date.now();
async function api(path,method='GET',body){if(!configured())throw Error('クラウド保存は接続待ちです。');const r=await fetch(cfg.memoApi.replace(/\/$/,'')+path,{method,headers:{'Content-Type':'application/json',...(session?{Authorization:'Bearer '+session.token}:{})},body:body===undefined?undefined:JSON.stringify(body)});const j=await r.json();if(!r.ok){if(r.status===401){session=null;localStorage.removeItem(SESSION)}const e=Error(j.error||'通信失敗');e.status=r.status;throw e}return j}
function notes(){const result=[...cloud];for(const row of legacy)if(!result.some(n=>n.id===row.id))result.push({...row,unsynced:true,legacy:true});for(const row of drafts){const i=result.findIndex(n=>n.id===row.id),n={...row,unsynced:true};if(i<0)result.push(n);else result[i]=n}return result.sort((a,b)=>b.updated_at.localeCompare(a.updated_at))}
function queue(row){drafts=read(OUTBOX,[]);const i=drafts.findIndex(n=>n.id===row.id);if(i<0)drafts.push(row);else drafts[i]=row;localStorage.setItem(OUTBOX,JSON.stringify(drafts))}
async function load(){legacy=read(LEGACY,[]);drafts=read(OUTBOX,[]);if(configured())cloud=(await api('/notes')).notes;return notes()}
async function save(row,previous){if(!canWrite())throw Error('上部の「編集モードを解除」から編集キーを入力してください。');const stamp=new Date().toISOString(),copy={...row,created_at:previous?.created_at||stamp,updated_at:stamp,revision:previous?.revision||0};queue(copy);try{const saved=await api('/notes','PUT',{note:copy,expectedRevision:copy.revision});cloud=cloud.filter(n=>n.id!==saved.id).concat(saved);drafts=read(OUTBOX,[]).filter(n=>n.id!==copy.id||n.updated_at!==copy.updated_at);localStorage.setItem(OUTBOX,JSON.stringify(drafts));return saved}catch(e){if(e.status===409)throw Error('別端末で更新されています。入力は未同期下書きとして保持しました。「下書きの比較」から確認してください。');if(e.status)throw e;return {...copy,unsynced:true}}}
async function unlock(key){session=await api('/unlock','POST',{key});localStorage.setItem(SESSION,JSON.stringify(session));await load()}
async function lock(){try{if(session)await api('/lock','POST',{})}finally{session=null;localStorage.removeItem(SESSION)}}
async function sync(){if(!canWrite())throw Error('編集キーの解除が必要です。');await load();let count=0;for(const row of notes().filter(n=>n.unsynced)){const result=await save(row,row);if(!result.unsynced)count++}return count}
const serverNote=id=>cloud.find(n=>n.id===id);
async function resolve(id){const row=notes().find(n=>n.id===id);return save(row,serverNote(id))}
window.NoteStore={configured,canWrite,load,save,unlock,lock,sync,resolve,serverNote,get notes(){return notes()},get author(){return canWrite()},get pending(){return notes().filter(n=>n.unsynced).length}};
})();
