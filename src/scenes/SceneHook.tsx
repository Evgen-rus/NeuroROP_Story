import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { eventChips } from '../data/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const chipLayout = [
  { left: '6%', top: '8%', x: 36, y: 24 },
  { right: '10%', top: '6%', x: -42, y: 20 },
  { left: '28%', top: '32%', x: 18, y: 12 },
  { right: '4%', top: '40%', x: -30, y: 8 },
  { left: '4%', top: '58%', x: 44, y: -16 },
  { left: '42%', top: '70%', x: 8, y: -28 },
  { right: '12%', top: '76%', x: -22, y: -34 },
]

export function SceneHook() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const converge = useTransform(scrollYProgress, [0, 0.72], [0, 1])

  return (
    <section id="signal" ref={ref} className="scene hero">
      <div className="hero-sticky">
        <div className="hero-copy">
          <div className="eyebrow">НейроРОП</div>
          <h1>CRM хранит события.</h1>
          <h2>НейроРОП превращает их в решение.</h2>
          <p>Прокрутите вниз</p>
        </div>
        <div className="event-cloud" aria-hidden="true">
          {eventChips.map((chip, index) => (
            <EventChip
              key={chip}
              chip={chip}
              index={index}
              point={chipLayout[index]}
              converge={converge}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function EventChip({
  chip,
  index,
  point,
  converge,
  reduced,
}: {
  chip: string
  index: number
  point: (typeof chipLayout)[number]
  converge: MotionValue<number>
  reduced: boolean
}) {
  const x = useTransform(converge, [0, 1], [0, point.x])
  const y = useTransform(converge, [0, 1], [0, point.y])
  const scale = useTransform(converge, [0, 1], [1, 0.88])

  return (
    <motion.span
      style={{
        left: point.left,
        right: 'right' in point ? point.right : undefined,
        top: point.top,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
        scale: reduced ? 1 : scale,
      }}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 + index * 0.08, duration: 0.5 }}
    >
      {chip}
    </motion.span>
  )
}
