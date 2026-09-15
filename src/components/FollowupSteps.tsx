import { followupGoal, followupSteps } from '../data/story'

export function FollowupSteps({ openCount = 4 }: { openCount?: number }) {
  const visible = Math.min(openCount, followupSteps.length)

  return (
    <div className="followup">
      <header>
        <div>
          <small>Продолжение переписки</small>
          <h4>Quick Help</h4>
        </div>
        <p>Цель: {followupGoal}</p>
      </header>
      <ol>
        {followupSteps.map((step, index) => (
          <li key={step.title} className={index < visible ? 'is-open' : 'is-closed'}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.title}</strong>
              {index < visible ? <p>{step.body}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
