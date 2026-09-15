import { useMotionValueEvent } from 'motion/react'
import { useState } from 'react'
import { Checkpoint } from '../components/Checkpoint'
import { FeedbackLoop, useLoopProgress } from '../components/FeedbackLoop'
import { ForgottenCase } from '../components/ProofCases'

export function ChapterLoop() {
  const { ref, value } = useLoopProgress()
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(value, 'change', (latest) => {
    setProgress(latest)
  })

  return (
    <div className="chapter chapter-loop" ref={ref}>
      <div className="chapter-copy">
        <Checkpoint id="loop" kicker="12" title="Совет — не конец.">
          <p>НейроРОП видит, что произошло после него.</p>
          <p>Риск → рекомендация → действие → новое событие → новая проверка.</p>
          <ForgottenCase />
        </Checkpoint>
      </div>
      <div className="chapter-visual chapter-visual-open">
        <FeedbackLoop progress={progress} />
      </div>
    </div>
  )
}
