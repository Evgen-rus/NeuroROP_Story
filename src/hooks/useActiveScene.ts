import { useEffect, useState } from 'react'
import { scenes } from '../data/scenes'

export function useActiveScene() {
  const [activeId, setActiveId] = useState(scenes[0].id)

  useEffect(() => {
    const nodes = scenes
      .map((scene) => document.getElementById(scene.id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveId(visible.target.id)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.25, 0.5, 0.75] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return activeId
}
