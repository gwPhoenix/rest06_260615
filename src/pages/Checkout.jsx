import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { COURSES, won } from '../data/courses'
import { useAuth } from '../context/AuthContext'
import { requestPay } from '../lib/iamport'

const METHODS = [
  { id: 'card',     label: '신용·체크카드',  icon: '💳' },
  { id: 'kakao',    label: '카카오페이',     icon: '💛' },
  { id: 'naver',    label: '네이버페이',     icon: '🟢' },
  { id: 'transfer', label: '계좌이체',       icon: '🏦' },
]

const COUPONS = { WELCOME10: 0.1, CODEWAVE20: 0.2 }

export default function Checkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, signInWithKakao, saveEnrollment, savePayment } = useAuth()

  const course = COURSES.find(c => c.id === id)
  if (!course) return <div style={{ padding: 200, textAlign: 'center' }}>강좌를 찾을 수 없습니다.</div>

  const [step, setStep] = useState(1)
  const [method, setMethod] = useState('card')
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({ name: '', phone: '', email: '', goal: '' })

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata ?? {}
      setForm(f => ({
        ...f,
        name: meta.full_name ?? meta.name ?? '',
        email: user.email ?? '',
      }))
    }
  }, [user])

  const finalPrice = Math.round(course.price * (1 - discount))

  const applyCoupon = () => {
    const rate = COUPONS[couponCode.trim().toUpperCase()]
    if (rate) { setDiscount(rate); setError('') }
    else setError('유효하지 않은 쿠폰 코드입니다.')
  }

  const handlePay = async () => {
    if (!user) { signInWithKakao(); return }
    if (!agreed) { setError('결제 약관에 동의해주세요.'); return }
    setLoading(true); setError('')
    try {
      const { impUid, merchantUid, amount } = await requestPay({
        courseId: id,
        courseName: course.title,
        amount: finalPrice,
        userName: form.name,
        userEmail: form.email,
        userPhone: form.phone,
        method,
      })
      await savePayment({ courseId: id, impUid, merchantUid, amount, method })
      await saveEnrollment(id)
      setStep(3)
    } catch (e) {
      setError(e.message ?? '결제 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <section className="section-sm">
        <div className="wrap" style={{ maxWidth: 1100 }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 48, maxWidth: 400 }}>
            {['정보 입력', '결제', '완료'].map((label, i) => {
              const num = i + 1
              const active = step === num
              const done = step > num
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : undefined }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: done ? 'var(--blue)' : active ? 'var(--blue)' : 'var(--paper-2)', color: done || active ? '#fff' : 'var(--txt-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>
                      {done ? '✓' : num}
                    </div>
                    <span style={{ fontWeight: active ? 700 : 400, color: active ? 'var(--txt)' : 'var(--txt-3)', fontSize: 14 }}>{label}</span>
                  </div>
                  {i < 2 && <div style={{ flex: 1, height: 2, background: done ? 'var(--blue)' : 'var(--line)', margin: '0 12px' }} />}
                </div>
              )
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>
            {/* Main content */}
            <div>
              {step === 1 && (
                <div className="card" style={{ padding: 36 }}>
                  <h2 style={{ fontSize: 22, marginBottom: 28 }}>수강생 정보</h2>
                  {[
                    { label: '이름', key: 'name',  placeholder: '홍길동',          type: 'text' },
                    { label: '연락처', key: 'phone', placeholder: '010-0000-0000', type: 'tel' },
                    { label: '이메일', key: 'email', placeholder: 'you@email.com', type: 'email' },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: 20 }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8, color: 'var(--txt-2)' }}>{f.label}</label>
                      <input
                        type={f.type} value={form[f.key]} placeholder={f.placeholder}
                        onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                        style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', fontSize: 15, background: 'var(--paper)', color: 'var(--txt)', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8, color: 'var(--txt-2)' }}>학습 목표 (선택)</label>
                    <textarea value={form.goal} onChange={e => setForm(v => ({ ...v, goal: e.target.value }))}
                      placeholder="이 강좌를 통해 이루고 싶은 목표를 알려주세요."
                      rows={3}
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', fontSize: 15, background: 'var(--paper)', color: 'var(--txt)', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                  </div>
                  <button className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}
                    onClick={() => {
                      if (!form.name || !form.phone || !form.email) { setError('필수 정보를 입력해주세요.'); return }
                      setError(''); setStep(2)
                    }}>
                    다음 단계 →
                  </button>
                  {error && <p style={{ color: '#e53e3e', fontSize: 14, marginTop: 12 }}>{error}</p>}
                </div>
              )}

              {step === 2 && (
                <div>
                  {/* 결제 수단 */}
                  <div className="card" style={{ padding: 32, marginBottom: 20 }}>
                    <h2 style={{ fontSize: 20, marginBottom: 20 }}>결제 수단</h2>
                    <div className="grid g-2" style={{ gap: 12 }}>
                      {METHODS.map(m => (
                        <button key={m.id}
                          onClick={() => setMethod(m.id)}
                          style={{ padding: '16px 20px', border: `2px solid ${method === m.id ? 'var(--blue)' : 'var(--line)'}`, borderRadius: 'var(--r)', background: method === m.id ? 'rgba(45,91,255,.06)' : 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'inherit', fontWeight: 600, fontSize: 15, color: 'var(--txt)' }}>
                          <span style={{ fontSize: 22 }}>{m.icon}</span>
                          {m.label}
                          {method === m.id && <span style={{ marginLeft: 'auto', color: 'var(--blue)' }}>✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 쿠폰 */}
                  <div className="card" style={{ padding: 32, marginBottom: 20 }}>
                    <h2 style={{ fontSize: 20, marginBottom: 16 }}>쿠폰 코드</h2>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input value={couponCode} onChange={e => setCouponCode(e.target.value)}
                        placeholder="쿠폰 코드 입력 (예: WELCOME10)"
                        style={{ flex: 1, padding: '12px 16px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', fontSize: 15, background: 'var(--paper)', color: 'var(--txt)', outline: 'none' }}
                      />
                      <button className="btn btn-ghost" onClick={applyCoupon} style={{ flexShrink: 0 }}>적용</button>
                    </div>
                    {discount > 0 && <p style={{ color: 'var(--blue)', fontWeight: 600, marginTop: 8, fontSize: 14 }}>쿠폰 적용됨! {Math.round(discount * 100)}% 할인</p>}
                    {error && <p style={{ color: '#e53e3e', fontSize: 14, marginTop: 8 }}>{error}</p>}
                  </div>

                  {/* 약관 동의 */}
                  <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                    <label style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', fontSize: 15 }}>
                      <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ width: 18, height: 18 }} />
                      이용약관 및 결제 약관에 동의합니다. (필수)
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-ghost" onClick={() => { setStep(1); setError('') }} style={{ flex: 1, justifyContent: 'center' }}>← 이전</button>
                    <button className="btn btn-accent" onClick={handlePay} disabled={loading}
                      style={{ flex: 2, justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                      {loading ? '결제 처리 중...' : `${won(finalPrice)} 결제하기`}
                    </button>
                  </div>
                  {error && <p style={{ color: '#e53e3e', fontSize: 14, marginTop: 12 }}>{error}</p>}
                </div>
              )}

              {step === 3 && (
                <div className="card" style={{ padding: 48, textAlign: 'center' }}>
                  <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
                  <h2 style={{ fontSize: 28, marginBottom: 16 }}>수강 신청 완료!</h2>
                  <p style={{ color: 'var(--txt-2)', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
                    <strong>{course.title}</strong> 수강 신청이 완료됐습니다.<br />
                    확인 이메일이 발송됩니다. 지금 바로 강의를 시작해보세요!
                  </p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="btn btn-accent" onClick={() => navigate('/profile')}>내 강의실 가기</button>
                    <button className="btn btn-ghost" onClick={() => navigate('/courses')}>다른 강좌 보기</button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 18, marginBottom: 20 }}>주문 요약</h3>
                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 64, height: 48, background: course.grad, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{course.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{course.title}</div>
                    <div style={{ color: 'var(--txt-3)', fontSize: 13, marginTop: 4 }}>{course.weeks}주 · {course.lessons}강</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--txt-2)', marginBottom: 8 }}>
                    <span>정가</span><span>{won(course.was)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--blue)', marginBottom: 8 }}>
                    <span>강좌 할인</span><span>-{won(course.was - course.price)}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--blue)', marginBottom: 8 }}>
                      <span>쿠폰 할인</span><span>-{won(Math.round(course.price * discount))}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 20, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)', fontFamily: 'var(--display)' }}>
                    <span>최종 결제</span><span style={{ color: 'var(--blue)' }}>{won(finalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
