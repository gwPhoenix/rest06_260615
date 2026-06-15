/* ============================================================
   CODEWAVE — Shared dummy data + renderers
   ============================================================ */

const GRADS = {
  wave:  'linear-gradient(135deg,var(--blue),var(--cyan))',
  purp:  'linear-gradient(135deg,var(--purple),var(--blue))',
  ink:   'linear-gradient(135deg,var(--ink),var(--blue-deep))',
  lime:  'linear-gradient(135deg,var(--cyan),var(--lime))',
  pink:  'linear-gradient(135deg,var(--purple),var(--pink))',
  cyan:  'linear-gradient(135deg,var(--cyan),var(--blue))',
};

const COURSES = [
  { id:'fe',  cat:'코딩', title:'프론트엔드 개발 부트캠프', sub:'React · TypeScript · Next.js', level:'입문→실무', weeks:24, lessons:148, rating:4.9, students:8200, price:790000, was:1290000, grad:GRADS.wave, icon:'&lt;/&gt;', best:true, tagClass:'chip-lime', tag:'BEST' },
  { id:'ai',  cat:'코딩', title:'AI · 데이터 사이언스', sub:'Python · 머신러닝 · LLM', level:'초중급', weeks:20, lessons:132, rating:4.8, students:5400, price:890000, was:1390000, grad:GRADS.purp, icon:'🤖', tagClass:'chip-purple', tag:'HOT' },
  { id:'jeongcheo', cat:'자격증', title:'정보처리기사 완성반', sub:'필기+실기 한 번에 합격', level:'자격증', weeks:12, lessons:96, rating:4.9, students:11200, price:240000, was:390000, grad:GRADS.cyan, icon:'✓', tagClass:'chip-cyan', tag:'합격보장' },
  { id:'be',  cat:'코딩', title:'백엔드 개발 마스터', sub:'Java · Spring · 클라우드', level:'중급', weeks:22, lessons:140, rating:4.8, students:4100, price:850000, was:1290000, grad:GRADS.ink, icon:'⚙', tagClass:'chip-blue', tag:'NEW' },
  { id:'sqld', cat:'자격증', title:'SQLD 단기 합격반', sub:'데이터 모델링 · SQL 활용', level:'자격증', weeks:6, lessons:48, rating:4.7, students:6800, price:180000, was:290000, grad:GRADS.wave, icon:'🗄', tagClass:'chip-cyan', tag:'합격보장' },
  { id:'excel', cat:'컴퓨터활용', title:'실무 엑셀 & 데이터 분석', sub:'함수 · 피벗 · 대시보드 · 자동화', level:'입문', weeks:8, lessons:64, rating:4.9, students:9300, price:150000, was:240000, grad:GRADS.lime, icon:'📊', tagClass:'chip-lime', tag:'BEST' },
  { id:'comphwal', cat:'컴퓨터활용', title:'컴퓨터활용능력 1급', sub:'필기+실기 자격증 완전정복', level:'자격증', weeks:8, lessons:72, rating:4.8, students:7600, price:130000, was:220000, grad:GRADS.cyan, icon:'⌨', tagClass:'chip-cyan', tag:'합격보장' },
  { id:'cloud', cat:'코딩', title:'클라우드 & DevOps', sub:'AWS · Docker · CI/CD', level:'중상급', weeks:16, lessons:104, rating:4.7, students:2900, price:790000, was:1190000, grad:GRADS.purp, icon:'☁', tagClass:'chip-purple', tag:'심화' },
  { id:'ux', cat:'코딩', title:'UX 엔지니어링', sub:'디자인 시스템 · 인터랙션', level:'중급', weeks:14, lessons:88, rating:4.8, students:3300, price:690000, was:990000, grad:GRADS.pink, icon:'✦', tagClass:'chip-purple', tag:'NEW' },
];

const INSTRUCTORS = [
  { initial:'KM', name:'김민준', role:'前 네이버 시니어 프론트엔드', grad:GRADS.wave, courses:'프론트엔드 · React', exp:'13년차', students:'12,400+' },
  { initial:'LS', name:'이서연', role:'前 카카오 AI 리서처', grad:GRADS.purp, courses:'AI · 데이터', exp:'10년차', students:'7,800+' },
  { initial:'PJ', name:'박지호', role:'정보처리기사 전문 강사', grad:GRADS.cyan, courses:'자격증 트랙', exp:'15년차', students:'21,000+' },
  { initial:'CH', name:'최하은', role:'前 토스 백엔드 리드', grad:GRADS.ink, courses:'백엔드 · 클라우드', exp:'11년차', students:'6,200+' },
  { initial:'JW', name:'정우진', role:'데이터 분석 컨설턴트', grad:GRADS.lime, courses:'엑셀 · 데이터', exp:'9년차', students:'15,300+' },
  { initial:'HY', name:'한예린', role:'프로덕트 디자이너 · UX엔지니어', grad:GRADS.pink, courses:'UX 엔지니어링', exp:'8년차', students:'4,100+' },
  { initial:'SD', name:'서도윤', role:'前 라인 DevOps 엔지니어', grad:GRADS.cyan, courses:'클라우드 · DevOps', exp:'12년차', students:'3,500+' },
  { initial:'OY', name:'오유나', role:'컴활 만점 강사', grad:GRADS.wave, courses:'컴퓨터 활용', exp:'10년차', students:'18,700+' },
];

const REVIEWS = [
  { initial:'정', name:'정O민', course:'프론트엔드 부트캠프 수료', grad:GRADS.wave, text:'비전공 문과생이었는데 6개월 만에 스타트업 프론트 개발자로 취업했어요. 코드 리뷰가 정말 디테일했습니다.', rating:5, job:'프론트엔드 개발자 합격' },
  { initial:'김', name:'김O서', course:'정보처리기사 완성반', grad:GRADS.cyan, text:'독학으로 두 번 떨어졌는데 여기서 한 번에 합격했습니다. 실기 대비 자료가 진짜 알찼어요.', rating:5, job:'정보처리기사 합격' },
  { initial:'이', name:'이O준', course:'AI · 데이터 사이언스', grad:GRADS.purp, text:'현업에서 바로 쓰는 LLM 프로젝트까지 다뤄서 포트폴리오가 탄탄해졌어요. 멘토님 피드백 최고.', rating:5, job:'데이터 분석가 이직' },
  { initial:'박', name:'박O영', course:'실무 엑셀 & 데이터 분석', grad:GRADS.lime, text:'회사에서 반나절 걸리던 보고서를 30분에 끝냅니다. 자동화 파트는 돈 값 그 이상.', rating:5, job:'직무 역량 강화' },
  { initial:'최', name:'최O호', course:'백엔드 개발 마스터', grad:GRADS.ink, text:'Spring을 제대로 이해하게 됐어요. 실시간 질문 답변이 빨라서 막힘 없이 진도 나갔습니다.', rating:5, job:'백엔드 개발자 합격' },
  { initial:'한', name:'한O지', course:'컴퓨터활용능력 1급', grad:GRADS.cyan, text:'직장 다니면서 8주 만에 1급 땄어요. 짧고 굵은 커리큘럼이 직장인에게 딱.', rating:5, job:'컴활 1급 합격' },
];

function won(n){ return n.toLocaleString('ko-KR') + '원'; }

function courseCardHTML(c){
  return `<a href="course.html?id=${c.id}" class="card course-card" data-reveal>
    <div class="thumb" style="background:${c.grad};display:flex;align-items:center;justify-content:center">
      <span class="tag chip ${c.tagClass}">${c.tag}</span>
      <span style="font-family:var(--display);font-weight:700;font-size:72px;color:rgba(255,255,255,.92);line-height:1">${c.icon}</span>
    </div>
    <div class="body">
      <div class="pillrow" style="margin-bottom:12px"><span class="chip">${c.cat}</span><span class="chip">${c.level}</span></div>
      <h3>${c.title}</h3>
      <p style="color:var(--txt-2);font-size:14.5px;margin:8px 0 0">${c.sub}</p>
      <div class="meta"><span>★ ${c.rating}</span><span>·</span><span>수강생 ${c.students.toLocaleString('ko-KR')}</span><span>·</span><span>${c.lessons}강</span></div>
      <div class="price"><span class="now">${won(c.price)}</span><span class="was">${won(c.was)}</span></div>
    </div>
  </a>`;
}
