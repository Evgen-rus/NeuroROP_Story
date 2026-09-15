import { useState } from 'react'
import { DealWorkspace } from '../components/DealWorkspace'
import { DozhimWorkspace } from '../components/DozhimWorkspace'
import { FollowupSteps } from '../components/FollowupSteps'
import { SceneShell } from '../components/SceneShell'

export function SceneDozhim() {
  const [open, setOpen] = useState(false)

  return (
    <SceneShell
      id="dozhim"
      kicker="08"
      title="Менеджер открывает дожим."
      body="Система уже знает контекст сделки."
      fullVisual
    >
      {open ? (
        <DozhimWorkspace mode="open" />
      ) : (
        <DealWorkspace showDozhim onOpenDozhim={() => setOpen(true)} />
      )}
    </SceneShell>
  )
}

export function SceneTactic() {
  return (
    <SceneShell
      id="tactic"
      kicker="09"
      title="Не общий совет — конкретный ход."
      body="Рычаг дожима, сообщение клиенту, лайфхак и запасной сценарий."
      fullVisual
    >
      <DozhimWorkspace mode="open" />
    </SceneShell>
  )
}

export function SceneVoice() {
  return (
    <SceneShell
      id="voice"
      kicker="10"
      title="Можно просто сказать, что происходит."
      body="«Клиент не отвечает, и я не понимаю, как его дальше вести…»"
      fullVisual
    >
      <DozhimWorkspace mode="voice" />
    </SceneShell>
  )
}

export function SceneQuickHelp() {
  return (
    <SceneShell
      id="quickhelp"
      kicker="11"
      title="Quick Help строит следующий шаг."
      body="Контекст уже внутри. Не нужно объяснять сделку заново."
      fullVisual
    >
      <FollowupSteps />
    </SceneShell>
  )
}
