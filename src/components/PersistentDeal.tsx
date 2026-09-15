import { focusDeal, riskQuestions, ropHelp } from '../data/story'

type DealStage = 'context' | 'risk' | 'rop'

const sources = ['Звонки', 'Сообщения', 'Задачи', 'Комментарии', 'Этап', 'История КП']

export function PersistentDeal({ stage }: { stage: DealStage }) {
  return (
    <div className={`stage-board stage-${stage}`}>
      <article className="hero-deal">
        <small>Сделка #{focusDeal.id}</small>
        <h3>{focusDeal.title}</h3>
        <p>{focusDeal.amount} · {focusDeal.stage}</p>
      </article>

      <div className={`orbit ${stage === 'context' ? 'is-on' : 'is-settled'}`}>
        {sources.map((source) => (
          <span key={source}>{source}</span>
        ))}
      </div>

      <article className="situation-card situation-hero">
        <header>
          <strong>Текущая ситуация</strong>
        </header>
        <p>КП остаётся на внутреннем согласовании. Не подтверждён финальный согласующий. Нет конкретной даты решения.</p>
      </article>

      {stage !== 'context' ? (
        <div className="risk-questions">
          {riskQuestions.map((question) => (
            <span key={question}>{question}</span>
          ))}
          <p className="risk-note">НейроРОП не просто помечает сделку красным. Он объясняет — почему.</p>
        </div>
      ) : null}

      {stage === 'rop' ? (
        <div className="rop-help">
          <article className="help-card">
            <small>Спросить менеджера</small>
            <ul>
              {ropHelp.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </article>
          <article className="help-card help-ok">
            <small>Что проконтролировать</small>
            <ul>
              {ropHelp.controls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="help-card help-script">
            <small>Сценарий разговора</small>
            <p>{ropHelp.script}</p>
          </article>
        </div>
      ) : null}
    </div>
  )
}
