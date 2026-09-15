import { ProgressBar } from './components/ProgressBar'
import { StoryRail } from './components/StoryRail'
import { SceneHook } from './scenes/SceneHook'
import { SceneDeal, SceneManager, SceneTeam } from './scenes/ScenesTeamZoom'
import { SceneContext, SceneRisk, SceneRop } from './scenes/ScenesInsight'
import { SceneDozhim, SceneQuickHelp, SceneTactic, SceneVoice } from './scenes/ScenesDozhim'
import { SceneFinal, SceneLoop } from './scenes/ScenesClose'

export function App() {
  return (
    <main>
      <ProgressBar />
      <StoryRail />
      <SceneHook />
      <SceneTeam />
      <SceneManager />
      <SceneDeal />
      <SceneContext />
      <SceneRisk />
      <SceneRop />
      <SceneDozhim />
      <SceneTactic />
      <SceneVoice />
      <SceneQuickHelp />
      <SceneLoop />
      <SceneFinal />
    </main>
  )
}
