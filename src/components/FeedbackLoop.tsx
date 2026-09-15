import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import { focusDeal, loopEvent, loopSteps } from '../data/story'

export function FeedbackLoop({ progress }: { progress: number }) {
  const resolved = progress >= 0.72
  const acted = progress >= 0.45

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
          <span
            key={step}
            className={progress > index / loopSteps.length ? 'is-on' : undefined}
          >
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
  const value = useTransform(scrollYProgress, [0, 1], [0, 1])
  return { ref, value }
}
