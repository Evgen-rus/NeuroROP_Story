import type { ReactNode } from 'react'

type CheckpointProps = {
  id: string
  kicker: string
  title: ReactNode
  children?: ReactNode
  className?: string
}

export function Checkpoint({ id, kicker, title, children, className = '' }: CheckpointProps) {
  return (
    <section id={id} className={`checkpoint ${className}`.trim()}>
      <div className="checkpoint-copy">
        <div className="eyebrow">{kicker}</div>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}
