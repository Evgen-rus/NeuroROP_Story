import { useMotionValueEvent, useScroll, type MotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { focusDeal, loopEvent, loopSteps } from '../data/story'

function stageFromProgress(value: number) {
  if (value >= 0.72) return 2
  if (value >= 0.45) return 1
  return 0
}

export function FeedbackLoop({ progress }: { progress: MotionValue<number> }) {
  const [stage, setStage] = useState(() => stageFromProgress(progress.get()))

  useMotionValueEvent(progress, 'change', (value) => {
    const next = stageFromProgress(value)
    setStage((current) => (current === next ? current : next))
  })

  const acted = stage >= 1
  const resolved = stage >= 2
  const litUntil = stage === 0 ? 0 : stage === 1 ? 2 : 4

  return (
    <div className="loop-stage">
      <article className={`loop-card ${resolved ? 'is-resolved' : acted ? 'is-acting' : ''}`}>
        <small>Сделка #{focusDeal.id}</small>
        <h4>{focusDeal.title}</h4>
        <p>
          {!acted && 'НейроРОП обнаружил риск: нет финального согласующего и даты ответа.'}
          {acted && !resolved && loopEvent}
          {resolved && 'Новое событие уже в CRM. Следующая проверка — по четвергу.'}
        </p>
        <span className={resolved ? 'chip chip-warn' : 'chip chip-danger'}>
          {resolved ? 'Проверить' : 'Срочно'}
        </span>
      </article>
      <div className="loop-ring" aria-hidden="true">
        {loopSteps.map((step, index) => (
          <span key={step} className={index <= litUntil ? 'is-on' : undefined}>
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}

export function useLoopProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.35'],
  })
  return { ref, value: scrollYProgress }
}
