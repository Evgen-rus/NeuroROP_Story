import { Checkpoint } from '../components/Checkpoint'
import { PersistentDeal } from '../components/PersistentDeal'
import { useChapterPhase } from '../hooks/useChapterPhase'

const CHAPTER_IDS = ['context', 'risk', 'rop'] as const

export function ChapterInsight() {
  const { index } = useChapterPhase(CHAPTER_IDS)
  const stage = index === 0 ? 'context' : index === 1 ? 'risk' : 'rop'

  return (
    <div className="chapter">
      <div className="chapter-copy">
        <Checkpoint id="context" kicker="05" title={<>НейроРОП собирает<br />картину целиком.</>}>
          <p>РОПу не приходится вручную собирать историю из нескольких мест.</p>
        </Checkpoint>
        <Checkpoint id="risk" kicker="06" title={<>Проблема не в статусе.</>}>
          <p>Проблема в том, что будет дальше.</p>
        </Checkpoint>
        <Checkpoint id="rop" kicker="07" title={<>РОП сразу понимает,<br />что спросить.</>}>
          <p>И что проконтролировать после разговора.</p>
          <p className="accent-line">НейроРОП не заменяет РОПа. Он снимает ручной поиск проблемы.</p>
        </Checkpoint>
      </div>
      <div className="chapter-visual chapter-visual-open">
        <PersistentDeal stage={stage} />
      </div>
    </div>
  )
}
