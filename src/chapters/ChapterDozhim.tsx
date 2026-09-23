import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Checkpoint } from '../components/Checkpoint'
import { DealQuiz } from '../components/DealQuiz'
import { DozhimWorkspace } from '../components/DozhimWorkspace'
import { FollowupSteps } from '../components/FollowupSteps'
import { PersistentDeal } from '../components/PersistentDeal'
import { ContactCase } from '../components/ProofCases'
import { useChapterPhase } from '../hooks/useChapterPhase'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const CHAPTER_IDS = ['dozhim', 'tactic', 'voice', 'quickhelp'] as const

export function ChapterDozhim() {
  const { index } = useChapterPhase(CHAPTER_IDS)
  const [opened, setOpened] = useState(false)
  const [compact, setCompact] = useState(false)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)')
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const open = opened || index > 0
  const mode = !open ? 'entry' : index >= 3 ? 'followup' : index >= 2 ? 'voice' : 'open'
  const sharedLayout = !reduced && !compact

  return (
    <div className="chapter chapter-dozhim">
      <div className="chapter-copy">
        <Checkpoint id="dozhim" kicker="08" title={<>Увидеть риск недостаточно.</>}>
          <p>Сделку всё равно должен двигать менеджер. И помощь получает он тоже.</p>
          <p>Чтобы не упустить клиента и продвинуть сделку на следующий шаг.</p>
        </Checkpoint>
      </div>
      <div className="chapter-visual chapter-visual-open">
        <LayoutGroup>
          <AnimatePresence mode={compact ? 'wait' : 'popLayout'} initial={false}>
            {mode === 'entry' ? (
              <motion.div key="deal" className="dozhim-transition" exit={reduced ? undefined : { opacity: 0, transition: { duration: compact ? 0.12 : 0.25 } }}>
                <PersistentDeal stage="rop" onOpenDozhim={() => setOpened(true)} reduced={!sharedLayout} />
              </motion.div>
            ) : (
              <motion.div key="workspace" className="dozhim-transition" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : compact ? 0.2 : 0.32 }}>
                <DozhimWorkspace mode={mode} focusOnOpen={opened} sharedLayout={sharedLayout} />
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
      <div className="chapter-copy chapter-copy-cont">
        <Checkpoint id="tactic" kicker="09" title={<>Не общий совет.</>}>
          <p>Следующий конкретный ход по этой сделке.</p>
          <ContactCase />
        </Checkpoint>
        <Checkpoint id="voice" kicker="10" title={<>Не нужно формулировать<br />идеальный запрос.</>}>
          <p>Можно просто рассказать, что произошло.</p>
        </Checkpoint>
        <Checkpoint id="quickhelp" kicker="11" title="Контекст уже внутри.">
          <p>НейроРОП уже знает историю сделки. Поэтому отвечает не общим советом, а конкретным действием.</p>
          <div className="mobile-followup"><FollowupSteps /></div>
          <DealQuiz />
        </Checkpoint>
      </div>
    </div>
  )
}
