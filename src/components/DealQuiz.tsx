import { useState } from 'react'
import { quizOptions, quizReveal } from '../data/story'

export function DealQuiz() {
  const [choice, setChoice] = useState<string | null>(null)
  const selected = quizOptions.find((item) => item.id === choice)

  return (
    <div className="quiz">
      <p className="quiz-q">Какая сделка требует внимания?</p>
      <div className="quiz-grid">
        {quizOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`quiz-card ${choice === option.id ? (option.correct ? 'is-right' : 'is-wrong') : ''}`}
            onClick={() => setChoice(option.id)}
          >
            <strong>{option.label}</strong>
            <span>{option.title}</span>
            <small>{option.hint}</small>
          </button>
        ))}
      </div>
      {selected?.correct ? (
        <div className="quiz-reveal">
          <p>НейроРОП увидел:</p>
          <dl>
            <div><dt>Риск</dt><dd>{quizReveal.risk}</dd></div>
            <div><dt>Причина</dt><dd>{quizReveal.reason}</dd></div>
            <div><dt>РОПу</dt><dd>{quizReveal.forRop}</dd></div>
            <div><dt>Менеджеру</dt><dd>{quizReveal.forManager}</dd></div>
          </dl>
        </div>
      ) : null}
    </div>
  )
}
