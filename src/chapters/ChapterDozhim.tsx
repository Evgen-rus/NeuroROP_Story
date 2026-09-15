import { useState } from 'react'
import { Checkpoint } from '../components/Checkpoint'
import { DealQuiz } from '../components/DealQuiz'
import { DozhimWorkspace } from '../components/DozhimWorkspace'
import { ContactCase } from '../components/ProofCases'
import { useChapterPhase } from '../hooks/useChapterPhase'

const CHAPTER_IDS = ['dozhim', 'tactic', 'voice', 'quickhelp'] as const

export function ChapterDozhim() {
  const { index } = useChapterPhase(CHAPTER_IDS)
  const [opened, setOpened] = useState(false)
  const open = opened || index > 0
  const mode = !open ? 'entry' : index >= 3 ? 'followup' : index >= 2 ? 'voice' : 'open'

  return (
    <div className="chapter">
      <div className="chapter-copy">
        <Checkpoint id="dozhim" kicker="08" title={<>Увидеть риск недостаточно.</>}>
          <p>Сделку всё равно должен двигать менеджер. И помощь получает он тоже.</p>
          <p>Чтобы не упустить клиента и продвинуть сделку на следующий шаг.</p>
        </Checkpoint>
        <Checkpoint id="tactic" kicker="09" title={<>Не общий совет.</>}>
          <p>Следующий конкретный ход по этой сделке.</p>
          <ContactCase />
        </Checkpoint>
        <Checkpoint id="voice" kicker="10" title={<>Не нужно формулировать<br />идеальный запрос.</>}>
          <p>Можно просто рассказать, что произошло.</p>
        </Checkpoint>
        <Checkpoint id="quickhelp" kicker="11" title="Контекст уже внутри.">
          <p>НейроРОП уже знает историю сделки. Поэтому отвечает не общим советом, а конкретным действием.</p>
          <DealQuiz />
        </Checkpoint>
      </div>
      <div className="chapter-visual">
        <DozhimWorkspace mode={mode} onOpen={() => setOpened(true)} />
      </div>
    </div>
  )
}
