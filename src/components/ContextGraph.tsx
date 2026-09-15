import { contextSources, focusDeal } from '../data/story'

export function ContextGraph() {
  return (
    <div className="context-graph">
      <div className="context-sources">
        {contextSources.map((source) => (
          <span key={source}>{source}</span>
        ))}
      </div>
      <div className="context-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <article className="situation-card situation-hero">
        <header>
          <strong>Текущая ситуация</strong>
          <span>Сделка #{focusDeal.id}</span>
        </header>
        <p>{focusDeal.situation}</p>
      </article>
    </div>
  )
}
