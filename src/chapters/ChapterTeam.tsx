import { LayoutGroup, motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Checkpoint } from '../components/Checkpoint'
import { TeamBoard } from '../components/TeamBoard'
import { eventChips } from '../data/story'
import { useChapterPhase } from '../hooks/useChapterPhase'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const CHAPTER_IDS = ['signal', 'team', 'manager', 'deal'] as const

const chipLayout = [
  { left: '8%', top: '10%', x: 28, y: 18 },
  { right: '12%', top: '8%', x: -34, y: 16 },
  { left: '30%', top: '34%', x: 14, y: 10 },
  { right: '8%', top: '42%', x: -24, y: 8 },
  { left: '6%', top: '60%', x: 36, y: -12 },
  { left: '44%', top: '72%', x: 6, y: -22 },
  { right: '14%', top: '78%', x: -18, y: -28 },
]

export function ChapterTeam() {
  const { index } = useChapterPhase(CHAPTER_IDS)
  const reduced = usePrefersReducedMotion()
  const phase = index === 0 ? 'chips' : index === 1 ? 'assemble' : index === 2 ? 'focus' : 'extract'

  return (
    <div className="chapter">
      <div className="chapter-copy">
        <Checkpoint id="signal" kicker="01" title="CRM фиксирует работу.">
          <p>Но не говорит РОПу, где сейчас теряется сделка.</p>
          <p className="accent-line">НейроРОП превращает события в решение.</p>
        </Checkpoint>
        <Checkpoint id="team" kicker="02" title="Не все сделки требуют внимания.">
          <p>Важно вовремя увидеть те, где уже теряются деньги.</p>
          <p>34 сделки. 24 требуют внимания. 6 нужно проверить. 4 в норме.</p>
        </Checkpoint>
        <Checkpoint id="manager" kicker="03" title="Проблема не всегда в менеджере.">
          <p>Иногда он физически не успевает нормально обработать весь поток.</p>
          <p className="fine-print">Нагрузка на экране — демонстрация презентации, не оценка конкретного человека.</p>
        </Checkpoint>
        <Checkpoint id="deal" kicker="04" title="Вот одна из них.">
          <p>2,2 млн ₽. КП отправлено. Задача есть.</p>
          <p>В CRM всё выглядит нормально.</p>
          <p className="accent-line">Но сделка уже стоит.</p>
        </Checkpoint>
      </div>

      <div className="chapter-visual">
        <LayoutGroup>
          {phase === 'chips' ? (
            <EventField reduced={reduced} />
          ) : (
            <TeamBoard phase={index >= 3 ? 'stuck' : phase} />
          )}
        </LayoutGroup>
      </div>
    </div>
  )
}

function EventField({ reduced }: { reduced: boolean }) {
  const { scrollYProgress } = useScroll()
  const converge = useTransform(scrollYProgress, [0, 0.12], [0, 1])

  return (
    <div className="event-cloud event-cloud-chapter" aria-hidden="true">
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

  return (
    <motion.span
      layoutId={`chip-${chip}`}
      style={{
        left: point.left,
        right: 'right' in point ? point.right : undefined,
        top: point.top,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
      }}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.07, duration: 0.45 }}
    >
      {chip}
    </motion.span>
  )
}
