import { useParams, Link, useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { COURSES, INSTRUCTORS, won } from '../data/courses'
import { useAuth } from '../context/AuthContext'

const CURRICULUM = [
  { ch: 1, title: '개발 환경 설정 & 기초', lessons: ['OT & 로드맵 소개', '개발 도구 설치', '기초 문법 완전 정복', '첫 번째 프로젝트'] },
  { ch: 2, title: '핵심 개념 마스터',      lessons: ['심화 개념 1', '심화 개념 2', '실습 프로젝트', '코드 리뷰 세션'] },
  { ch: 3, title: '실전 프로젝트',         lessons: ['기획 & 설계', '개발 1', '개발 2', '배포 & 발표'] },
  { ch: 4, title: '취업 준비',             lessons: ['포트폴리오 완성', '이력서 작성', '모의 기술 면접', '최종 프로젝트 발표'] },
]

export default function Course() {
  useReveal()
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, signInWithKakao } = useAuth()

  const course = COURSES.find(c => c.id === id)
  if (!course) return <div style={{ padding: '200px 0', textAlign: 'center' }}>강좌를 찾을 수 없습니다.</div>

  const instructor = INSTRUCTORS.find(ins => {
    const map = { fe:'KM', ai:'LS', jeongcheo:'PJ', be:'CH', sqld:'PJ', excel:'JW', comphwal:'OY', cloud:'SD', ux:'HY' }
    return ins.initial === map[id]
  }) ?? INSTRUCTORS[0]

  const discount = Math.round((1 - course.price / course.was) * 100)

  const handleEnroll = () => {
    if (!user) { signInWithKakao(); return }
    navigate(`/checkout/${id}`)
  }

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Dark hero */}
      <section style={{ background: 'var(--ink)', color: '#fff', padding: '64px 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <Link to="/courses" style={{ color: 'rgba(255,255,255,.5)', fontSize: 14 }}>강좌</Link>
            <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
            <span style={{ color: '#fff', fontSize: 14 }}>{course.title}</span>
          </div>
          <div className="pillrow" style={{ marginBottom: 18 }}>
            <span className={`chip ${course.tagClass}`}>{course.tag}</span>
            <span className="chip">{course.cat}</span>
            <span className="chip">{course.level}</span>
          </div>
          <h1 className="h-l" style={{ color: '#fff', marginBottom: 16, maxWidth: 680 }}>{course.title}</h1>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 17, marginBottom: 24, maxWidth: 560 }}>{course.sub}</p>
          <div style={{ display: 'flex', gap: 20, color: 'rgba(255,255,255,.65)', fontSize: 14, flexWrap: 'wrap' }}>
            <span>★ {course.rating} ({course.students.toLocaleString('ko-KR')}명)</span>
            <span>· {course.weeks}주 과정</span>
            <span>· {course.lessons}강</span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }}>
          {/* Left */}
          <div>
            {/* 학습 목표 */}
            <div className="card" style={{ padding: 32, marginBottom: 32 }}>
              <h2 style={{ fontSize: 22, marginBottom: 20 }}>이런 것을 배웁니다</h2>
              <div className="grid g-2" style={{ gap: 12 }}>
                {['최신 실무 기술 스택 완전 마스터', '현업에서 바로 쓰는 프로젝트 경험', '코드 리뷰로 배우는 클린 코드', '배포까지 완성하는 풀사이클 개발', '기술 면접 완벽 대비', '포트폴리오 완성'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15 }}>
                    <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 커리큘럼 */}
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 20 }}>커리큘럼</h2>
              {CURRICULUM.map((ch) => (
                <details key={ch.ch} style={{ border: '1px solid var(--line)', borderRadius: 'var(--r)', marginBottom: 12, overflow: 'hidden' }}>
                  <summary style={{ padding: '18px 24px', cursor: 'pointer', fontWeight: 700, fontSize: 16, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Chapter {ch.ch}. {ch.title}</span>
                    <span style={{ color: 'var(--txt-3)', fontSize: 13 }}>{ch.lessons.length}강 ▼</span>
                  </summary>
                  <div style={{ borderTop: '1px solid var(--line)' }}>
                    {ch.lessons.map((l, i) => (
                      <div key={i} style={{ padding: '14px 24px', borderBottom: i < ch.lessons.length - 1 ? '1px solid var(--line)' : 'none', fontSize: 15, color: 'var(--txt-2)', display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                        {l}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            {/* 강사 */}
            <div style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 22, marginBottom: 20 }}>담당 강사</h2>
              <div className="card" style={{ padding: 32, display: 'flex', gap: 24, alignItems: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: instructor.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 24, color: '#fff' }}>{instructor.initial}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: 20, marginBottom: 4 }}>{instructor.name}</h3>
                  <p style={{ color: 'var(--txt-2)', margin: '0 0 10px' }}>{instructor.role}</p>
                  <div style={{ display: 'flex', gap: 16, fontSize: 14, color: 'var(--txt-2)' }}>
                    <span>경력 {instructor.exp}</span>
                    <span>·</span>
                    <span>수강생 {instructor.students}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
            <div className="card" style={{ padding: 32, overflow: 'visible' }}>
              <div style={{ aspectRatio: '4/3', background: course.grad, borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 72, lineHeight: 1 }}>{course.icon}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 30 }}>{won(course.price)}</span>
                <span style={{ color: 'var(--txt-3)', textDecoration: 'line-through', fontSize: 16 }}>{won(course.was)}</span>
                <span className="chip chip-lime">{discount}% 할인</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 24px', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15, color: 'var(--txt-2)' }}>
                {['평생 무제한 수강', '1:1 코드 리뷰 포함', '수료증 발급', '7일 무료 체험 · 100% 환불 보장'].map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--blue)' }}>✓</span> {b}
                  </li>
                ))}
              </ul>
              <button className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', fontSize: 17 }} onClick={handleEnroll}>
                수강 신청하기
              </button>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={handleEnroll}>
                7일 무료 체험
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
