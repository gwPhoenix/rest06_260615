import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const TIMELINE = [
  { year: '2021', title: '창업', desc: 'CODEWAVE 설립. 비전공자 취업을 위한 코딩 교육 플랫폼 런칭.' },
  { year: '2022', title: '1만 명 돌파', desc: '누적 수강생 1만 명 달성. 프론트엔드·백엔드 부트캠프 확대.' },
  { year: '2023', title: '자격증 트랙 론칭', desc: '정보처리기사, SQLD, 컴활 합격 보장 과정 개설.' },
  { year: '2024', title: 'AI 트랙 개설', desc: 'Python·머신러닝·LLM 과정 추가. 파트너사 500개 돌파.' },
  { year: '2025', title: '3만 8천 명+', desc: '누적 수강생 3만 8천 명. 업계 최고 94.2% 취업률 달성.' },
  { year: '2026', title: '계속 성장 중', desc: '글로벌 확장 및 기업 교육 솔루션 준비 중.' },
]

export default function About() {
  useReveal()

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section className="section" style={{ background: 'var(--ink)', color: '#fff', textAlign: 'center' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Our Mission</span>
          <h1 className="display h-xl" style={{ color: '#fff', margin: '24px 0 24px', maxWidth: 700, marginInline: 'auto' }}>
            배우는 모두가<br />성장하는 세상을 만듭니다
          </h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.65)', maxWidth: 520, marginInline: 'auto' }}>
            배움과 성장 사이의 거리를 0으로.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="grid g-4">
            {[
              { num: '38,000+', label: '누적 수강생' },
              { num: '94.2%',   label: '취업·합격률' },
              { num: '500+',    label: '파트너 기업' },
              { num: '120+',    label: '전문 강좌' },
            ].map((s, i) => (
              <div key={i} className="stat" data-reveal data-d={i + 1} style={{ textAlign: 'center' }}>
                <div className="num h-m display text-grad">{s.num}</div>
                <p style={{ color: 'var(--txt-2)', marginTop: 8 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="wrap">
          <div className="shead">
            <div className="t">
              <span className="eyebrow">Our Values</span>
              <h2 className="h-l" style={{ marginTop: 18 }}>우리가 일하는 방식</h2>
            </div>
          </div>
          <div className="grid g-3">
            {[
              { icon: '🎓', title: '학습자 우선', desc: '모든 의사결정의 중심은 학습자입니다. 배움의 효율을 극대화하는 방향으로 설계합니다.' },
              { icon: '📈', title: '결과 중심', desc: '지식이 아닌 결과를 제공합니다. 취업·합격·역량 향상 등 측정 가능한 성과를 추구합니다.' },
              { icon: '🛠', title: '실전 중심', desc: '현장에서 바로 쓰는 기술을 가르칩니다. 이론보다 실습, 실습보다 실전 프로젝트를 강조합니다.' },
            ].map((v, i) => (
              <div key={i} className="card" data-reveal data-d={i + 1} style={{ padding: 36 }}>
                <span style={{ fontSize: 44, display: 'block', marginBottom: 20 }}>{v.icon}</span>
                <h3 style={{ marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: 'var(--txt-2)', margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="shead">
            <div className="t">
              <span className="eyebrow">Our Story</span>
              <h2 className="h-l" style={{ marginTop: 18 }}>CODEWAVE의 여정</h2>
            </div>
          </div>
          <div style={{ maxWidth: 680, position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--line)' }} />
            {TIMELINE.map((t, i) => (
              <div key={i} data-reveal data-d={i % 4 + 1}
                style={{ position: 'relative', paddingBottom: 40 }}>
                <div style={{ position: 'absolute', left: -40, top: 4, width: 16, height: 16, borderRadius: '50%', background: 'var(--blue)', border: '3px solid var(--paper-2)', boxShadow: '0 0 0 3px var(--blue)' }} />
                <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 13, color: 'var(--blue)', letterSpacing: '.08em' }}>{t.year}</span>
                <h3 style={{ fontSize: 20, margin: '6px 0 8px' }}>{t.title}</h3>
                <p style={{ color: 'var(--txt-2)', margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <h2 className="h-l" data-reveal>함께 성장할 준비가 됐나요?</h2>
          <p className="lead" data-reveal style={{ marginTop: 16, marginBottom: 40 }}>7일 무료 체험으로 직접 확인해보세요.</p>
          <Link to="/courses" className="btn btn-accent" data-reveal style={{ fontSize: 17, padding: '16px 36px' }}>강좌 시작하기</Link>
        </div>
      </section>
    </main>
  )
}
