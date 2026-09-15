import { motion, useScroll, useSpring } from 'motion/react'
import { scenes } from './data/scenes'

const eventChips = ['Звонок', 'Задача', 'Сообщение', 'Комментарий', 'Этап', 'Просрочка', 'КП']

export function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 })

  return (
    <main>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <nav className="rail" aria-label="Навигация по истории">
        <div className="brand">НейроРОП</div>
        <div className="rail-items">
          {scenes.map((scene) => (
            <a key={scene.id} href={`#${scene.id}`} title={scene.title}>
              {scene.kicker}
            </a>
          ))}
        </div>
      </nav>

      <section id="signal" className="hero scene">
        <div className="hero-copy">
          <div className="eyebrow">НейроРОП</div>
          <h1>CRM хранит события.</h1>
          <h2>НейроРОП превращает их в решение.</h2>
          <p>Прокрутите вниз</p>
        </div>
        <div className="event-cloud" aria-hidden="true">
          {eventChips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.12, duration: 0.5 }}
            >
              {chip}
            </motion.span>
          ))}
        </div>
      </section>

      {scenes.slice(1).map((scene, index) => (
        <section className="scene story-scene" id={scene.id} key={scene.id}>
          <div className="scene-copy">
            <div className="eyebrow">{scene.kicker}</div>
            <h2>{scene.title}</h2>
            <p>{scene.body}</p>
          </div>

          <div className="visual-card">
            {index === 0 ? (
              <div className="traffic">
                <div><strong>24</strong><span>Срочно</span></div>
                <div><strong>6</strong><span>Проверить</span></div>
                <div><strong>4</strong><span>В норме</span></div>
              </div>
            ) : index === 3 ? (
              <div className="context-stack">
                {['Звонки', 'Сообщения', 'Задачи', 'Этап', 'История КП'].map((x) => <span key={x}>{x}</span>)}
                <b>→ Текущая ситуация</b>
              </div>
            ) : index === 10 ? (
              <div className="loop">
                {['Риск', 'Рекомендация', 'Действие', 'Новое событие', 'Проверка'].map((x) => <span key={x}>{x}</span>)}
              </div>
            ) : index === 11 ? (
              <button className="pilot">Запустить пилот</button>
            ) : (
              <div className="placeholder-ui">
                <div className="ui-header" />
                <div className="ui-grid">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
                <small>Прототип сцены. Реальный UI и motion описаны в docs/02_STORYBOARD.md</small>
              </div>
            )}
          </div>
        </section>
      ))}
    </main>
  )
}
