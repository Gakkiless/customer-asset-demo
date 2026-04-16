// ========== DATA ==========
var COLORS={华东:'#5b9cf6',华南:'#2dd4a0',西南:'#f5b731',华北:'#a78bfa'};
var AC=['#5b9cf6','#2dd4a0','#f5b731','#a78bfa','#fb923c','#f472b6','#c8956c','#93c5fd'];
var TAGS=[
  {id:'nature',name:'自然风光',cls:'t-nature'},{id:'culture',name:'人文历史',cls:'t-culture'},
  {id:'luxury',name:'奢享度假',cls:'t-luxury'},{id:'family',name:'亲子出行',cls:'t-family'},
  {id:'food',name:'美食体验',cls:'t-food'},{id:'hike',name:'户外徒步',cls:'t-hike'},
  {id:'photo',name:'摄影采风',cls:'t-photo'},{id:'snow',name:'雪山温泉',cls:'t-snow'}
];
var TCLR={nature:'#2dd4a0',culture:'#f5b731',luxury:'#e8b88a',family:'#5b9cf6',food:'#f472b6',hike:'#a78bfa',photo:'#fb923c',snow:'#93c5fd'};

var SALES={
  '华北':[
    {name:'赵岍',total:245,linked:198,tagged:138,traded:48},
    {name:'李海燕',total:380,linked:308,tagged:215,traded:72},
    {name:'张嵩',total:345,linked:278,tagged:195,traded:65},
    {name:'张曌依',total:412,linked:332,tagged:232,traded:78},
    {name:'朱伯英',total:298,linked:242,tagged:168,traded:56},
    {name:'朱雨',total:265,linked:215,tagged:150,traded:50},
    {name:'张小芽',total:225,linked:182,tagged:128,traded:42}
  ],
  '华南':[
    {name:'廖文娟',total:312,linked:252,tagged:176,traded:58},
    {name:'张金鸿',total:278,linked:225,tagged:158,traded:52},
    {name:'苏凝影',total:248,linked:200,tagged:140,traded:46},
    {name:'屈婉祺',total:432,linked:356,tagged:245,traded:82},
    {name:'梁爱平',total:362,linked:298,tagged:210,traded:70},
    {name:'程凡凡',total:215,linked:174,tagged:122,traded:40},
    {name:'李可韵',total:198,linked:160,tagged:112,traded:36}
  ],
  '西南':[
    {name:'郭梦婕',total:285,linked:232,tagged:162,traded:54},
    {name:'曾卓',total:258,linked:208,tagged:145,traded:48},
    {name:'郑文婷',total:325,linked:262,tagged:182,traded:60},
    {name:'王静宜',total:298,linked:240,tagged:168,traded:55},
    {name:'候晓东',total:232,linked:188,tagged:130,traded:43}
  ],
  '华东':[
    {name:'杨慧中',total:352,linked:298,tagged:205,traded:72},
    {name:'王倩',total:312,linked:252,tagged:176,traded:58},
    {name:'王翊',total:278,linked:225,tagged:158,traded:52},
    {name:'曹晓昕',total:245,linked:198,tagged:138,traded:45},
    {name:'杨爱民',total:328,linked:265,tagged:185,traded:61},
    {name:'刘娜',total:298,linked:240,tagged:168,traded:55},
    {name:'杨洁',total:265,linked:215,tagged:150,traded:50},
    {name:'张乙山',total:225,linked:182,tagged:128,traded:42},
    {name:'李梦蝶',total:198,linked:160,tagged:112,traded:36}
  ]
};

var REGIONS=Object.keys(SALES).map(function(r){
  var s=SALES[r],t=0,l=0,tg=0,td=0;
  s.forEach(function(x){t+=x.total;l+=x.linked;tg+=x.tagged;td+=x.traded});
  return{name:r,total:t,linked:l,linkedRate:+(l/t*100).toFixed(1),tagged:tg,taggedRate:+(tg/l*100).toFixed(1),traded:td,tradeRate:+(td/tg*100).toFixed(1)};
});

var RT={
  '华东':{nature:382,culture:268,luxury:312,family:225,food:186,hike:145,photo:168,snow:128},
  '华南':{nature:295,culture:215,luxury:248,family:198,food:225,hike:112,photo:132,snow:85},
  '西南':{nature:412,culture:298,luxury:186,family:165,food:198,hike:285,photo:268,snow:245},
  '华北':{nature:528,culture:412,luxury:386,family:325,food:268,hike:198,photo:186,snow:312}
};

var TT={nature:{total:1617,traded:485},culture:{total:1193,traded:392},luxury:{total:1132,traded:428},family:{total:913,traded:298},food:{total:877,traded:312},hike:{total:740,traded:268},photo:{total:754,traded:285},snow:{total:770,traded:295}};

var CTYPES=[
  {id:'vip',name:'VIP客户',color:'#c8956c'},
  {id:'key',name:'重点客户',color:'#f5b731'},
  {id:'active',name:'活跃客户',color:'#5b9cf6'},
  {id:'normal',name:'普通客户',color:'#2dd4a0'},
  {id:'dormant',name:'沉睡客户',color:'#8b92a5'}
];
var CTYPE_CLR={vip:'#c8956c',key:'#f5b731',active:'#5b9cf6',normal:'#2dd4a0',dormant:'#8b92a5'};
var CT={
  '华北':{vip:245,key:528,active:1245,normal:892,dormant:856},
  '华南':{vip:312,key:486,active:1156,normal:924,dormant:768},
  '西南':{vip:186,key:412,active:896,normal:645,dormant:521},
  '华东':{vip:225,key:382,active:1028,normal:756,dormant:589}
};

function srand(s){return function(){s=Math.sin(s)*10000;return s-Math.floor(s)}}

var REGIONS_DEPT={
  '华东':['华东高客服务中心','会员管理'],
  '华南':['华南高客服务中心','会员管理'],
  '西南':['西南高客服务中心','会员管理'],
  '华北':['华北高客服务中心','会员管理']
};

function genCust(sn){
  var seed=0;for(var i=0;i<sn.length;i++)seed+=sn.charCodeAt(i);
  var rng=srand(seed),count=10+Math.floor(rng()*8);
  var s=['王','李','张','刘','陈','杨','黄','赵','周','吴','徐','孙','马','朱','胡','郭','林','何','高','罗'];
  var g=['伟','芳','娜','敏','静','丽','强','磊','洋','艳','勇','军','杰','涛','明','超','慧','志远','雅琴','雪梅','春华','文博','佳琪','思远','晓燕','海燕','美霞','嘉伟','婉祺'];
  var cs=[];
  for(var i=0;i<count;i++){
    var nm=s[Math.floor(rng()*s.length)]+g[Math.floor(rng()*g.length)]+(rng()>.5?g[Math.floor(rng()*g.length)]:'');
    var tc=1+Math.floor(rng()*3),tags=[],ids=TAGS.map(function(t){return t.id});
    for(var t=0;t<tc;t++){var id=ids[Math.floor(rng()*ids.length)];if(tags.indexOf(id)===-1)tags.push(id)}
    var lc=Math.floor(rng()*150),ht=lc<60&&rng()>.3,ta=ht?Math.floor(6000+rng()*45000):0;
    var fs=lc>60?'urgent':lc>30?'soon':'ok';
    var lv=ht?(ta>30000?'金刚':ta>15000?'莲':'雪莲'):(rng()>.7?'绿绒蒿':'格桑');
    var m=String(Math.floor(rng()*4)+1);if(m.length<2)m='0'+m;
    var d=String(Math.floor(rng()*28)+1);if(d.length<2)d='0'+d;
    var reg=rng()>.5?'华东':rng()>.5?'华南':rng()>.5?'西南':'华北';
    var depts=REGIONS_DEPT[reg],dept=depts[Math.floor(rng()*depts.length)];
    var mid='0000'+String(Math.floor(rng()*10000000000000));mid=mid.slice(-20);
    var cid='ST'+String(Math.floor(10000000000+rng()*90000000000));
    var wname=sn+'-'+nm;
    var y=2019+Math.floor(rng()*7);var mo=String(Math.floor(rng()*12)+1);if(mo.length<2)mo='0'+mo;
    var da=String(Math.floor(rng()*28)+1);if(da.length<2)da='0'+da;
    var regDate=y+'-'+mo+'-'+da;
    var ctype=rng()>.85?'vip':rng()>.7?'key':rng()>.5?'active':rng()>.3?'normal':'dormant';
    var ctypeInfo=CTYPES.find(function(t){return t.id===ctype});
    cs.push({name:nm,ct:ctype,ctName:ctypeInfo.name,ctColor:ctypeInfo.color,mid:mid,cid:cid,wname:wname,reg:reg,dept:dept,regDate:regDate,tags:tags,lc:lc,ht:ht,ta:ta,fs:fs,lv:lv,ltd:ht?('2026-'+m+'-'+d):'-'});
  }
  var fo={urgent:0,soon:1,ok:2};
  cs.sort(function(a,b){return fo[a.fs]-fo[b.fs]||b.ta-a.ta});
  return cs;
}

// ========== STATE ==========
var CV='overview',SR=null,SS=null,CH={},allC=[],cTF=null,cLV=null,cCT=null;

// ========== HELPERS ==========
function esc(s){return s.replace(/'/g,"\\'")}
function clr(rate,good,ok){return rate>good?'var(--green)':rate>ok?'var(--amber)':'var(--red)'}
function lr(s){return +(s.linked/s.total*100).toFixed(1)}
function trr(s){return +(s.traded/s.tagged*100).toFixed(1)}
function pr(s){return +(s.tagged/s.linked*100).toFixed(1)}
function kpi(label,val,sub,subc,vc){return '<div class="kpi"><div class="kpi-l">'+label+'</div><div class="kpi-v"'+(vc?' style="color:'+vc+'"':'')+'>'+val+'</div>'+(sub?'<div class="kpi-s '+(subc||'')+'">'+sub+'</div>':'')+'</div>';}
function rs(l,v){return '<div><div class="rg-sl">'+l+'</div><div class="rg-sv">'+v+'</div></div>';}

// ========== RENDER ==========
function render(){
  Object.values(CH).forEach(function(c){try{c.dispose()}catch(e){}});CH={};cTF=null;cLV=null;cCT=null;
  var app=document.getElementById('app');
  if(CV==='overview')app.innerHTML=rvO();
  else if(CV==='region')app.innerHTML=rvR();
  else app.innerHTML=rvS();
  uBC();
  requestAnimationFrame(function(){
    if(CV==='overview')iO();else if(CV==='region')iR();else iS();
  });
}

function uBC(){
  var bc=document.getElementById('bc'),h='<a onclick="goOverview()">全部大区</a>';
  if(CV!=='overview')h+=' <span class="sep">›</span> <a onclick="goRegion(\''+esc(SR)+'\')">'+SR+'</a>';
  if(CV==='sales')h+=' <span class="sep">›</span> <span>'+SS+'</span>';
  bc.innerHTML=h;
}

function goOverview(){CV='overview';SR=null;SS=null;render()}
function goRegion(r){CV='region';SR=r;SS=null;render()}
function goSales(r,s){CV='sales';SR=r;SS=s;render()}

// ========== OVERVIEW ==========
function rvO(){
  var tm=0,tl=0,tt=0,td=0;REGIONS.forEach(function(r){tm+=r.total;tl+=r.linked;tt+=r.tagged;td+=r.traded});
  var h='<div class="kpis fi">';
  h+=kpi('总会员数',tm.toLocaleString(),'↑ 2.1% 较上月','up');
  h+=kpi('建联率',(tl/tm*100).toFixed(1)+'%','↑ 0.3pp','up');
  h+=kpi('建联客户数',tl.toLocaleString(),'↑ 1.8%','up');
  h+=kpi('打标覆盖率',(tt/tl*100).toFixed(1)+'%','↓ 0.5pp','dn');
  h+=kpi('打标→交易转化',(td/tt*100).toFixed(1)+'%','↑ 1.2pp','up');
  h+='</div>';
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">大区建联概览</div></div><div class="sec-b"><div class="rg-grid">';
  REGIONS.forEach(function(r){
    h+='<div class="rg-card" onclick="goRegion(\''+esc(r.name)+'\')">';
    h+='<div class="rg-name" style="color:'+COLORS[r.name]+'">'+r.name+'</div><div class="rg-stats">';
    h+=rs('会员总数',r.total.toLocaleString())+rs('建联客户',r.linked.toLocaleString());
    h+=rs('建联率',r.linkedRate+'%')+rs('打标→交易',r.tradeRate+'%');
    h+='</div><div class="rg-bar"><div class="rg-bar-f" style="width:'+r.linkedRate+'%;background:'+COLORS[r.name]+'"></div></div>';
    h+='<div style="margin-top:8px;padding:5px 0;border-top:1px dashed var(--border);font-size:12px;color:var(--gold);font-weight:500;text-align:center">→ 点击查看销售员详情</div></div>';
  });
  h+='</div></div></div>';
  h+='<div class="col2 fi">';
  h+='<div class="sec"><div class="sec-h"><div class="sec-t">各大区建联率对比</div></div><div class="sec-b"><div class="ch" id="c1"></div></div></div>';
  h+='<div class="sec"><div class="sec-h"><div class="sec-t">建联→打标→交易 漏斗</div></div><div class="sec-b"><div class="ch" id="c2"></div></div></div>';
  h+='</div>';
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户标签打标与交易转化</div></div><div class="sec-b"><div class="ch" id="c3"></div></div></div>';
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户类型分布</div></div><div class="sec-b"><div class="col2"><div class="ch" id="c8" style="height:280px"></div><div class="ch" id="c9" style="height:280px"></div></div></div></div>';
  return h;
}

function iO(){
  var c1=echarts.init(document.getElementById('c1'));CH.c1=c1;
  c1.setOption({tooltip:{trigger:'axis',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb',fontSize:12}},grid:{left:50,right:20,top:25,bottom:35},xAxis:{type:'category',data:REGIONS.map(function(r){return r.name}),axisLine:{lineStyle:{color:'#252a3a'}},axisLabel:{color:'#8b92a5'}},yAxis:{type:'value',axisLine:{show:false},splitLine:{lineStyle:{color:'#252a3a'}},axisLabel:{color:'#8b92a5',formatter:'{value}%'},max:25},series:[{type:'bar',barWidth:34,data:REGIONS.map(function(r){return{value:r.linkedRate,itemStyle:{color:COLORS[r.name]}}}),label:{show:true,position:'top',color:'#e4e6eb',fontSize:12,formatter:'{c}%'}}]});

  var tm=0,tl=0,tt=0,td=0;REGIONS.forEach(function(r){tm+=r.total;tl+=r.linked;tt+=r.tagged;td+=r.traded});
  var c2=echarts.init(document.getElementById('c2'));CH.c2=c2;
  c2.setOption({tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},series:[{type:'funnel',left:'10%',top:15,bottom:15,width:'80%',min:0,max:tm,minSize:'0%',sort:'descending',gap:4,label:{show:true,position:'inside',color:'#fff',fontSize:12,formatter:function(p){return p.name+'\n'+p.value.toLocaleString()}},itemStyle:{borderColor:'#151821',borderWidth:2},data:[{value:tm,name:'总会员',itemStyle:{color:'#5c6378'}},{value:tl,name:'已建联',itemStyle:{color:'#5b9cf6'}},{value:tt,name:'已打标',itemStyle:{color:'#f5b731'}},{value:td,name:'已交易',itemStyle:{color:'#2dd4a0'}}]}]});

  var c3=echarts.init(document.getElementById('c3'));CH.c3=c3;
  c3.setOption({tooltip:{trigger:'axis',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb',fontSize:12}},legend:{data:['打标人数','交易人数','转化率'],textStyle:{color:'#8b92a5',fontSize:11},top:0},grid:{left:55,right:55,top:35,bottom:35},xAxis:{type:'category',data:TAGS.map(function(t){return t.name}),axisLine:{lineStyle:{color:'#252a3a'}},axisLabel:{color:'#8b92a5',fontSize:11}},yAxis:[{type:'value',axisLabel:{color:'#8b92a5'},splitLine:{lineStyle:{color:'#252a3a'}}},{type:'value',axisLabel:{color:'#8b92a5',formatter:'{value}%'},splitLine:{show:false},max:50}],series:[{name:'打标人数',type:'bar',barWidth:20,data:TAGS.map(function(t){return TT[t.id].total}),itemStyle:{color:'#5b9cf6',borderRadius:[3,3,0,0]}},{name:'交易人数',type:'bar',barWidth:20,data:TAGS.map(function(t){return TT[t.id].traded}),itemStyle:{color:'#2dd4a0',borderRadius:[3,3,0,0]}},{name:'转化率',type:'line',yAxisIndex:1,data:TAGS.map(function(t){return +(TT[t.id].traded/TT[t.id].total*100).toFixed(1)}),itemStyle:{color:'#f5b731'},lineStyle:{width:2},symbol:'circle',symbolSize:6}]});

  var c8=echarts.init(document.getElementById('c8'));CH.c8=c8;
  var ctData=CTYPES.map(function(ct){var total=0;REGIONS.forEach(function(r){total+=CT[r.name][ct.id]});return{name:ct.name,value:total,itemStyle:{color:ct.color}}});
  c8.setOption({tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},legend:{orient:'vertical',right:8,top:'center',textStyle:{color:'#8b92a5',fontSize:11}},series:[{type:'pie',radius:['40%','70%'],center:['38%','50%'],label:{show:true,color:'#e4e6eb',fontSize:11,formatter:'{b}\n{c}人'},data:ctData}]});

  var c9=echarts.init(document.getElementById('c9'));CH.c9=c9;
  var regions=Object.keys(CT);
  c9.setOption({tooltip:{trigger:'axis',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb',fontSize:12}},legend:{data:CTYPES.map(function(ct){return ct.name}),textStyle:{color:'#8b92a5',fontSize:10},top:0},grid:{left:50,right:20,top:40,bottom:25},xAxis:{type:'category',data:regions,axisLine:{lineStyle:{color:'#252a3a'}},axisLabel:{color:'#8b92a5'}},yAxis:{type:'value',axisLabel:{color:'#8b92a5'},splitLine:{lineStyle:{color:'#252a3a'}}},series:CTYPES.map(function(ct){return{name:ct.name,type:'bar',stack:'total',data:regions.map(function(r){return CT[r][ct.id]}),itemStyle:{color:ct.color},barWidth:24}})});
}

// ========== REGION VIEW ==========
function rvR(){
  var r=REGIONS.find(function(x){return x.name===SR}),sales=SALES[SR];
  var h='<div style="margin-bottom:14px"><button class="bbtn" onclick="goOverview()">← 返回全部大区</button></div>';
  h+='<div class="kpis fi">';
  h+=kpi(SR+' · 会员总数',r.total.toLocaleString());
  h+=kpi('建联率',r.linkedRate+'%','','',COLORS[SR]);
  h+=kpi('建联客户',r.linked.toLocaleString());
  h+=kpi('打标覆盖率',r.taggedRate+'%');
  h+=kpi('打标→交易转化',r.tradeRate+'%');
  h+='</div>';

  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">销售员建联与转化</div></div><div class="sec-b"><div class="tw">';
  h+='<table><thead><tr><th>销售员</th><th>客户资产</th><th>建联客户</th><th>建联率</th><th>已打标</th><th>打标率</th><th>已交易</th><th>转化率</th><th>建联率</th><th></th></tr></thead><tbody>';
  sales.forEach(function(s,i){
    var r1=lr(s),r2=pr(s),r3=trr(s);
    h+='<tr class="ck" onclick="goSales(\''+esc(SR)+'\',\''+esc(s.name)+'\')">';
    h+='<td><div class="sale-name"><div class="sale-av" style="background:'+AC[i%8]+'">'+s.name[0]+'</div>'+s.name+'</div></td>';
    h+='<td>'+s.total.toLocaleString()+'</td><td>'+s.linked.toLocaleString()+'</td><td style="color:'+clr(r1,75,60)+'">'+r1+'%</td>';
    h+='<td>'+s.tagged.toLocaleString()+'</td><td>'+r2+'%</td><td>'+s.traded.toLocaleString()+'</td><td style="color:'+clr(r3,35,30)+'">'+r3+'%</td>';
    h+='<td><div class="mbar"><div class="mbar-track"><div class="mbar-fill" style="width:'+r1+'%;background:'+clr(r1,75,60)+'"></div></div></div></td>';
    h+='<td><span class="bbtn">查看详情 ›</span></td></tr>';
  });
  h+='</tbody></table></div></div></div>';

  h+='<div class="col2 fi">';
  h+='<div class="sec"><div class="sec-h"><div class="sec-t">销售员建联率排名</div></div><div class="sec-b"><div class="ch" id="c4"></div></div></div>';
  h+='<div class="sec"><div class="sec-h"><div class="sec-t">'+SR+' 标签打标分布</div></div><div class="sec-b"><div class="ch" id="c5"></div></div></div>';
  h+='</div>';
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">标签打标→交易转化（'+SR+'）</div></div><div class="sec-b"><div class="ch" id="c6"></div></div></div>';
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户类型构成（'+SR+'）</div></div><div class="sec-b"><div class="col2"><div class="ch" id="c10" style="height:260px"></div><div class="ch" id="c11" style="height:260px"></div></div></div></div>';
  return h;
}

function iR(){
  var sales=SALES[SR],color=COLORS[SR];
  var sorted=sales.slice().sort(function(a,b){return(b.linked/b.total)-(a.linked/a.total)});
  var c4=echarts.init(document.getElementById('c4'));CH.c4=c4;
  c4.setOption({tooltip:{trigger:'axis',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb',fontSize:12}},grid:{left:75,right:20,top:8,bottom:25},xAxis:{type:'value',axisLabel:{color:'#8b92a5',formatter:'{value}%'},splitLine:{lineStyle:{color:'#252a3a'}},max:100},yAxis:{type:'category',data:sorted.map(function(s){return s.name}).reverse(),axisLine:{lineStyle:{color:'#252a3a'}},axisLabel:{color:'#8b92a5',fontSize:12}},series:[{type:'bar',barWidth:16,data:sorted.map(function(s){var v=lr(s);return{value:v,itemStyle:{color:v>75?'#2dd4a0':v>60?'#f5b731':'#f04444',borderRadius:[0,3,3,0]}}}).reverse(),label:{show:true,position:'right',color:'#e4e6eb',fontSize:11,formatter:'{c}%'}}]});

  var c5=echarts.init(document.getElementById('c5'));CH.c5=c5;
  var rt=RT[SR];
  c5.setOption({tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},legend:{orient:'vertical',right:8,top:'center',textStyle:{color:'#8b92a5',fontSize:11}},series:[{type:'pie',radius:['38%','68%'],center:['38%','50%'],label:{color:'#8b92a5',fontSize:11},data:TAGS.map(function(t){return{name:t.name,value:rt[t.id],itemStyle:{color:TCLR[t.id]}}})}]});

  var c6=echarts.init(document.getElementById('c6'));CH.c6=c6;
  var rng=srand(SR.charCodeAt(0)+SR.charCodeAt(1));
  var rd=TAGS.map(function(t){var b=TT[t.id],ratio=rt[t.id]/b.total;var traded=Math.round(b.traded*ratio*(0.8+rng()*0.4));return{name:t.name,tagged:rt[t.id],traded:traded,rate:+(traded/rt[t.id]*100).toFixed(1)}});
  c6.setOption({tooltip:{trigger:'axis',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb',fontSize:12}},legend:{data:['打标人数','交易人数','转化率'],textStyle:{color:'#8b92a5',fontSize:11},top:0},grid:{left:55,right:55,top:35,bottom:35},xAxis:{type:'category',data:rd.map(function(d){return d.name}),axisLine:{lineStyle:{color:'#252a3a'}},axisLabel:{color:'#8b92a5',fontSize:11}},yAxis:[{type:'value',axisLabel:{color:'#8b92a5'},splitLine:{lineStyle:{color:'#252a3a'}}},{type:'value',axisLabel:{color:'#8b92a5',formatter:'{value}%'},splitLine:{show:false},max:60}],series:[{name:'打标人数',type:'bar',barWidth:20,data:rd.map(function(d){return d.tagged}),itemStyle:{color:color,borderRadius:[3,3,0,0]}},{name:'交易人数',type:'bar',barWidth:20,data:rd.map(function(d){return d.traded}),itemStyle:{color:'#2dd4a0',borderRadius:[3,3,0,0]}},{name:'转化率',type:'line',yAxisIndex:1,data:rd.map(function(d){return d.rate}),itemStyle:{color:'#f5b731'},lineStyle:{width:2},symbol:'circle',symbolSize:6}]});

  var ctData=CTYPES.map(function(ct){return{name:ct.name,value:CT[SR][ct.id],itemStyle:{color:ct.color}}});
  var c10=echarts.init(document.getElementById('c10'));CH.c10=c10;
  c10.setOption({tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},legend:{orient:'vertical',right:8,top:'center',textStyle:{color:'#8b92a5',fontSize:11}},series:[{type:'pie',radius:['35%','65%'],center:['40%','50%'],label:{show:true,color:'#e4e6eb',fontSize:11,formatter:'{b}\n{c}人'},data:ctData}]});

  var c11=echarts.init(document.getElementById('c11'));CH.c11=c11;
  var salesData=SALES[SR].map(function(s){var r=srand(s.name.charCodeAt(0)*17);return{name:s.name,data:CTYPES.map(function(ct){return Math.round(CT[SR][ct.id]/SALES[SR].length*(0.8+r()*0.4))})}});
  c11.setOption({tooltip:{trigger:'axis',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb',fontSize:12}},legend:{data:CTYPES.map(function(ct){return ct.name}),textStyle:{color:'#8b92a5',fontSize:10},top:0},grid:{left:50,right:15,top:40,bottom:20},xAxis:{type:'category',data:SALES[SR].map(function(s){return s.name}),axisLine:{lineStyle:{color:'#252a3a'}},axisLabel:{color:'#8b92a5',fontSize:11,rotate:20}},yAxis:{type:'value',axisLabel:{color:'#8b92a5'},splitLine:{lineStyle:{color:'#252a3a'}}},series:CTYPES.map(function(ct,i){return{name:ct.name,type:'bar',stack:'total',data:salesData.map(function(sd){return sd.data[i]}),itemStyle:{color:ct.color},barWidth:16}})});
}

// ========== SALES VIEW ==========
function rvS(){
  var s=SALES[SR].find(function(x){return x.name===SS});
  allC=genCust(SS);
  var urgent=allC.filter(function(c){return c.fs==='urgent'}).length;
  var soon=allC.filter(function(c){return c.fs==='soon'}).length;
  var traded=allC.filter(function(c){return c.ht});
  var totalT=traded.reduce(function(a,c){return a+c.ta},0);
  var r1=lr(s),r2=pr(s),r3=trr(s);

  var h='<div style="margin-bottom:14px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">';
  h+='<button class="bbtn" onclick="goRegion(\''+esc(SR)+'\')">← 返回'+SR+'</button>';
  h+='<span style="color:var(--text2);font-size:12px">'+SS+' 的客户资产</span></div>';

  h+='<div class="kpis fi">';
  h+=kpi('客户资产',s.total.toLocaleString());
  h+=kpi('建联客户',s.linked.toLocaleString(),'建联率 '+r1+'%');
  h+=kpi('已打标',s.tagged.toLocaleString(),'覆盖率 '+r2+'%');
  h+=kpi('已交易',s.traded.toLocaleString(),'转化率 '+r3+'%');
  h+=kpi('交易金额','¥'+(totalT/10000).toFixed(1)+'万');
  h+='</div>';

  if(urgent>0||soon>0){
    h+='<div class="urg-panel fi"><span style="font-size:18px">🚨</span><div class="urg-text">需立即跟进 <span class="urg-num">'+urgent+'</span> 人，即将到期 <span class="urg-num">'+soon+'</span> 人</div></div>';
  }

  // 客户类型统计
  var ctStats=CTYPES.map(function(ct){return{name:ct.name,value:allC.filter(function(c){return c.ct===ct.id}).length,color:ct.color}});

  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户类型分布（'+SS+'）</div></div>';
  h+='<div class="sec-b"><div class="col2"><div class="ch" id="c12" style="height:220px"></div>';
  h+='<div style="display:flex;flex-direction:column;gap:6px;padding:10px 0">';
  ctStats.forEach(function(ct){
    var pct=allC.length>0?Math.round(ct.value/allC.length*100):0;
    h+='<div style="display:flex;align-items:center;gap:8px;font-size:12px">';
    h+='<div style="width:10px;height:10px;border-radius:50%;background:'+ct.color+';flex-shrink:0"></div>';
    h+='<div style="flex:1;color:var(--text2)">'+ct.name+'</div>';
    h+='<div style="color:var(--text);font-weight:600">'+ct.value+'人</div>';
    h+='<div style="width:60px;background:var(--border);border-radius:3px;height:6px;overflow:hidden"><div style="width:'+pct+'%;background:'+ct.color+';height:100%;border-radius:3px"></div></div>';
    h+='<div style="color:var(--text3);font-size:11px;width:32px;text-align:right">'+pct+'%</div>';
    h+='</div>';
  });
  h+='</div></div></div></div>';

  // 客户等级统计
  var lvMap={},lvOrder=['金刚','莲','雪莲','绿绒蒿','格桑'],lvColor={'金刚':'#c8956c','莲':'#5b9cf6','雪莲':'#2dd4a0','绿绒蒿':'#a78bfa','格桑':'#8b92a5'};
  allC.forEach(function(c){lvMap[c.lv]=(lvMap[c.lv]||0)+1});
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户等级分布（'+SS+'）</div></div>';
  h+='<div class="sec-b"><div style="display:flex;gap:10px;flex-wrap:wrap;padding:10px 0">';
  lvOrder.forEach(function(lv){
    var cnt=lvMap[lv]||0;
    h+='<div style="flex:1;min-width:80px;padding:10px 12px;border-radius:8px;background:'+lvColor[lv]+'15;border:1px solid '+lvColor[lv]+'30;text-align:center">';
    h+='<div style="font-size:16px;font-weight:700;color:'+lvColor[lv]+'">'+cnt+'</div>';
    h+='<div style="font-size:11px;color:var(--text2);margin-top:2px">'+lv+'</div>';
    h+='</div>';
  });
  h+='</div></div></div>';

  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户标签概况</div></div><div class="sec-b"><div class="ch ch-sm" id="c7"></div></div></div>';

  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户跟进清单</div>';
  h+='<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">';

  // 客户等级筛选
  h+='<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">';
  h+='<span style="font-size:11px;color:var(--text3);white-space:nowrap">客户等级:</span>';
  h+='<button class="tf-btn on" id="flv-all" onclick="filterLv(null)">全部</button>';
  lvOrder.forEach(function(lv){h+='<button class="tf-btn" id="flv-'+lv+'" onclick="filterLv(\''+lv+'\')">'+lv+'</button>'});
  h+='</div>';

  // 客户类型筛选
  h+='<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">';
  h+='<span style="font-size:11px;color:var(--text3);white-space:nowrap">客户类型:</span>';
  h+='<button class="tf-btn on" id="fct-all" onclick="filterCt(null)">全部</button>';
  CTYPES.forEach(function(ct){h+='<button class="tf-btn" id="fct-'+ct.id+'" onclick="filterCt(\''+ct.id+'\')">'+ct.name+'</button>'});
  h+='</div>';

  // 标签筛选
  h+='<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">';
  h+='<span style="font-size:11px;color:var(--text3);white-space:nowrap">客户标签:</span>';
  h+='<button class="tf-btn on" id="ftag-all" onclick="filterTag(null)">全部</button>';
  TAGS.forEach(function(t){h+='<button class="tf-btn" id="ftag-'+t.id+'" onclick="filterTag(\''+t.id+'\')">'+t.name+'</button>'});
  h+='</div>';
  h+='</div></div><div class="sec-b"><div class="tw">';
  h+='<table><thead><tr><th>跟进状态</th><th>等级</th><th>客户类型</th><th>客户姓名</th><th>会员ID</th><th>会员卡号</th><th>企微建联名称</th><th>会员区域</th><th>企微添加部门</th><th>标签</th><th>最近联系</th><th>消费金额</th><th>最近下单</th></tr></thead>';
  h+='<tbody id="cb">'+renderCustRows(allC)+'</tbody></table></div></div></div>';
  return h;
}

function renderCustRows(list){
  var h='';
  list.forEach(function(c){
    var cc=c.fs==='urgent'?'cust-urg':c.fs==='soon'?'cust-soon':'';
    var fb=c.fs==='urgent'?'<span class="fb fb-urg">🔴 需跟进</span>':c.fs==='soon'?'<span class="fb fb-spn">🟡 即将到期</span>':'<span class="fb fb-ok">🟢 正常</span>';
    var tags='';c.tags.forEach(function(tid){var t=TAGS.find(function(x){return x.id===tid});if(t)tags+='<span class="tag '+t.cls+'">'+t.name+'</span>';});
    h+='<tr class="'+cc+'">';
    h+='<td>'+fb+'</td>';
    h+='<td><span class="lvl lvl-'+c.lv+'">'+c.lv+'</span></td>';
    h+='<td><span style="display:inline-block;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:600;background:'+c.ctColor+'22;color:'+c.ctColor+';">'+c.ctName+'</span></td>';
    h+='<td><div style="font-weight:500">'+c.name+'</div><div style="font-size:10px;color:var(--text3)">注册:'+c.regDate+'</div></td>';
    h+='<td style="color:var(--text2);font-size:11px">'+c.mid+'</td>';
    h+='<td style="color:var(--text2);font-size:11px">'+c.cid+'</td>';
    h+='<td><div style="color:var(--blue)">'+c.wname+'</div></td>';
    h+='<td style="font-size:12px">'+c.reg+'</td>';
    h+='<td style="font-size:11px;color:var(--text2)">'+c.dept+'</td>';
    h+='<td>'+tags+'</td>';
    h+='<td style="color:'+(c.lc>60?'var(--red)':c.lc>30?'var(--amber)':'var(--text)')+'">'+c.lc+'天前</td>';
    h+='<td'+(c.ta>0?' style="color:var(--green);font-weight:600"':'')+'>'+(c.ta>0?'¥'+c.ta.toLocaleString():'-')+'</td>';
    h+='<td>'+c.ltd+'</td></tr>';
  });
  return h;
}

function iS(){
  var c12=echarts.init(document.getElementById('c12'));CH.c12=c12;
  var ctData=CTYPES.map(function(ct){return{name:ct.name,value:allC.filter(function(c){return c.ct===ct.id}).length,itemStyle:{color:ct.color}}});
  c12.setOption({tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},legend:{orient:'vertical',right:8,top:'center',textStyle:{color:'#8b92a5',fontSize:11}},series:[{type:'pie',radius:['38%','68%'],center:['35%','50%'],label:{show:true,color:'#e4e6eb',fontSize:11,formatter:'{b}\n{c}人'},data:ctData}]});

  var c7=echarts.init(document.getElementById('c7'));CH.c7=c7;
  var tagMap={};TAGS.forEach(function(t){tagMap[t.id]={name:t.name,count:0,traded:0}});
  allC.forEach(function(c){c.tags.forEach(function(tid){if(tagMap[tid]){tagMap[tid].count++;if(c.ht)tagMap[tid].traded++}})});
  c7.setOption({tooltip:{trigger:'axis',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb',fontSize:12}},legend:{data:['打标客户','已交易','转化率'],textStyle:{color:'#8b92a5',fontSize:11},top:0},grid:{left:50,right:50,top:35,bottom:25},xAxis:{type:'category',data:TAGS.map(function(t){return t.name}),axisLine:{lineStyle:{color:'#252a3a'}},axisLabel:{color:'#8b92a5',fontSize:11}},yAxis:[{type:'value',axisLabel:{color:'#8b92a5'},splitLine:{lineStyle:{color:'#252a3a'}}},{type:'value',axisLabel:{color:'#8b92a5',formatter:'{value}%'},splitLine:{show:false},max:100}],series:[{name:'打标客户',type:'bar',barWidth:20,data:TAGS.map(function(t){return tagMap[t.id].count}),itemStyle:{color:'#5b9cf6',borderRadius:[3,3,0,0]}},{name:'已交易',type:'bar',barWidth:20,data:TAGS.map(function(t){return tagMap[t.id].traded}),itemStyle:{color:'#2dd4a0',borderRadius:[3,3,0,0]}},{name:'转化率',type:'line',yAxisIndex:1,data:TAGS.map(function(t){return tagMap[t.id].count>0?+(tagMap[t.id].traded/tagMap[t.id].count*100).toFixed(1):0}),itemStyle:{color:'#f5b731'},lineStyle:{width:2},symbol:'circle',symbolSize:6}]});
}

function applyFilters(){
  var filtered=allC;
  if(cTF)filtered=filtered.filter(function(c){return c.tags.indexOf(cTF)!==-1});
  if(cLV)filtered=filtered.filter(function(c){return c.lv===cLV});
  if(cCT)filtered=filtered.filter(function(c){return c.ct===cCT});
  document.getElementById('cb').innerHTML=renderCustRows(filtered);
}

function filterTag(tid){
  cTF=tid;
  var allBtn=document.getElementById('ftag-all');
  document.querySelectorAll('[id^="ftag-"]').forEach(function(b){b.classList.remove('on')});
  if(!tid)allBtn.classList.add('on');
  else{var btn=document.getElementById('ftag-'+tid);if(btn)btn.classList.add('on');}
  applyFilters();
}

function filterLv(lv){
  cLV=lv;
  var allBtn=document.getElementById('flv-all');
  document.querySelectorAll('[id^="flv-"]').forEach(function(b){b.classList.remove('on')});
  if(!lv)allBtn.classList.add('on');
  else{var btn=document.getElementById('flv-'+lv);if(btn)btn.classList.add('on');}
  applyFilters();
}

function filterCt(ct){
  cCT=ct;
  var allBtn=document.getElementById('fct-all');
  document.querySelectorAll('[id^="fct-"]').forEach(function(b){b.classList.remove('on')});
  if(!ct)allBtn.classList.add('on');
  else{var btn=document.getElementById('fct-'+ct);if(btn)btn.classList.add('on');}
  applyFilters();
}

render();

window.addEventListener('resize',function(){
  Object.values(CH).forEach(function(c){try{c.resize()}catch(e){}});
});