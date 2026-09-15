import type { ReactNode } from 'react'

type SceneShellProps = {
  id: string
  kicker: string
  title: string
  body?: string
  children: ReactNode
  className?: string
  visualClassName?: string
  fullVisual?: boolean
}

export function SceneShell({
  id,
  kicker,
  title,
  body,
  children,
  className = '',
  visualClassName = '',
  fullVisual = false,
}: SceneShellProps) {
  return (
    <section id={id} className={`scene story-scene ${fullVisual ? 'scene-full' : ''} ${className}`.trim()}>
      <div className="scene-copy">
        <div className="eyebrow">{kicker}</div>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      <div className={`visual-card ${visualClassName}`.trim()}>{children}</div>
    </section>
  )
}
