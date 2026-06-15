import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import ReviewCard from '../components/ReviewCard'
import { REVIEWS } from '../data/courses'

const CATS = ['전체', '코딩', '자격증', '컴퓨터활용']

const CAT_MAP = {
  '코딩': ['프론트엔드', '백엔드', 'AI', '데이터', 'UX', '클라우드', 'DevOps'],
  '자격증': ['정보처리기사', 'SQLD', '컴퓨터활용능력'],
  '컴퓨터활용': ['엑셀', '컴퓨터활용능력'],
}

export default function Reviews() {
  useReveal()
  const [cat, setCat] = useState('전체')

  const filtered = cat === '전체'
    ? REVIEWS
    : REVIEWS.filter(r => {
        const keywords = CAT_MAP[cat] ?? []
        return keywords.some(k => r.course.includes(k))
      })

  const allReviews = [...filtered, ...filtered]

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Student Reviews</span>
          <h1 className="h-xl display" style={{ color: '#fff', margin: '24px 0 20px' }}>결과로 말하는<br />수강 후기</h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, justifyContent: 'center', marginTop: 20 }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 48 }}>4.9</span>
            <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 18 }}>/5.0</span>
            <span style={{ color: '#F5B800', fontSize: 24 }}>★★★★★</span>
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 15 }}>12,800+ 리뷰</span>
          </div>
        </div>
      </section>

      {/* Filter */}
      <div style={{ position: 'sticky', top: 'var(--nav-h)', zIndex: 100, background: 'var(--glass)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line)', padding: '14px 0' }}>
        <div className="wrap" style={{ display: 'flex', gap: 8 }}>
          {CATS.map(c => (
            <button key={c}
              className={`chip${cat === c ? ' chip-blue' : ''}`}
              style={{ cursor: 'pointer', border: 'none', fontWeight: cat === c ? 700 : 600 }}
              onClick={() => setCat(c)}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Masonry */}
      <section className="section">
        <div className="wrap">
          {filtered.length === 0
            ? <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--txt-2)' }}>해당 카테고리 후기가 없습니다.</div>
            : (
              <div style={{ columns: 3, columnGap: 24 }}>
                {allReviews.map((r, i) => <ReviewCard key={i} review={r} delay={(i % 4) + 1} />)}
              </div>
            )
          }
        </div>
      </section>
    </main>
  )
}
