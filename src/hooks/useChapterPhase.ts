import { useEffect, useState } from 'react'

export function useChapterPhase(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveId(visible.target.id)
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0.12, 0.35, 0.6] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  const index = Math.max(0, ids.indexOf(activeId))
  return { activeId, index }
}
