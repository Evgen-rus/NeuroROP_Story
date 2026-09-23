import { Checkpoint } from '../components/Checkpoint'

export function SceneFinal() {
  return (
    <div className="chapter chapter-final">
      <Checkpoint id="final" kicker="13" title={<>РОП не может быть<br />внутри каждой сделки.</>}>
        <p>НейроРОП может следить за каждой.</p>
        <p>РОП видит, где нужна помощь. Менеджер понимает, что делать дальше.</p>
        <p>Меньше времени на поиск проблемы. Больше — на решение и продажу.</p>
        <p className="accent-line">НейроРОП не заменяет РОПа и менеджера. Он усиливает их.</p>
      </Checkpoint>
      <div className="final-cta">
        <a className="pilot" href="https://t.me/EvgeniiRa" target="_blank" rel="noreferrer">
          Запустить пилот
        </a>
        <p>Напишите в Telegram, чтобы обсудить пилот.</p>
      </div>
    </div>
  )
}
