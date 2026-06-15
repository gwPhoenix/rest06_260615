/**
 * 아임포트 v1 SDK 래퍼
 * window.IMP 는 index.html <script> 로 로드됨
 */
export function requestPay({ courseId, courseName, amount, userName, userEmail, userPhone, method = 'card' }) {
  return new Promise((resolve, reject) => {
    const { IMP } = window
    if (!IMP) return reject(new Error('아임포트 SDK를 불러오지 못했습니다.'))

    IMP.init(import.meta.env.VITE_IMP_CODE)

    const pgMap = {
      card:     'html5_inicis',
      kakao:    'kakaopay',
      naver:    'naverpay',
      transfer: 'html5_inicis',
    }

    const merchantUid = `cw_${courseId}_${Date.now()}`

    IMP.request_pay(
      {
        pg:          pgMap[method] ?? 'html5_inicis',
        pay_method:  method === 'transfer' ? 'trans' : 'card',
        merchant_uid: merchantUid,
        name:        courseName,
        amount,
        buyer_name:  userName,
        buyer_email: userEmail,
        buyer_tel:   userPhone,
      },
      (rsp) => {
        if (rsp.success) {
          resolve({ impUid: rsp.imp_uid, merchantUid, amount })
        } else {
          reject(new Error(rsp.error_msg ?? '결제에 실패했습니다.'))
        }
      }
    )
  })
}
