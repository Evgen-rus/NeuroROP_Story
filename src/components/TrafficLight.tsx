import { motion } from 'motion/react'
import { eventChipIds, teamTotals } from '../data/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const rows = [
  { count: teamTotals.danger, label: 'Срочно', hint: 'решить с РОПом', tone: 'danger' as const, layoutId: eventChipIds.Просрочка },
  { count: teamTotals.warn, label: 'Проверить', hint: 'нужен контроль', tone: 'warn' as const, layoutId: eventChipIds.Этап },
  { count: teamTotals.ok, label: 'В норме', hint: 'движется по плану', tone: 'ok' as const, layoutId: eventChipIds.Комментарий },
]

export function TrafficLight() {
  const reduced = usePrefersReducedMotion()
  const layoutTransition = { duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="traffic" aria-label="Светофор сделок">
      <div className="traffic-dots" aria-hidden="true">
        <span className="status-dot status-danger" />
        <span className="status-dot status-warn" />
        <span className="status-dot status-ok" />
      </div>
      <div className="traffic-rows">
        {rows.map((row) => (
          <motion.div
            key={row.label}
            layoutId={reduced ? undefined : row.layoutId}
            layout={!reduced}
            transition={{ layout: layoutTransition }}
            className={`traffic-row traffic-${row.tone}`}
          >
            <strong>{row.count}</strong>
            <span>
              {row.label}
              <small>{row.hint}</small>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
