// ========== DATA ==========
var COLORS={华东:'#5b9cf6',华南:'#2dd4a0',西南:'#f5b731',华北:'#a78bfa'};
var AC=['#5b9cf6','#2dd4a0','#f5b731','#a78bfa','#fb923c','#f472b6','#c8956c','#93c5fd'];
var TAGS=[
  {id:'nature',name:'自然风光'},{id:'culture',name:'人文历史'},
  {id:'luxury',name:'奢享度假'},{id:'family',name:'亲子出行'},
  {id:'food',name:'美食体验'},{id:'hike',name:'户外徒步'},
  {id:'photo',name:'摄影采风'},{id:'snow',name:'雪山温泉'}
];
var TCLR={nature:'#2dd4a0',culture:'#f5b731',luxury:'#e8b88a',family:'#5b9cf6',food:'#f472b6',hike:'#a78bfa',photo:'#fb923c',snow:'#93c5fd'};

var SALES={
  '华北':[
    {name:'赵岍',total:245,linked:198,tagged:138,traded:48,claimed:220,claimRate:90.0},
    {name:'李海燕',total:380,linked:308,tagged:215,traded:72,claimed:350,claimRate:88.0},
    {name:'张嵩',total:345,linked:278,tagged:195,traded:65,claimed:320,claimRate:86.9},
    {name:'张曌依',total:412,linked:332,tagged:232,traded:78,claimed:380,claimRate:87.4},
    {name:'朱伯英',total:298,linked:242,tagged:168,traded:56,claimed:275,claimRate:88.0},
    {name:'朱雨',total:265,linked:215,tagged:150,traded:50,claimed:245,claimRate:87.8},
    {name:'张小芽',total:225,linked:182,tagged:128,traded:42,claimed:205,claimRate:88.8}
  ],
  '华南':[
    {name:'廖文娟',total:312,linked:252,tagged:176,traded:58,claimed:285,claimRate:88.4},
    {name:'张金鸿',total:278,linked:225,tagged:158,traded:52,claimed:255,claimRate:88.2},
    {name:'苏凝影',total:248,linked:200,tagged:140,traded:46,claimed:228,claimRate:87.7},
    {name:'屈婉祺',total:432,linked:356,tagged:245,traded:82,claimed:398,claimRate:92.1},
    {name:'梁爱平',total:362,linked:298,tagged:210,traded:70,claimed:335,claimRate:87.4},
    {name:'程凡凡',total:215,linked:174,tagged:122,traded:40,claimed:198,claimRate:88.4},
    {name:'李可韵',total:198,linked:160,tagged:112,traded:36,claimed:182,claimRate:88.9}
  ],
  '西南':[
    {name:'郭梦婕',total:285,linked:232,tagged:162,traded:54,claimed:262,claimRate:91.9},
    {name:'曾卓',total:258,linked:208,tagged:145,traded:48,claimed:238,claimRate:88.2},
    {name:'郑文婷',total:325,linked:262,tagged:182,traded:60,claimed:300,claimRate:87.7},
    {name:'王静宜',total:298,linked:240,tagged:168,traded:55,claimed:275,claimRate:88.3},
    {name:'候晓东',total:232,linked:188,tagged:130,traded:43,claimed:214,claimRate:88.9}
  ],
  '华东':[
    {name:'杨慧中',total:352,linked:298,tagged:205,traded:72,claimed:325,claimRate:88.9},
    {name:'王倩',total:312,linked:252,tagged:176,traded:58,claimed:288,claimRate:87.5},
    {name:'王翊',total:278,linked:225,tagged:158,traded:52,claimed:256,claimRate:87.7},
    {name:'曹晓昕',total:245,linked:198,tagged:138,traded:45,claimed:225,claimRate:88.0},
    {name:'杨爱民',total:328,linked:265,tagged:185,traded:61,claimed:302,claimRate:87.8},
    {name:'刘娜',total:298,linked:240,tagged:168,traded:55,claimed:275,claimRate:87.6},
    {name:'杨洁',total:265,linked:215,tagged:150,traded:50,claimed:244,claimRate:88.1},
    {name:'张乙山',total:225,linked:182,tagged:128,traded:42,claimed:207,claimRate:88.8},
    {name:'李梦蝶',total:198,linked:160,tagged:112,traded:36,claimed:182,claimRate:88.9}
  ]
};

var REGIONS=Object.keys(SALES).map(function(r){
  var s=SALES[r],t=0,l=0,tg=0,td=0,tc=0;
  s.forEach(function(x){t+=x.total;l+=x.linked;tg+=x.tagged;td+=x.traded;tc+=x.claimed});
  return{name:r,total:t,linked:l,linkedRate:+(l/t*100).toFixed(1),tagged:tg,traded:td,claimed:tc,claimRate:+(tc/t*100).toFixed(1),claimTarget:Math.round(t*0.92),maintain:Math.round(l*0.72),maintainRate:72.0};
});

// 客户类型
var CTYPES=[
  {id:'vip',name:'VIP客户',color:'#c8956c'},
  {id:'key',name:'重点客户',color:'#f5b731'},
  {id:'active',name:'活跃客户',color:'#5b9cf6'},
  {id:'normal',name:'普通客户',color:'#2dd4a0'},
  {id:'dormant',name:'沉睡客户',color:'#8b92a5'}
];
var CT={
  '华北':{vip:245,key:528,active:1245,normal:892,dormant:856},
  '华南':{vip:312,key:486,active:1156,normal:924,dormant:768},
  '西南':{vip:186,key:412,active:896,normal:645,dormant:521},
  '华东':{vip:225,key:382,active:1028,normal:756,dormant:589}
};

// 当年新增（品牌交叉/在店增长）
var NEW_CUST={target:5800,actual:6245,cross:{target:3200,actual:3456},store:{target:2600,actual:2789}};

// ========== STATE ==========
var CV='overview',SR=null,SS=null,CH={},allC=[],cTF=null,cLV=null,cCT=null;

// ========== HELPERS ==========
function esc(s){return s.replace(/'/g,"\\'")}
function lr(s){return +(s.linked/s.total*100).toFixed(1)}
function pr(s){return +(s.tagged/s.linked*100).toFixed(1)}
function trr(s){return +(s.traded/s.tagged*100).toFixed(1)}
function kpi(label,val,sub,vc){return '<div class="kpi"><div class="kpi-l">'+label+'</div><div class="kpi-v"'+(vc?' style="color:'+vc+'"':'')+'>'+val+'</div>'+(sub?'<div class="kpi-s">'+sub+'</div>':'')+'</div>';}

function srand(s){return function(){s=Math.sin(s)*10000;return s-Math.floor(s)}}

function genCust(sn){
  var seed=0;for(var i=0;i<sn.length;i++)seed+=sn.charCodeAt(i);
  var rng=srand(seed),count=12+Math.floor(rng()*8);
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
    var mid='0000'+String(Math.floor(rng()*10000000000000));mid=mid.slice(-20);
    var cid='ST'+String(Math.floor(10000000000+rng()*90000000000));
    var wname=sn+'-'+nm;
    var y=2019+Math.floor(rng()*7);var mo=String(Math.floor(rng()*12)+1);if(mo.length<2)mo='0'+mo;
    var da=String(Math.floor(rng()*28)+1);if(da.length<2)da='0'+da;
    var regDate=y+'-'+mo+'-'+da;
    var ctype=rng()>.85?'vip':rng()>.7?'key':rng()>.5?'active':rng()>.3?'normal':'dormant';
    var ctypeInfo=CTYPES.find(function(t){return t.id===ctype});
    cs.push({name:nm,ct:ctype,ctName:ctypeInfo.name,ctColor:ctypeInfo.color,mid:mid,cid:cid,wname:wname,reg:reg,regDate:regDate,tags:tags,lc:lc,ht:ht,ta:ta,fs:fs,lv:lv,ltd:ht?('2026-'+m+'-'+d):'-'});
  }
  var fo={urgent:0,soon:1,ok:2};
  cs.sort(function(a,b){return fo[a.fs]-fo[b.fs]||b.ta-a.ta});
  return cs;
}

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
  var tm=0,tl=0,tt=0,td=0;
  REGIONS.forEach(function(r){tm+=r.total;tl+=r.linked;tt+=r.tagged;td+=r.traded});
  var coreTotal=Math.round(tm*0.42);
  var nonCoreTotal=tm-coreTotal;

  // KPI 总览
  var h='<div class="kpis fi">';
  h+=kpi('总会员数',tm.toLocaleString(),'↑ 2.1% 较上月','#5b9cf6');
  h+=kpi('建联客户数',tl.toLocaleString(),'建联率 '+(tl/tm*100).toFixed(1)+'%','#2dd4a0');
  h+=kpi('当年新增会员',NEW_CUST.actual.toLocaleString(),'完成率 '+(NEW_CUST.actual/NEW_CUST.target*100).toFixed(1)+'%','#f5b731');
  h+=kpi('核心老客',coreTotal.toLocaleString(),'占总会员 '+(coreTotal/tm*100).toFixed(1)+'%','#c8956c');
  h+=kpi('当年交易',td.toLocaleString(),'打标→交易 '+(td/tt*100).toFixed(1)+'%','#a78bfa');
  h+='</div>';

  // 表1：当年新增明细
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">当年新增明细</div></div>';
  h+='<div class="sec-b"><div class="tw">';
  h+='<table><thead><tr><th>渠道</th><th>目标（人）</th><th>实际（人）</th><th>完成率</th><th>完成情况</th></tr></thead><tbody>';
  h+='<tr><td>品牌交叉</td><td>'+NEW_CUST.cross.target.toLocaleString()+'</td><td>'+NEW_CUST.cross.actual.toLocaleString()+'</td><td>'+(NEW_CUST.cross.actual/NEW_CUST.cross.target*100).toFixed(1)+'%</td><td><span class="ok-tag">已完成</span></td></tr>';
  h+='<tr><td>在店增长</td><td>'+NEW_CUST.store.target.toLocaleString()+'</td><td>'+NEW_CUST.store.actual.toLocaleString()+'</td><td>'+(NEW_CUST.store.actual/NEW_CUST.store.target*100).toFixed(1)+'%</td><td><span class="ok-tag">已完成</span></td></tr>';
  h+='<tr class="total-row"><td>合计</td><td>'+NEW_CUST.target.toLocaleString()+'</td><td>'+NEW_CUST.actual.toLocaleString()+'</td><td>'+(NEW_CUST.actual/NEW_CUST.target*100).toFixed(1)+'%</td><td></td></tr>';
  h+='</tbody></table></div></div></div>';

  // 表2：核心老客-预警（四大区认领+建联）
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">核心老客 - 认领与建联预警</div>';
  h+='<div style="font-size:11px;color:var(--amber);background:var(--amber-bg);padding:3px 10px;border-radius:4px;border:1px solid rgba(245,183,49,.2)">⚠️ 预警：建联率 &lt;90% / 认领 &lt;90%</div>';
  h+='</div>';
  h+='<div class="sec-b"><div class="tw">';
  h+='<table><thead><tr><th>大区</th><th>会员数</th><th>认领目标</th><th>认领完成</th><th>认领完成率</th><th>已建联</th><th>建联率</th><th>预警</th></tr></thead><tbody>';
  REGIONS.forEach(function(r){
    var warn=r.linkedRate<90?'⚠️ 建联':'认领<'+r.claimRate+'%':'';
    var warn2=r.claimRate<90?'⚠️ 认领':'';
    var rowWarn=warn||warn2;
    h+='<tr class="ck" onclick="goRegion(\''+esc(r.name)+'\')"'+(rowWarn?' style="background:rgba(245,183,49,.04)"':'')+'>';
    h+='<td><span class="rname" style="color:'+COLORS[r.name]+'">'+r.name+'</span></td>';
    h+='<td>'+r.total.toLocaleString()+'</td>';
    h+='<td>'+r.claimTarget.toLocaleString()+'</td>';
    h+='<td>'+r.claimed.toLocaleString()+'</td>';
    h+='<td'+(r.claimRate<90?' style="color:var(--amber)"':'')+'>'+r.claimRate+'%</td>';
    h+='<td>'+r.linked.toLocaleString()+'</td>';
    h+='<td'+(r.linkedRate<90?' style="color:var(--amber)"':'')+'>'+r.linkedRate+'%</td>';
    h+='<td>'+(rowWarn?'<span style="color:var(--amber);font-size:12px">'+rowWarn+'</span>':'-')+'</td>';
    h+='</tr>';
  });
  h+='</tbody></table></div></div></div>';

  // 表3：各大区资产汇总
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">各大区资产汇总</div></div>';
  h+='<div class="sec-b"><div class="tw">';
  h+='<table><thead><tr><th>大区</th><th>会员总数</th><th>建联客户</th><th>建联率</th><th>已打标</th><th>已交易</th><th>打标→交易</th><th>查看详情</th></tr></thead><tbody>';
  REGIONS.forEach(function(r){
    h+='<tr class="ck" onclick="goRegion(\''+esc(r.name)+'\')">';
    h+='<td><span class="rname" style="color:'+COLORS[r.name]+'">'+r.name+'</span></td>';
    h+='<td>'+r.total.toLocaleString()+'</td>';
    h+='<td>'+r.linked.toLocaleString()+'</td>';
    h+='<td>'+r.linkedRate+'%</td>';
    h+='<td>'+r.tagged.toLocaleString()+'</td>';
    h+='<td>'+r.traded.toLocaleString()+'</td>';
    h+='<td>'+r.traded+'</td>';
    h+='<td><span class="bbtn">查看 ›</span></td></tr>';
  });
  h+='</tbody></table></div></div></div>';

  // 图表：客户类型饼图（仅1个）
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户类型分布（全部大区）</div></div>';
  h+='<div class="sec-b"><div class="ch" id="c1" style="height:280px"></div></div></div>';

  return h;
}

function iO(){
  var c1=echarts.init(document.getElementById('c1'));CH.c1=c1;
  var ctData=CTYPES.map(function(ct){var total=0;REGIONS.forEach(function(r){total+=CT[r.name][ct.id]});return{name:ct.name,value:total,itemStyle:{color:ct.color}}});
  c1.setOption({
    tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},
    legend:{orient:'vertical',right:10,top:'center',textStyle:{color:'#8b92a5',fontSize:12}},
    series:[{
      type:'pie',radius:['35%','65%'],center:['35%','50%'],
      label:{show:true,color:'#e4e6eb',fontSize:12,formatter:'{b}\n{c}人'},
      data:ctData
    }]
  });
}

// ========== REGION VIEW ==========
function rvR(){
  var r=REGIONS.find(function(x){return x.name===SR}),sales=SALES[SR];
  var h='<div style="margin-bottom:14px"><button class="bbtn" onclick="goOverview()">← 返回全部大区</button></div>';

  var h+='<div class="kpis fi">';
  h+=kpi(SR+'会员总数',r.total.toLocaleString(),'','#5b9cf6');
  h+=kpi('建联客户',r.linked.toLocaleString(),'建联率 '+r.linkedRate+'%','#2dd4a0');
  h+=kpi('已打标',r.tagged.toLocaleString(),'覆盖率 '+(r.tagged/r.linked*100).toFixed(1)+'%','#f5b731');
  h+=kpi('已交易',r.traded.toLocaleString(),'转化率 '+(r.traded/r.tagged*100).toFixed(1)+'%','#c8956c');
  h+='</div>';

  // 核心老客预警（区域维度）
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">核心老客预警</div></div>';
  h+='<div class="sec-b"><div class="tw">';
  h+='<table><thead><tr><th>大区</th><th>认领目标</th><th>认领完成</th><th>认领完成率</th><th>建联率</th><th>维护人数</th><th>维护率</th><th>预警</th></tr></thead><tbody>';
  h+='<tr'+(r.linkedRate<90?' style="background:rgba(245,183,49,.04)"':'')+'>';
  h+='<td><span class="rname" style="color:'+COLORS[r.name]+'">'+r.name+'</span></td>';
  h+='<td>'+r.claimTarget.toLocaleString()+'</td>';
  h+='<td>'+r.claimed.toLocaleString()+'</td>';
  h+='<td'+(r.claimRate<90?' style="color:var(--amber)"':'')+'>'+r.claimRate+'%</td>';
  h+='<td'+(r.linkedRate<90?' style="color:var(--amber)"':'')+'>'+r.linkedRate+'%</td>';
  h+='<td>'+r.maintain.toLocaleString()+'</td>';
  h+='<td>'+r.maintainRate.toFixed(1)+'%</td>';
  h+='<td>'+(r.linkedRate<90||r.claimRate<90?'<span style="color:var(--amber)">⚠️</span>':'-')+'</td></tr>';
  h+='</tbody></table></div></div></div>';

  // 销售员明细表
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">销售员资产明细</div></div>';
  h+='<div class="sec-b"><div class="tw">';
  h+='<table><thead><tr><th>销售员</th><th>客户资产</th><th>认领目标</th><th>认领完成</th><th>认领完成率</th><th>建联客户</th><th>建联率</th><th>已打标</th><th>已交易</th><th></th></tr></thead><tbody>';
  sales.forEach(function(s,i){
    h+='<tr class="ck" onclick="goSales(\''+esc(SR)+'\',\''+esc(s.name)+'\')">';
    h+='<td><div class="sale-name"><div class="sale-av" style="background:'+AC[i%8]+'">'+s.name[0]+'</div>'+s.name+'</div></td>';
    h+='<td>'+s.total.toLocaleString()+'</td>';
    h+='<td>'+Math.round(s.total*0.92)+'</td>';
    h+='<td>'+s.claimed.toLocaleString()+'</td>';
    h+='<td>'+s.claimRate+'%</td>';
    h+='<td>'+s.linked.toLocaleString()+'</td>';
    h+='<td>'+lr(s)+'%</td>';
    h+='<td>'+s.tagged.toLocaleString()+'</td>';
    h+='<td>'+s.traded.toLocaleString()+'</td>';
    h+='<td><span class="bbtn">详情 ›</span></td></tr>';
  });
  h+='</tbody></table></div></div></div>';

  // 客户类型饼图（仅1个）
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户类型分布（'+SR+'）</div></div>';
  h+='<div class="sec-b"><div class="ch" id="c2" style="height:280px"></div></div></div>';

  return h;
}

function iR(){
  var c2=echarts.init(document.getElementById('c2'));CH.c2=c2;
  var ctData=CTYPES.map(function(ct){return{name:ct.name,value:CT[SR][ct.id],itemStyle:{color:ct.color}}});
  c2.setOption({
    tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},
    legend:{orient:'vertical',right:10,top:'center',textStyle:{color:'#8b92a5',fontSize:12}},
    series:[{
      type:'pie',radius:['35%','65%'],center:['35%','50%'],
      label:{show:true,color:'#e4e6eb',fontSize:12,formatter:'{b}\n{c}人'},
      data:ctData
    }]
  });
}

// ========== SALES VIEW ==========
function rvS(){
  var s=SALES[SR].find(function(x){return x.name===SS});
  allC=genCust(SS);
  var urgent=allC.filter(function(c){return c.fs==='urgent'}).length;
  var soon=allC.filter(function(c){return c.fs==='soon'}).length;
  var traded=allC.filter(function(c){return c.ht});
  var totalT=traded.reduce(function(a,c){return a+c.ta},0);
  var lvOrder=['金刚','莲','雪莲','绿绒蒿','格桑'],lvColor={'金刚':'#c8956c','莲':'#5b9cf6','雪莲':'#2dd4a0','绿绒蒿':'#a78bfa','格桑':'#8b92a5'};
  var lvMap={};allC.forEach(function(c){lvMap[c.lv]=(lvMap[c.lv]||0)+1});

  var h='<div style="margin-bottom:14px"><button class="bbtn" onclick="goRegion(\''+esc(SR)+'\')">← 返回'+SR+'</button>';
  h+='<span style="color:var(--text2);font-size:12px;margin-left:8px">'+SS+' 的客户资产</span></div>';

  h+='<div class="kpis fi">';
  h+=kpi('客户资产',s.total.toLocaleString());
  h+=kpi('建联客户',s.linked.toLocaleString(),'建联率 '+lr(s)+'%');
  h+=kpi('已打标',s.tagged.toLocaleString(),'覆盖率 '+pr(s)+'%');
  h+=kpi('已交易',s.traded.toLocaleString(),'转化率 '+trr(s)+'%');
  h+=kpi('交易金额','¥'+(totalT/10000).toFixed(1)+'万');
  h+='</div>';

  if(urgent>0||soon>0){
    h+='<div class="urg-panel fi"><span>⚠️</span><div class="urg-text">需立即跟进 <span class="urg-num">'+urgent+'</span> 人，即将到期 <span class="urg-num">'+soon+'</span> 人</div></div>';
  }

  // 客户类型 + 等级饼图（仅2个）
  h+='<div class="col2 fi">';
  h+='<div class="sec"><div class="sec-h"><div class="sec-t">客户类型分布</div></div><div class="sec-b"><div class="ch" id="c3" style="height:240px"></div></div></div>';
  h+='<div class="sec"><div class="sec-h"><div class="sec-t">客户等级分布</div></div><div class="sec-b"><div class="ch" id="c4" style="height:240px"></div></div></div>';
  h+='</div>';

  // 客户跟进清单
  h+='<div class="sec fi"><div class="sec-h"><div class="sec-t">客户跟进清单</div>';
  h+='<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">';
  h+='<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">';
  h+='<span style="font-size:11px;color:var(--text3)">客户等级:</span>';
  h+='<button class="tf-btn on" id="flv-all" onclick="filterLv(null)">全部</button>';
  lvOrder.forEach(function(lv){h+='<button class="tf-btn" id="flv-'+lv+'" onclick="filterLv(\''+lv+'\')">'+lv+'</button>'});
  h+='</div>';
  h+='<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">';
  h+='<span style="font-size:11px;color:var(--text3)">客户类型:</span>';
  h+='<button class="tf-btn on" id="fct-all" onclick="filterCt(null)">全部</button>';
  CTYPES.forEach(function(ct){h+='<button class="tf-btn" id="fct-'+ct.id+'" onclick="filterCt(\''+ct.id+'\')">'+ct.name+'</button>'});
  h+='</div>';
  h+='<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">';
  h+='<span style="font-size:11px;color:var(--text3)">客户标签:</span>';
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
    var tags='';c.tags.forEach(function(tid){var t=TAGS.find(function(x){return x.id===tid});if(t)tags+='<span class="tag '+t.id+'">'+t.name+'</span>';});
    h+='<tr class="'+cc+'">';
    h+='<td>'+fb+'</td>';
    h+='<td><span class="lvl lvl-'+c.lv+'">'+c.lv+'</span></td>';
    h+='<td><span class="ctag" style="background:'+c.ctColor+'22;color:'+c.ctColor+'">'+c.ctName+'</span></td>';
    h+='<td><div style="font-weight:500">'+c.name+'</div><div style="font-size:10px;color:var(--text3)">注册:'+c.regDate+'</div></td>';
    h+='<td style="color:var(--text2);font-size:11px">'+c.mid+'</td>';
    h+='<td style="color:var(--text2);font-size:11px">'+c.cid+'</td>';
    h+='<td><div style="color:var(--blue)">'+c.wname+'</div></td>';
    h+='<td style="font-size:12px">'+c.reg+'</td>';
    h+='<td style="font-size:11px;color:var(--text2)">高客服务中心</td>';
    h+='<td>'+tags+'</td>';
    h+='<td style="color:'+(c.lc>60?'var(--red)':c.lc>30?'var(--amber)':'var(--text)')+'">'+c.lc+'天前</td>';
    h+='<td'+(c.ta>0?' style="color:var(--green);font-weight:600"':'')+'>'+(c.ta>0?'¥'+c.ta.toLocaleString():'-')+'</td>';
    h+='<td>'+c.ltd+'</td></tr>';
  });
  return h;
}

function iS(){
  var c3=echarts.init(document.getElementById('c3'));CH.c3=c3;
  var ctData=CTYPES.map(function(ct){return{name:ct.name,value:allC.filter(function(c){return c.ct===ct.id}).length,itemStyle:{color:ct.color}}});
  c3.setOption({
    tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},
    legend:{orient:'vertical',right:10,top:'center',textStyle:{color:'#8b92a5',fontSize:12}},
    series:[{type:'pie',radius:['35%','65%'],center:['35%','50%'],label:{show:true,color:'#e4e6eb',fontSize:12,formatter:'{b}\n{c}人'},data:ctData}]
  });

  var lvOrder=['金刚','莲','雪莲','绿绒蒿','格桑'],lvColor={'金刚':'#c8956c','莲':'#5b9cf6','雪莲':'#2dd4a0','绿绒蒿':'#a78bfa','格桑':'#8b92a5'};
  var lvMap={};allC.forEach(function(c){lvMap[c.lv]=(lvMap[c.lv]||0)+1});
  var c4=echarts.init(document.getElementById('c4'));CH.c4=c4;
  c4.setOption({
    tooltip:{trigger:'item',backgroundColor:'#1b1f2c',borderColor:'#252a3a',textStyle:{color:'#e4e6eb'}},
    legend:{orient:'vertical',right:10,top:'center',textStyle:{color:'#8b92a5',fontSize:12}},
    series:[{type:'pie',radius:['35%','65%'],center:['35%','50%'],label:{show:true,color:'#e4e6eb',fontSize:12,formatter:'{b}\n{c}人'},data:lvOrder.map(function(lv){return{name:lv,value:lvMap[lv]||0,itemStyle:{color:lvColor[lv]}}})}]
  });
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
  document.querySelectorAll('[id^="ftag-"]').forEach(function(b){b.classList.remove('on')});
  if(!tid)document.getElementById('ftag-all').classList.add('on');
  else{var btn=document.getElementById('ftag-'+tid);if(btn)btn.classList.add('on');}
  applyFilters();
}

function filterLv(lv){
  cLV=lv;
  document.querySelectorAll('[id^="flv-"]').forEach(function(b){b.classList.remove('on')});
  if(!lv)document.getElementById('flv-all').classList.add('on');
  else{var btn=document.getElementById('flv-'+lv);if(btn)btn.classList.add('on');}
  applyFilters();
}

function filterCt(ct){
  cCT=ct;
  document.querySelectorAll('[id^="fct-"]').forEach(function(b){b.classList.remove('on')});
  if(!ct)document.getElementById('fct-all').classList.add('on');
  else{var btn=document.getElementById('fct-'+ct);if(btn)btn.classList.add('on');}
  applyFilters();
}

render();

window.addEventListener('resize',function(){
  Object.values(CH).forEach(function(c){try{c.resize()}catch(e){}});
});
