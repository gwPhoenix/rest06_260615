/* ============================================================
   CODEWAVE — Shared chrome (nav + mobile menu + footer)
   Usage: <body data-page="courses"> ... <script src="assets/chrome.js"></script>
   Inserts nav at top of body, footer at end.
   ============================================================ */
(function(){
  const page = document.body.dataset.page || '';
  const links = [
    ['courses.html','코스','courses'],
    ['instructors.html','강사','instructors'],
    ['reviews.html','수강후기','reviews'],
    ['about.html','회사소개','about'],
  ];
  const navLinks = links.map(([h,t,k])=>`<a href="${h}" class="${k===page?'active':''}">${t}</a>`).join('');
  const mobLinks = links.map(([h,t])=>`<a href="${h}">${t}</a>`).join('');

  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `<div class="wrap">
    <a href="index.html" class="logo"><span class="mark"></span>CODEWAVE</a>
    <div class="nav-links">${navLinks}</div>
    <div class="nav-cta">
      <a href="#" class="btn-ghost btn" style="padding:11px 20px;font-size:14.5px;">로그인</a>
      <a href="courses.html" class="btn btn-accent" data-magnet style="padding:11px 22px;font-size:14.5px;">무료 체험</a>
      <button class="nav-toggle"><span></span><span></span><span></span></button>
    </div>
  </div>`;

  const mob = document.createElement('div');
  mob.className = 'mobile-menu';
  mob.innerHTML = `<button class="close">✕</button>${mobLinks}<a href="courses.html" style="color:var(--lime)">무료 체험 →</a>`;

  document.body.prepend(mob);
  document.body.prepend(nav);
  if(document.body.dataset.navdark) nav.classList.add('on-dark');

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `<div class="wrap">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="logo" style="color:#fff;margin-bottom:18px"><span class="mark"></span>CODEWAVE</a>
        <p style="color:rgba(255,255,255,.6);max-width:300px;font-size:15px">코드가 무기가 되는 곳. 코딩·자격증·컴퓨터 활용 교육의 새로운 기준.</p>
      </div>
      <div class="footer-col"><h5>코스</h5><ul><li><a href="courses.html">코딩 부트캠프</a></li><li><a href="courses.html">국가 자격증</a></li><li><a href="courses.html">컴퓨터 활용</a></li><li><a href="courses.html">AI · 데이터</a></li></ul></div>
      <div class="footer-col"><h5>회사</h5><ul><li><a href="about.html">회사 소개</a></li><li><a href="instructors.html">강사진</a></li><li><a href="reviews.html">수강 후기</a></li><li><a href="#">채용</a></li></ul></div>
      <div class="footer-col"><h5>고객지원</h5><ul><li><a href="#">자주 묻는 질문</a></li><li><a href="#">1:1 문의</a></li><li><a href="#">이용약관</a></li><li><a href="#">개인정보처리방침</a></li></ul></div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 CODEWAVE Inc. 가상의 교육 브랜드 데모입니다.</span>
      <span>서울특별시 강남구 테헤란로 · help@codewave.kr</span>
    </div>
  </div>`;
  document.body.appendChild(footer);
})();
