/* Non-destructive scene transforms: base rectangles remain owned by their template. */
(()=>{'use strict';
const oldDraw=draw,MP=MotherPresident,P=MP.parts,L=MP.layout,A=MOTHER_ASSETS;
let enabled=false,inside=false,selected=null,drag=null,nodes=[];
const clone=r=>({x:r.x,y:r.y,w:r.w,h:r.h});
const scope=()=>state.packAssembler?.active?'assembled':state.templateId||'standard';
function overrides(){state.layoutOverrides??={};return state.layoutOverrides[scope()]??={};}
function node(id,label,r,paint,parent=null){const n={id,label,base:clone(r),paint,parent,z:nodes.length};nodes.push(n);return n;}
function build(){nodes=[];
 if(scope()==='assembled'){nodes=PackAssembler.nodes();return nodes;}
 if(scope()==='mother_president'){
 P.lock();const m=state.mother;
 node('title','タイトル',L.header,g=>{P.image(g,m.titleImage,L.header);if(m.decorationImage)P.image(g,m.decorationImage,L.decoration)});
 for(let i=0;i<4;i++){
 const id='pc'+(i+1),q=P.pcItems(i),p=m.pcs[i];node(id,'PC'+(i+1)+' パネル',q.r,g=>P.pc(g,i,false,false));
 node(id+'.portrait','PC'+(i+1)+' 立ち絵',q.portrait,g=>P.image(g,p.image,q.portrait,'bottom'),id);
 node(id+'.name','PC'+(i+1)+' 名前・枠',q.r,g=>P.pcLabel(g,i),id);
 q.buttons.forEach((r,j)=>node(id+'.book'+j,'PC'+(i+1)+' '+['HO','カーチェイス','追加HO'][j],r,g=>P.book(g,r,['HO','カーチェイス','追加HO'][j],p.color,p.icons[j]),id));
 for(let k=0;k<p.tokenCount;k++)node(id+'.token'+k,'PC'+(i+1)+' 丸トークン'+(k+1),P.tokenRect(i,k),g=>P.token(g,i,k),id);
 }
 for(let gi=0;gi<2;gi++){
 const id=gi?'discussion':'investigation',r=L[id];node(id,gi?'議論フェーズ領域':'事件捜査領域',r,g=>{g.fillStyle='#fff';g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle='#808080';g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);P.text(g,gi?'議論フェーズ！':'事件捜査！',r.x+30,r.y+17,22);P.image(g,A.flourish,{x:r.x+6,y:r.y+26,w:200,h:12});});
 for(let i=0;i<(gi?12:10);i++){const r=MP.slot(gi,i);node(id+'.slot'+i,(gi?'議論':'捜査')+' カード枠'+(i+1),r,g=>{P.empty(g,r);const c=state.cardGroups[gi].cards.find(c=>c.motherSlot===i);if(c)g.drawImage(cardFaceCanvas(c,r.w,r.h,!c.startClosed,state.cardGroups[gi].cardFrameStyle),r.x,r.y)},id);}
 }
 m.maps.forEach((url,i)=>node('map'+(i+1),(i+1)+'F 地図',L['map'+(i+1)],g=>P.image(g,url,L['map'+(i+1)])));
 node('navigation','BACK / NEXT 領域',L.navigation,g=>{const r=L.navigation;g.fillStyle='#f3ebdc';g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle='#000';g.lineWidth=4;g.strokeRect(r.x,r.y,r.w,r.h)});
 ['back','next'].forEach((id,i)=>{const r={x:L.navigation.x+i*L.navigation.w/2,y:L.navigation.y,w:L.navigation.w/2,h:L.navigation.h};node(id,id.toUpperCase(),r,g=>{g.save();g.beginPath();g.rect(r.x+2,r.y+2,r.w-4,r.h-4);g.clip();P.nav(g);g.restore()},'navigation')});
 node('exArea','EX領域',L.exArea,g=>{g.strokeStyle='#222';g.lineWidth=5;g.strokeRect(L.exArea.x,L.exArea.y,L.exArea.w,L.exArea.h)});
 m.ex.forEach((e,i)=>node('ex'+i,'EX '+(i+1)+'枠',P.exRect(i),g=>P.ex(g,i),'exArea'));
 node('phasebar','フェーズバー',L.phasebar,g=>state.phases.forEach((_,i)=>P.phase(g,i,i===state.currentPhase)));
 }else{
 node('phasebar','フェーズバー',state.layout.phasebar,g=>drawPhaseBar(g,state.layout.phasebar));
 node('players','PC全体',state.layout.players,()=>{});
 state.players.slice(0,state.playerCount).forEach((p,i)=>{const r=playerPanelRect(i);node('pc'+i,'PC'+(i+1),r,g=>drawPlayerTile(g,r.x,r.y,r.w,r.h,p),'players')});
 state.cardGroups.filter(cardGroupVisibleInCurrentPhase).forEach((cg,gi)=>{ensureGroupLayouts(cg);const id='group'+cg.id;node(id,cg.title,cg.panel,g=>drawCardGroup(g,cg,false));cg.cards.forEach((c,i)=>{const r={...c.layout,x:cg.panel.x+c.layout.x,y:cg.panel.y+c.layout.y};node(id+'.card'+c.id,c.title||'カード'+i,r,g=>g.drawImage(Number(c.revealPhase)>state.currentPhase?hiddenCardPanelCanvas(c,r.w,r.h):cardFaceCanvas(c,r.w,r.h,!c.startClosed,cg.cardFrameStyle),r.x,r.y),id)});});
 node('sidebar','タイトル・説明領域',state.layout.sidebar,g=>drawSidebar(g,state.layout.sidebar));
 if(state.mapEnabled)node('map','地図',state.layout.map,g=>drawMap(g,state.layout.map));
 node('tokens','トークン領域',state.layout.tokens,g=>drawTokens(g));
 }
 (state.extraPanels||[]).forEach((p,i)=>node('screen.'+(p.id||i),p.name||'スクリーンパネル'+(i+1),p,g=>g.drawImage(markerCanvas(p),p.x,p.y,p.w,p.h)));
 (state.phases[state.currentPhase]?.markers||[]).forEach((p,i)=>node('marker.'+state.currentPhase+'.'+(p.id||i),p.name||'マーカーパネル'+(i+1),p,g=>g.drawImage(markerCanvas(p),p.x,p.y,p.w,p.h)));
 return nodes;
}
function get(id){return nodes.find(n=>n.id===id)}
function local(n){return {...n.base,...overrides()[n.id]};}
function world(n){const r=local(n);if(!n.parent)return r;const p=get(n.parent),q=world(p),b=p.base;return {...r,x:q.x+(r.x-b.x)*q.w/b.w,y:q.y+(r.y-b.y)*q.h/b.h,w:r.w*q.w/b.w,h:r.h*q.h/b.h};}
function locked(n){return !!local(n).locked||!!(n.parent&&locked(get(n.parent)))}
function ordered(parent=null){return nodes.filter(n=>n.parent===parent).sort((a,b)=>(local(a).z??a.z)-(local(b).z??b.z))}
function flat(parent=null){return ordered(parent).flatMap(n=>[n,...flat(n.id)])}
function paint(g){if(scope()==='mother_president'){g.clearRect(0,0,1600,900);g.fillStyle='#ccc';g.fillRect(0,0,1600,900)}else bgTexture(g);for(const n of flat()){const r=world(n),b=n.base;g.save();g.translate(r.x,r.y);g.scale(r.w/b.w,r.h/b.h);g.translate(-b.x,-b.y);n.paint(g);g.restore();}}
function render(g){build();paint(g)}
draw=function(){if(!enabled&&!Object.keys(overrides()).length&&scope()!=='assembled'){oldDraw();return;}render(ctx);if(enabled&&get(selected)){const r=world(get(selected));ctx.save();ctx.strokeStyle=locked(get(selected))?'#f33':'#007eff';ctx.lineWidth=2;ctx.setLineDash([6,3]);ctx.strokeRect(r.x,r.y,r.w,r.h);ctx.setLineDash([]);ctx.fillStyle='#007eff';ctx.fillRect(r.x+r.w-9,r.y+r.h-9,9,9);ctx.restore();}};
const box=document.createElement('section');box.id='globalEditor';box.style='position:sticky;top:0;z-index:1000;background:#f3f7ff;color:#182638;border:2px solid #2776bb;padding:10px;margin:8px;';
box.innerHTML=`<label><input id="globalEditToggle" type="checkbox"> <b>全体編集</b> ON / OFF</label><div id="globalTools" hidden><label><input id="globalInside" type="checkbox">グループ内編集</label><select id="globalSelect" aria-label="選択要素"></select><div>${['x','y','w','h'].map(k=>`<label>${{x:'x',y:'y',w:'width',h:'height'}[k]} <input type="number" step="1" data-global-value="${k}" style="width:76px"></label>`).join('')}</div><button data-global-action="front">前面へ</button><button data-global-action="back">背面へ</button><button data-global-action="lock">ロック</button><button data-global-action="unlock">アンロック</button><button data-global-action="reset">選択要素を初期位置へ戻す</button><button data-global-action="all">テンプレート位置へ戻す</button><button data-global-action="png">調整済みPNG保存</button><p style="font-size:12px;margin:4px">右下の青い■をドラッグしてリサイズ。矢印＝1px、Shift＋矢印＝10px。ロック中の要素も一覧から選択できます。重なり順は同じグループ内で変更します。JSON保存は既存の保存ボタンです。</p><span id="globalInfo"></span></div>`;
box.style.position='relative';box.style.zIndex='1';box.style.background='#182638';box.style.color='#f3f7ff';document.querySelector('.workspace').prepend(box);canvas.style.touchAction='none';
const style=document.createElement('style');style.textContent='#globalEditor label{display:inline-flex;align-items:center;gap:4px;margin:4px 8px 4px 0}#globalEditor input[type=checkbox]{width:auto}#globalEditor button{background:#20354b;color:#f3f7ff;border:1px solid #547796;border-radius:5px;padding:5px 8px;margin:3px;font-size:12px}#globalEditor select{margin:4px 0}';document.head.append(style);
function fields(){build();const select=box.querySelector('#globalSelect');select.innerHTML='<option value="">要素を選択</option>'+nodes.map(n=>`<option value="${esc(n.id)}">${n.parent?'　':''}${esc(n.label)}${locked(n)?' 🔒':''}</option>`).join('');select.value=selected||'';const n=get(selected),r=n?world(n):null;box.querySelectorAll('[data-global-value]').forEach(el=>{el.value=r?Math.round(r[el.dataset.globalValue]*100)/100:'';el.disabled=!n||locked(n)});box.querySelector('#globalInfo').textContent=n?n.label+(locked(n)?'：ロック中':''):'';}
function setRect(n,r){let t={...r};if(n.parent){const p=get(n.parent),q=world(p),b=p.base;t={x:b.x+(r.x-q.x)*b.w/q.w,y:b.y+(r.y-q.y)*b.h/q.h,w:r.w*b.w/q.w,h:r.h*b.h/q.h};}overrides()[n.id]={...overrides()[n.id],...t};}
function toggle(v){enabled=v;box.querySelector('#globalEditToggle').checked=v;box.querySelector('#globalTools').hidden=!v;document.querySelector('#layoutDock').style.display=v?'none':'';if(v){state.editMode=state.cardEditMode=state.tokenEditMode=state.tokenGroupEditMode=state.markerEditMode=false;}fields();draw();}
box.querySelector('#globalEditToggle').onchange=e=>toggle(e.target.checked);
box.querySelector('#globalInside').onchange=e=>{inside=e.target.checked;};
box.querySelector('#globalSelect').onchange=e=>{selected=e.target.value;fields();draw()};
box.querySelectorAll('[data-global-value]').forEach(el=>el.onchange=()=>{const n=get(selected);if(!n||locked(n))return;let v=Number(el.value);if(!Number.isFinite(v))return;checkpoint();const r=world(n),k=el.dataset.globalValue;r[k]=['w','h'].includes(k)?Math.max(8,v):v;setRect(n,r);fields();draw()});
box.querySelectorAll('[data-global-action]').forEach(el=>el.onclick=()=>{const a=el.dataset.globalAction,n=get(selected);if(a==='png'){const c=makeCanvas(1600,900);render(c.getContext('2d'));c.toBlob(b=>downloadBlob(b,'board_layout.png'));return}if(a==='all'){if(!confirm('このテンプレートの全体編集による位置・サイズ・重なり順・ロックをすべて初期状態に戻しますか？'))return;checkpoint();state.layoutOverrides[scope()]={};}else if(n){if(locked(n)&&!['unlock'].includes(a))return;checkpoint();const o=overrides();if(a==='reset'){delete o[n.id];const descendants=flat(n.id);descendants.forEach(c=>delete o[c.id]);}else if(a==='lock'||a==='unlock')o[n.id]={...o[n.id],locked:a==='lock'};else{const siblings=ordered(n.parent),zs=siblings.map(s=>local(s).z??s.z);o[n.id]={...o[n.id],z:a==='front'?Math.max(...zs)+1:Math.min(...zs)-1};}}fields();draw();});
const point=e=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height}};
function hit(p){return flat().reverse().find(n=>{if(!inside&&n.parent)return false;if(inside&&n.id.endsWith('.name'))return false;const r=world(n);return p.x>=r.x&&p.y>=r.y&&p.x<=r.x+r.w&&p.y<=r.y+r.h})}
canvas.addEventListener('pointerdown',e=>{if(!enabled)return;e.preventDefault();e.stopImmediatePropagation();build();const p=point(e),chosen=get(selected),cr=chosen&&world(chosen),resize=cr&&Math.abs(p.x-cr.x-cr.w)<13&&Math.abs(p.y-cr.y-cr.h)<13;const n=resize?chosen:hit(p);selected=n?.id||null;fields();draw();if(!n||locked(n))return;checkpoint();drag={id:n.id,start:p,rect:world(n),resize};canvas.setPointerCapture(e.pointerId);},true);
canvas.addEventListener('pointermove',e=>{if(!enabled||!drag)return;e.preventDefault();const p=point(e),r={...drag.rect},dx=p.x-drag.start.x,dy=p.y-drag.start.y;if(drag.resize){r.w=Math.max(8,Math.round(r.w+dx));r.h=Math.max(8,Math.round(r.h+dy));}else{r.x=Math.round(r.x+dx);r.y=Math.round(r.y+dy);}setRect(get(drag.id),r);draw();fields();},true);
canvas.addEventListener('pointerup',()=>{drag=null},true);canvas.addEventListener('pointercancel',()=>{drag=null},true);
['mousedown','mousemove','mouseup','click','dblclick'].forEach(type=>canvas.addEventListener(type,e=>{if(enabled){e.stopImmediatePropagation();e.preventDefault();}},true));
canvas.addEventListener('click',e=>{if(enabled||scope()!=='mother_president'||!Object.keys(overrides()).length)return;build();const p=point(e);let dir=0;for(const [id,d] of [['back',-1],['next',1]]){const r=world(get(id));if(p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h)dir=d;}e.stopImmediatePropagation();if(dir){let n=state.currentPhase+dir;while(n>=0&&n<state.phases.length&&state.phases[n].enabled===false)n+=dir;if(n>=0&&n<state.phases.length){state.currentPhase=n;refreshAllEditors()}}},true);
document.addEventListener('keydown',e=>{if(!enabled||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable)return;const delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key],n=get(selected);if(!delta||!n||locked(n))return;e.preventDefault();e.stopImmediatePropagation();checkpoint();const r=world(n),s=e.shiftKey?10:1;r.x+=delta[0]*s;r.y+=delta[1]*s;setRect(n,r);draw();fields()},true);
// Stage 1 deliberately changes JSON/PNG, not the existing room-ZIP schema/export pipeline.
for(const id of ['roomZipBtn','sceneBundleBtn','assetZipBtn'])document.getElementById(id)?.addEventListener('click',e=>{if(Object.keys(overrides()).length&&!confirm('第1弾の位置調整はプロジェクトJSON・PNGに保存されます。既存のココフォリア／素材ZIP出力は基本座標を使用します。基本座標のZIP出力を続けますか？')){e.preventDefault();e.stopImmediatePropagation()}},true);
const note=document.createElement('p');note.style='font-size:12px;margin:6px 0;color:#ffd88a';note.textContent='調整結果はプロジェクトに保存されます。「シーン編集・書き出し」のFINAL_CCFOLIA出力にも反映されます。';box.querySelector('#globalTools').append(note);
document.getElementById('pngBtn').addEventListener('click',e=>{if(!enabled&&!Object.keys(overrides()).length)return;e.preventDefault();e.stopImmediatePropagation();const c=makeCanvas(1600,900);render(c.getContext('2d'));c.toBlob(b=>downloadBlob(b,'board_layout.png'))},true);
const refresh=refreshAllEditors;refreshAllEditors=function(){refresh();fields();draw()};
window.GlobalEdit={toggle,build,render,world,get,select(id){selected=id;fields();draw()},get enabled(){return enabled},setInside(v){inside=v;box.querySelector('#globalInside').checked=v}};
})();
