import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import CourseCard from '../components/CourseCard'
import InstructorCard from '../components/InstructorCard'
import ReviewCard from '../components/ReviewCard'
import { COURSES, INSTRUCTORS, REVIEWS } from '../data/courses'

const SKILLS = ['React','Python','Spring Boot','TypeScript','AWS','Next.js','Docker','SQL','TensorFlow','Figma','Node.js','Kubernetes','Flutter','GraphQL','Redis']
const FEATURED_COURSES = COURSES.slice(0, 3)
const FEATURED_INSTRUCTORS = INSTRUCTORS.slice(0, 4)
const FEATURED_REVIEWS = REVIEWS.slice(0, 3)

function CountUp({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const target = parseFloat(value)
      const dec = value.toString().includes('.') ? value.toString().split('.')[1].length : 0
      const dur = 1400, start = performance.now()
      const fmt = (n) => dec ? n.toFixed(dec) : Math.round(n).toLocaleString('ko-KR')
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        if (ref.current) ref.current.textContent = prefix + fmt(target * eased) + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      setTimeout(() => { if (ref.current) ref.current.textContent = prefix + fmt(target) + suffix }, dur + 120)
    }, { threshold: 0.5 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, suffix, prefix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

export default function Home() {
  useReveal()

  return (
    <main>
      {/* ---- HERO ---- */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', background: 'var(--ink)', color: '#fff', position: 'relative', overflow: 'hidden', paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: 80 }}>
        <div className="blob" style={{ width: 600, height: 600, background: 'var(--blue)', top: -200, right: -100, opacity: 0.25 }} />
        <div className="blob" style={{ width: 400, height: 400, background: 'var(--cyan)', bottom: -100, left: -80, opacity: 0.2 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal>
            <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Korea's #1 Coding Bootcamp</span>
            <h1 className="display h-xxl" style={{ color: '#fff', marginTop: 28, marginBottom: 32, maxWidth: 900 }}>
              코드로<br />
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,.4)', color: 'transparent' }}>세상을</span><br />
              바꿔라.
            </h1>
            <p className="lead" style={{ color: 'rgba(255,255,255,.7)', maxWidth: 540, marginBottom: 48 }}>
              비전공자도 6개월 만에 취업. 현직 시니어 개발자가 1:1로 코드 리뷰해드립니다.
              취업 보장, 평생 수강, 커뮤니티까지.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/courses" className="btn btn-lime btn-arrow">
                강좌 둘러보기
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/about" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)' }}>회사 소개</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- MARQUEE ---- */}
      <div className="marquee" style={{ padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="track" style={{ '--mq-dur': '22s' }}>
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <span key={i} className="item">
              <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>{s}</span>
              <span style={{ color: 'var(--blue)', fontSize: 18 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---- STATS ---- */}
      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="grid g-4">
            {[
              { val: '38', suf: '000+', label: '누적 수강생', pre: '' },
              { val: '94.2', suf: '%', label: '취업률', pre: '' },
              { val: '120', suf: '+', label: '전문 강좌', pre: '' },
              { val: '4.9', suf: '/5.0', label: '수강 만족도', pre: '' },
            ].map((s, i) => (
              <div key={i} className="stat" data-reveal data-d={i + 1}>
                <div className="num" style={{ fontSize: 'clamp(36px,5vw,64px)', fontFamily: 'var(--display)', fontWeight: 700, letterSpacing: '-0.04em' }}>
                  <CountUp value={s.val} suffix={s.suf} prefix={s.pre} />
                </div>
                <p style={{ color: 'var(--txt-2)', marginTop: 8, fontSize: 15 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- POPULAR COURSES ---- */}
      <section className="section">
        <div className="wrap">
          <div className="shead">
            <div className="t">
              <span className="eyebrow">Popular Courses</span>
              <h2 className="h-l" style={{ marginTop: 18 }}>가장 많이 선택한<br />강좌</h2>
            </div>
            <Link to="/courses" className="btn btn-ghost btn-arrow">
              전체 보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="grid g-3">
            {FEATURED_COURSES.map((c, i) => <CourseCard key={c.id} course={c} delay={i + 1} />)}
          </div>
        </div>
      </section>

      {/* ---- BENTO FEATURES ---- */}
      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="shead">
            <div className="t">
              <span className="eyebrow">Why CODEWAVE</span>
              <h2 className="h-l" style={{ marginTop: 18 }}>다른 곳과<br />차원이 다릅니다</h2>
            </div>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'auto auto' }}>
            {[
              { title: '1:1 코드 리뷰', desc: '현직 시니어 개발자가 내 코드를 직접 리뷰해드립니다. 실무 수준의 피드백.', icon: '💬', span: 2, big: true },
              { title: '취업 보장', desc: '수료 후 6개월 내 미취업 시 전액 환불.', icon: '🎯', span: 1 },
              { title: '평생 수강', desc: '한 번 수강하면 업데이트 강의도 영구 무료.', icon: '∞', span: 1 },
              { title: '커뮤니티', desc: '1만 명+ 동료 개발자와 함께 성장.', icon: '🌐', span: 1 },
              { title: '프로젝트 기반 학습', desc: '포트폴리오에 바로 쓸 수 있는 실전 프로젝트.', icon: '🚀', span: 1 },
            ].map((f, i) => (
              <div key={i} className="card" data-reveal data-d={i + 1}
                style={{ padding: f.big ? '42px 48px' : 32, gridColumn: f.span > 1 ? `span ${f.span}` : undefined }}>
                <span style={{ fontSize: f.big ? 48 : 36, display: 'block', marginBottom: 16 }}>{f.icon}</span>
                <h3 style={{ fontSize: f.big ? 28 : 20, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: 'var(--txt-2)', fontSize: 15, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- INSTRUCTORS PREVIEW ---- */}
      <section className="section">
        <div className="wrap">
          <div className="shead">
            <div className="t">
              <span className="eyebrow">Instructors</span>
              <h2 className="h-l" style={{ marginTop: 18 }}>현업이 직접<br />가르칩니다</h2>
            </div>
            <Link to="/instructors" className="btn btn-ghost btn-arrow">
              전체 보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="grid g-4">
            {FEATURED_INSTRUCTORS.map((ins, i) => <InstructorCard key={ins.name} instructor={ins} delay={i + 1} />)}
          </div>
        </div>
      </section>

      {/* ---- REVIEWS PREVIEW ---- */}
      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="shead">
            <div className="t">
              <span className="eyebrow">Reviews</span>
              <h2 className="h-l" style={{ marginTop: 18 }}>결과로 말하는<br />수강 후기</h2>
            </div>
            <Link to="/reviews" className="btn btn-ghost btn-arrow">
              전체 보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="grid g-3">
            {FEATURED_REVIEWS.map((r, i) => <ReviewCard key={r.name} review={r} delay={i + 1} />)}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section" style={{ background: 'var(--ink)', color: '#fff', textAlign: 'center' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>7일 무료 체험</span>
          <h2 className="h-l display" style={{ color: '#fff', margin: '24px 0 20px' }}>지금 시작하세요</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.65)', marginBottom: 48, maxWidth: 480, marginInline: 'auto' }}>
            7일 동안 무료로 모든 강좌를 체험하세요.<br />불만족 시 100% 환불.
          </p>
          <Link to="/courses" className="btn btn-lime" style={{ fontSize: 18, padding: '18px 40px' }}>
            무료로 시작하기
          </Link>
        </div>
      </section>
    </main>
  )
}
