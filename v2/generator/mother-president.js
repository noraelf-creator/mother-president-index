/* Mother President fixed template. Existing renderers/exporters remain the fallback. */
(()=>{
'use strict';
const A=globalThis.MOTHER_ASSETS;
const rect=(x,y,w,h)=>({x,y,w,h});
const L=Object.freeze({
 header:rect(50,0,802,225),decoration:rect(671,0,182,188),phasebar:rect(888,9,563,176),
 pc1:rect(53,226,401,223),pc2:rect(53,462,401,222),pc3:rect(1146,226,401,223),pc4:rect(1146,462,401,222),
 investigation:rect(465,207,665,212),discussion:rect(465,428,665,270),
 map1:rect(52,699,257,195),map2:rect(322,699,258,195),navigation:rect(593,704,267,184),exArea:rect(872,704,674,184)
});
globalThis.MOTHER_LAYOUT=L;
const original={draw,applyLayoutTemplate,normalizeState,refreshAllEditors,makeRoomZipBytes,makeSceneRoomTrialZipBytes,exportAssets,autoArrangeGroup,ensureGroupLayouts,renderCardGroups,renderPhases,renderLayoutEditor};
const on=()=>state.templateId==='mother_president';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,Number(v)||a));
const colors=['#00ff00','#00eeee','#ffff00','#ff00ff'];
const names=['サラー・コーナー','ルーク・ウォーカー','ドク・エリオット','マーティ・テルミネーター'];
function slot(gi,i){return gi===0?rect(479+(i%5)*107,249+Math.floor(i/5)*85,97,73):rect(691+(i%4)*108,[448,527,613][Math.floor(i/4)],97,73)}
function setup(){
 state.templateId='mother_president'; state.title='お母さんは大統領';state.playerCount=4;state.currentPhase=0;
 state.alphaReview.enabled=false;
 state.mother={layout:structuredClone(L),titleImage:A.title,decorationImage:null,maps:[A.map1,A.map2],
 pcs:names.map((name,i)=>({name,color:colors[i],image:A['portrait'+i],tokenImage:A['token'+i],tokenCount:5,tokenSize:35,tokenGap:4,icons:[0,1,2].map(j=>A['icon'+i+'_'+j])})),
 ex:Array.from({length:12},(_,i)=>({name:'EX'+(i%6+1),image:null,visible:true,pc:''}))};
 const labels=['導入・HO読込','オープニング','事件捜査！','カーチェイス！','休憩・追加HO','議論フェーズ！','投票フェーズ','エンディング','ラスト？？？'];
 const durations=['10分','5分','25分','15分','15分','30分','5分','30分',''];
 state.phases=labels.map((label,i)=>({...defaultPhases()[0],label,sceneTitle:label,duration:durations[i],description:'',enabled:true,markers:[]}));
 state.players=defaultPlayers().slice(0,4);state.players.forEach((p,i)=>Object.assign(p,{name:names[i],color:colors[i],image:A['portrait'+i]}));
 state.cardGroups=[10,12].map((n,gi)=>{const g=defaultGroup(gi);Object.assign(g,{id:'mother_'+gi,title:gi?'議論フェーズ！':'事件捜査！',panel:structuredClone(L[gi?'discussion':'investigation']),columns:gi?4:5,cards:[],motherGroup:gi,defaultW:96,defaultH:72,cardFrameStyle:{shape:'rounded',color:'#808080',width:2,type:'solid'}});return g});
 state.tokenSets=[];state.extraPanels=[];state.editMode=state.cardEditMode=state.tokenEditMode=state.tokenGroupEditMode=state.markerEditMode=false;
 lock();refreshAllEditors();
}
function lock(){
 if(!on())return;
 state.mother.layout=structuredClone(L);state.playerCount=4;
 state.cardGroups.slice(0,2).forEach((g,gi)=>{g.panel=structuredClone(L[gi?'discussion':'investigation']);const used=new Set();g.cards.forEach(c=>{let i=c.motherSlot;if(!Number.isInteger(i)||i<0||i>=(gi?12:10)||used.has(i)){i=0;while(used.has(i))i++;c.motherSlot=i}used.add(i);const r=slot(gi,i);c.layout=rect(r.x-g.panel.x,r.y-g.panel.y,r.w,r.h);c.frontStyle=normalizeFaceStyle(c.frontStyle);c.backStyle=normalizeFaceStyle(c.backStyle);c.frontStyle.image.fit=c.backStyle.image.fit='contain';});});
}
function image(g,url,r,fit='contain'){
 const im=loadImg(url);if(!im||!im.complete||!im.naturalWidth)return;
 g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();
 const s=(fit==='cover'?Math.max:Math.min)(r.w/im.naturalWidth,r.h/im.naturalHeight);
 g.drawImage(im,r.x+(r.w-im.naturalWidth*s)/2,r.y+(r.h-im.naturalHeight*s)/(fit==='bottom'?1:2),im.naturalWidth*s,im.naturalHeight*s);g.restore();
}
function text(g,s,x,y,size=18,color='#111',align='left'){drawText(g,s,x,y,size,900,color,align,'mincho')}
function book(g,r,label,color='#000',url=null){
 if(url){image(g,url,r);return;}
 if(color==='#000'&&A.book){image(g,A.book,r);text(g,label,r.x+r.w/2,r.y+r.h/2+2,20,'#fff','center');return;}
 g.save();g.strokeStyle=color;g.lineWidth=3;g.strokeRect(r.x+1,r.y+7,r.w-2,r.h-9);
 g.fillStyle=color;g.beginPath();g.moveTo(r.x+6,r.y);g.quadraticCurveTo(r.x+r.w*.3,r.y-2,r.x+r.w/2,r.y+7);g.quadraticCurveTo(r.x+r.w*.75,r.y-2,r.x+r.w-6,r.y);g.lineTo(r.x+r.w-6,r.y+r.h-7);g.lineTo(r.x+r.w/2,r.y+r.h);g.lineTo(r.x+6,r.y+r.h-7);g.closePath();g.fill();
 g.font='900 '+(label.length>5?12:18)+'px "Yu Gothic",sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineWidth=2;g.strokeStyle='#333';g.strokeText(label,r.x+r.w/2,r.y+r.h/2);g.fillStyle='#fff';g.fillText(label,r.x+r.w/2,r.y+r.h/2);g.restore();
}
function pcItems(i){const r=L['pc'+(i+1)],right=i>1,bx=r.x+(right?18:191),by=r.y+67;
 return {r,portrait:rect(r.x+(right?219:0),r.y+19,181,r.h-20),buttons:[rect(bx,by,86,65),rect(bx+105,by,86,65),rect(bx+(right?105:0),by+76,86,65)],tokens:rect(r.x+(right?7:278),r.y+139,120,76)};}
function tokenRect(i,k){const p=state.mother.pcs[i],r=pcItems(i).tokens,size=clamp(p.tokenSize,12,36),gap=Math.min(clamp(p.tokenGap,0,8),(r.w-size*3)/2,76-size*2),count=clamp(p.tokenCount,0,6);const cols=3,first=Math.min(cols,Math.max(1,count-cols));const col=k<first?k:(k-first)%cols,row=k<first?0:1+Math.floor((k-first)/cols);return rect(r.x+col*(size+gap),r.y+row*(size+gap),size,size)}
function token(g,i,k){const p=state.mother.pcs[i],r=tokenRect(i,k);g.save();g.beginPath();g.arc(r.x+r.w/2,r.y+r.h/2,r.w/2,0,Math.PI*2);g.clip();g.fillStyle=p.color;g.fillRect(r.x,r.y,r.w,r.h);image(g,p.tokenImage||p.image,r,'cover');g.restore();g.beginPath();g.arc(r.x+r.w/2,r.y+r.h/2,r.w/2-1,0,Math.PI*2);g.strokeStyle=p.color;g.lineWidth=1.4;g.stroke();}
function pc(g,i,content=true,portraitVisible=true){const p=state.mother.pcs[i],{r,portrait,buttons}=pcItems(i);g.fillStyle=['#ffffcb','#d2ffff','#dcd2ff','#ffdeff'][i];g.fillRect(r.x,r.y,r.w,r.h);
 if(portraitVisible){g.save();image(g,p.image,portrait,'bottom');g.restore();}
 if(!portraitVisible)return;
 pcLabel(g,i);
 if(content){buttons.forEach((b,j)=>book(g,b,['HO','カーチェイス','追加HO'][j],p.color,p.icons[j]));for(let k=0;k<p.tokenCount;k++)token(g,i,k)}
}
function pcLabel(g,i){const p=state.mother.pcs[i],r=L['pc'+(i+1)];
 image(g,A['pc'+i],rect(r.x+7,r.y+7,62,27));if(p.name===names[i])image(g,A['name'+i],rect(r.x+73,r.y+13,321,39));else{g.save();g.shadowColor='#fff';g.shadowBlur=4;text(g,p.name,r.x+r.w-9,r.y+37,p.name.length>12?24:29,'#000','right');g.restore();}
 g.strokeStyle=p.color;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);g.beginPath();g.moveTo(r.x+63,r.y+50);g.lineTo(r.x+r.w-9,r.y+50);g.stroke();
}
function phaseRect(i){const r=L.phasebar,step=(r.w-14)/Math.max(1,state.phases.length);return rect(r.x+i*step,r.y,step+12,r.h)}
function phase(g,i,active){const p=state.phases[i],r=phaseRect(i);g.save();g.globalAlpha=p.enabled===false?.35:1;g.beginPath();g.moveTo(r.x,r.y);g.lineTo(r.x+r.w-22,r.y);g.lineTo(r.x+r.w,r.y+r.h/2);g.lineTo(r.x+r.w-22,r.y+r.h);g.lineTo(r.x,r.y+r.h);g.lineTo(r.x+21,r.y+r.h/2);g.closePath();g.fillStyle=active?'#fff7ce':'#eee';g.fill();g.strokeStyle='#000';g.lineWidth=4;g.stroke();const letters=Array.from(p.label||'');const size=Math.min(22,135/Math.max(letters.length,1));letters.forEach((c,k)=>text(g,c,r.x+37,r.y+10+k*size+size/2,size,'#000','center'));text(g,p.duration||'',r.x+29,r.y+r.h-12,18,'#000','center');g.restore();}
function empty(g,r){roundRect(g,r.x,r.y,r.w,r.h,4,'#e7e7e7','#808080',2);g.save();g.beginPath();g.roundRect(r.x,r.y,r.w,r.h,4);g.clip();g.fillStyle='#808080';g.fillRect(r.x,r.y,r.w,15);g.restore();}
function group(g,gi,cards=true){const r=L[gi?'discussion':'investigation'];g.fillStyle='#fff';g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle='#808080';g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);text(g,gi?'議論フェーズ！':'事件捜査！',r.x+30,r.y+17,22);image(g,A.flourish,rect(r.x+6,r.y+26,200,12));for(let i=0;i<(gi?12:10);i++){const s=slot(gi,i);empty(g,s);const c=state.cardGroups[gi]?.cards.find(c=>c.motherSlot===i);if(cards&&c)g.drawImage(cardFaceCanvas(c,s.w,s.h,!c.startClosed,state.cardGroups[gi].cardFrameStyle),s.x,s.y);}}
function exRect(i){const r=L.exArea;return rect(r.x+20+(i%6)*108,r.y+14+Math.floor(i/6)*86,90,68)}
function ex(g,i){const e=state.mother.ex[i];if(e.visible)book(g,exRect(i),e.name,'#000',e.image)}
function nav(g){const r=L.navigation;g.fillStyle='#f3ebdc';g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle='#000';g.lineWidth=4;g.strokeRect(r.x,r.y,r.w,r.h);['BACK','NEXT'].forEach((s,i)=>{const x=r.x+71+i*125,y=r.y+68;g.save();g.shadowColor='#666';g.shadowBlur=6;g.shadowOffsetX=3;g.shadowOffsetY=4;g.fillStyle='#5dbfc7';g.beginPath();g.arc(x,y,54,0,Math.PI*2);g.fill();g.restore();g.fillStyle='#fff';g.beginPath();g.moveTo(x+(i?-11:11),y-18);g.lineTo(x+(i?16:-16),y);g.lineTo(x+(i?-11:11),y+18);g.fill();text(g,s,x,r.y+151,31,'#000','center')});}
function render(g,phaseIndex=state.currentPhase,mode='all'){
 lock();g.clearRect(0,0,1600,900);g.fillStyle='#ccc';g.fillRect(0,0,1600,900);
 image(g,state.mother.titleImage,L.header);if(state.mother.decorationImage){g.fillStyle='#ccc';g.fillRect(L.decoration.x,L.decoration.y,L.decoration.w,L.decoration.h);image(g,state.mother.decorationImage,L.decoration)}
 for(let i=0;i<4;i++)pc(g,i,mode==='all');group(g,0,mode==='all');group(g,1,mode==='all');
 state.mother.maps.forEach((url,i)=>image(g,url,L['map'+(i+1)]));nav(g);g.strokeStyle='#222';g.lineWidth=5;g.strokeRect(L.exArea.x,L.exArea.y,L.exArea.w,L.exArea.h);
 if(mode==='all'){state.phases.forEach((p,i)=>phase(g,i,i===phaseIndex));state.mother.ex.forEach((e,i)=>ex(g,i));drawExtraPanels(g);drawSceneMarkers(g,phaseIndex);}
}
draw=function(){if(on())render(ctx);else original.draw()};
applyLayoutTemplate=function(name){if(name==='mother_president'){if(on()){lock();refreshAllEditors();return}checkpoint();if(state.cardGroups.some(g=>g.cards.length)&&!confirm('専用の空テンプレートを作成します。現在の内容は「元に戻す」で復元できます。続けますか？'))return;setup()}else{state.templateId=name;original.applyLayoutTemplate(name);editor()}};
normalizeState=function(){original.normalizeState();if(on())lock()};
refreshAllEditors=function(){original.refreshAllEditors();editor()};
renderPhases=function(){original.renderPhases();if(on())editor()};
renderCardGroups=function(){original.renderCardGroups();document.querySelector('#addCardGroupBtn').disabled=on();if(on()){document.querySelectorAll('[data-gdel]').forEach(el=>el.disabled=true);document.querySelectorAll('[data-addcard]').forEach(el=>{const i=+el.dataset.addcard;el.disabled=state.cardGroups[i].cards.length>=(i?12:10)})}};
renderLayoutEditor=function(){original.renderLayoutEditor();document.querySelectorAll('#layoutEditor input').forEach(el=>el.disabled=on())};
autoArrangeGroup=function(g){if(on()){lock();return}return original.autoArrangeGroup(g)};
ensureGroupLayouts=function(g){if(on()){lock();return}return original.ensureGroupLayouts(g)};
LAYOUT_TEMPLATE_REGISTRY.push({id:'mother_president',name:'お母さんは大統領',label:'お母さんは大統領',description:'1600×900固定。捜査10枠・議論12枠・EX12枠。'});
function editor(){
 let root=document.getElementById('motherEditor');if(!root){root=document.createElement('div');root.id='motherEditor';document.getElementById('overallLayoutPage').prepend(root)}
 root.hidden=!on();for(const id of ['editMode','cardEditMode','tokenEditMode','tokenGroupEditMode','markerEditMode']){document.getElementById(id).disabled=on()}document.getElementById('addCardGroupBtn').disabled=on();if(!on())return;
 document.getElementById('layoutTemplateSelect').value='mother_president';
 const m=state.mother;const file=(key,label)=>`<label>${label}<input type="file" accept="image/*" data-mp-file="${key}"></label>`;
 root.innerHTML=`<div class="templatePanel"><b>お母さんは大統領 · 固定配置</b><p class="mini">座標は固定。立ち絵・本型パネル・地図をここで差し替えます。カードは既存のカード編集欄で登録（捜査10／議論12まで）。</p><button class="btn" id="mpSample">サンプルカード6枚を配置</button>${file('titleImage','タイトル全体')}${file('decorationImage','シルエット／装飾')}${file('maps.0','1F地図')}${file('maps.1','2F地図')}
 ${m.pcs.map((p,i)=>`<details><summary>PC${i+1} ${esc(p.name)}</summary><label>名前<input data-mp="pcs.${i}.name" value="${esc(p.name)}"></label><label>色<input type="color" data-mp="pcs.${i}.color" value="${p.color}"></label>${file('pcs.'+i+'.image','立ち絵PNG')}${file('pcs.'+i+'.tokenImage','顔トークン')}${p.icons.map((_,j)=>file('pcs.'+i+'.icons.'+j,['HO','カーチェイス','追加HO'][j])).join('')}<label>トークン数（0〜6）<input type="number" min="0" max="6" data-mp="pcs.${i}.tokenCount" value="${p.tokenCount}"></label><label>サイズ（12〜36）<input type="number" min="12" max="36" data-mp="pcs.${i}.tokenSize" value="${p.tokenSize}"></label><label>間隔（0〜8）<input type="number" min="0" max="8" data-mp="pcs.${i}.tokenGap" value="${p.tokenGap}"></label></details>`).join('')}
 <details><summary>EX 12枠</summary>${m.ex.map((e,i)=>`<label>${i+1}<input data-mp="ex.${i}.name" value="${esc(e.name)}"></label><label><input type="checkbox" data-mp="ex.${i}.visible" ${e.visible?'checked':''}>表示</label><label>関連PC<select data-mp="ex.${i}.pc">${['','PC1','PC2','PC3','PC4'].map(p=>`<option ${p===e.pc?'selected':''}>${p}</option>`).join('')}</select></label>${file('ex.'+i+'.image','EX画像')}`).join('')}</details>
 <details><summary>フェーズ有効／無効</summary><p>名称・時間・追加／削除は既存シーン欄。フェーズ帯内だけで配分し、他領域は移動しません。</p>${state.phases.map((p,i)=>`<label><input type="checkbox" data-mp-phase="${i}" ${p.enabled!==false?'checked':''}>${esc(p.label)}</label>`).join('')}</details></div>`;
 const assign=(key,value)=>{const parts=key.split('.');let o=m;for(const k of parts.slice(0,-1))o=o[k];o[parts.at(-1)]=value};
 root.querySelectorAll('[data-mp]').forEach(el=>el.onchange=()=>{checkpoint();let v=el.type==='checkbox'?el.checked:el.type==='number'?clamp(el.value,Number(el.min),Number(el.max)):el.value;assign(el.dataset.mp,v);draw()});
 root.querySelectorAll('[data-mp-file]').forEach(el=>el.onchange=()=>{checkpoint();loadFileAsDataURL(el.files[0],url=>{assign(el.dataset.mpFile,url);draw()})});
 root.querySelectorAll('[data-mp-phase]').forEach(el=>el.onchange=()=>{checkpoint();state.phases[+el.dataset.mpPhase].enabled=el.checked;draw()});
 root.querySelector('#mpSample').onclick=sample;
}
function sample(){checkpoint();state.cardGroups.forEach((g,gi)=>{g.cards=Array.from({length:gi?3:6},(_,i)=>{const c=newCard(i);Object.assign(c,{title:`サンプル ${i+1}`,frontText:'表面',backText:'裏面',startClosed:false,frontColor:colors[i%4]});return c})});refreshAllEditors();}
canvas.addEventListener('click',e=>{if(!on())return;const b=canvas.getBoundingClientRect(),x=(e.clientX-b.left)*1600/b.width,y=(e.clientY-b.top)*900/b.height,r=L.navigation;if(x<r.x||x>r.x+r.w||y<r.y||y>r.y+r.h)return;let dir=x<r.x+r.w/2?-1:1,n=state.currentPhase+dir;while(n>=0&&n<state.phases.length&&state.phases[n].enabled===false)n+=dir;if(n>=0&&n<state.phases.length){state.currentPhase=n;refreshAllEditors()}});
// Persistent IDs are reused for every scene; no late-created EX or HO marker slots.
async function exportMother(onlyPhase=null,assetsOnly=false){
 lock();if(state.cardGroups.length!==2||state.cardGroups.some((g,i)=>g.cards.length>(i?12:10)))throw new Error('固定スロット数を超えています。捜査10枚・議論12枚以内にしてください。');
 const urls=new Set();function collect(o){if(typeof o==='string'&&o.startsWith('data:image/'))urls.add(o);else if(o&&typeof o==='object')Object.values(o).forEach(collect)}collect(state.mother);collect(state.cardGroups);await Promise.all([...urls].map(url=>{const im=loadImg(url);return im.decode()}));
 const files=[],resources={},items={},scenes={};let order=0;
 const cut=(r,fn)=>{const c=makeCanvas(r.w,r.h),g=c.getContext('2d');g.translate(-r.x,-r.y);fn(g);return c};
 const screen=async(id,r,c,opts={})=>{const url=await addPng(files,resources,c),q=p2g(r.x,r.y,r.w,r.h);items[id]=plane(url,q.x,q.y,q.width,q.height,opts.z||40,order++,id,{locked:false,freezed:false,...opts});return url};
 await screen('mp_board',rect(0,0,1600,900),cut(rect(0,0,1600,900),g=>{render(g,0,'base');g.fillStyle='#ccc';['header','pc1','pc2','pc3','pc4','map1','map2'].forEach(key=>{const r=L[key];g.fillRect(r.x-1,r.y-1,r.w+2,r.h+2)})}),{z:0,locked:true,freezed:true});
 await screen('mp_title',L.header,cut(L.header,g=>{image(g,state.mother.titleImage,L.header);if(state.mother.decorationImage){g.fillStyle='#ccc';g.fillRect(L.decoration.x,L.decoration.y,L.decoration.w,L.decoration.h);image(g,state.mother.decorationImage,L.decoration)}}));
 for(let i=0;i<4;i++){const r=L['pc'+(i+1)];await screen('mp_pc_'+i,r,cut(r,g=>pc(g,i,false)))}
 for(let i=0;i<2;i++){const r=L['map'+(i+1)];await screen('mp_map_'+i,r,cut(r,g=>image(g,state.mother.maps[i],r)))}
 for(let i=0;i<state.extraPanels.length;i++){const p=state.extraPanels[i];await screen('mp_extra_'+i,p,markerCanvas(p))}
 for(let gi=0;gi<2;gi++){for(let i=0;i<(gi?12:10);i++){const r=slot(gi,i),c=state.cardGroups[gi]?.cards.find(c=>c.motherSlot===i);const cv=c?cardFaceCanvas(c,r.w,r.h,true,state.cardGroups[gi].cardFrameStyle):cut(r,g=>empty(g,r));const back=c?await addPng(files,resources,cardFaceCanvas(c,r.w,r.h,false,state.cardGroups[gi].cardFrameStyle)):null;await screen(`mp_card_${gi}_${i}`,r,cv,{coverImageUrl:back,closed:!!c?.startClosed,z:100})}}
 for(let i=0;i<4;i++)for(let k=0;k<state.mother.pcs[i].tokenCount;k++){const r=tokenRect(i,k);await screen(`mp_token_${i}_${k}`,r,cut(r,g=>token(g,i,k)),{z:120})}
 const ids=state.phases.map((_,i)=>'mp_scene_'+i);
 for(let pi=0;pi<state.phases.length;pi++){
 const markers={};
 const marker=async(id,r,c,text='')=>{const url=await addPng(files,resources,c);markers[id]=ccfoliaMarkerEntity(url,p2g(r.x,r.y,r.w,r.h),150,{text,locked:false,freezed:false})};
 await marker('mp_phasebar',L.phasebar,cut(L.phasebar,g=>state.phases.forEach((_,i)=>phase(g,i,i===pi))));
 for(let i=0;i<4;i++)for(let j=0;j<3;j++){const p=state.mother.pcs[i],r=pcItems(i).buttons[j];await marker(`mp_ho_${i}_${j}`,r,cut(r,g=>book(g,r,['HO','カーチェイス','追加HO'][j],p.color,p.icons[j])),`PC${i+1} ${['HO','カーチェイス','追加HO'][j]}：画像差し替え用`)}
 for(let i=0;i<12;i++){const r=exRect(i),e=state.mother.ex[i];await marker('mp_ex_'+i,r,cut(r,g=>ex(g,i)),e.name+' '+e.pc)}
 for(let i=0;i<(state.phases[pi].markers||[]).length;i++){const p=state.phases[pi].markers[i];await marker('mp_user_marker_'+i,p,markerCanvas(p),p.text)}
 scenes[ids[pi]]={name:state.phases[pi].label,text:buildSceneSwitchText(state.phases[pi]),backgroundUrl:null,foregroundUrl:null,fieldWidth:80,fieldHeight:45,displayGrid:false,markers,order:pi+1,locked:false};
 }
 const selected=onlyPhase??state.currentPhase;const room={backgroundUrl:null,foregroundUrl:null,fieldWidth:80,fieldHeight:45,displayGrid:false,enableCrossfade:false,sceneId:ids[selected],markers:scenes[ids[selected]].markers,messageChannels:[],archived:false,underConstruction:false};
 const data={meta:{version:'1.1.0'},entities:{room,items,scenes,characters:{},decks:{},effects:{},notes:{},savedatas:{},snapshots:{}},resources};
 const enc=new TextEncoder();files.unshift({name:'__data.json',bytes:enc.encode(JSON.stringify(data))},{name:'.token',bytes:enc.encode('0.'+await sha256HexBytes(crypto.getRandomValues(new Uint8Array(32))))},{name:'mother_president.project.json',bytes:enc.encode(JSON.stringify(state))});
 if(assetsOnly){const c=makeCanvas(1600,900);render(c.getContext('2d'));files.push({name:'board_preview.png',bytes:await canvasPngBytes(c)})}
 return new Uint8Array(await zipStore(files).arrayBuffer());
}
makeRoomZipBytes=async function(i){return on()?exportMother(i):original.makeRoomZipBytes(i)};
makeSceneRoomTrialZipBytes=async function(){return on()?exportMother():original.makeSceneRoomTrialZipBytes()};
exportAssets=async function(){if(!on())return original.exportAssets();downloadBlob(new Blob([await exportMother(null,true)],{type:'application/zip'}),'mother_president_assets.zip')};
document.getElementById('assetZipBtn').onclick=exportAssets;
globalThis.MotherPresident={setup,sample,render,exportMother,layout:L,slot,parts:{image,text,book,pcItems,tokenRect,token,pc,pcLabel,phase,empty,group,exRect,ex,nav,lock}};
renderLayoutTemplateSelect();
setup();
})();
