import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme, THEMES } from '../hooks/useTheme'

const LINKS = [
  { to: '/courses',     label: '강좌' },
  { to: '/instructors', label: '강사진' },
  { to: '/reviews',     label: '수강후기' },
  { to: '/about',       label: '회사소개' },
]

export default function Nav() {
  const { user, signInWithKakao, signOut } = useAuth()
  const { theme, mode, changeTheme, toggleMode } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const location = useLocation()
  const paletteRef = useRef(null)

  const isHome = location.pathname === '/'
  const onDark = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) setPaletteOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const curTheme = THEMES.find(t => t.id === theme) ?? THEMES[0]

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}${onDark ? ' on-dark' : ''}`}>
        <div className="wrap">
          <Link to="/" className="logo">
            <span className="mark" />
            CODEWAVE
          </Link>

          <nav className="nav-links">
            {LINKS.map(l => (
              <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''}>{l.label}</Link>
            ))}
          </nav>

          <div className="nav-cta">
            {/* 테마 컨트롤 */}
            <div className="theme-ctrl" ref={paletteRef}>
              <button
                className={`tc-btn${paletteOpen ? ' open' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPaletteOpen(v => !v) }}
                aria-label="컬러 테마"
              >
                <span className="tc-swatch" style={{ background: `linear-gradient(135deg,${curTheme.c[0]},${curTheme.c[1]})` }} />
                <svg className="cv" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <button className="tc-btn icon" onClick={() => toggleMode(mode)} aria-label="다크/라이트 모드">
                {mode === 'dark'
                  ? <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"/></svg>
                }
              </button>

              <div className={`tc-pop${paletteOpen ? ' open' : ''}`}>
                <div className="ph">컬러 팔레트</div>
                {THEMES.map(t => (
                  <div
                    key={t.id}
                    className={`tc-opt${t.id === theme ? ' on' : ''}`}
                    onClick={() => { changeTheme(t.id); setPaletteOpen(false) }}
                  >
                    <span className="pair">
                      <span style={{ background: t.c[0] }} />
                      <span style={{ background: t.c[1] }} />
                    </span>
                    <span className="nm">{t.name}</span>
                    {t.id === theme && (
                      <svg className="ck" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {user ? (
              <>
                <Link to="/profile" className="btn btn-ghost" style={{ padding: '10px 18px', fontSize: 14 }}>
                  내 강의실
                </Link>
                <button className="btn btn-primary" onClick={signOut} style={{ padding: '10px 18px', fontSize: 14 }}>
                  로그아웃
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={signInWithKakao} style={{ gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.6 5.08 4 6.52L5 21l4.2-2.7c.9.2 1.85.3 2.8.3 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/></svg>
                카카오 로그인
              </button>
            )}
          </div>

          <button className="nav-toggle" onClick={() => setMenuOpen(true)} aria-label="메뉴 열기">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="close" onClick={() => setMenuOpen(false)}>✕</button>
        {LINKS.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        {user
          ? <Link to="/profile">내 강의실</Link>
          : <button className="btn btn-lime" style={{ marginTop: 24 }} onClick={signInWithKakao}>카카오 로그인</button>
        }
      </div>
    </>
  )
}
