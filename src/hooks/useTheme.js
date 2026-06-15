import { useState, useCallback } from 'react'

export const THEMES = [
  { id: '',         name: '오션',     c: ['#2D5BFF', '#14D6D6'] },
  { id: 'bluepink', name: '베리',     c: ['#3B6BFF', '#FF5DA2'] },
  { id: 'sunset',   name: '선셋',     c: ['#FF4D4D', '#FFC53D'] },
  { id: 'forest',   name: '포레스트', c: ['#12B886', '#C8FF3D'] },
  { id: 'grape',    name: '그레이프', c: ['#7B40F2', '#FF5DA2'] },
  { id: 'coral',    name: '코럴',     c: ['#FF7A3D', '#19C8C8'] },
]

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('cw-theme') ?? '')
  const [mode, setMode] = useState(() => localStorage.getItem('cw-mode') ?? 'light')

  const changeTheme = useCallback((id) => {
    const root = document.documentElement
    if (id) root.dataset.theme = id; else delete root.dataset.theme
    localStorage.setItem('cw-theme', id)
    setTheme(id)
  }, [])

  const toggleMode = useCallback((current) => {
    const newMode = current === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    if (newMode === 'dark') root.dataset.mode = 'dark'; else delete root.dataset.mode
    localStorage.setItem('cw-mode', newMode)
    setMode(newMode)
  }, [])

  return { theme, mode, themes: THEMES, changeTheme, toggleMode }
}
