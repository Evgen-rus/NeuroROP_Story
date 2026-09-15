import { ProgressBar } from './components/ProgressBar'
import { StoryRail } from './components/StoryRail'
import { ChapterTeam } from './chapters/ChapterTeam'
import { ChapterInsight } from './chapters/ChapterInsight'
import { ChapterDozhim } from './chapters/ChapterDozhim'
import { ChapterLoop } from './chapters/ChapterLoop'
import { SceneFinal } from './chapters/SceneFinal'
import { usePresenterMode } from './hooks/usePresenterMode'

export function App() {
  usePresenterMode()

  return (
    <main>
      <ProgressBar />
      <StoryRail />
      <ChapterTeam />
      <ChapterInsight />
      <ChapterDozhim />
      <ChapterLoop />
      <SceneFinal />
    </main>
  )
}
