import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const scan = () => {
      const vh = window.innerHeight
      document.querySelectorAll('[data-reveal]').forEach(el => {
        if (el.classList.contains('in')) return
        const r = el.getBoundingClientRect()
        if (r.top < vh - 40 && r.bottom > 0) {
          el.classList.remove('pre')
          el.classList.add('in')
        } else if (!el.dataset.seen) {
          el.classList.add('pre')
        }
        el.dataset.seen = '1'
      })
    }

    window.addEventListener('scroll', scan, { passive: true })
    window.addEventListener('resize', scan)
    scan()
    const timers = [120, 400, 900, 1600].map(t => setTimeout(scan, t))

    return () => {
      window.removeEventListener('scroll', scan)
      window.removeEventListener('resize', scan)
      timers.forEach(clearTimeout)
    }
  }, [])
}
