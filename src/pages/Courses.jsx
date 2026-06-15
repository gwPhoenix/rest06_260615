import { useState, useMemo } from 'react'
import { useReveal } from '../hooks/useReveal'
import CourseCard from '../components/CourseCard'
import { COURSES } from '../data/courses'

const CATS = ['전체', '코딩', '자격증', '컴퓨터활용']
const SORTS = [
  { label: '인기순',  fn: (a, b) => b.students - a.students },
  { label: '평점순',  fn: (a, b) => b.rating - a.rating },
  { label: '가격 낮은순', fn: (a, b) => a.price - b.price },
  { label: '가격 높은순', fn: (a, b) => b.price - a.price },
]

export default function Courses() {
  useReveal()
  const [cat, setCat] = useState('전체')
  const [query, setQuery] = useState('')
  const [sortIdx, setSortIdx] = useState(0)

  const filtered = useMemo(() => {
    let list = COURSES
    if (cat !== '전체') list = list.filter(c => c.cat === cat)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q))
    }
    return [...list].sort(SORTS[sortIdx].fn)
  }, [cat, query, sortIdx])

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--paper-2)', padding: '56px 0 40px' }}>
        <div className="wrap">
          <h1 className="h-l" data-reveal>전체 강좌</h1>
          <p className="lead" data-reveal style={{ marginTop: 12 }}>총 {COURSES.length}개의 전문 강좌</p>
        </div>
      </section>

      {/* Filter toolbar */}
      <div style={{ position: 'sticky', top: 'var(--nav-h)', zIndex: 100, background: 'var(--glass)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line)', padding: '14px 0' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {CATS.map(c => (
              <button key={c}
                className={`chip${cat === c ? ' chip-blue' : ''}`}
                style={{ cursor: 'pointer', border: 'none', fontWeight: cat === c ? 700 : 600 }}
                onClick={() => setCat(c)}
              >{c}</button>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 100, padding: '8px 16px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--txt-3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="강좌 검색..."
              style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: 15, color: 'var(--txt)' }} />
          </div>
          <select value={sortIdx} onChange={e => setSortIdx(+e.target.value)}
            style={{ border: '1px solid var(--line)', borderRadius: 100, padding: '8px 16px', fontSize: 14, fontWeight: 600, background: 'var(--paper)', color: 'var(--txt)', cursor: 'pointer', outline: 'none' }}>
            {SORTS.map((s, i) => <option key={i} value={i}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="wrap">
          {filtered.length === 0
            ? <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--txt-2)' }}>검색 결과가 없습니다.</div>
            : (
              <>
                <p style={{ color: 'var(--txt-2)', marginBottom: 32 }}>{filtered.length}개 강좌</p>
                <div className="grid g-3">
                  {filtered.map((c, i) => <CourseCard key={c.id} course={c} delay={(i % 3) + 1} />)}
                </div>
              </>
            )
          }
        </div>
      </section>
    </main>
  )
}
