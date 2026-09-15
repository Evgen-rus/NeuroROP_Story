import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { focusDeal, loopSteps } from '../data/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function FeedbackLoop() {
  const reduced = usePrefersReducedMotion()
  const [resolved, setResolved] = useState(reduced)

  return (
    <div className="loop-stage">
      <motion.article
        className={`loop-card ${resolved ? 'is-resolved' : ''}`}
        onViewportEnter={() => setResolved(true)}
        viewport={{ once: true, amount: 0.55 }}
      >
        <small>Сделка #{focusDeal.id}</small>
        <h4>{focusDeal.title}</h4>
        <p>
          {resolved
            ? 'Согласующий и дата ответа зафиксированы. Следующая проверка — по новому событию в CRM.'
            : focusDeal.situation}
        </p>
        <span className={resolved ? 'chip chip-ok' : 'chip chip-warn'}>
          {resolved ? 'Проверить' : 'Срочно'}
        </span>
      </motion.article>
      <div className="loop-ring" aria-hidden="true">
        {loopSteps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </div>
  )
}
