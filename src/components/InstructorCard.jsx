export default function InstructorCard({ instructor, delay }) {
  const { initial, name, role, grad, courses, exp, students } = instructor

  return (
    <div className="card" data-reveal data-d={delay} style={{ padding: 32, textAlign: 'center' }}>
      <div style={{ width: 88, height: 88, borderRadius: '50%', background: grad, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 28, color: '#fff' }}>{initial}</span>
        <span style={{ position: 'absolute', bottom: -4, right: -4, background: 'var(--lime)', color: 'var(--ink)', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 100 }}>{exp}</span>
      </div>
      <h3 style={{ fontSize: 20, marginBottom: 6 }}>{name}</h3>
      <p style={{ color: 'var(--txt-2)', fontSize: 14, margin: '0 0 14px' }}>{role}</p>
      <span className="chip" style={{ marginBottom: 16 }}>{courses}</span>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 14, color: 'var(--txt-2)' }}>
        <div><strong style={{ color: 'var(--txt)', display: 'block', fontSize: 18, fontFamily: 'var(--display)' }}>{students}</strong>수강생</div>
      </div>
    </div>
  )
}
