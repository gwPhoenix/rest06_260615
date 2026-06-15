import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { COURSES, won } from '../data/courses'

export default function Profile() {
  const { user, profile, signOut, getEnrollments } = useAuth()
  const navigate = useNavigate()
  const [enrolledIds, setEnrolledIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/'); return }
    getEnrollments().then(ids => { setEnrolledIds(ids); setLoading(false) })
  }, [user])

  if (!user) return null

  const enrolledCourses = COURSES.filter(c => enrolledIds.includes(c.id))

  const displayName = profile?.name ?? user.user_metadata?.full_name ?? user.email

  return (
    <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--paper-2)' }}>
      <section style={{ padding: '48px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: 1000 }}>
          {/* Profile header */}
          <div className="card" style={{ padding: 36, display: 'flex', alignItems: 'center', gap: 28, marginBottom: 32, flexWrap: 'wrap' }}>
            {user.user_metadata?.avatar_url
              ? <img src={user.user_metadata.avatar_url} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
              : <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--grad-wave)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#fff', fontFamily: 'var(--display)', fontWeight: 700, flexShrink: 0 }}>
                  {displayName?.[0] ?? '?'}
                </div>
            }
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 26, marginBottom: 6 }}>{displayName}</h1>
              <p style={{ color: 'var(--txt-2)', margin: 0 }}>{user.email}</p>
            </div>
            <button className="btn btn-ghost" onClick={async () => { await signOut(); navigate('/') }}>
              로그아웃
            </button>
          </div>

          {/* Enrolled courses */}
          <h2 style={{ fontSize: 22, marginBottom: 24 }}>내 강의 ({enrolledCourses.length})</h2>

          {loading
            ? <p style={{ color: 'var(--txt-2)' }}>불러오는 중...</p>
            : enrolledCourses.length === 0
              ? (
                <div className="card" style={{ padding: 48, textAlign: 'center' }}>
                  <p style={{ color: 'var(--txt-2)', fontSize: 17, marginBottom: 24 }}>아직 수강 중인 강좌가 없습니다.</p>
                  <Link to="/courses" className="btn btn-accent">강좌 둘러보기</Link>
                </div>
              )
              : (
                <div className="grid g-3">
                  {enrolledCourses.map(c => (
                    <Link to={`/course/${c.id}`} key={c.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                      <div style={{ height: 120, background: c.grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 48 }}>{c.icon}</span>
                      </div>
                      <div style={{ padding: '20px 22px' }}>
                        <span className={`chip ${c.tagClass}`} style={{ marginBottom: 10 }}>{c.tag}</span>
                        <h3 style={{ fontSize: 16, lineHeight: 1.3, marginBottom: 8 }}>{c.title}</h3>
                        <div style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--txt-3)' }}>
                          <span>{c.weeks}주</span><span>·</span><span>{c.lessons}강</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )
          }
        </div>
      </section>
    </main>
  )
}
