import { SceneShell } from '../components/SceneShell'
import { TeamBoard } from '../components/TeamBoard'
import { DealWorkspace } from '../components/DealWorkspace'

export function SceneTeam() {
  return (
    <SceneShell
      id="team"
      kicker="02"
      title="Вся команда — перед глазами."
      body="34 сделки. 24 требуют внимания. 6 нужно проверить. 4 идут нормально."
    >
      <TeamBoard />
    </SceneShell>
  )
}

export function SceneManager() {
  return (
    <SceneShell
      id="manager"
      kicker="03"
      title="От всей команды — к одному менеджеру."
      body="Не читать всё. Сразу увидеть, где нужен контроль."
    >
      <TeamBoard focusManager />
    </SceneShell>
  )
}

export function SceneDeal() {
  return (
    <SceneShell
      id="deal"
      kicker="04"
      title="От менеджера — к одной сделке."
      body="Обычная CRM-карточка становится понятной ситуацией."
      fullVisual
    >
      <DealWorkspace />
    </SceneShell>
  )
}
