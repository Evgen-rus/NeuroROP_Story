import { motion } from 'motion/react'
import { managerLoad, managers, sideDeals, teamTotals } from '../data/story'
import { ProductFrame, StatusDot } from './ProductFrame'
import { TrafficLight } from './TrafficLight'

function countLabel(count: number, one: string, few: string, many: string) {
  const n10 = count % 10
  const n100 = count % 100
  const word = n10 === 1 && n100 !== 11 ? one : n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14) ? few : many
  return `${count} ${word}`
}

type TeamPhase = 'assemble' | 'focus' | 'extract' | 'stuck'

type TeamBoardProps = {
  phase?: TeamPhase
}

export function TeamBoard({ phase = 'assemble' }: TeamBoardProps) {
  const focusManager = phase === 'focus' || phase === 'extract' || phase === 'stuck'
  const extract = phase === 'extract' || phase === 'stuck'

  return (
    <ProductFrame
      title="Итог команды"
      subtitle="Демонстрационные данные презентации"
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
              {manager.id === 'a' && focusManager ? (
                <div className="load-grid" aria-label="Нагрузка менеджера, демонстрация">
                  <span><strong>{managerLoad.today}</strong> задач сегодня</span>
                  <span><strong>{managerLoad.overdue}</strong> просрочено</span>
                  <span><strong>{managerLoad.moved}</strong> перенесено</span>
                  <span><strong>{managerLoad.deals}</strong> активные сделки</span>
                </div>
              ) : (
                <div className="mini-counts">
                  <span>{manager.danger} срочно</span>
                  <span>{manager.warn} проверить</span>
                  <span>{manager.ok} в норме</span>
                </div>
              )}
            </article>
          ))}
        </div>
        <aside className="deal-mini-list">
          {sideDeals.map((deal) => {
            const isFocus = deal.id === '19023'
            if (extract && isFocus) {
              return <div key={deal.id} className="deal-mini deal-placeholder" />
            }
            return (
              <motion.div
                layoutId={isFocus ? 'deal-19023' : undefined}
                key={deal.id}
                className={`deal-mini deal-${deal.status}`}
              >
                <StatusDot tone={deal.status} />
                <div>
                  <strong>{deal.title}</strong>
                  <small>#{deal.id} · {deal.note}</small>
                </div>
                <em>{deal.amount}</em>
              </motion.div>
            )
          })}
        </aside>
      </div>
      {extract ? (
        <motion.div layoutId="deal-19023" className={`extracted-deal ${phase === 'stuck' ? 'is-stuck' : ''}`}>
          <small>Сделка #19023</small>
          <h4>Проект Альфа</h4>
          <p>2 200 000 ₽ · КП отправлено на согласование</p>
          <span className={phase === 'stuck' ? 'chip chip-danger' : 'chip chip-warn'}>
            {phase === 'stuck' ? 'Сделка уже стоит' : 'В CRM выглядит нормально'}
          </span>
        </motion.div>
      ) : null}
    </ProductFrame>
  )
}
