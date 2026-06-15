/* ============================================================
   CODEWAVE — Theme control: paired color palettes + dark/light
   Injects a control into .nav-cta. Persists to localStorage.
   ============================================================ */
(function(){
  'use strict';
  const THEMES = [
    { id:'',         name:'오션',     c:['#2D5BFF','#14D6D6'] },
    { id:'bluepink', name:'베리',     c:['#3B6BFF','#FF5DA2'] },
    { id:'sunset',   name:'선셋',     c:['#FF4D4D','#FFC53D'] },
    { id:'forest',   name:'포레스트', c:['#12B886','#C8FF3D'] },
    { id:'grape',    name:'그레이프', c:['#7B40F2','#FF5DA2'] },
    { id:'coral',    name:'코럴',     c:['#FF7A3D','#19C8C8'] },
  ];
  const root = document.documentElement;
  const getTheme = ()=> localStorage.getItem('cw-theme') || '';
  const getMode  = ()=> localStorage.getItem('cw-mode')  || 'light';

  function applyTheme(id){
    if(id) root.dataset.theme = id; else root.removeAttribute('data-theme');
    localStorage.setItem('cw-theme', id);
  }
  function applyMode(m){
    if(m==='dark') root.dataset.mode = 'dark'; else root.removeAttribute('data-mode');
    localStorage.setItem('cw-mode', m);
  }
  // apply persisted (FOUC guard also runs inline in <head>)
  applyTheme(getTheme()); applyMode(getMode());

  function build(){
    const cta = document.querySelector('.nav-cta');
    if(!cta) return;
    const cur = THEMES.find(t=>t.id===getTheme()) || THEMES[0];

    const ctrl = document.createElement('div');
    ctrl.className = 'theme-ctrl';
    ctrl.innerHTML = `
      <button class="tc-btn" id="tc-palette" data-magnet aria-label="컬러 테마">
        <span class="tc-swatch" id="tc-cur" style="background:linear-gradient(135deg,${cur.c[0]},${cur.c[1]})"></span>
        <svg class="cv" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <button class="tc-btn icon" id="tc-mode" data-magnet aria-label="다크/라이트 모드"></button>
      <div class="tc-pop" id="tc-pop">
        <div class="ph">컬러 팔레트</div>
        ${THEMES.map(t=>`<div class="tc-opt ${t.id===getTheme()?'on':''}" data-t="${t.id}">
          <span class="pair"><span style="background:${t.c[0]}"></span><span style="background:${t.c[1]}"></span></span>
          <span class="nm">${t.name}</span>
          <svg class="ck" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M20 6L9 17l-5-5"/></svg>
        </div>`).join('')}
      </div>`;
    // insert as the first item in nav-cta
    cta.insertBefore(ctrl, cta.firstChild);

    const sun = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>';
    const moon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"/></svg>';
    const modeBtn = ctrl.querySelector('#tc-mode');
    const setModeIcon = ()=> modeBtn.innerHTML = getMode()==='dark' ? sun : moon;
    setModeIcon();

    const pop = ctrl.querySelector('#tc-pop');
    const palBtn = ctrl.querySelector('#tc-palette');
    function togglePop(open){
      pop.classList.toggle('open', open);
      palBtn.classList.toggle('open', open);
    }
    palBtn.addEventListener('click',(e)=>{ e.stopPropagation(); togglePop(!pop.classList.contains('open')); });
    document.addEventListener('click',(e)=>{ if(!ctrl.contains(e.target)) togglePop(false); });

    pop.addEventListener('click',(e)=>{
      const opt = e.target.closest('.tc-opt'); if(!opt) return;
      const id = opt.dataset.t;
      applyTheme(id);
      pop.querySelectorAll('.tc-opt').forEach(o=>o.classList.toggle('on', o===opt));
      const t = THEMES.find(x=>x.id===id) || THEMES[0];
      ctrl.querySelector('#tc-cur').style.background = `linear-gradient(135deg,${t.c[0]},${t.c[1]})`;
      togglePop(false);
    });

    modeBtn.addEventListener('click',()=>{
      applyMode(getMode()==='dark' ? 'light' : 'dark');
      setModeIcon();
    });
  }

  if(document.querySelector('.nav-cta')) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
