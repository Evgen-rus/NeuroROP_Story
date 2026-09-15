import type { ReactNode } from 'react'

type ProductFrameProps = {
  title: string
  subtitle?: string
  pills?: { label: string; value: string; tone?: 'danger' | 'warn' | 'ok' | 'neutral' }[]
  children: ReactNode
  compact?: boolean
}

export function ProductFrame({ title, subtitle, pills = [], children, compact = false }: ProductFrameProps) {
  return (
    <div className={`product ${compact ? 'product-compact' : ''}`.trim()}>
      <header className="product-head">
        <div>
          <h3>{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {pills.length > 0 ? (
          <div className="product-pills">
            {pills.map((pill) => (
              <span key={pill.label} className={`pill pill-${pill.tone ?? 'neutral'}`}>
                <strong>{pill.value}</strong>
                {pill.label}
              </span>
            ))}
          </div>
        ) : null}
      </header>
      {children}
    </div>
  )
}

export function StatusDot({ tone }: { tone: 'danger' | 'warn' | 'ok' }) {
  return <span className={`status-dot status-${tone}`} aria-hidden="true" />
}
