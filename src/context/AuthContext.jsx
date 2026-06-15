import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setProfile(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
  }

  async function signInWithKakao() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
        scopes: 'profile_nickname profile_image account_email',
      },
    })
    if (error) throw error
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function saveEnrollment(courseId) {
    if (!user) throw new Error('로그인이 필요합니다.')
    const { error } = await supabase.from('enrollments').upsert({ user_id: user.id, course_id: courseId })
    if (error) throw error
  }

  async function savePayment({ courseId, impUid, merchantUid, amount, method }) {
    if (!user) throw new Error('로그인이 필요합니다.')
    const { error } = await supabase.from('payments').insert({
      user_id: user.id,
      course_id: courseId,
      imp_uid: impUid,
      merchant_uid: merchantUid,
      amount,
      method,
    })
    if (error) throw error
  }

  async function getEnrollments() {
    if (!user) return []
    const { data } = await supabase.from('enrollments').select('course_id').eq('user_id', user.id)
    return data?.map(e => e.course_id) ?? []
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithKakao, signOut, saveEnrollment, savePayment, getEnrollments }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
