/* ============================================================
   CODEWAVE — Shared interactions
   ============================================================ */
(function(){
  'use strict';

  /* ---- Nav scroll state ---- */
  const nav = document.querySelector('.nav');
  if(nav){
    const onScroll = ()=> nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=> menu.classList.add('open'));
    menu.querySelectorAll('.close, a').forEach(el=> el.addEventListener('click', ()=> menu.classList.remove('open')));
  }

  /* ---- Scroll reveal + count-up (rect-based, IO-free for robustness) ---- */
  function inView(el, margin){
    const r = el.getBoundingClientRect();
    if(r.width===0 && r.height===0) return false;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh - (margin||40) && r.bottom > 0;
  }

  function fmt(n, dec){ return dec ? n.toFixed(dec) : Math.round(n).toLocaleString('ko-KR'); }
  function runCount(el){
    if(el.dataset.counting) return; el.dataset.counting = '1';
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split('.')[1]||'').length;
    const dur = 1500, start = performance.now();
    const prefix = el.dataset.prefix||'', suffix = el.dataset.suffix||'';
    const finalText = prefix + fmt(target, dec) + suffix;
    (function tick(now){
      const p = Math.min(1,(now-start)/dur);
      const eased = 1 - Math.pow(1-p,3);
      el.textContent = prefix + fmt(target*eased, dec) + suffix;
      if(p<1) requestAnimationFrame(tick);
    })(performance.now());
    // failsafe: guarantee final value even if rAF is throttled/frozen
    setTimeout(()=>{ el.textContent = finalText; }, dur + 120);
  }

  function scan(){
    document.querySelectorAll('[data-reveal]').forEach(el=>{
      if(el.classList.contains('in')) return;
      if(inView(el)){ el.classList.remove('pre'); el.classList.add('in'); }
      else if(!el.dataset.seen){ el.classList.add('pre'); }
      el.dataset.seen = '1';
    });
    document.querySelectorAll('[data-count]:not([data-counting])').forEach(el=>{ if(inView(el,80)) runCount(el); });
  }
  // expose for pages that inject content dynamically
  window.CW = window.CW || {}; window.CW.scan = scan;

  window.addEventListener('scroll', scan, {passive:true});
  window.addEventListener('resize', scan);
  window.addEventListener('load', scan);
  scan();
  // a few delayed passes to catch late layout / fonts / injected nodes
  [120,400,900,1600].forEach(t=> setTimeout(scan, t));

  /* ---- Custom cursor (mouse follow) ---- */
  if(window.matchMedia('(hover:hover)').matches){
    const dot = document.createElement('div'); dot.className='cursor-dot';
    const ring = document.createElement('div'); ring.className='cursor-ring';
    document.body.append(dot, ring);
    let rx=0, ry=0, mx=0, my=0;
    window.addEventListener('mousemove', (e)=>{ mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    function loop(){ rx+=(mx-rx)*0.18; ry+=(my-ry)*0.18; ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); }
    loop();
    document.addEventListener('mouseover', (e)=>{
      if(e.target.closest('a,button,[data-hot]')) ring.classList.add('hot'); else ring.classList.remove('hot');
    });
  }

  /* ---- Magnetic buttons ---- */
  document.querySelectorAll('[data-magnet]').forEach(el=>{
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${x*0.25}px, ${y*0.35}px)`;
    });
    el.addEventListener('mouseleave', ()=> el.style.transform='');
  });

  /* ---- Parallax (data-parallax = speed) ---- */
  const plx = [...document.querySelectorAll('[data-parallax]')];
  if(plx.length){
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY;
      plx.forEach(el=>{ const s = parseFloat(el.dataset.parallax); el.style.transform = `translateY(${y*s}px)`; });
    }, {passive:true});
  }

  /* ---- Tilt cards (data-tilt) ---- */
  document.querySelectorAll('[data-tilt]').forEach(el=>{
    el.addEventListener('mousemove',(e)=>{
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5;
      el.style.transform=`perspective(800px) rotateY(${px*8}deg) rotateX(${-py*8}deg) translateY(-6px)`;
    });
    el.addEventListener('mouseleave',()=> el.style.transform='');
  });

})();
