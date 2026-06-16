import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SYSTEM_PROMPT = `당신은 CODEWAVE 코딩 부트캠프의 AI 상담사입니다.
CODEWAVE는 비전공자도 6개월 만에 취업할 수 있는 한국의 프리미엄 코딩 부트캠프입니다.
현직 시니어 개발자의 1:1 코드 리뷰, 취업 보장, 평생 수강, 커뮤니티를 제공합니다.
강좌는 React, Python, Spring Boot, TypeScript, AWS 등을 포함합니다.
친절하고 전문적으로 답변하며, 수강 관련 질문에는 적극적으로 안내해주세요.
한국어로 답변해주세요.`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS })
  }

  try {
    const { message, history, model } = await req.json()

    if (!message) {
      return new Response(JSON.stringify({ error: '메시지가 없습니다.' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      })
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history ?? []),
      { role: 'user', content: message },
    ]

    let reply = ''

    if (model === 'solar') {
      const solarKey = Deno.env.get('SOLAR_API_KEY')
      if (!solarKey) throw new Error('SOLAR_API_KEY 가 설정되지 않았습니다.')

      const res = await fetch('https://api.upstage.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${solarKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: 'solar-pro', messages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error?.message ?? 'Solar API 오류')
      reply = data.choices[0].message.content
    } else {
      const openaiKey = Deno.env.get('OPENAI_API_KEY')
      if (!openaiKey) throw new Error('OPENAI_API_KEY 가 설정되지 않았습니다.')

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: 'gpt-4o-mini', messages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error?.message ?? 'OpenAI API 오류')
      reply = data.choices[0].message.content
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
