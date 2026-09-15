import { managers, sideDeals, teamTotals } from '../data/story'
import { ProductFrame, StatusDot } from './ProductFrame'
import { TrafficLight } from './TrafficLight'

function countLabel(count: number, one: string, few: string, many: string) {
  const n10 = count % 10
  const n100 = count % 100
  const word = n10 === 1 && n100 !== 11 ? one : n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14) ? few : many
  return `${count} ${word}`
}

type TeamBoardProps = {
  focusManager?: boolean
}

export function TeamBoard({ focusManager = false }: TeamBoardProps) {
  return (
    <ProductFrame
      title="Итог команды"
      subtitle="Срез на сейчас · синтетические данные"
      pills={[
        { label: 'Всего сделок', value: String(teamTotals.deals) },
        { label: 'Звонков', value: String(teamTotals.calls) },
        { label: 'Сообщений', value: String(teamTotals.messages) },
      ]}
    >
      <div className="team-grid">
        <TrafficLight />
        <div className={`manager-row ${focusManager ? 'is-focused' : ''}`}>
          {managers.map((manager) => (
            <article
              key={manager.id}
              className={`manager-card ${focusManager && manager.id === 'a' ? 'is-hot' : ''} ${focusManager && manager.id !== 'a' ? 'is-dim' : ''}`}
            >
              <h4>{manager.name}</h4>
              <p>
                {countLabel(manager.deals, 'сделка', 'сделки', 'сделок')} · {countLabel(manager.calls, 'звонок', 'звонка', 'звонков')} · {countLabel(manager.messages, 'сообщение', 'сообщения', 'сообщений')}
              </p>
              <div className="mini-counts">
                <span>{manager.danger} срочно</span>
                <span>{manager.warn} проверить</span>
                <span>{manager.ok} в норме</span>
              </div>
            </article>
          ))}
        </div>
        <aside className="deal-mini-list">
          {sideDeals.map((deal) => (
            <div key={deal.id} className={`deal-mini deal-${deal.status}`}>
              <StatusDot tone={deal.status} />
              <div>
                <strong>{deal.title}</strong>
                <small>#{deal.id} · {deal.note}</small>
              </div>
              <em>{deal.amount}</em>
            </div>
          ))}
        </aside>
      </div>
    </ProductFrame>
  )
}
