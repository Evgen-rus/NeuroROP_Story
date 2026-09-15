import { useState } from 'react'
import { FeedbackLoop } from '../components/FeedbackLoop'
import { SceneShell } from '../components/SceneShell'

export function SceneLoop() {
  return (
    <SceneShell
      id="loop"
      kicker="12"
      title="Совет — не конец."
      body="Риск → рекомендация → действие → новое событие → новая проверка."
    >
      <FeedbackLoop />
    </SceneShell>
  )
}

export function SceneFinal() {
  const [requested, setRequested] = useState(false)

  return (
    <section id="final" className="scene story-scene scene-final">
      <div className="scene-copy">
        <div className="eyebrow">13</div>
        <h2>РОП видит, где нужна помощь.</h2>
        <p>Менеджер понимает, что делать дальше.</p>
      </div>
      <div className="visual-card visual-final">
        <p className="final-kicker">НейроРОП — от общей картины отдела до конкретного следующего действия в сделке.</p>
        <button
          type="button"
          className="pilot"
          onClick={() => setRequested(true)}
        >
          {requested ? 'Заявку на пилот зафиксировали' : 'Запустить пилот'}
        </button>
      </div>
    </section>
  )
}
