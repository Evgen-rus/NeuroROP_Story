import { scenes } from '../data/scenes'
import { useActiveScene } from '../hooks/useActiveScene'

export function StoryRail() {
  const activeId = useActiveScene()
  const activeScene = scenes.find((scene) => scene.id === activeId)

  return (
    <>
      {activeScene ? <div className="rail-current" aria-hidden="true">{activeScene.title}</div> : null}
      <nav className="rail" aria-label="Навигация по истории">
        <div className="brand">НейроРОП</div>
        <div className="rail-items">
          {scenes.map((scene) => (
            <a
              key={scene.id}
              href={`#${scene.id}`}
              aria-label={`${scene.kicker} ${scene.title}`}
              className={scene.id === activeId ? 'is-active' : undefined}
              aria-current={scene.id === activeId ? 'true' : undefined}
            >
              <span aria-hidden="true">{scene.kicker}</span>
              <span className="rail-label">{scene.title}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
