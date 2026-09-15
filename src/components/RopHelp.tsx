import { focusDeal, ropHelp } from '../data/story'

export function RopHelp() {
  return (
    <div className="rop-split">
      <article className="deal-snapshot">
        <small>Сделка #{focusDeal.id}</small>
        <h4>{focusDeal.title}</h4>
        <p>{focusDeal.stage}</p>
        <b>{focusDeal.amount}</b>
        <span className="badge-danger">{focusDeal.badge}</span>
      </article>
      <div className="rop-help">
        <article className="help-card help-ok">
          <small>Вывод для РОПа</small>
          <p>{ropHelp.conclusion}</p>
        </article>
        <article className="help-card">
          <small>Спросить менеджера</small>
          <ul>
            {ropHelp.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </article>
        <article className="help-card help-script">
          <small>Готовый сценарий разговора</small>
          <p>{ropHelp.script}</p>
        </article>
      </div>
    </div>
  )
}
