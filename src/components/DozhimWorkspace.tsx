import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { dozhimInsight, dozhimTactics, focusDeal, voicePhrase } from '../data/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { FollowupSteps } from './FollowupSteps'

type TacticId = (typeof dozhimTactics)[number]['id']

type DozhimWorkspaceProps = {
  mode?: 'open' | 'voice' | 'followup'
  focusOnOpen?: boolean
  sharedLayout?: boolean
}

export function DozhimWorkspace({ mode = 'open', focusOnOpen = false, sharedLayout = true }: DozhimWorkspaceProps) {
  const reduced = usePrefersReducedMotion()
  const headingRef = useRef<HTMLElement>(null)
  const [tactic, setTactic] = useState<TacticId>('pause')
  const [voice, setVoice] = useState<'idle' | 'recording' | 'done'>('idle')
  const [draft, setDraft] = useState('')
  const selected = dozhimTactics.find((item) => item.id === tactic) ?? dozhimTactics[0]

  useEffect(() => {
    if (focusOnOpen) headingRef.current?.focus({ preventScroll: true })
  }, [focusOnOpen])

  useEffect(() => {
    if (mode !== 'voice') return
    if (reduced) {
      setVoice('done')
      setDraft(voicePhrase)
      return
    }
    if (voice === 'idle') {
      const start = window.setTimeout(() => setVoice('recording'), 400)
      return () => window.clearTimeout(start)
    }
    if (voice === 'recording') {
      const done = window.setTimeout(() => {
        setVoice('done')
        setDraft(voicePhrase)
      }, 1600)
      return () => window.clearTimeout(done)
    }
  }, [mode, reduced, voice])

  function startVoice() {
    if (reduced) {
      setVoice('done')
      setDraft(voicePhrase)
      return
    }
    setDraft('')
    setVoice('recording')
  }

  const voiceDock = (
    <div className="voice-dock">
      <textarea
        aria-label="Вопрос менеджера"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Уточните рычаг, тон или что уже пробовали…"
        maxLength={500}
      />
      <div className="voice-actions">
        <button type="button" className="ghost" onClick={startVoice}>
          {voice === 'recording' ? 'Слушаю…' : 'Говорить'}
        </button>
        {voice === 'recording' ? (
          <span className="waveform" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </span>
        ) : null}
        <a className="primary" href="#quickhelp">Показать пример ответа</a>
      </div>
      <p className="demo-note">Демонстрация: текст и голос никуда не отправляются. Далее — заранее подготовленный пример ответа.</p>
    </div>
  )

  return (
    <div className="dozhim dozhim-modal">
          <aside className="dozhim-side">
            <motion.div className="dozhim-deal-context" layoutId={!reduced && sharedLayout ? 'dozhim-deal' : undefined}>
              <small>Сделка #{focusDeal.id}</small>
              <h4>{focusDeal.title}</h4>
              <p>{focusDeal.amount} · {focusDeal.stage}</p>
            </motion.div>
            <strong ref={headingRef} tabIndex={-1}>Дожим</strong>
          </aside>
          <div className="dozhim-main">
            {mode === 'followup' ? (
              <FollowupSteps />
            ) : (
              <>
                {mode === 'voice' ? voiceDock : null}
                <section className="insight-card insight-warn">
                  <small>Понял ситуацию</small>
                  <p>{dozhimInsight.understood}</p>
                </section>
                <p className="lever">Рычаг дожима · {dozhimInsight.lever}</p>

                <div className="tactic-tabs" aria-label="Сценарии дожима">
                  {dozhimTactics.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={item.id === tactic}
                      className={item.id === tactic ? 'is-on' : undefined}
                      onClick={() => setTactic(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <article className="message-card">
                  <small>Сообщение клиенту</small>
                  <p>{selected.message}</p>
                </article>

                <div className="dozhim-extras">
                  <article>
                    <small>Лайфхак</small>
                    <p>{dozhimInsight.hack}</p>
                  </article>
                  <article>
                    <small>Если не сработало</small>
                    <p>{dozhimInsight.fallback}</p>
                  </article>
                </div>

                {mode === 'open' ? voiceDock : null}
              </>
            )}
          </div>
    </div>
  )
}
