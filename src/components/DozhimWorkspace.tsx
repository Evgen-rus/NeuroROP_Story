import { useEffect, useId, useState } from 'react'
import { dozhimInsight, dozhimTactics, focusDeal, voicePhrase } from '../data/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { FollowupSteps } from './FollowupSteps'

type TacticId = (typeof dozhimTactics)[number]['id']

type DozhimWorkspaceProps = {
  mode?: 'entry' | 'open' | 'voice' | 'followup'
  onOpen?: () => void
}

export function DozhimWorkspace({ mode = 'open', onOpen }: DozhimWorkspaceProps) {
  const draftId = useId()
  const reduced = usePrefersReducedMotion()
  const [tactic, setTactic] = useState<TacticId>('pause')
  const [voice, setVoice] = useState<'idle' | 'recording' | 'done'>('idle')
  const [draft, setDraft] = useState('')
  const selected = dozhimTactics.find((item) => item.id === tactic) ?? dozhimTactics[0]

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

  return (
    <div className={`dozhim ${mode === 'entry' ? 'dozhim-entry' : 'dozhim-modal'}`}>
      {mode === 'entry' ? (
        <div className="dozhim-launch">
          <div>
            <small>Сделка #{focusDeal.id}</small>
            <h4>Дожим</h4>
            <p>Чтобы не упустить клиента и продвинуть сделку на следующий шаг.</p>
          </div>
          <button type="button" className="dozhim-open" onClick={onOpen}>
            Открыть Дожим
          </button>
        </div>
      ) : (
        <>
          <aside className="dozhim-side">
            <strong>Дожим</strong>
            <small>#{focusDeal.id} · {focusDeal.title}</small>
            <p>{focusDeal.stage}</p>
            <nav>
              <span className="is-on">Дожим</span>
              <span>История</span>
              <span>Контекст сделки</span>
            </nav>
          </aside>
          <div className="dozhim-main">
            {mode === 'followup' ? (
              <FollowupSteps />
            ) : (
              <>
                <section className="insight-card insight-warn">
                  <small>Понял ситуацию</small>
                  <p>{dozhimInsight.understood}</p>
                </section>
                <p className="lever">Рычаг дожима · {dozhimInsight.lever}</p>

                <div className="tactic-tabs" role="tablist" aria-label="Сценарии дожима">
                  {dozhimTactics.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={item.id === tactic}
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

                <div className="voice-dock">
                  <textarea
                    id={draftId}
                    aria-label="Вопрос менеджера"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Уточните рычаг, тон или что уже пробовали…"
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
                    <button type="button" className="primary">Отправить</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
