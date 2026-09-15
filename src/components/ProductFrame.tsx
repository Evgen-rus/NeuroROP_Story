import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type ProductFrameProps = {
  title: string
  subtitle?: string
  pills?: { label: string; value: string; tone?: 'danger' | 'warn' | 'ok' | 'neutral'; layoutId?: string }[]
  children: ReactNode
  compact?: boolean
}

export function ProductFrame({ title, subtitle, pills = [], children, compact = false }: ProductFrameProps) {
  const reduced = usePrefersReducedMotion()
  const layoutTransition = { duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const }

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
              <motion.span
                key={pill.label}
                layoutId={reduced ? undefined : pill.layoutId}
                layout={!reduced}
                transition={{ layout: layoutTransition }}
                className={`pill pill-${pill.tone ?? 'neutral'}`}
              >
                <strong>{pill.value}</strong>
                {pill.label}
              </motion.span>
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
