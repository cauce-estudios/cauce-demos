(function(){
function css(el,o){for(var k in o)el.style[k]=o[k];}
function pinta(b,on){css(b,{border:'1px solid '+(on?'#C9A05A':'rgba(239,230,213,.28)'),background:on?'rgba(201,160,90,.14)':'transparent',color:'#EFE6D5',textAlign:'left',padding:'13px 15px',cursor:'pointer',display:'grid',gap:'4px',font:'inherit'});
var t=b.querySelector('b'),sm=b.querySelector('small');if(t)css(t,{fontSize:'14px',fontWeight:'600'});if(sm)css(sm,{fontFamily:"'JetBrains Mono',monospace",fontSize:'10px',color:'rgba(239,230,213,.55)',letterSpacing:'.02em'});}
function init(){var root=document.getElementById('calculadora');if(!root||root.__ok)return;root.__ok=1;
var tipos=root.querySelector('[data-calc-tipos]'),acab=root.querySelector('[data-calc-acab]'),m2=root.querySelector('[data-calc-m2]'),m2o=root.querySelector('[data-calc-m2o]');
var clon=m2.cloneNode(true);clon.value=m2.getAttribute('value')||m2.value||'110';m2.parentNode.replaceChild(clon,m2);m2=clon;
var rP=root.querySelector('[data-calc-precio]'),rM=root.querySelector('[data-calc-m2p]'),rZ=root.querySelector('[data-calc-plazo]');
function sel(g){return g.querySelector('[aria-pressed="true"]')||g.querySelector('button');}
function eur(n){return (Math.round(n/500)*500).toLocaleString('es-ES')+' €';}
function calc(){var t=sel(tipos),a=sel(acab);if(!t||!a)return;var f=parseFloat(a.getAttribute('data-f')),m=parseInt(m2.value,10);m2o.textContent=m+' m²';
var mn=parseFloat(t.getAttribute('data-min'))*f,mx=parseFloat(t.getAttribute('data-max'))*f,pl=(t.getAttribute('data-plazo')||'12-16').split('-'),ex=Math.max(0,Math.round((m-80)/40));
rP.textContent=eur(mn*m)+' – '+eur(mx*m);rM.textContent=Math.round(mn).toLocaleString('es-ES')+' – '+Math.round(mx).toLocaleString('es-ES')+' €';rZ.textContent=(parseInt(pl[0],10)+ex)+' – '+(parseInt(pl[1],10)+ex)+' sem.';}
function grupo(g,cb){var bs=[].slice.call(g.querySelectorAll('button'));bs.forEach(function(b){pinta(b,b.getAttribute('aria-pressed')==='true');});
g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;bs.forEach(function(x){var on=x===b;x.setAttribute('aria-pressed',on?'true':'false');pinta(x,on);});cb&&cb(b);calc();});}
grupo(tipos,function(b){var v=b.getAttribute('data-m2');if(v)m2.value=v;});grupo(acab);m2.addEventListener('input',calc);calc();}
init();new MutationObserver(init).observe(document.documentElement,{childList:true,subtree:true});
})();