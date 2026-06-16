import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const MODELS = [
  { id: 'openai', label: 'GPT-4o', icon: '✦' },
  { id: 'solar',  label: 'Solar',  icon: '☀' },
]

const GREETING = {
  role: 'assistant',
  content: '안녕하세요! CODEWAVE AI 상담사입니다 👋\n수강 관련 궁금한 점을 무엇이든 물어보세요.',
}

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [model, setModel]     = useState('openai')
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120)
  }, [open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const history = messages
      .filter(m => m.role !== 'system')
      .slice(-8)
      .map(({ role, content }) => ({ role, content }))

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: text, history, model },
      })
      if (error) throw error
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      }])
    } finally {
      setLoading(false)
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="chat-widget">
      {/* 팝업 */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar">CW</span>
              <div>
                <div className="chat-title">CODEWAVE AI</div>
                <div className="chat-status">
                  <span className="chat-dot" />
                  온라인
                </div>
              </div>
            </div>
            <div className="chat-header-actions">
              {/* 모델 선택 */}
              <div className="chat-model-tabs">
                {MODELS.map(m => (
                  <button
                    key={m.id}
                    className={`chat-model-btn${model === m.id ? ' active' : ''}`}
                    onClick={() => setModel(m.id)}
                    title={m.label}
                  >
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>
              <button className="chat-close" onClick={() => setOpen(false)} aria-label="닫기">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.role === 'assistant' && <span className="chat-msg-avatar">CW</span>}
                <div className="chat-bubble">
                  {msg.content.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < msg.content.split('\n').length - 1 && <br/>}</span>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant">
                <span className="chat-msg-avatar">CW</span>
                <div className="chat-bubble chat-typing">
                  <span/><span/><span/>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-wrap">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={1}
            />
            <button
              className="chat-send"
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="전송"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        className={`chat-fab${open ? ' active' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="AI 상담"
      >
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1 13H8v-2h3v2zm5 0h-3v-2h3v2zm0-4H8V9h8v2z"/></svg>
        }
        {!open && <span className="chat-fab-badge" />}
      </button>
    </div>
  )
}
