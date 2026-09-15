import { focusDeal, qualityChecks, sideDeals } from '../data/story'
import { ProductFrame, StatusDot } from './ProductFrame'

type DealWorkspaceProps = {
  highlightDeal?: boolean
  showPanel?: boolean
  showDozhim?: boolean
  onOpenDozhim?: () => void
}

export function DealWorkspace({
  highlightDeal = true,
  showPanel = true,
  showDozhim = false,
  onOpenDozhim,
}: DealWorkspaceProps) {
  return (
    <ProductFrame
      title="Задачи менеджера"
      subtitle="Менеджер А"
      pills={[
        { label: 'Просрочено', value: '2', tone: 'danger' },
        { label: 'На сегодня', value: '1', tone: 'warn' },
        { label: 'В работе', value: '5' },
      ]}
    >
      <div className="workspace">
        <div className="deal-table">
          <div className="table-head">
            <span>Сделка</span>
            <span>Этап</span>
            <span>Задача</span>
            <span>Статус</span>
          </div>
          {sideDeals.map((deal) => {
            const isFocus = deal.id === focusDeal.id
            return (
              <div
                key={deal.id}
                className={`table-row ${isFocus && highlightDeal ? 'is-extracted' : ''} ${!isFocus && highlightDeal ? 'is-quiet' : ''}`}
              >
                <div>
                  <StatusDot tone={deal.status} />
                  <strong>{deal.title}</strong>
                  <small>#{deal.id}</small>
                </div>
                <span>{isFocus ? focusDeal.stage : 'В работе'}</span>
                <span>{isFocus ? focusDeal.task : deal.note}</span>
                <em className={`chip chip-${deal.status}`}>{isFocus ? 'Просрочено' : deal.note}</em>
              </div>
            )
          })}
        </div>

        {showPanel ? (
          <aside className="deal-panel">
            <div className="panel-top">
              <div>
                <small>Сделка #{focusDeal.id}</small>
                <h4>{focusDeal.title}</h4>
                <p>{focusDeal.amount} · {focusDeal.company}</p>
              </div>
              <span className="badge-danger">{focusDeal.badge}</span>
            </div>

            <section className="situation-card">
              <header>
                <strong>Текущая ситуация</strong>
                <span>Требует подтверждения</span>
              </header>
              <p>{focusDeal.situation}</p>
            </section>

            {showDozhim ? (
              <button type="button" className="dozhim-open" onClick={onOpenDozhim}>
                Открыть дожим сделки
              </button>
            ) : null}

            <div className="quality-grid">
              {qualityChecks.map((item) => (
                <div key={item.label} className="quality-card">
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                  <small>Не выполнено</small>
                </div>
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </ProductFrame>
  )
}
