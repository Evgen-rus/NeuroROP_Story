import { riskBlocks } from '../data/story'

export function RiskExplain() {
  return (
    <div className="risk-stack">
      {riskBlocks.map((block, index) => (
        <article key={block.title} className={`insight-card ${index === 2 ? 'insight-danger' : ''}`}>
          <small>0{index + 1}</small>
          <h4>{block.title}</h4>
          <p>{block.body}</p>
        </article>
      ))}
    </div>
  )
}
