import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import InstructorCard from '../components/InstructorCard'
import { INSTRUCTORS } from '../data/courses'

export default function Instructors() {
  useReveal()

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Our Instructors</span>
          <h1 className="h-xl display" style={{ color: '#fff', margin: '24px 0 20px' }}>현업이 직접<br />가르칩니다</h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.65)', maxWidth: 480, marginInline: 'auto' }}>
            네이버·카카오·토스 출신 시니어 개발자가<br />실무 기술을 직접 가르칩니다.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="wrap">
          <div className="grid g-4">
            {INSTRUCTORS.map((ins, i) => <InstructorCard key={ins.name} instructor={ins} delay={(i % 4) + 1} />)}
          </div>
        </div>
      </section>

      {/* CTA: 강사 지원 */}
      <section className="section" style={{ background: 'var(--paper-2)', textAlign: 'center' }}>
        <div className="wrap">
          <h2 className="h-m" data-reveal>함께 가르치고 싶으신가요?</h2>
          <p className="lead" data-reveal style={{ marginTop: 16, marginBottom: 36 }}>
            현업 경험을 가진 전문가라면 CODEWAVE 강사로 지원해보세요.
          </p>
          <a href="mailto:instructor@codewave.kr" className="btn btn-accent" data-reveal>강사 지원하기</a>
        </div>
      </section>
    </main>
  )
}
