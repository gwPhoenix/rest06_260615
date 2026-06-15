import { Link } from 'react-router-dom'
import { won } from '../data/courses'

export default function CourseCard({ course, delay }) {
  const { id, cat, title, sub, level, rating, students, lessons, price, was, grad, icon, tagClass, tag } = course
  const discount = Math.round((1 - price / was) * 100)

  return (
    <Link to={`/course/${id}`} className="card course-card" data-reveal data-d={delay}>
      <div className="thumb" style={{ background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className={`tag chip ${tagClass}`}>{tag}</span>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 72, color: 'rgba(255,255,255,.92)', lineHeight: 1 }}>
          {icon}
        </span>
      </div>
      <div className="body">
        <div className="pillrow" style={{ marginBottom: 12 }}>
          <span className="chip">{cat}</span>
          <span className="chip">{level}</span>
        </div>
        <h3>{title}</h3>
        <p style={{ color: 'var(--txt-2)', fontSize: 14.5, margin: '8px 0 0' }}>{sub}</p>
        <div className="meta">
          <span>★ {rating}</span>
          <span>·</span>
          <span>수강생 {students.toLocaleString('ko-KR')}</span>
          <span>·</span>
          <span>{lessons}강</span>
        </div>
        <div className="price">
          <span className="now">{won(price)}</span>
          <span className="was">{won(was)}</span>
          <span className="chip chip-lime" style={{ marginLeft: 'auto' }}>{discount}% 할인</span>
        </div>
      </div>
    </Link>
  )
}
