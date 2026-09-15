import { scenes } from '../data/scenes'
import { useActiveScene } from '../hooks/useActiveScene'

export function StoryRail() {
  const activeId = useActiveScene()

  return (
    <nav className="rail" aria-label="Навигация по истории">
      <div className="brand">НейроРОП</div>
      <div className="rail-items">
        {scenes.map((scene) => (
          <a
            key={scene.id}
            href={`#${scene.id}`}
            title={scene.title}
            className={scene.id === activeId ? 'is-active' : undefined}
            aria-current={scene.id === activeId ? 'true' : undefined}
          >
            {scene.kicker}
          </a>
        ))}
      </div>
    </nav>
  )
}
