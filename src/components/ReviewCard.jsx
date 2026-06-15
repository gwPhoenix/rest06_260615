export default function ReviewCard({ review, delay }) {
  const { initial, name, course, grad, text, rating, job } = review

  return (
    <div className="card" data-reveal data-d={delay} style={{ padding: 28, breakInside: 'avoid', marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} style={{ color: '#F5B800', fontSize: 16 }}>★</span>
        ))}
      </div>
      <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--txt)', margin: '0 0 20px' }}>
        &ldquo;{text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--display)', fontWeight: 700, color: '#fff', fontSize: 17 }}>{initial}</span>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{name}</div>
          <div style={{ fontSize: 13, color: 'var(--txt-2)' }}>{course}</div>
        </div>
        <span className="chip chip-lime" style={{ marginLeft: 'auto', fontSize: 12 }}>{job}</span>
      </div>
    </div>
  )
}
