import { ContextGraph } from '../components/ContextGraph'
import { RiskExplain } from '../components/RiskExplain'
import { RopHelp } from '../components/RopHelp'
import { SceneShell } from '../components/SceneShell'

export function SceneContext() {
  return (
    <SceneShell
      id="context"
      kicker="05"
      title="НейроРОП собирает контекст."
      body="Звонки, сообщения, задачи, этап, история КП и комментарии."
    >
      <ContextGraph />
    </SceneShell>
  )
}

export function SceneRisk() {
  return (
    <SceneShell
      id="risk"
      kicker="06"
      title="Что происходит. Почему это риск."
      body="Кто принимает решение? Когда будет ответ? Что тормозит движение?"
    >
      <RiskExplain />
    </SceneShell>
  )
}

export function SceneRop() {
  return (
    <SceneShell
      id="rop"
      kicker="07"
      title="РОП понимает, что спросить."
      body="Что проверить, что сказать менеджеру и что проконтролировать."
      fullVisual
    >
      <RopHelp />
    </SceneShell>
  )
}
