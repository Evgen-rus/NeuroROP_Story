import { useEffect, useState } from 'react'
import { scenes } from '../data/scenes'
import { useActiveScene } from './useActiveScene'

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable
}

export function usePresenterMode() {
  const [enabled, setEnabled] = useState(false)
  const activeId = useActiveScene()

  useEffect(() => {
    document.documentElement.classList.toggle('presenter-mode', enabled)
    return () => document.documentElement.classList.remove('presenter-mode')
  }, [enabled])

  useEffect(() => {
    function go(delta: number) {
      const index = scenes.findIndex((scene) => scene.id === activeId)
      const next = scenes[Math.min(scenes.length - 1, Math.max(0, index + delta))]
      document.getElementById(next.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    function onKey(event: KeyboardEvent) {
      if (isTypingTarget(event.target)) return

      if (event.key === 'p' || event.key === 'P') {
        event.preventDefault()
        setEnabled((value) => !value)
        return
      }

      if (event.key === 'Escape' && enabled) {
        if (document.querySelector('[aria-modal="true"]')) return
        event.preventDefault()
        setEnabled(false)
        return
      }

      if (!enabled) return

      if (event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId, enabled])

  return enabled
}
