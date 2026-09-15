import { motion } from 'motion/react'
import { teamTotals } from '../data/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const rows = [
  { count: teamTotals.danger, label: 'Срочно', hint: 'решить с РОПом', tone: 'danger' as const },
  { count: teamTotals.warn, label: 'Проверить', hint: 'нужен контроль', tone: 'warn' as const },
  { count: teamTotals.ok, label: 'В норме', hint: 'движется по плану', tone: 'ok' as const },
]

export function TrafficLight({ reveal = true }: { reveal?: boolean }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="traffic" aria-label="Светофор сделок">
      <div className="traffic-dots" aria-hidden="true">
        <span className="status-dot status-danger" />
        <span className="status-dot status-warn" />
        <span className="status-dot status-ok" />
      </div>
      <div className="traffic-rows">
        {rows.map((row, index) => (
          <motion.div
            key={row.label}
            className={`traffic-row traffic-${row.tone}`}
            initial={reveal && !reduced ? { opacity: 0, y: 12 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: reduced ? 0 : index * 0.16, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
